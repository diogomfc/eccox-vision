// src/server/machine-repository.ts

import { Application, Machines, Service } from "./machines-types";
import { getDatabase } from "./db";

// ========================
// MACHINES CRUD
// ========================

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

// Função para atualizar uma máquina no banco de dados
export function updateMachineInDb(machine: Machines): boolean {
    const db = getDatabase();
    
    try {
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
    } catch (error) {
        console.error('Erro ao atualizar máquina:', error);
        return false;
    }
}

// Função para atualizar uma máquina completa com aplicações e serviços
export function updateMachineCompleteInDb(machine: Machines): boolean {
    const db = getDatabase();
    
    try {
        db.transaction(() => {
            // Atualiza a máquina
            const machineStmt = db.prepare(`
                UPDATE machines
                SET name = ?, description = ?, version = ?, status = ?, updatedAt = ?
                WHERE id = ?
            `);
            machineStmt.run(
                machine.name,
                machine.description,
                machine.version,
                machine.status,
                machine.updatedAt,
                machine.id
            );

            // Atualiza aplicações se fornecidas
            if (machine.applications && machine.applications.length > 0) {
                for (const app of machine.applications) {
                    updateApplicationInDb(app);
                }
            }
        })();
        
        return true;
    } catch (error) {
        console.error('Erro ao atualizar máquina completa:', error);
        return false;
    }
}

