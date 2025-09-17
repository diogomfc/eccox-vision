// electron/main.ts

import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import { getAllMachines, getMachineById, updateMachineInDb } from './machine-repository'; // Importação atualizada

// Função para criar a janela principal
function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 832,
        icon: path.join(__dirname, 'assets', 'logo.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Remove o menu padrão para um visual mais limpo na aplicação final
    win.removeMenu();

    const startUrl = app.isPackaged
        ? path.join(__dirname, "out", "index.html")
        : "http://localhost:3000";

    if (app.isPackaged) {
        win.loadFile(startUrl);
    } else {
        win.loadURL(startUrl);
    }

    // Chama a função para criar o menu de desenvolvimento
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
        // Em modo de produção, remove o menu da aplicação
        Menu.setApplicationMenu(null);
    }
}

// Eventos do ciclo de vida do Electron
app.whenReady().then(createWindow);

// Gerencia a comunicação assíncrona com o processo principal
// Manipulador para o evento de atualização da máquina
ipcMain.handle('update-machine', async (event, machine) => {
    try {
        const success = updateMachineInDb(machine);
        return { success, message: success ? "Máquina atualizada com sucesso!" : "Nenhuma alteração foi feita." };
    } catch (error) {
        console.error("Erro ao atualizar a máquina no processo principal:", error);
        return { success: false, message: "Erro interno no servidor." };
    }
});

// Manipulador para buscar todas as máquinas
ipcMain.handle('get-all-machines', async () => {
  try {
    return getAllMachines();
  } catch (error) {
    console.error("Erro ao buscar máquinas:", error);
    return [];
  }
});

// Manipulador para buscar uma máquina por ID
ipcMain.handle('get-machine-by-id', async (event, id) => {
  try {
    return getMachineById(id);
  } catch (error) {
    console.error("Erro ao buscar máquina por ID:", error);
    return null;
  }
});