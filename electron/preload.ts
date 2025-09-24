// electron/preload.ts
import { contextBridge, ipcRenderer } from "electron";
import { Application, Machines, Service } from "../src/types/machines";

contextBridge.exposeInMainWorld('electronAPI', {
    // ========================
    // MACHINES APIs
    // ========================
    getAllMachines: () => ipcRenderer.invoke('get-all-machines'),
    getMachineById: (id: string) => ipcRenderer.invoke('get-machine-by-id', id),
    updateMachine: (machine: Machines) => ipcRenderer.invoke('update-machine', machine),
    createMachine: (machine: Machines) => ipcRenderer.invoke('create-machine', machine),
    deleteMachine: (machineId: string) => ipcRenderer.invoke('delete-machine', machineId),
    syncMachineComplete: (machine: Machines) => ipcRenderer.invoke('sync-machine-complete', machine),
    
    // ========================
    // APPLICATIONS APIs
    // ========================
    getAllApplications: () => ipcRenderer.invoke('get-all-applications'),
    getApplicationById: (id: string) => ipcRenderer.invoke('get-application-by-id', id),
    getApplicationsByMachineId: (machineId: string) => ipcRenderer.invoke('get-applications-by-machine', machineId),
    getApplicationWithMachineInfo: (applicationId: string) => ipcRenderer.invoke('get-application-with-machine-info', applicationId),
    
    // Unifica a criação e atualização de uma aplicação
    syncApplication: (application: Application) => ipcRenderer.invoke('sync-application', application),
    deleteApplication: (applicationId: string) => ipcRenderer.invoke('delete-application', applicationId),
    
    // ========================
    // SERVICES APIs
    // ========================
    getServicesByApplicationId: (applicationId: string) => ipcRenderer.invoke('get-services-by-application', applicationId),
    getServiceById: (serviceId: string) => ipcRenderer.invoke('get-service-by-id', serviceId),

    // Unifica a criação e atualização de um serviço
    syncService: (service: Service) => ipcRenderer.invoke('sync-service', service),
    deleteService: (serviceId: string) => ipcRenderer.invoke('delete-service', serviceId),
    updateServiceStatus: (serviceId: string, newStatus: 'Concluída' | 'Pendente' | 'Em andamento') => ipcRenderer.invoke('update-service-status', serviceId, newStatus),

    // ========================
    // UTILITY APIs
    // ========================
    getApplicationStats: (applicationId: string) => ipcRenderer.invoke('get-application-stats', applicationId),
    validateApplication: (applicationId: string) => ipcRenderer.invoke('validate-application', applicationId),
});