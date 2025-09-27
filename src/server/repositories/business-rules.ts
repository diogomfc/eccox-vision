// src/server/repositories/business-rules.ts
import { getDatabase } from "../db";
import { Service, Application, Machines } from "../../types/machines";

// ========================
// UTILITÁRIAS PARA REGRAS DE NEGÓCIO
// ========================

/**
 * Calcula o status de uma aplicação baseado nos status dos seus serviços.
 */
export function calculateApplicationStatus(applicationId: string): 'Concluída' | 'Pendente' {
    const db = getDatabase();
    const services = db.prepare("SELECT status FROM services WHERE application_id = ?").all(applicationId) as { status: string }[];
    
    if (services.length === 0) {
        return 'Pendente';
    }
    
    const allCompleted = services.every(service => service.status === 'Concluída');
    return allCompleted ? 'Concluída' : 'Pendente';
}

/**
 * Calcula o status de uma máquina baseado nos status das suas aplicações.
 */
export function calculateMachineStatus(machineId: string): 'Concluída' | 'Pendente' {
    const db = getDatabase();
    const applications = db.prepare("SELECT status FROM applications WHERE machine_id = ?").all(machineId) as { status: string }[];
    
    if (applications.length === 0) {
        return 'Pendente';
    }
    
    const allCompleted = applications.every(app => app.status === 'Concluída');
    return allCompleted ? 'Concluída' : 'Pendente';
}

/**
 * Calcula a data de "Entrega Prevista" para a máquina.
 * NOVA REGRA: Retorna a data MÁXIMA entre os serviços Pendentes ou Em andamento.
 * Se não houver pendentes, retorna a data MÁXIMA de todos os serviços.
 */
export function calculateMachineUpdateDate(machineId: string): string {
    const db = getDatabase();

    // 1. Tenta encontrar a data mais distante (MAX) dos serviços NÃO CONCLUÍDOS.
    const nextPendingDate = db.prepare(`
        SELECT MAX(s.updatedAt) as nextUpdate -- <-- ALTERAÇÃO DE MIN PARA MAX
        FROM services s
        INNER JOIN applications a ON s.application_id = a.id
        WHERE a.machine_id = ? AND s.status != 'Concluída'
    `).get(machineId) as { nextUpdate: string | null };

    // Se uma data de entrega final foi encontrada entre os itens pendentes, retorna ela.
    if (nextPendingDate && nextPendingDate.nextUpdate) {
        return nextPendingDate.nextUpdate;
    }

    // 2. Se NÃO houver serviços pendentes (todos concluídos), encontra a data mais recente (MAX) de TODOS os serviços.
    // Isso representa a data da última tarefa concluída.
    const lastCompletedDate = db.prepare(`
        SELECT MAX(s.updatedAt) as lastUpdate
        FROM services s
        INNER JOIN applications a ON s.application_id = a.id
        WHERE a.machine_id = ?
    `).get(machineId) as { lastUpdate: string | null };

    // Retorna a data da última conclusão ou a data atual como fallback final.
    return lastCompletedDate.lastUpdate || new Date().toISOString();
}


/**
 * Atualiza o status e updatedAt de uma aplicação baseado nos seus serviços.
 */
export function updateApplicationStatusAndDate(applicationId: string): boolean {
    const db = getDatabase();
    try {
        const newStatus = calculateApplicationStatus(applicationId);
        
        const latestServiceUpdate = db.prepare(`
            SELECT MAX(updatedAt) as latestUpdate
            FROM services
            WHERE application_id = ?
        `).get(applicationId) as { latestUpdate: string | null };
        
        const newUpdatedAt = latestServiceUpdate.latestUpdate || new Date().toISOString();
        
        const result = db.prepare(`
            UPDATE applications
            SET status = ?, updatedAt = ?
            WHERE id = ?
        `).run(newStatus, newUpdatedAt, applicationId);
        
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao atualizar status e data da aplicação:', error);
        return false;
    }
}

/**
 * Atualiza o status e updatedAt de uma máquina baseado nas suas aplicações.
 */
export function updateMachineStatusAndDate(machineId: string): boolean {
    const db = getDatabase();
    try {
        const newStatus = calculateMachineStatus(machineId);
        const newUpdatedAt = calculateMachineUpdateDate(machineId); // Já usa a nova lógica
        
        const result = db.prepare(`
            UPDATE machines
            SET status = ?, updatedAt = ?
            WHERE id = ?
        `).run(newStatus, newUpdatedAt, machineId);
        
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao atualizar status e data da máquina:', error);
        return false;
    }
}

/**
 * Propaga as atualizações de status e data na hierarquia completa.
 */
export function propagateStatusAndDateUpdates(applicationId?: string, machineId?: string): void {
    const db = getDatabase();
    
    try {
        if (applicationId) {
            updateApplicationStatusAndDate(applicationId);
            
            if (!machineId) {
                const app = db.prepare("SELECT machine_id FROM applications WHERE id = ?").get(applicationId) as { machine_id: string } | undefined;
                machineId = app?.machine_id;
            }
        }
        
        if (machineId) {
            const applications = db.prepare("SELECT id FROM applications WHERE machine_id = ?").all(machineId) as { id: string }[];
            for (const app of applications) {
                updateApplicationStatusAndDate(app.id);
            }
            updateMachineStatusAndDate(machineId);
        }
    } catch (error) {
        console.error('Erro na propagação de updates:', error);
    }
}

