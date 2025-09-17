// electron/preload.ts
import { contextBridge, ipcRenderer } from "electron";
import { Machines } from "./machines-types";


contextBridge.exposeInMainWorld("electronAPI", {
    sayHello: () => ipcRenderer.send("hello"),
    getAppVersion: () => ipcRenderer.invoke("get-version"),
    getAllMachines: () => ipcRenderer.invoke('get-all-machines'),
    getMachineById: (id: string) => ipcRenderer.invoke('get-machine-by-id', id),
    updateMachine: (machine: Machines) => ipcRenderer.invoke('update-machine', machine),
});