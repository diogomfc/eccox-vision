// src/server/repositories/application-repository.ts
import { getDatabase } from "../db";
import { Service } from "../../types/machines";
import { Application, Machines } from "../../types/machines";
import { createServiceInDb, deleteServiceInDb, syncServicesInDb, updateServiceInDb } from "./service-repository";
import { getMachineById, updateMachineInDb } from "./machine-repository";
import { 
    updateApplicationInDbWithRules,
    propagateStatusAndDateUpdates 
} from './business-rules';

// ========================
// OPERAÇÕES DE CONSULTA
// ========================

/**
 * Busca todas as aplicações com seus serviços aninhados.
 */
export function getAllApplications(): Application[] {
    const db = getDatabase();
    const applications = db.prepare("SELECT * FROM applications").all() as Application[];

    for (const app of applications) {
        app.services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(app.id) as Service[];
    }

    return applications;
}

/**
 * Busca uma única aplicação por ID com seus serviços.
 */
export function getApplicationById(id: string): Application | undefined {
    const db = getDatabase();
    const application = db.prepare("SELECT * FROM applications WHERE id = ?").get(id) as Application | undefined;

    if (!application) {
        return undefined;
    }

    application.services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(id) as Service[];
    return application;
}

/**
 * Busca aplicações por ID da máquina.
 */
export function getApplicationsByMachineId(machineId: string): Application[] {
    const db = getDatabase();
    const applications = db.prepare("SELECT * FROM applications WHERE machine_id = ?").all(machineId) as Application[];

    for (const app of applications) {
        app.services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(app.id) as Service[];
    }

    return applications;
}

/**
 * Busca uma aplicação e as informações da máquina associada.
 */
export function getApplicationWithMachineInfo(applicationId: string): { application: Application, machine: Machines } | undefined {
    const db = getDatabase();
    const application = getApplicationById(applicationId);

    if (!application) {
        return undefined;
    }

    const machine = db.prepare("SELECT * FROM machines WHERE id = (SELECT machine_id FROM applications WHERE id = ?)").get(applicationId) as Machines | undefined;

    if (!machine) {
        return undefined;
    }

    return { application, machine };
}

// ========================
// OPERAÇÕES DE ESCRITA (CREATE, UPDATE, DELETE)
// ========================

/**
 * Função utilitária para atualizar a data de updatedAt da aplicação e da máquina.
 */
export function updateApplicationAndMachineDates(applicationId?: string) {
    if (!applicationId) return;
    const db = getDatabase();
    const application = getApplicationById(applicationId);

    if (application && application.machine_id) {
        const machine = getMachineById(application.machine_id);
        if (machine) {
            updateMachineInDb(machine);
        }
    }
}

/**
 * Cria uma nova aplicação no banco de dados.
 */
export function createApplicationInDb(application: Application): boolean {
    const db = getDatabase();
    
    try {
        db.transaction(() => {
            // CORRIGIDO: Ordem correta dos parâmetros na query INSERT
            const appStmt = db.prepare(`
                INSERT INTO applications (id, machine_id, name, status, tipo, updatedAt, applicationResponsible)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);
            appStmt.run(
                application.id,
                application.machine_id || null,
                application.name,
                application.status,
                application.tipo || null,
                new Date().toISOString(), // updatedAt
                application.applicationResponsible || null // applicationResponsible
            );

            // Insere serviços se fornecidos
            if (application.services && application.services.length > 0) {
                const serviceStmt = db.prepare(`
                    INSERT INTO services (id, application_id, name, status, itemObrigatorio, updatedAt, responsible, comments, typePendencia, responsibleHomologacao)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `);
                
                for (const service of application.services) {
                    serviceStmt.run(
                        service.id,
                        application.id,
                        service.name,
                        service.status,
                        service.itemObrigatorio,
                        service.updatedAt || null, // CORRIGIDO: não forçar data atual
                        service.responsible || null,
                        service.comments || null,
                        service.typePendencia || null,
                        service.responsibleHomologacao || null
                    );
                }
            }
        })();
        
        // Após a criação, propaga o status para garantir que a máquina seja atualizada
        if (application.machine_id) {
            propagateStatusAndDateUpdates(application.id, application.machine_id);
        }

        return true;
    } catch (error) {
        console.error('Erro ao criar aplicação:', error);
        return false;
    }
}

/**
 * Atualiza uma aplicação existente no banco de dados.
 */
export function updateApplicationInDb(application: Application): boolean {
    return updateApplicationInDbWithRules(application);
}

/**
 * Deleta uma aplicação e todos os seus serviços.
 */
export function deleteApplicationAndServices(applicationId: string): boolean {
    const db = getDatabase();
    try {
        // Busca o machine_id ANTES de deletar a aplicação
        const application = db.prepare("SELECT machine_id FROM applications WHERE id = ?").get(applicationId) as { machine_id: string | null } | undefined;
        const machineId = application?.machine_id;
        
        db.transaction(() => {
            // Deleta todos os serviços desta aplicação
            db.prepare("DELETE FROM services WHERE application_id = ?").run(applicationId);
            
            // Deleta a aplicação
            db.prepare("DELETE FROM applications WHERE id = ?").run(applicationId);
        })();
        
        // NOVA LÓGICA: Propaga as atualizações para a máquina após a exclusão
        if (machineId) {
            propagateStatusAndDateUpdates(undefined, machineId);
        }
        
        return true;
    } catch (error) {
        console.error('Erro ao deletar aplicação e serviços:', error);
        return false;
    }
}

/**
 * Sincroniza uma aplicação (cria ou atualiza) e seus serviços.
 */
export function syncApplicationInDb(application: Application): boolean {
    const db = getDatabase();
    try {
        db.transaction(() => {
            const existingApp = getApplicationById(application.id);

            if (existingApp) {
                updateApplicationInDb(application);
            } else {
                createApplicationInDb(application);
            }

            // Sincroniza os serviços
            if (application.services) {
                // Deleta serviços que não estão mais na lista
                const existingServiceIds = (db.prepare("SELECT id FROM services WHERE application_id = ?").all(application.id) as { id: string }[]).map(s => s.id);
                const incomingServiceIds = new Set(application.services.map(s => s.id));
                
                for (const serviceId of existingServiceIds) {
                    if (!incomingServiceIds.has(serviceId)) {
                        deleteServiceInDb(serviceId);
                    }
                }
                
                // Sincroniza os serviços restantes
                syncServicesInDb(application.services);
            }
        })();
        return true;
    } catch (error) {
        console.error('Erro ao sincronizar aplicação:', error);
        return false;
    }
}