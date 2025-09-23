// electron/main.ts
import { app, BrowserWindow, ipcMain, Menu, screen } from 'electron';
import path from 'path';
import { 
    // Machine functions
    getAllMachines, 
    getMachineById, 
    updateMachineInDb,
    createMachineInDb,
    deleteMachineFromDb,
    // Application functions
    getApplicationById,
    getAllApplications,
    getApplicationsByMachineId,
    getApplicationWithMachineInfo,
    updateApplicationInDb,
    createApplicationInDb,
    deleteApplicationFromDb,
    // Service functions
    getServicesByApplicationId,
    getServiceById,
    updateServiceInDb,
    createServiceInDb,
    deleteServiceFromDb,
    updateServiceStatus
} from './machine-repository';
import type { Machines, Application, Service } from '../src/types/machines';


// ========================
// WINDOW MANAGEMENT
// ========================

function createWindow() {
    // Pega a tela principal
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth } = primaryDisplay.workAreaSize;

    // Define tamanho base dependendo da resolução
    let winWidth = 1280;
    let winHeight = 832;

    // Se tela >= Full HD, abre maior
    if (screenWidth >= 1920) {
        winWidth = 1600;
        winHeight = 900;
    }

    // Se tela >= 4K, abre em uma proporção confortável (não tela cheia)
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

    // Centraliza a janela
    win.center();

    // Remove o menu padrão
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

// Função que cria o menu de desenvolvimento (apenas em modo dev)
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
// IPC HANDLERS - MACHINES
// ========================

ipcMain.handle('get-all-machines', async () => {
    try {
        return getAllMachines();
    } catch (error) {
        console.error("Erro ao buscar máquinas:", error);
        return [];
    }
});

ipcMain.handle('get-machine-by-id', async (event, id: string) => {
    try {
        return getMachineById(id);
    } catch (error) {
        console.error("Erro ao buscar máquina por ID:", error);
        return null;
    }
});

