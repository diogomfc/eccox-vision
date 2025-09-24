// src/server/repositories/service-repository.ts
import { getDatabase } from "../db";
import { Service } from "../../types/machines";

// Importa a função do repositório de aplicações
import { getApplicationById } from "./application-repository";

// Importa a função do repositório de máquinas
import { updateMachineInDb } from "./machine-repository";

// Importa as regras de negócio
import { 
    createServiceInDbWithRules,
    updateServiceInDbWithRules,
    updateServiceStatusWithRules,
    deleteServiceInDbWithRules,
    propagateStatusAndDateUpdates
} from './business-rules';

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
    return createServiceInDbWithRules(service, applicationId);
}

/**
 * Atualiza um serviço existente no banco de dados.
 * @param {Service} service O objeto Service com os dados atualizados.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function updateServiceInDb(service: Service): boolean {
    return updateServiceInDbWithRules(service);
}

/**
 * Atualiza apenas o status de um serviço.
 * @param {string} serviceId O ID do serviço.
 * @param {'Concluida' | 'Pendente' | 'Em andamento'} newStatus O novo status.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function updateServiceStatus(serviceId: string, newStatus: 'Concluída' | 'Pendente' | 'Em andamento'): boolean {
    return updateServiceStatusWithRules(serviceId, newStatus);
}

/**
 * Deleta um serviço.
 * @param {string} serviceId O ID do serviço a ser deletado.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function deleteServiceInDb(serviceId: string): boolean {
    return deleteServiceInDbWithRules(serviceId);
}

/**
 * Sincroniza uma lista de serviços (cria ou atualiza).
 * @param {Service[]} services A lista de serviços a ser sincronizada.
 * @returns {boolean} True se a operação for bem-sucedida, false caso contrário.
 */
export function syncServicesInDb(services: Service[]): boolean {
    const db = getDatabase();
    const affectedApplicationIds = new Set<string>();
    
    try {
        db.transaction(() => {
            for (const service of services) {
                if (!service.application_id) {
                    console.error('Erro: Serviço sem ID da aplicação. Ignorando sincronização.');
                    continue; 
                }
                affectedApplicationIds.add(service.application_id);

                const existingService = getServiceById(service.id);
                if (existingService) {
                    const stmt = db.prepare(`
                        UPDATE services
                        SET name = ?, status = ?, updatedAt = ?, responsible = ?, comments = ?, typePendencia = ?, responsibleHomologacao = ?
                        WHERE id = ?
                    `);
                    stmt.run(
                        service.name,
                        service.status,
                        service.updatedAt || new Date().toISOString(),
                        service.responsible || null,
                        service.comments || null,
                        service.typePendencia || null,
                        service.responsibleHomologacao || null,
                        service.id
                    );
                } else {
                    const stmt = db.prepare(`
                        INSERT INTO services (id, application_id, name, status, itemObrigatorio, updatedAt, responsible, comments, typePendencia, responsibleHomologacao)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `);
                    stmt.run(
                        service.id,
                        service.application_id,
                        service.name || 'Nome não definido',
                        service.status || 'Pendente',
                        service.itemObrigatorio || null,
                        service.updatedAt || new Date().toISOString(), // Usar a data do serviço!
                        service.responsible || null,
                        service.comments || null,
                        service.typePendencia || null,
                        service.responsibleHomologacao || null
                    );
                }
            }
        })();
        
        for (const appId of affectedApplicationIds) {
            propagateStatusAndDateUpdates(appId);
        }
        
        return true;
    } catch (error) {
        console.error('Erro ao sincronizar serviços:', error);
        return false;
    }
}