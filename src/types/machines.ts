// src/server/machines-types.ts
export type StatusType = "Concluida" | "Pendente" | "Em andamento";
export type ApplicationType = "IBM" | "ECCOX"
export type ItemObrigatorioType = "Sim" | "Não";

export interface Machines {
  id: string;
  name: string;
  description: string;
  version: string;
  status: StatusType;
  updatedAt: string;
  applications: Application[];
}

export interface Application {
  id: string;
  machine_id?: string;
  name: string;
  status: StatusType;
  tipo: ApplicationType;
  services: Service[];
}

export interface Service {
  id: string;
  application_id?: string;
  name: string;
  status: StatusType;
  itemObrigatorio?: ItemObrigatorioType;
  updatedAt?: string;
  responsible?: string;
  comments?: string;
  typePendencia?: string;
  responsibleHomologacao?: string;
}