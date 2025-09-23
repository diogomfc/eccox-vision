// electron/preload.ts
import { contextBridge, ipcRenderer } from "electron";
import { Application, Machines, Service } from "./machines-types";


// contextBridge.exposeInMainWorld("electronAPI", {
//     sayHello: () => ipcRenderer.send("hello"),
//     getAppVersion: () => ipcRenderer.invoke("get-version"),
//     getAllMachines: () => ipcRenderer.invoke('get-all-machines'),
//     getMachineById: (id: string) => ipcRenderer.invoke('get-machine-by-id', id),
//     updateMachine: (machine: Machines) => ipcRenderer.invoke('update-machine', machine),
// });

contextBridge.exposeInMainWorld('electronAPI', {
    // ========================
    // MACHINES APIs
    // ========================
    getAllMachines: () => ipcRenderer.invoke('get-all-machines'),
    getMachineById: (id: string) => ipcRenderer.invoke('get-machine-by-id', id),
    updateMachine: (machine: Machines) => ipcRenderer.invoke('update-machine', machine),
    createMachine: (machine: Machines) => ipcRenderer.invoke('create-machine', machine),
    deleteMachine: (machineId: string) => ipcRenderer.invoke('delete-machine', machineId),


    // ========================
    // APPLICATIONS APIs
    // ========================
    getApplicationById: (id:string) => ipcRenderer.invoke('get-application-by-id', id),
    updateApplication: (application: Application) => ipcRenderer.invoke('update-application', application),
    getAllApplications: () => ipcRenderer.invoke('get-all-applications'),
    getApplicationsByMachineId: (machineId: string) => ipcRenderer.invoke('get-applications-by-machine-id', machineId),
    getApplicationWithMachineInfo: (applicationId: string) => ipcRenderer.invoke('get-application-with-machine-info', applicationId),
    createApplication: (application: Application) => ipcRenderer.invoke('create-application', application),
    deleteApplication: (applicationId: string) => ipcRenderer.invoke('delete-application', applicationId),

    // ========================
    // SERVICES APIs
    // ========================
    getServicesByApplicationId: (applicationId: string) => ipcRenderer.invoke('get-services-by-application-id', applicationId),
    getServiceById: (serviceId: string) => ipcRenderer.invoke('get-service-by-id', serviceId),
    updateService: (service: Service) => ipcRenderer.invoke('update-service', service),
    createService: (service: Service, applicationId: string) => ipcRenderer.invoke('create-service', service, applicationId),
    deleteService: (serviceId: string) => ipcRenderer.invoke('delete-service', serviceId),
    updateServiceStatus: (serviceId: string, newStatus: string) => ipcRenderer.invoke('update-service-status', serviceId, newStatus),
});