// Função para criar uma nova máquina completa
export function createMachineInDb(machine: Machines): boolean {
    const db = getDatabase();
    
    try {
        console.log('=== TESTE: Tentando criar apenas a máquina ===');
        const machineStmt = db.prepare(`
            INSERT OR REPLACE INTO machines (id, name, description, version, status, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        console.log('Executando query da máquina...');
        const machineResult = machineStmt.run(
            machine.id, // Usa o ID de TEXT do objeto machine
            machine.name,
            machine.description,
            machine.version,
            machine.status,
            machine.updatedAt
        );

        console.log('Máquina criada com sucesso! ID:', machineResult.lastInsertRowid);
        
        // Usa o ID de texto que já existe no mock
        const machineId = machine.id;
        
        if (machine.applications && machine.applications.length > 0) {
            console.log('=== TESTE: Tentando criar aplicações ===');
            
            for (let i = 0; i < machine.applications.length; i++) {
                const app = machine.applications[i];
                console.log(`Processando aplicação ${i + 1}/${machine.applications.length}:`, app.name);
                
                try {
                    const appStmt = db.prepare(`
                        INSERT OR REPLACE INTO applications (id, machine_id, name, status, tipo)
                        VALUES (?, ?, ?, ?, ?)
                    `);
                    
                    const appResult = appStmt.run(
                        app.id, // Usa o ID de TEXT do objeto application
                        machineId,
                        app.name,
                        app.status,
                        app.tipo || null
                    );
                    
                    console.log('Aplicação criada com ID:', appResult.lastInsertRowid);
                    
                    const applicationId = app.id; // Usa o ID de TEXT do objeto application
                    
                    if (app.services && app.services.length > 0) {
                        console.log(`=== TESTE: Tentando criar ${app.services.length} serviços ===`);
                        
                        for (let j = 0; j < app.services.length; j++) {
                            const service = app.services[j];
                            
                            try {
                                const serviceStmt = db.prepare(`
                                    INSERT OR REPLACE INTO services (id, application_id, name, status, itemObrigatorio, updatedAt, responsible, comments, typePendencia, responsibleHomologacao)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                                `);
                                
                                serviceStmt.run(
                                    service.id, // Usa o ID de TEXT do objeto service
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
                                
                                console.log(`Serviço ${j + 1} criado com sucesso`);
                                
                            } catch (serviceError) {
                                console.error(`Erro ao criar serviço ${j + 1}:`, serviceError);
                                throw serviceError;
                            }
                        }
                    }
                } catch (appError) {
                    console.error(`Erro ao criar aplicação ${i + 1}:`, appError);
                    console.error('Dados da aplicação que causou erro:', app);
                    throw appError;
                }
            }
        }
        
        console.log('=== SUCESSO: Máquina completa criada ===');
        return true;
        
    } catch (error) {
        console.error('=== ERRO DETALHADO ===');
        console.error('Erro:', error);
        if (error instanceof Error) {
            console.error('Tipo do erro:', error.constructor.name);
            console.error('Mensagem:', error.message);
        } else {
            const e: any = error;
            console.error('Código do erro:', e?.code);
            console.error('Dados do erro:', e);
        }
        return false;
    }
}
// Função para deletar uma máquina completa com todas as dependências
export function deleteMachineFromDb(machineId: string): boolean {
    const db = getDatabase();
    
    try {
        db.transaction(() => {
            // 1. Primeiro, deleta todos os serviços das aplicações desta máquina
            const deleteServicesStmt = db.prepare(`
                DELETE FROM services 
                WHERE application_id IN (
                    SELECT id FROM applications WHERE machine_id = ?
                )
            `);
            deleteServicesStmt.run(machineId);

            // 2. Depois, deleta todas as aplicações desta máquina
            const deleteApplicationsStmt = db.prepare("DELETE FROM applications WHERE machine_id = ?");
            deleteApplicationsStmt.run(machineId);

            // 3. Por último, deleta a máquina
            const deleteMachineStmt = db.prepare("DELETE FROM machines WHERE id = ?");
            const result = deleteMachineStmt.run(machineId);
            
            // Verifica se a máquina foi realmente deletada
            if (result.changes === 0) {
                throw new Error('Máquina não encontrada');
            }
        })();
        
        return true;
    } catch (error) {
        console.error('Erro ao deletar máquina:', error);
        return false;
    }
}


// ========================
// APPLICATIONS CRUD
// ========================

// Função para buscar todas as aplicações
export function getAllApplications(): Application[] {
    const db = getDatabase();

    const applications = db.prepare("SELECT * FROM applications").all() as Application[];

    for (const app of applications) {
        const services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(app.id) as Service[];
        app.services = services;
    }

    return applications;
}

// Função para buscar uma aplicação por ID
export function getApplicationById(id: string): Application | undefined {
    const db = getDatabase();

    // Busca a aplicação específica
    const application = db.prepare("SELECT * FROM applications WHERE id = ?").get(id) as Application | undefined;

    if (!application) {
        return undefined;
    }

    // Busca os serviços para a aplicação
    const services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(id) as Service[];
    application.services = services;

    return application;
}

// Função para buscar aplicações por ID da máquina
export function getApplicationsByMachineId(machineId: string): Application[] {
    const db = getDatabase();

    const applications = db.prepare("SELECT * FROM applications WHERE machine_id = ?").all(machineId) as Application[];

    for (const app of applications) {
        const services = db.prepare("SELECT * FROM services WHERE application_id = ?").all(app.id) as Service[];
        app.services = services;
    }

    return applications;
}

// Função para buscar aplicação com informações da máquina
export function getApplicationWithMachineInfo(applicationId: string): {application: Application, machine: Machines} | undefined {
    const db = getDatabase();

    // Busca a aplicação
    const application = getApplicationById(applicationId);
    
    if (!application) {
        return undefined;
    }

    // Busca a máquina da aplicação
    const machine = db.prepare("SELECT * FROM machines WHERE id = (SELECT machine_id FROM applications WHERE id = ?)").get(applicationId) as Machines | undefined;

    if (!machine) {
        return undefined;
    }

    return { application, machine };
}

// Função para atualizar uma aplicação no banco de dados
export function updateApplicationInDb(application: Application): boolean {
    const db = getDatabase();
    
    try {
        db.transaction(() => {
            // Atualiza a aplicação - apenas campos que existem na tabela
            const appStmt = db.prepare(`
                UPDATE applications
                SET name = ?, status = ?, tipo = ?
                WHERE id = ?
            `);
            appStmt.run(
                application.name,
                application.status,
                application.tipo || null,
                application.id
            );

            // Atualiza serviços se fornecidos
            if (application.services && application.services.length > 0) {
                for (const service of application.services) {
                    // Verifica se o serviço já existe
                    const existingService = db.prepare("SELECT id FROM services WHERE id = ?").get(service.id);
                    
                    if (existingService) {
                        // Atualiza serviço existente - apenas campos que existem na tabela
                        const serviceStmt = db.prepare(`
                            UPDATE services
                            SET name = ?, status = ?, updatedAt = ?, responsible = ?, comments = ?, typePendencia = ?, responsibleHomologacao = ?
                            WHERE id = ?
                        `);
                        serviceStmt.run(
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
                        // Cria novo serviço - apenas campos que existem na tabela
                        const serviceStmt = db.prepare(`
                            INSERT INTO services (id, application_id, name, status, updatedAt, responsible, comments, typePendencia, responsibleHomologacao)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `);
                        serviceStmt.run(
                            service.id,
                            application.id,
                            service.name,
                            service.status,
                            service.updatedAt || new Date().toISOString(),
                            service.responsible || null,
                            service.comments || null,
                            service.typePendencia || null,
                            service.responsibleHomologacao || null
                        );
                    }
                }
            }
        })();
        
        return true;
    } catch (error) {
        console.error('Erro ao atualizar aplicação:', error);
        return false;
    }
}

// Função para criar uma nova aplicação
export function createApplicationInDb(application: Application): boolean {
    const db = getDatabase();
    
    try {
        db.transaction(() => {
            // Insere a aplicação - apenas campos que existem na tabela
            const appStmt = db.prepare(`
                INSERT INTO applications (id, machine_id, name, status, tipo)
                VALUES (?, ?, ?, ?, ?)
            `);
            appStmt.run(
                application.id,
                application.machine_id || null,
                application.name,
                application.status,
                application.tipo || null
            );

            // Insere serviços se fornecidos
            if (application.services && application.services.length > 0) {
                for (const service of application.services) {
                    createServiceInDb(service, application.id);
                }
            }
        })();
        
        return true;
    } catch (error) {
        console.error('Erro ao criar aplicação:', error);
        return false;
    }
}

// Função para deletar uma aplicação
export function deleteApplicationFromDb(applicationId: string): boolean {
    const db = getDatabase();
    
    try {
        db.transaction(() => {
            // Deleta serviços associados
            const deleteServicesStmt = db.prepare("DELETE FROM services WHERE application_id = ?");
            deleteServicesStmt.run(applicationId);

            // Deleta a aplicação
            const deleteAppStmt = db.prepare("DELETE FROM applications WHERE id = ?");
            deleteAppStmt.run(applicationId);
        })();
        
        return true;
    } catch (error) {
        console.error('Erro ao deletar aplicação:', error);
        return false;
    }
}

// ========================
// SERVICES CRUD
// ========================

// Função para buscar todos os serviços de uma aplicação
export function getServicesByApplicationId(applicationId: string): Service[] {
    const db = getDatabase();
    return db.prepare("SELECT * FROM services WHERE application_id = ?").all(applicationId) as Service[];
}

// Função para buscar um serviço por ID
export function getServiceById(id: string): Service | undefined {
    const db = getDatabase();
    return db.prepare("SELECT * FROM services WHERE id = ?").get(id) as Service | undefined;
}

// Função para atualizar um serviço
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

// Função para atualizar apenas o status de um serviço
export function updateServiceStatus(serviceId: string, newStatus: 'Concluida' | 'Pendente' | 'Em andamento'): boolean {
    const db = getDatabase();
    try {
        const stmt = db.prepare(`
            UPDATE services
            SET status = ?, updatedAt = ?
            WHERE id = ?
        `);
        stmt.run(newStatus, new Date().toISOString(), serviceId);
        return true;
    } catch (error) {
        console.error('Erro ao atualizar status do serviço:', error);
        return false;
    }
}

// Função para criar um novo serviço
export function createServiceInDb(service: Service, applicationId: string): boolean {
    const db = getDatabase();
    
    try {
        const stmt = db.prepare(`
            INSERT INTO services (id, application_id, name, comments, status, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        stmt.run(
            service.id,
            applicationId,
            service.name,
            service.comments || null,
            service.status,
            service.updatedAt
        );
        
        return true;
    } catch (error) {
        console.error('Erro ao criar serviço:', error);
        return false;
    }
}

// Função para deletar um serviço
export function deleteServiceFromDb(serviceId: string): boolean {
    const db = getDatabase();

    try {
        const stmt = db.prepare(`
            DELETE FROM services WHERE id = ?
        `);
        stmt.run(serviceId);
        return true;
    } catch (error) {
        console.error('Erro ao deletar serviço:', error);
        return false;
    }
}