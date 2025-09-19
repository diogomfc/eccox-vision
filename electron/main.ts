// electron/main.ts
import { app, BrowserWindow, ipcMain, Menu, screen } from 'electron';
import path from 'path';
import { getAllMachines, getMachineById, updateMachineInDb } from './machine-repository';

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

    // ⚡ Botão temporário de reload para testes
    // win.webContents.on("did-finish-load", () => {
    //     win.webContents.executeJavaScript(`
    //         if (!document.getElementById("temp-reload-btn")) {
    //             const btn = document.createElement("button");
    //             btn.id = "temp-reload-btn";
    //             btn.innerText = "🔄 Reload App";
    //             btn.style.position = "fixed";
    //             btn.style.top = "10px";
    //             btn.style.right = "10px";
    //             btn.style.zIndex = 9999;
    //             btn.style.padding = "8px 12px";
    //             btn.style.borderRadius = "6px";
    //             btn.style.background = "#1f1f1f";
    //             btn.style.color = "#fff";
    //             btn.style.border = "1px solid #444";
    //             btn.style.cursor = "pointer";
    //             btn.onclick = () => location.reload();
    //             document.body.appendChild(btn);
    //         }
    //     `);
    // });

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

// Eventos do ciclo de vida
app.whenReady().then(createWindow);

// IPCs
ipcMain.handle('update-machine', async (event, machine) => {
    try {
        const success = updateMachineInDb(machine);
        return { success, message: success ? "Máquina atualizada com sucesso!" : "Nenhuma alteração foi feita." };
    } catch (error) {
        console.error("Erro ao atualizar a máquina no processo principal:", error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido.';
        return { success: false, message: `Erro interno no servidor: ${message}` };
    }
});

ipcMain.handle('get-all-machines', async () => {
    try {
        return getAllMachines();
    } catch (error) {
        console.error("Erro ao buscar máquinas:", error);
        return [];
    }
});

ipcMain.handle('get-machine-by-id', async (event, id) => {
    try {
        return getMachineById(id);
    } catch (error) {
        console.error("Erro ao buscar máquina por ID:", error);
        return null;
    }
});
