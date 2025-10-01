// main.ts
import { app, BrowserWindow, dialog, ipcMain, Menu, screen } from 'electron';
import path from 'path';

// Importa funções do repositório de máquinas
import {
    getAllMachines,
    getMachineById,
    updateMachineInDb,
    createMachineInDb,
    deleteMachineComplete,
    syncMachineCompleteInDb,
} from '../src/server/repositories/machine-repository';

// Importa funções do repositório de aplicações
import {
    getApplicationById,
    getAllApplications,
    getApplicationsByMachineId,
    getApplicationWithMachineInfo,
    syncApplicationInDb,
    deleteApplicationAndServices,
} from '../src/server/repositories/application-repository';

// Importa funções do repositório de serviços
import {
    getServicesByApplicationId,
    getServiceById,
    deleteServiceInDb,
    updateServiceStatus,
    syncServicesInDb, 
} from '../src/server/repositories/service-repository';

// Importa funções do banco de dados
import { 
  getDatabaseStatus, 
  setDatabasePath, 
  testDatabaseConnection,
  initializeDefaultPath,
  setupDatabase,
  closeDatabaseConnection
} from '../src/server/db';


// Importa funções do gerenciador de configuração
import { 
  isFirstRun, 
  markAsConfigured, 
  loadConfig,
  initConfigPath
} from '../src/server/config-manager';

import {
  getSavedDatabases,
  addSavedDatabase,
  removeSavedDatabase,
  setActiveDatabase
} from '../src/server/config-manager';


import type { Machines, Application, Service } from '../src/types/machines';

// ========================
// WINDOW MANAGEMENT
// ========================

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

    const win = new BrowserWindow({
        width: screenWidth,
        height: screenHeight,
        minWidth: 1280,
        minHeight: 832,
        resizable: true,
        show: false, // Não mostra imediatamente
        roundedCorners: true, // Mantém bordas arredondadas
        icon: path.join(__dirname, 'logo.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false, // Necessário para caregar recursos locais
        },
    });

    // Maximiza a janela ao invés de fullscreen
    win.maximize();
    win.removeMenu();
    
    // Mostra a janela após maximizar
    win.show();

    // Detecção melhorada do modo de desenvolvimento
    const isDev = !app.isPackaged && process.env.NODE_ENV !== 'production';

    if (isDev) {
        win.loadURL("http://localhost:3000");
    } else {
        // Caminho correto para produção usando file:// protocol
        const htmlPath = path.resolve(__dirname, '..', 'out', 'index.html');
        const fileUrl = `file://${htmlPath.replace(/\\/g, '/')}`;
        console.log('Loading file URL:', fileUrl);
        win.loadURL(fileUrl);
    }

    // DevTools apenas em desenvolvimento
    if (isDev) {
        win.webContents.openDevTools();
    }
    // createDevMenu(win);
}


// ========================
// IPC HANDLERS - CONFIGURATION
// ========================

// Handler para verificar se é primeira execução
ipcMain.handle('is-first-run', async () => {
  try {
    return isFirstRun();
  } catch (error) {
    console.error('Erro ao verificar primeira execução:', error);
    return true; // Em caso de erro, assume que é primeira execução
  }
});

