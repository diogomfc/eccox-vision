import { app, BrowserWindow, ipcMain, Menu, screen } from 'electron';
import path from 'path';
import {
    getAllMachines,
    getMachineById,
    updateMachineInDb,
    createMachineInDb,
    deleteMachineComplete,
    syncMachineCompleteInDb,
} from '../src/server/repositories/machine-repository';

import {
    getApplicationById,
    getAllApplications,
    getApplicationsByMachineId,
    getApplicationWithMachineInfo,
    updateApplicationInDb,
    createApplicationInDb,
    syncApplicationInDb,
    deleteApplicationAndServices,
} from '../src/server/repositories/application-repository';

import {
    getServicesByApplicationId,
    getServiceById,
    updateServiceInDb,
    createServiceInDb,
    deleteServiceFromDb,
    updateServiceStatus,
} from '../src/server/repositories/service-repository';

import type { Machines, Application, Service } from '../src/types/machines';

// ========================
// WINDOW MANAGEMENT
// ========================

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth } = primaryDisplay.workAreaSize;

    let winWidth = 1280;
    let winHeight = 832;

    if (screenWidth >= 1920) {
        winWidth = 1600;
        winHeight = 900;
    }

    if (screenWidth >= 3840) {
        winWidth = 1920;
        winHeight = 1080;
    }

    const win = new BrowserWindow({
        width: winWidth,
        height: winHeight,
        minWidth: 1280,
        minHeight: 832,
        resizable: true,
        roundedCorners: true,
        icon: path.join(__dirname, 'assets', 'logo.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.center();
    win.removeMenu();

    const startUrl = app.isPackaged
        ? path.join(__dirname, "out", "index.html")
        : "http://localhost:3000";

    if (app.isPackaged) {
        win.loadFile(startUrl);
    } else {
        win.loadURL(startUrl);
    }
    createDevMenu(win);
}

function createDevMenu(win: BrowserWindow) {
    if (!app.isPackaged) {
        const template = [
            {
                label: 'Recarregar',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    win.reload();
                },
            },
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    } else {
        Menu.setApplicationMenu(null);
    }
}

// ========================
// HELPER FUNCTIONS FOR CONSISTENT ERROR HANDLING
// ========================

const createSuccessResponse = (message: string, data?: any) => ({
    success: true,
    message,
    ...(data && { data })
});

const createErrorResponse = (message: string, error?: any) => {
    if (error) {
        console.error(message, error);
    }
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return {
        success: false,
        message: error ? `${message}: ${errorMessage}` : message
    };
};

// ========================
// IPC HANDLERS - MACHINES
// ========================

// Buscar todas as máquinas
ipcMain.handle('get-all-machines', async () => {
    try {
        return getAllMachines();
    } catch (error) {
        console.error("Erro ao buscar máquinas:", error);
        return [];
    }
});

// Buscar máquina por ID
ipcMain.handle('get-machine-by-id', async (event, id: string) => {
    try {
        return getMachineById(id);
    } catch (error) {
        console.error("Erro ao buscar máquina por ID:", error);
        return null;
    }
});

// Criar nova máquina
ipcMain.handle('create-machine', async (event, machine: Machines) => {
    try {
        const success = createMachineInDb(machine);
        return success 
            ? createSuccessResponse("Máquina criada com sucesso!")
            : createErrorResponse("Erro ao criar máquina.");
    } catch (error) {
        return createErrorResponse("Erro ao criar máquina", error);
    }
});

// Atualizar máquina
ipcMain.handle('update-machine', async (event, machine: Machines) => {
    try {
        const success = updateMachineInDb(machine);
        return success 
            ? createSuccessResponse("Máquina atualizada com sucesso!")
            : createErrorResponse("Nenhuma alteração foi feita.");
    } catch (error) {
        return createErrorResponse("Erro ao atualizar máquina", error);
    }
});

// Sincronizar máquina completa
ipcMain.handle('sync-machine-complete', async (event, machine: Machines) => {
    try {
        console.log('Sincronizando máquina completa:', machine.id);
        const success = syncMachineCompleteInDb(machine);
        return success 
            ? createSuccessResponse("Máquina sincronizada com sucesso!")
            : createErrorResponse("Erro ao sincronizar máquina.");
    } catch (error) {
        return createErrorResponse("Erro ao sincronizar máquina completa", error);
    }
});

// Deletar máquina
ipcMain.handle('delete-machine', async (event, machineId: string) => {
    try {
        console.log('Deletando máquina ID:', machineId);
        const success = deleteMachineComplete(machineId);
        return success 
            ? createSuccessResponse("Máquina deletada com sucesso!")
            : createErrorResponse("Erro ao deletar máquina ou máquina não encontrada.");
    } catch (error) {
        return createErrorResponse("Erro ao deletar máquina", error);
    }
});

// ========================
// IPC HANDLERS - APPLICATIONS
// ========================

// Buscar todas as aplicações
ipcMain.handle('get-all-applications', async () => {
    try {
        return getAllApplications();
    } catch (error) {
        console.error('Erro ao buscar todas as aplicações:', error);
        return [];
    }
});

// Buscar aplicação por ID
ipcMain.handle('get-application-by-id', async (event, applicationId: string) => {
    try {
        const application = getApplicationById(applicationId);
        return application || null;
    } catch (error) {
        console.error('Erro ao buscar aplicação por ID:', error);
        return null;
    }
});

// Buscar aplicações por ID da máquina
ipcMain.handle('get-applications-by-machine', async (event, machineId: string) => {
    try {
        return getApplicationsByMachineId(machineId);
    } catch (error) {
        console.error('Erro ao buscar aplicações da máquina:', error);
        return [];
    }
});

// Buscar aplicação com informações da máquina
ipcMain.handle('get-application-with-machine-info', async (event, applicationId: string) => {
    try {
        const result = getApplicationWithMachineInfo(applicationId);
        return result || null;
    } catch (error) {
        console.error('Erro ao buscar aplicação com informações da máquina:', error);
        return null;
    }
});

// Criar nova aplicação
ipcMain.handle('create-application', async (event, application: Application) => {
    try {
        console.log('Criando nova aplicação:', application);
        
        // Gerar ID se não existir
        if (!application.id) {
            application.id = `app-${Date.now()}`;
        }

        // Validação básica
        if (!application.name || !application.machine_id) {
            return createErrorResponse('Nome da aplicação e ID da máquina são obrigatórios');
        }

        const applicationToCreate = { 
            ...application, 
            updatedAt: new Date().toISOString() 
        };

        const success = createApplicationInDb(applicationToCreate);
        
        if (success) {
            // Buscar a aplicação criada para retornar os dados completos
            const createdApp = getApplicationById(application.id);
            return createSuccessResponse("Aplicação criada com sucesso!", createdApp);
        } else {
            return createErrorResponse("Erro ao criar aplicação no banco de dados");
        }
    } catch (error) {
        return createErrorResponse("Erro ao criar aplicação", error);
    }
});

// Atualizar aplicação
ipcMain.handle('update-application', async (event, application: Application) => {
    try {
        console.log('Atualizando aplicação:', application);

        if (!application.id) {
            return createErrorResponse('ID da aplicação é obrigatório para atualização');
        }

        // Verificar se a aplicação existe
        const existingApp = getApplicationById(application.id);
        if (!existingApp) {
            return createErrorResponse('Aplicação não encontrada');
        }

        const applicationToUpdate = { 
            ...application, 
            updatedAt: new Date().toISOString() 
        };

        const success = updateApplicationInDb(applicationToUpdate);
        
        if (success) {
            // Buscar a aplicação atualizada para retornar os dados completos
            const updatedApp = getApplicationById(application.id);
            return createSuccessResponse("Aplicação atualizada com sucesso!", updatedApp);
        } else {
            return createErrorResponse("Erro ao atualizar aplicação no banco de dados");
        }
    } catch (error) {
        return createErrorResponse("Erro ao atualizar aplicação", error);
    }
});

// Sincronizar aplicação
ipcMain.handle('sync-application', async (event, application: Application) => {
    try {
        const success = syncApplicationInDb(application);
        return success 
            ? createSuccessResponse("Aplicação sincronizada com sucesso!")
            : createErrorResponse("Erro ao sincronizar aplicação.");
    } catch (error) {
        return createErrorResponse("Erro ao sincronizar aplicação", error);
    }
});

// Deletar aplicação
ipcMain.handle('delete-application', async (event, applicationId: string) => {
    try {
        console.log('Deletando aplicação ID:', applicationId);

        if (!applicationId) {
            return createErrorResponse('ID da aplicação é obrigatório');
        }

        // Verificar se a aplicação existe
        const existingApp = getApplicationById(applicationId);
        if (!existingApp) {
            return createErrorResponse('Aplicação não encontrada');
        }

        const success = deleteApplicationAndServices(applicationId);
        
        return success 
            ? createSuccessResponse("Aplicação excluída com sucesso!")
            : createErrorResponse("Erro ao excluir aplicação do banco de dados");
    } catch (error) {
        return createErrorResponse("Erro ao excluir aplicação", error);
    }
});

// ========================
// IPC HANDLERS - SERVICES
// ========================

// Buscar serviços por ID da aplicação
ipcMain.handle('get-services-by-application', async (event, applicationId: string) => {
    try {
        return getServicesByApplicationId(applicationId);
    } catch (error) {
        console.error('Erro ao buscar serviços da aplicação:', error);
        return [];
    }
});

// Buscar serviço por ID
ipcMain.handle('get-service-by-id', async (event, serviceId: string) => {
    try {
        const service = getServiceById(serviceId);
        return service || null;
    } catch (error) {
        console.error('Erro ao buscar serviço por ID:', error);
        return null;
    }
});

// Criar novo serviço
ipcMain.handle('create-service', async (event, service: Service) => {
    try {
        console.log('Criando novo serviço:', service);

        // Gerar ID se não existir
        if (!service.id) {
            service.id = `service-${Date.now()}`;
        }

        if (!service.name || !service.application_id) {
            return createErrorResponse('Nome do serviço e ID da aplicação são obrigatórios');
        }

        // Verificar se a aplicação existe
        const existingApp = getApplicationById(service.application_id);
        if (!existingApp) {
            return createErrorResponse('Aplicação não encontrada');
        }

        const serviceToCreate = {
            ...service,
            updatedAt: new Date().toISOString()
        };

        const success = createServiceInDb(serviceToCreate, service.application_id);
        
        if (success) {
            // Buscar o serviço criado para retornar os dados completos
            const createdService = getServiceById(service.id);
            return createSuccessResponse("Serviço criado com sucesso!", createdService);
        } else {
            return createErrorResponse("Erro ao criar serviço no banco de dados");
        }
    } catch (error) {
        return createErrorResponse("Erro ao criar serviço", error);
    }
});

// Atualizar serviço
ipcMain.handle('update-service', async (event, service: Service) => {
    try {
        console.log('Atualizando serviço:', service);

        if (!service.id) {
            return createErrorResponse('ID do serviço é obrigatório para atualização');
        }

        // Verificar se o serviço existe
        const existingService = getServiceById(service.id);
        if (!existingService) {
            return createErrorResponse('Serviço não encontrado');
        }

        const serviceToUpdate = {
            ...service,
            updatedAt: new Date().toISOString()
        };

        const success = updateServiceInDb(serviceToUpdate);
        
        if (success) {
            // Buscar o serviço atualizado para retornar os dados completos
            const updatedService = getServiceById(service.id);
            return createSuccessResponse("Serviço atualizado com sucesso!", updatedService);
        } else {
            return createErrorResponse("Erro ao atualizar serviço no banco de dados");
        }
    } catch (error) {
        return createErrorResponse("Erro ao atualizar serviço", error);
    }
});

// Deletar serviço
ipcMain.handle('delete-service', async (event, serviceId: string) => {
    try {
        console.log('Deletando serviço:', serviceId);

        if (!serviceId) {
            return createErrorResponse('ID do serviço é obrigatório');
        }

        // Verificar se o serviço existe
        const existingService = getServiceById(serviceId);
        if (!existingService) {
            return createErrorResponse('Serviço não encontrado');
        }

        const success = deleteServiceFromDb(serviceId);
        
        return success 
            ? createSuccessResponse("Serviço excluído com sucesso!")
            : createErrorResponse("Erro ao excluir serviço do banco de dados");
    } catch (error) {
        return createErrorResponse("Erro ao excluir serviço", error);
    }
});

// Atualizar apenas o status do serviço
ipcMain.handle('update-service-status', async (event, serviceId: string, newStatus: 'Concluida' | 'Pendente' | 'Em andamento') => {
    try {
        console.log('Atualizando status do serviço:', serviceId, 'para:', newStatus);

        if (!serviceId) {
            return createErrorResponse('ID do serviço é obrigatório');
        }

        // Verificar se o serviço existe
        const existingService = getServiceById(serviceId);
        if (!existingService) {
            return createErrorResponse('Serviço não encontrado');
        }

        const success = updateServiceStatus(serviceId, newStatus);
        
        return success 
            ? createSuccessResponse("Status do serviço atualizado com sucesso!")
            : createErrorResponse("Erro ao atualizar status do serviço.");
    } catch (error) {
        return createErrorResponse("Erro ao atualizar status do serviço", error);
    }
});

// ========================
// ADDITIONAL UTILITY HANDLERS
// ========================

// Handler para estatísticas de uma aplicação
ipcMain.handle('get-application-stats', async (event, applicationId: string) => {
    try {
        const services = getServicesByApplicationId(applicationId);
        
        const stats = {
            totalServices: services.length,
            completedServices: services.filter(s => s.status === 'Concluida').length,
            pendingServices: services.filter(s => s.status === 'Pendente').length,
            inProgressServices: services.filter(s => s.status === 'Em andamento').length,
            mandatoryServices: services.filter(s => s.itemObrigatorio === 'Sim').length
        };

        return stats;
    } catch (error) {
        console.error('Erro ao buscar estatísticas da aplicação:', error);
        return {
            totalServices: 0,
            completedServices: 0,
            pendingServices: 0,
            inProgressServices: 0,
            mandatoryServices: 0
        };
    }
});

// Handler para validar uma aplicação
ipcMain.handle('validate-application', async (event, applicationId: string) => {
    try {
        const app = getApplicationById(applicationId);
        if (!app) {
            return { valid: false, message: 'Aplicação não encontrada' };
        }

        if (!app.machine_id) {
            return { valid: false, message: 'Aplicação não tem máquina associada' };
        }

        const machine = getMachineById(app.machine_id);
        if (!machine) {
            return { valid: false, message: 'Máquina associada não encontrada' };
        }

        return { 
            valid: true, 
            message: 'Aplicação válida',
            data: { application: app, machine }
        };
    } catch (error) {
        console.error('Erro no handler validate-application:', error);
        return { valid: false, message: 'Erro na validação' };
    }
});

// ========================
// APP LIFECYCLE
// ========================

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});