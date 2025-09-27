// src/server/repositories/machine-repository.ts
import { getDatabase } from "../db";
import { Machines, Application, Service } from "../../types/machines";
import { deleteApplicationAndServices, syncApplicationInDb } from "./application-repository";

// Importa a função de regra de negócio para atualização de máquinas
import { 
    updateMachineInDbWithRules,
    propagateStatusAndDateUpdates,
} from './business-rules';

// ========================
// OPERAÇÕES DE CONSULTA
// ========================

/**
 * Busca todas as máquinas com suas aplicações e serviços aninhados.
 */
export function getAllMachines(): Machines[] {
    const db = getDatabase();
    const machines = db.prepare("SELECT * FROM machines").all() as Machines[];

    for (const machine of machines) {
        // Busca aplicações para a máquina
        const applications = db.prepare("SELECT * FROM applications WHERE machine_id = ?").all(machine.id) as Application[];
        
        // Busca serviços para cada aplicação
        for (const app of applications) {
            app.services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(app.id) as Service[];
        }
        
        machine.applications = applications;
    }

    return machines;
}

/**
 * Busca uma única máquina por ID com suas aplicações e serviços aninhados.
 */
export function getMachineById(id: string): Machines | undefined {
    const db = getDatabase();
    const machine = db.prepare("SELECT * FROM machines WHERE id = ?").get(id) as Machines | undefined;

    if (!machine) {
        return undefined;
    }

    // Busca aplicações para a máquina
    const applications = db.prepare("SELECT * FROM applications WHERE machine_id = ?").all(id) as Application[];

    // Busca serviços para cada aplicação
    for (const app of applications) {
        app.services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(app.id) as Service[];
    }

    machine.applications = applications;
    return machine;
}

// ========================
// OPERAÇÕES DE ESCRITA (CREATE, UPDATE, DELETE)
// ========================

/**
 * Cria uma nova máquina no banco de dados.
 */
export function createMachineInDb(machine: Machines): boolean {
    const db = getDatabase();
    
    try {
        return db.transaction(() => {
            // 1. Cria a máquina principal (status e updatedAt serão calculados depois)
            const machineStmt = db.prepare(`
                INSERT INTO machines (id, name, description, version, status, updatedAt, machineResponsible)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);
            machineStmt.run(
                machine.id,
                machine.name,
                machine.description,
                machine.version,
                'Pendente', // Status inicial
                new Date().toISOString(), // Data inicial
                machine.machineResponsible || null
            );
            
            // 2. Cria as aplicações e seus serviços
            if (machine.applications && machine.applications.length > 0) {
                const appStmt = db.prepare(`
                    INSERT INTO applications (id, machine_id, name, status, tipo, updatedAt, applicationResponsible)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `);
                
                const serviceStmt = db.prepare(`
                    INSERT INTO services (id, application_id, name, status, itemObrigatorio, updatedAt, responsible, comments, typePendencia, responsibleHomologacao)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `);
                
                for (const app of machine.applications) {
                    const appId = app.id || `app-${Date.now()}`;
                    
                    // CORRIGIDO: Ordem correta dos parâmetros para aplicação
                    appStmt.run(
                        appId,
                        machine.id,
                        app.name,
                        'Pendente', // Status inicial
                        app.tipo || null,
                        new Date().toISOString(),
                        app.applicationResponsible || null // CORRIGIDO: parâmetro na ordem certa
                    );
                    
                    // Cria os serviços para a aplicação
                    if (app.services && app.services.length > 0) {
                        for (const service of app.services) {
                            const serviceId = service.id || `service-${Date.now()}`;
                            
                            serviceStmt.run(
                                serviceId,
                                appId,
                                service.name || 'Nome não definido',
                                service.status || 'Pendente',
                                service.itemObrigatorio || null,
                                service.updatedAt || null, // CORRIGIDO: não forçar data atual
                                service.responsible || null,
                                service.comments || null,
                                service.typePendencia || null,
                                service.responsibleHomologacao || null
                            );
                        }
                    }
                }
            }
            
            // 3. Recalcula status e datas após criar toda a estrutura
            propagateStatusAndDateUpdates(undefined, machine.id);
            
            return true;
        })();
    } catch (error) {
        console.error('Erro ao criar máquina completa:', error);
        return false;
    }
}

/**
 * Atualiza uma máquina existente no banco de dados.
 * Esta função agora lida com a lógica de data, evitando duplicação.
 */
export function updateMachineInDb(machine: Machines): boolean {
    return updateMachineInDbWithRules(machine);
}

/**
 * Deleta uma máquina e todas as suas aplicações e serviços.
 */
export function deleteMachineComplete(machineId: string): boolean {
    const db = getDatabase();
    try {
        db.transaction(() => {
            // Deleta serviços relacionados às aplicações da máquina
            db.prepare(`
                DELETE FROM services 
                WHERE application_id IN (SELECT id FROM applications WHERE machine_id = ?)
            `).run(machineId);

            // Deleta as aplicações da máquina
            db.prepare("DELETE FROM applications WHERE machine_id = ?").run(machineId);
            
            // Deleta a máquina
            db.prepare("DELETE FROM machines WHERE id = ?").run(machineId);
        })();
        return true;
    } catch (error) {
        console.error('Erro ao deletar máquina completa:', error);
        return false;
    }
}

/**
 * Sincroniza uma máquina completa (máquina, aplicações e serviços).
 * Esta é uma operação complexa que coordena a atualização, criação e exclusão.
 */
export function syncMachineCompleteInDb(machine: Machines): boolean {
    const db = getDatabase();
    try {
        db.transaction(() => {
            // 1. Atualiza a máquina principal
            updateMachineInDb(machine);

            // 2. Deleta aplicações que não estão mais na lista de sincronização
            const existingAppsInDb = db.prepare("SELECT id FROM applications WHERE machine_id = ?").all(machine.id) as { id: string }[];
            const appIdsFromUi = new Set(machine.applications.map(app => app.id));

            for (const existingApp of existingAppsInDb) {
                if (!appIdsFromUi.has(existingApp.id)) {
                    deleteApplicationAndServices(existingApp.id);
                }
            }

            // 3. Sincroniza as aplicações restantes (criação e atualização)
            for (const app of machine.applications) {
                const appToSync = { ...app, machine_id: machine.id };
                syncApplicationInDb(appToSync);
            }
        })();
        return true;
    } catch (error) {
        console.error('Erro ao sincronizar máquina completa:', error);
        return false;
    }
}