
export type ServiceStatus = "Concluida" | "Pendente" | "Em andamento";
export type ApplicationType = "IBM" | "ECCOX"

export interface Service {
  name: string;
  status: ServiceStatus;
}

export interface Application {
  name: string;
  status: ServiceStatus;
  tipo: ApplicationType;
  services: Service[];
}

export interface Machines {
  id: string;
  name: string;
  description: string;
  version: string;
  status: Exclude<ServiceStatus, "Em andamento">;
  applications: Application[];
}