// Handler para completar configuração inicial
ipcMain.handle('complete-initial-setup', async (event, databasePath: string) => {
  try {
    console.log('Completando configuração inicial com caminho:', databasePath);
    
    // Testa e define o caminho do banco
    const dbResult = setDatabasePath(databasePath);
    
    if (dbResult.success) {
      // Marca como configurado
      const configResult = markAsConfigured(databasePath);
      
      return {
        success: configResult,
        message: configResult 
          ? 'Configuração inicial concluída com sucesso!' 
          : 'Banco configurado, mas erro ao salvar configuração'
      };
    } else {
      return {
        success: false,
        message: `Erro na configuração do banco: ${dbResult.message}`
      };
    }
  } catch (error) {
    console.error('Erro na configuração inicial:', error);
    return {
      success: false,
      message: `Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    };
  }
});

// Handler para obter configurações atuais
ipcMain.handle('get-app-config', async () => {
  try {
    const config = loadConfig();
    return config;
  } catch (error) {
    console.error('Erro ao obter configurações:', error);
    return {
      databasePath: '',
      isFirstRun: true,
      lastConfigUpdate: new Date().toISOString()
    };
  }
});


// ========================
// IPC HANDLERS - Gerenciamento do Banco de Dados
// ========================

// Handler para obter status do banco
ipcMain.handle('get-database-status', async () => {
  try {
    const status = getDatabaseStatus();
    return status;
  } catch (error) {
    console.error('Erro ao obter status do banco:', error);
    return {
      status: 'error' as const,
      lastUpdate: null,
      currentPath: '',
      message: `Erro ao obter status: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    };
  }
});

// Handler para alterar caminho do banco
ipcMain.handle('set-database-path', async (event, newPath: string) => {
  try {
    console.log('Alterando caminho do banco para:', newPath);
    const result = setDatabasePath(newPath);
    
    if (result.success) {
      console.log('Caminho do banco alterado com sucesso');
    } else {
      console.error('Erro ao alterar caminho do banco:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Erro inesperado ao alterar caminho do banco:', error);
    return {
      success: false,
      message: `Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    };
  }
});

// Handler para testar conexão
ipcMain.handle('test-database-connection', async (event, testPath: string) => {
  try {
    console.log('Testando conexão com:', testPath);
    const result = testDatabaseConnection(testPath);
    
    if (result.success) {
      console.log('Teste de conexão bem-sucedido');
    } else {
      console.log('Teste de conexão falhou:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Erro no teste de conexão:', error);
    return {
      success: false,
      message: `Erro no teste: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    };
  }
});

// Handler para selecionar caminho do arquivo
ipcMain.handle('select-database-path', async () => {
  try {
    const result = await dialog.showSaveDialog({
      title: 'Selecionar localização do banco de dados',
      defaultPath: 'eccox-vision.db',
      filters: [
        { name: 'Banco de Dados SQLite', extensions: ['db'] },
        { name: 'Todos os arquivos', extensions: ['*'] }
      ],
      properties: ['createDirectory']
    });

    if (result.canceled || !result.filePath) {
      return null;
    }

    let selectedPath = result.filePath;
    
    // Garante que tem extensão .db
    if (!selectedPath.toLowerCase().endsWith('.db')) {
      selectedPath += '.db';
    }

    console.log('Caminho selecionado:', selectedPath);
    return selectedPath;
    
  } catch (error) {
    console.error('Erro ao abrir dialog de seleção:', error);
    return null;
  }
});

// ========================
// IPC HANDLERS - SAVED DATABASES
// ========================

ipcMain.handle('get-saved-databases', async () => {
  try {
    return getSavedDatabases();
  } catch (error) {
    console.error('Erro ao obter saved databases:', error);
    return [];
  }
});

ipcMain.handle('add-saved-database', async (event, entry) => {
  try {
    const success = addSavedDatabase(entry);
    return { success };
  } catch (error) {
    console.error('Erro ao adicionar saved database:', error);
    return { success: false };
  }
});

ipcMain.handle('remove-saved-database', async (event, id: string) => {
  try {
    const success = removeSavedDatabase(id);
    return { success };
  } catch (error) {
    console.error('Erro ao remover saved database:', error);
    return { success: false };
  }
});

ipcMain.handle('set-active-database', async (event, id: string | null) => {
  try {
    const success = setActiveDatabase(id);
    if (success && id) {
      // se ativado, também atualiza o DB path em runtime
      const cfg = loadConfig();
      const entry = (cfg.savedDatabases || []).find((d:any)=>d.id===id);
      if (entry) {
        // usa setDatabasePath para abrir o banco
        const dbRes = setDatabasePath(entry.path);
        return { success: !!dbRes.success, message: dbRes.message || '' };
      }
    }
    return { success };
  } catch (error) {
    console.error('Erro ao set active database:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
});



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
        const machines = getAllMachines();
        return machines;
    } catch (error) {
        console.error("Erro ao buscar máquinas:", error);
        return [];
    }
});

