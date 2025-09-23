// src/server/repositories/machine-repository.ts
import { getDatabase } from "../db";
import { Machines, Application, Service } from "../../types/machines";
import { deleteApplicationAndServices, syncApplicationInDb } from "./application-repository";

// ========================
// OPERAÇÕES DE CONSULTA
// ========================

/**
 * Busca todas as máquinas com suas aplicações e serviços aninhados.
 * @returns {Machines[]} Uma lista de objetos Machines.
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
 * @param {string} id O ID da máquina.
 * @returns {Machines | undefined} O objeto Machine ou undefined se não for encontrado.
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
 * @param {Machines} machine O objeto Machine a ser criado.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function createMachineInDb(machine: Machines): boolean {
    const db = getDatabase();
    try {
        const stmt = db.prepare(`
            INSERT INTO machines (id, name, description, version, status, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(machine.id, machine.name, machine.description, machine.version, machine.status, machine.updatedAt);
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao criar máquina:', error);
        return false;
    }
}

/**
 * Atualiza uma máquina existente no banco de dados.
 * @param {Machines} machine O objeto Machine com os dados atualizados.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function updateMachineInDb(machine: Machines): boolean {
    const db = getDatabase();
    try {
        const stmt = db.prepare(`
            UPDATE machines
            SET name = ?, description = ?, version = ?, status = ?, updatedAt = ?
            WHERE id = ?
        `);
        const result = stmt.run(machine.name, machine.description, machine.version, machine.status, machine.updatedAt, machine.id);
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao atualizar máquina:', error);
        return false;
    }
}

/**
 * Deleta uma máquina e todas as suas aplicações e serviços.
 * @param {string} machineId O ID da máquina a ser deletada.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
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
 * @param {Machines} machine O objeto Machine a ser sincronizado.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function syncMachineCompleteInDb(machine: Machines): boolean {
    const db = getDatabase();
    try {
        db.transaction(() => {
            // Atualiza a máquina principal
            updateMachineInDb(machine);

            // Deleta aplicações que não estão mais na lista de sincronização
            const existingAppsInDb = db.prepare("SELECT id FROM applications WHERE machine_id = ?").all(machine.id) as { id: string }[];
            const appIdsFromUi = new Set(machine.applications.map(app => app.id));

            for (const existingApp of existingAppsInDb) {
                if (!appIdsFromUi.has(existingApp.id)) {
                    deleteApplicationAndServices(existingApp.id);
                }
            }

            // Sincroniza as aplicações restantes
            for (const app of machine.applications) {
                const appToSync = { ...app, machine_id: machine.id }; // <--- Linha corrigida
                syncApplicationInDb(appToSync);
            }
        })();
        return true;
    } catch (error) {
        console.error('Erro ao sincronizar máquina completa:', error);
        return false;
    }
}