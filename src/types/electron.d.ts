// src/types/electron.d.ts
import { Machines, Application, Service } from "./machines";

declare global {
    interface Window {
        electronAPI: {
            // ========================
            // MACHINES APIs
            // ========================
            getAllMachines: () => Promise<Machines[]>;
            getMachineById: (id: string) => Promise<Machines | null>;
            updateMachine: (machine: Machines) => Promise<{ success: boolean; message: string }>;
            createMachine: (machine: Machines) => Promise<{ success: boolean; message: string }>;
            deleteMachine: (machineId: string) => Promise<{ success: boolean; message: string }>;
            
            // Sincroniza uma máquina completa (unifica create/update)
            syncMachineComplete: (machine: Machines) => Promise<{ success: boolean; message: string }>;
            
            // ========================
            // APPLICATIONS APIs
            // ========================
            getApplicationById: (id: string) => Promise<Application | null>;
            getAllApplications: () => Promise<Application[]>;
            getApplicationsByMachineId: (machineId: string) => Promise<Application[]>;
            getApplicationWithMachineInfo: (applicationId: string) => Promise<{application: Application, machine: Machines} | null>;
            
            // Sincroniza uma aplicação (unifica create/update)
            syncApplication: (application: Application) => Promise<{ success: boolean; message: string }>;
            
            deleteApplication: (applicationId: string) => Promise<{ success: boolean; message: string }>;

            // ========================
            // SERVICES APIs
            // ========================
            getServicesByApplicationId: (applicationId: string) => Promise<Service[]>;
            getServiceById: (serviceId: string) => Promise<Service | null>;
            
            // Sincroniza um serviço (unifica create/update)
            syncService: (service: Service) => Promise<{ success: boolean; message: string }>;
            
            deleteService: (serviceId: string) => Promise<{ success: boolean; message: string }>;
            
            updateServiceStatus: (
                serviceId: string, 
                newStatus: 'Concluída' | 'Pendente' | 'Em andamento'
            ) => Promise<{ success: boolean; message: string }>;
        };
    }
}