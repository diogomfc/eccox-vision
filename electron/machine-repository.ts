// src/server/machine-repository.ts

import { Application, Machines, Service } from "./machines-types";
import { getDatabase } from "./db";


// Função para buscar todas as máquinas (útil para a página principal)
export function getAllMachines(): Machines[] {
    const db = getDatabase();

    const machines = db.prepare("SELECT * FROM machines").all() as Machines[];

    for (const machine of machines) {
        const applications = db.prepare("SELECT * FROM applications WHERE machine_id = ?").all(machine.id) as Application[];

        for (const app of applications) {
            const services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(app.id) as Service[];
            app.services = services;
        }

        machine.applications = applications;
    }

    return machines;
}



// Função para buscar uma única máquina por ID (útil para a página de detalhes)
export function getMachineById(id: string): Machines | undefined {
    const db = getDatabase();

    // Busca a máquina específica
    const machine = db.prepare("SELECT * FROM machines WHERE id = ?").get(id) as Machines | undefined;

    if (!machine) {
        return undefined;
    }

    // Busca as aplicações para a máquina encontrada
    const applications = db.prepare("SELECT * FROM applications WHERE machine_id = ?").all(id) as Application[];

    for (const app of applications) {
        // Busca os serviços para cada aplicação
        const services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(app.id) as Service[];
        app.services = services;
    }

    // Atribui as aplicações à máquina
    machine.applications = applications;

    return machine;
}


export function updateMachineInDb(machine: Machines): boolean {
  const db = getDatabase();
  const stmt = db.prepare(`
    UPDATE machines
    SET name = ?, description = ?, version = ?, status = ?, updatedAt = ?
    WHERE id = ?
  `);
  const result = stmt.run(
    machine.name,
    machine.description,
    machine.version,
    machine.status,
    machine.updatedAt,
    machine.id
  );
  return result.changes > 0;
}