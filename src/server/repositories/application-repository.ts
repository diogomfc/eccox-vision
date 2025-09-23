// src/server/repositories/application-repository.ts
import { getDatabase } from "../db";
import { Service } from "../../types/machines";
import { Application, Machines } from "../../types/machines";
import { deleteServiceFromDb, syncServicesBatch } from "./service-repository";

// ========================
// OPERAÇÕES DE CONSULTA
// ========================

/**
 * Busca todas as aplicações com seus serviços aninhados.
 * @returns {Application[]} Uma lista de objetos Application.
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
 * @param {string} id O ID da aplicação.
 * @returns {Application | undefined} O objeto Application ou undefined.
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
 * @param {string} machineId O ID da máquina.
 * @returns {Application[]} Uma lista de objetos Application.
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
 * @param {string} applicationId O ID da aplicação.
 * @returns {{application: Application, machine: Machines} | undefined} Objeto com aplicação e máquina.
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
 * Cria uma nova aplicação no banco de dados.
 * @param {Application} application O objeto Application a ser criado.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function createApplicationInDb(application: Application): boolean {
    const db = getDatabase();
    try {
        const stmt = db.prepare(`
            INSERT INTO applications (id, machine_id, name, status, tipo)
            VALUES (?, ?, ?, ?, ?)
        `);
        const result = stmt.run(application.id, application.machine_id, application.name, application.status, application.tipo || null);
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao criar aplicação:', error);
        return false;
    }
}

/**
 * Atualiza uma aplicação existente no banco de dados.
 * @param {Application} application O objeto Application com os dados atualizados.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function updateApplicationInDb(application: Application): boolean {
    const db = getDatabase();
    try {
        const stmt = db.prepare(`
            UPDATE applications
            SET machine_id = ?, name = ?, status = ?, tipo = ?
            WHERE id = ?
        `);
        const result = stmt.run(application.machine_id, application.name, application.status, application.tipo || null, application.id);
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao atualizar aplicação:', error);
        return false;
    }
}

/**
 * Deleta uma aplicação e todos os seus serviços.
 * @param {string} applicationId O ID da aplicação a ser deletada.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function deleteApplicationAndServices(applicationId: string): boolean {
    const db = getDatabase();
    try {
        db.transaction(() => {
            // Deleta todos os serviços desta aplicação
            db.prepare("DELETE FROM services WHERE application_id = ?").run(applicationId);
            
            // Deleta a aplicação
            db.prepare("DELETE FROM applications WHERE id = ?").run(applicationId);
        })();
        return true;
    } catch (error) {
        console.error('Erro ao deletar aplicação e serviços:', error);
        return false;
    }
}

/**
 * Sincroniza uma aplicação (cria ou atualiza) e seus serviços.
 * @param {Application} application O objeto Application a ser sincronizado.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
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
                        deleteServiceFromDb(serviceId);
                    }
                }
                
                // Sincroniza os serviços restantes
                syncServicesBatch(application.services);
            }
        })();
        return true;
    } catch (error) {
        console.error('Erro ao sincronizar aplicação:', error);
        return false;
    }
}