ipcMain.handle('update-machine', async (event, machine: Machines) => {
    try {
        const success = updateMachineInDb(machine);
        return { 
            success, 
            message: success ? "Máquina atualizada com sucesso!" : "Nenhuma alteração foi feita." 
        };
    } catch (error) {
        console.error("Erro ao atualizar a máquina no processo principal:", error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido.';
        return { success: false, message: `Erro interno no servidor: ${message}` };
    }
});

ipcMain.handle('create-machine', async (event, machine: Machines): Promise<{ success: boolean; message: string }> => {
    try {
        console.log('Recebendo máquina para criar:', machine);
        
        const success = createMachineInDb(machine);
        return { 
            success, 
            message: success ? "Máquina criada com sucesso!" : "Erro ao criar máquina." 
        };
    } catch (error) {
        console.error("Erro ao criar máquina:", error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido.';
        return { success: false, message: `Erro interno: ${message}` };
    }
});

ipcMain.handle('delete-machine', async (event, machineId: string): Promise<{ success: boolean; message: string }> => {
    try {
        console.log('Deletando máquina ID:', machineId);
        
        const success = deleteMachineFromDb(machineId);
        return { 
            success, 
            message: success ? "Máquina deletada com sucesso!" : "Erro ao deletar máquina ou máquina não encontrada." 
        };
    } catch (error) {
        console.error("Erro ao deletar máquina:", error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido.';
        return { success: false, message: `Erro interno: ${message}` };
    }
});

// ========================
// IPC HANDLERS - APPLICATIONS
// ========================

ipcMain.handle('get-application-by-id', async (event, applicationId: string): Promise<Application | null> => {
    try {
        const application = getApplicationById(applicationId);
        return application || null;
    } catch (error) {
        console.error('Erro ao buscar aplicação por ID:', error);
        return null;
    }
});

ipcMain.handle('update-application', async (event, updatedApplication: Application): Promise<{ success: boolean; message: string }> => {
    try {
        // Atualiza o timestamp (cria uma cópia do objeto para evitar atribuir propriedades que não existem no tipo Application)
        const now = new Date().toISOString();
        const applicationToUpdate = { ...updatedApplication, updatedAt: now };
        
        const success = updateApplicationInDb(applicationToUpdate);
        return { 
            success, 
            message: success ? "Aplicação atualizada com sucesso!" : "Erro ao atualizar aplicação." 
        };
    } catch (error) {
        console.error('Erro ao atualizar aplicação:', error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        return { success: false, message: `Erro interno: ${message}` };
    }
});

ipcMain.handle('get-all-applications', async (): Promise<Application[]> => {
    try {
        return getAllApplications();
    } catch (error) {
        console.error('Erro ao buscar todas as aplicações:', error);
        return [];
    }
});

ipcMain.handle('get-applications-by-machine-id', async (event, machineId: string): Promise<Application[]> => {
    try {
        return getApplicationsByMachineId(machineId);
    } catch (error) {
        console.error('Erro ao buscar aplicações da máquina:', error);
        return [];
    }
});

ipcMain.handle('get-application-with-machine-info', async (event, applicationId: string): Promise<{application: Application, machine: Machines} | null> => {
    try {
        const result = getApplicationWithMachineInfo(applicationId);
        return result || null;
    } catch (error) {
        console.error('Erro ao buscar aplicação com informações da máquina:', error);
        return null;
    }
});

ipcMain.handle('create-application', async (event, newApplication: Application): Promise<{ success: boolean; message: string }> => {
    try {
        // Define timestamps
        const now = new Date().toISOString();
        // Create a new object merging the incoming application and a timestamp without mutating the typed parameter
        const applicationToCreate = { ...newApplication, updatedAt: now } as unknown as Application;
        
        const success = createApplicationInDb(applicationToCreate);
        return { 
            success, 
            message: success ? "Aplicação criada com sucesso!" : "Erro ao criar aplicação." 
        };
    } catch (error) {
        console.error('Erro ao criar aplicação:', error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        return { success: false, message: `Erro interno: ${message}` };
    }
});

ipcMain.handle('delete-application', async (event, applicationId: string): Promise<{ success: boolean; message: string }> => {
    try {
        const success = deleteApplicationFromDb(applicationId);
        return { 
            success, 
            message: success ? "Aplicação deletada com sucesso!" : "Erro ao deletar aplicação." 
        };
    } catch (error) {
        console.error('Erro ao deletar aplicação:', error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        return { success: false, message: `Erro interno: ${message}` };
    }
});

// ========================
// IPC HANDLERS - SERVICES
// ========================

ipcMain.handle('get-services-by-application-id', async (event, applicationId: string): Promise<Service[]> => {
    try {
        return getServicesByApplicationId(applicationId);
    } catch (error) {
        console.error('Erro ao buscar serviços da aplicação:', error);
        return [];
    }
});

ipcMain.handle('get-service-by-id', async (event, serviceId: string): Promise<Service | null> => {
    try {
        const service = getServiceById(serviceId);
        return service || null;
    } catch (error) {
        console.error('Erro ao buscar serviço por ID:', error);
        return null;
    }
});

ipcMain.handle('update-service', async (event, updatedService: Service): Promise<{ success: boolean; message: string }> => {
    try {
        // Atualiza o timestamp
        updatedService.updatedAt = new Date().toISOString();
        
        const success = updateServiceInDb(updatedService);
        return { 
            success, 
            message: success ? "Serviço atualizado com sucesso!" : "Erro ao atualizar serviço." 
        };
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        return { success: false, message: `Erro interno: ${message}` };
    }
});

ipcMain.handle('create-service', async (event, newService: Service, applicationId: string): Promise<{ success: boolean; message: string }> => {
    try {
        // Define timestamps
        const now = new Date().toISOString();
        newService.updatedAt = now;
        
        const success = createServiceInDb(newService, applicationId);
        return { 
            success, 
            message: success ? "Serviço criado com sucesso!" : "Erro ao criar serviço." 
        };
    } catch (error) {
        console.error('Erro ao criar serviço:', error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        return { success: false, message: `Erro interno: ${message}` };
    }
});

ipcMain.handle('delete-service', async (event, serviceId: string): Promise<{ success: boolean; message: string }> => {
    try {
        const success = deleteServiceFromDb(serviceId);
        return { 
            success, 
            message: success ? "Serviço deletado com sucesso!" : "Erro ao deletar serviço." 
        };
    } catch (error) {
        console.error('Erro ao deletar serviço:', error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        return { success: false, message: `Erro interno: ${message}` };
    }
});

ipcMain.handle('update-service-status', async (event, serviceId: string, newStatus: 'Concluida' | 'Pendente' | 'Em andamento'): Promise<{ success: boolean; message: string }> => {
    try {
        const success = updateServiceStatus(serviceId, newStatus);
        return { 
            success, 
            message: success ? "Status do serviço atualizado com sucesso!" : "Erro ao atualizar status." 
        };
    } catch (error) {
        console.error('Erro ao atualizar status do serviço:', error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        return { success: false, message: `Erro interno: ${message}` };
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