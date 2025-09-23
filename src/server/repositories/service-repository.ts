// src/server/repositories/service-repository.ts
import { getDatabase } from "../db";
import { Service } from "../../types/machines";

// ========================
// OPERAÇÕES DE CONSULTA
// ========================

/**
 * Busca todos os serviços de uma aplicação por ID.
 * @param {string} applicationId O ID da aplicação.
 * @returns {Service[]} Uma lista de objetos Service.
 */
export function getServicesByApplicationId(applicationId: string): Service[] {
    const db = getDatabase();
    return db.prepare("SELECT * FROM services WHERE application_id = ?").all(applicationId) as Service[];
}

/**
 * Busca um único serviço por ID.
 * @param {string} id O ID do serviço.
 * @returns {Service | undefined} O objeto Service ou undefined.
 */
export function getServiceById(id: string): Service | undefined {
    const db = getDatabase();
    return db.prepare("SELECT * FROM services WHERE id = ?").get(id) as Service | undefined;
}

// ========================
// OPERAÇÕES DE ESCRITA (CREATE, UPDATE, DELETE)
// ========================

/**
 * Cria um novo serviço no banco de dados.
 * @param {Service} service O objeto Service a ser criado.
 * @param {string} applicationId O ID da aplicação à qual o serviço pertence.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function createServiceInDb(service: Service, applicationId: string): boolean {
    const db = getDatabase();
    try {
        const stmt = db.prepare(`
            INSERT INTO services (id, application_id, name, status, itemObrigatorio, updatedAt, responsible, comments, typePendencia, responsibleHomologacao)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(
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
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao criar serviço:', error);
        return false;
    }
}

/**
 * Atualiza um serviço existente no banco de dados.
 * @param {Service} service O objeto Service com os dados atualizados.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function updateServiceInDb(service: Service): boolean {
    const db = getDatabase();
    try {
        const stmt = db.prepare(`
            UPDATE services
            SET name = ?, status = ?, updatedAt = ?, responsible = ?, comments = ?, typePendencia = ?, responsibleHomologacao = ?
            WHERE id = ?
        `);
        const result = stmt.run(
            service.name,
            service.status,
            service.updatedAt,
            service.responsible || null,
            service.comments || null,
            service.typePendencia || null,
            service.responsibleHomologacao || null,
            service.id
        );
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        return false;
    }
}

/**
 * Atualiza apenas o status de um serviço.
 * @param {string} serviceId O ID do serviço.
 * @param {'Concluida' | 'Pendente' | 'Em andamento'} newStatus O novo status.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function updateServiceStatus(serviceId: string, newStatus: 'Concluida' | 'Pendente' | 'Em andamento'): boolean {
    const db = getDatabase();
    try {
        const stmt = db.prepare(`
            UPDATE services
            SET status = ?, updatedAt = ?
            WHERE id = ?
        `);
        const result = stmt.run(newStatus, new Date().toISOString(), serviceId);
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao atualizar status do serviço:', error);
        return false;
    }
}

/**
 * Deleta um serviço.
 * @param {string} serviceId O ID do serviço a ser deletado.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function deleteServiceFromDb(serviceId: string): boolean {
    const db = getDatabase();
    try {
        const stmt = db.prepare("DELETE FROM services WHERE id = ?");
        const result = stmt.run(serviceId);
        return result.changes > 0;
    } catch (error) {
        console.error('Erro ao deletar serviço:', error);
        return false;
    }
}

/**
 * Sincroniza uma lista de serviços (cria ou atualiza).
 * @param {Service[]} services A lista de serviços a ser sincronizada.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function syncServicesBatch(services: Service[]): boolean {
    const db = getDatabase();
    try {
        db.transaction(() => {
            for (const service of services) {
                const existingService = getServiceById(service.id);
                if (existingService) {
                    updateServiceInDb(service);
                } else {
                    if (service.application_id) {
                        createServiceInDb(service, service.application_id);
                    }
                }
            }
        })();
        return true;
    } catch (error) {
        console.error('Erro ao sincronizar serviços:', error);
        return false;
    }
}