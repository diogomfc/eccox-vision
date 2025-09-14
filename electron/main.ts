// src/electron/main.ts

import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';

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
ipcMain.on("hello", () => {
    console.log("👋 Teste de conexão com Electron");
});

ipcMain.handle("get-version", () => {
    return app.getVersion();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});