// ========================
// REPOSITÓRIOS COM REGRAS DE NEGÓCIO (sem alterações)
// ========================

// service-repository.ts 
export function createServiceInDbWithRules(service: Service, applicationId: string): boolean {
    const db = getDatabase();
    try {
        const result = db.prepare(`
            INSERT INTO services (id, application_id, name, status, itemObrigatorio, updatedAt, responsible, comments, typePendencia, responsibleHomologacao)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            service.id, 
            applicationId, 
            service.name || 'Nome não definido', 
            service.status || 'Pendente', 
            service.itemObrigatorio || null, 
            service.updatedAt || new Date().toISOString(), 
            service.responsible || null, 
            service.comments || null, 
            service.typePendencia || null, 
            service.responsibleHomologacao || null
        );
        
        if (result.changes > 0) {
            propagateStatusAndDateUpdates(applicationId);
        }
        
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao criar serviço:', error);
        return false;
    }
}

export function updateServiceInDbWithRules(service: Service): boolean {
    const db = getDatabase();
    try {
        const result = db.prepare(`
            UPDATE services
            SET name = ?, status = ?, updatedAt = ?, responsible = ?, comments = ?, typePendencia = ?, responsibleHomologacao = ?
            WHERE id = ?
        `).run(
            service.name, service.status, service.updatedAt || new Date().toISOString(), service.responsible || null, service.comments || null, service.typePendencia || null, service.responsibleHomologacao || null, service.id
        );
        
        if (result.changes > 0) {
            propagateStatusAndDateUpdates(service.application_id);
        }
        
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        return false;
    }
}

export function updateServiceStatusWithRules(serviceId: string, newStatus: 'Concluída' | 'Pendente' | 'Em andamento'): boolean {
    const db = getDatabase();
    try {
        const service = db.prepare("SELECT application_id FROM services WHERE id = ?").get(serviceId) as { application_id: string } | undefined;
        
        if (!service) return false;
        
        const result = db.prepare(`
            UPDATE services SET status = ?, updatedAt = ? WHERE id = ?
        `).run(newStatus, new Date().toISOString(), serviceId);

        if (result.changes > 0) {
            propagateStatusAndDateUpdates(service.application_id);
        }
        
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao atualizar status do serviço:', error);
        return false;
    }
}

export function deleteServiceInDbWithRules(serviceId: string): boolean {
    const db = getDatabase();
    try {
        const service = db.prepare("SELECT application_id FROM services WHERE id = ?").get(serviceId) as { application_id: string } | undefined;
        const result = db.prepare("DELETE FROM services WHERE id = ?").run(serviceId);
        
        if (result.changes > 0 && service?.application_id) {
            propagateStatusAndDateUpdates(service.application_id);
        }

        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao deletar serviço:', error);
        return false;
    }
}

// application-repository.ts 
export function updateApplicationInDbWithRules(application: Application): boolean {
    const db = getDatabase();
    try {
        return db.transaction(() => {
            db.prepare(`
                UPDATE applications SET machine_id = ?, name = ?, tipo = ?, applicationResponsible = ? WHERE id = ?
            `).run(
                application.machine_id || null, 
                application.name, 
                application.tipo || null, 
                application.applicationResponsible || null, 
                application.id
            );

            const existingServicesInDb = db.prepare("SELECT id FROM services WHERE application_id = ?").all(application.id) as { id: string }[];
            const serviceIdsToKeep = new Set(application.services.map(s => s.id));

            for (const existingDbService of existingServicesInDb) {
                if (!serviceIdsToKeep.has(existingDbService.id)) {
                    deleteServiceInDbWithRules(existingDbService.id);
                }
            }
            
            for (const service of application.services) {
                const serviceExists = db.prepare("SELECT id FROM services WHERE id = ?").get(service.id);
                if (serviceExists) {
                    updateServiceInDbWithRules(service);
                } else {
                    createServiceInDbWithRules(service, application.id);
                }
            }

            updateApplicationStatusAndDate(application.id);
            
            if (application.machine_id) {
                updateMachineStatusAndDate(application.machine_id);
            }
            
            return true;
        })();
    } catch (error) {
        console.error('Erro ao atualizar aplicação:', error);
        return false;
    }
}

// machine-repository.ts
export function updateMachineInDbWithRules(machine: Machines): boolean {
    const db = getDatabase();
    try {
        const result = db.prepare(`
            UPDATE machines 
            SET name = ?, description = ?, version = ?, machineResponsible = ?
            WHERE id = ?
        `).run(
            machine.name, 
            machine.description, 
            machine.version, 
            machine.machineResponsible || null,
            machine.id 
        );
        
        if (result.changes > 0) {
            updateMachineStatusAndDate(machine.id);
        }
        
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao atualizar máquina:', error);
        return false;
    }
}