// Buscar máquina por ID
ipcMain.handle('get-machine-by-id', async (event, id: string) => {
    try {
        const machine = getMachineById(id);
        return machine || null;
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
        const applications = getAllApplications();
        return applications;
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
        const applications = getApplicationsByMachineId(machineId);
        return applications;
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

// Sincronizar aplicação (unifica create/update)
ipcMain.handle('sync-application', async (event, application: Application) => {
    try {
        console.log('Sincronizando aplicação:', application);
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
        const services = getServicesByApplicationId(applicationId);
        return services;
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

// Sincronizar serviços (unifica create/update)
ipcMain.handle('sync-service', async (event, services: Service[] | Service) => {
    try {
        console.log('Sincronizando serviços em lote:', services);
        const servicesArray = Array.isArray(services) ? services : [services];
        const success = syncServicesInDb(servicesArray);
        return success
            ? createSuccessResponse("Serviços sincronizados com sucesso!")
            : createErrorResponse("Erro ao sincronizar serviços.");
    } catch (error) {
        return createErrorResponse("Erro ao sincronizar serviços", error);
    }
});


// Deletar serviço
ipcMain.handle('delete-service', async (event, serviceId: string) => {
    try {
        console.log('Deletando serviço:', serviceId);

        if (!serviceId) {
            return createErrorResponse('ID do serviço é obrigatório');
        }

        const existingService = getServiceById(serviceId);
        if (!existingService) {
            return createErrorResponse('Serviço não encontrado');
        }

        const success = deleteServiceInDb(serviceId);

        return success
            ? createSuccessResponse("Serviço excluído com sucesso!")
            : createErrorResponse("Erro ao excluir serviço do banco de dados");
    } catch (error) {
        return createErrorResponse("Erro ao excluir serviço", error);
    }
});

// Atualizar apenas o status do serviço
ipcMain.handle('update-service-status', async (event, serviceId: string, newStatus: 'Concluída' | 'Pendente' | 'Em andamento') => {
    try {
        console.log('Atualizando status do serviço:', serviceId, 'para:', newStatus);

        if (!serviceId) {
            return createErrorResponse('ID do serviço é obrigatório');
        }

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
            completedServices: services.filter(s => s.status === 'Concluída').length,
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

app.whenReady().then(async () => {
  // Inicializa o sistema de configurações
  try {
    initConfigPath();
    console.log('Sistema de configurações inicializado');
  } catch (error) {
    console.error('Erro ao inicializar configurações:', error);
  }

  // Carrega a configuração salva
  const config = loadConfig();
  
  // Se não é primeira execução, inicializa o banco com o caminho salvo
  if (!config.isFirstRun && config.databasePath) {
    try {
      initializeDefaultPath(); // Vai usar getSavedDatabasePath()
      const setupSuccess = setupDatabase();
      if (setupSuccess) {
        console.log('Banco de dados inicializado com caminho salvo:', config.databasePath);
      } else {
        console.warn('Falha na inicialização do banco de dados salvo');
      }
    } catch (error) {
      console.error('Erro na inicialização do banco salvo:', error);
    }
  } else {
    console.log('Primeira execução detectada - aguardando configuração inicial');
  }
  
  // Cria a janela principal
  createWindow();
});


app.on('window-all-closed', () => {
  // Fecha a conexão com o banco antes de sair
  try {
    closeDatabaseConnection();
    console.log('Conexão com banco fechada no encerramento da aplicação');
  } catch (error) {
    console.error('Erro ao fechar conexão no encerramento:', error);
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});