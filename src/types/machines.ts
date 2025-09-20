export type StatusType = "Concluida" | "Pendente" | "Em andamento";
export type ApplicationType = "IBM" | "ECCOX" | null
export type ItemObrigatorioType = "Sim" | "Não";

export interface Service {
  id: string;
  name: string;
  status: StatusType;
  itemObrigatorio: ItemObrigatorioType;
  updatedAt: string | null;
  responsible: string;
  comments: string;
  typePendencia: string;
  responsibleHomologacao: string;
}

export interface Application {
  id: string;
  name: string;
  status: StatusType;
  tipo: ApplicationType;
  services: Service[];
}

export interface Machines {
  id: string;
  name: string;
  description: string;
  version: string;
  status: StatusType;
  applications: Application[];
  updatedAt: string | null;
}