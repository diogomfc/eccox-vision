export type ServiceStatus = "Concluida" | "Pendente" | "Em andamento";
export type ApplicationType = "IBM" | "ECCOX"

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  itemObrigatorio: "Sim" | "Não";
  updatedAt: string | null;
  responsible: string;
  comments: string;
  typePendencia: string;
  responsibleHomologacao: string;
}

export interface Application {
  id: string;
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
  status: ServiceStatus;
  applications: Application[];
  updatedAt: string | null;
}