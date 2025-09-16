import { Machines } from "@/types/machines";

export const mockMachines: Machines[] = [
    {
        "id": "dallas",
        "name": "Dallas",
        "description": "Homologação / Apresentações",
        "version": "z/OS 3.1",
        "status": "Pendente",
        "updatedAt": null,
        "applications": [
            {
                "name": "ABN",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Serviços",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "APT",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Milene",
                        "comments": "Db2 Conect não instalado",
                        "typePendencia": "Db2 Conect não instalado",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Milene",
                        "comments": "Não podemos instalar",
                        "typePendencia": "Não podemos instalar",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Milene",
                        "comments": "Não testado ",
                        "typePendencia": "Não testado ",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "Lucas/Milene",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect Aplicativo",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Mainframe",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Mainframe (SMPE, CICS, TABELAS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Web",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "WEB (MYSQL, DEPLOY)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQF",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Config Melhor Nota",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESX",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT Azure",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IVP",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ CICS",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PMS",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Definir politicas",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Produtos BMC",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "QCWEB",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "SHP",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "SH01-SH20",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI22",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHQ2 SHQT",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHS1 SHS2 SHS3",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSJ",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSX",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SJ52",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SN01 SN02 SN03",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Desenvolver, Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "mf03",
        "name": "MF03",
        "description": "Suporte / Apresentações",
        "version": "z/OS 2.4",
        "status": "Pendente",
        "updatedAt": null,
        "applications": [
            {
                "name": "ABN",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "APT",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Pendente",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Pendente",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect Aplicativo",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Mainframe",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Mainframe (SMPE, CICS, TABELAS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Web",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "WEB (MYSQL, DEPLOY)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQF",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Config Melhor Nota",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESX",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT Azure",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IVP",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ CICS",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PMS",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Definir politicas",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Produtos BMC",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "QCWEB",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "SHP",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "SH01-SH20",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI22",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHQ2 SHQT",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHS1 SHS2 SHS3",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSJ",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSX",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SJ52",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SN01 SN02 SN03",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Desenvolver, Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "mf05",
        "name": "MF05",
        "description": " Suporte / Serviço",
        "version": "z/OS 2.4",
        "status": "Pendente",
        "updatedAt": null,
        "applications": [
            {
                "name": "ABN",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "APT",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Pendente",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Pendente",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect Aplicativo",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Mainframe",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (CICS, TABELAS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Web",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (MYSQL, DEPLOY)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQF",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Config Melhor Nota",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESX",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT Azure",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IVP",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ CICS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "nan",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "nan",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PMS",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Definir politicas",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Produtos BMC",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "QCWEB",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "SHP",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "SH01-SH20 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI22",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHQ2 SHQT (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHS1 SHS2 SHS3 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSJ (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSX (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SJ52 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SN01 SN02 SN03 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo CICS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Desenvolver, Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "mf07",
        "name": "MF07",
        "description": "Desenvolvimento",
        "version": "z/OS 2.2",
        "status": "Pendente",
        "updatedAt": null,
        "applications": [
            {
                "name": "ABN",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "APT",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect Aplicativo ",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Mainframe",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (CICS, TABELAS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Web",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (MYSQL, DEPLOY)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQF",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalaçao e Config Melhor Nota",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESX",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT Azure",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IVP",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ CICS",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e configuração",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e configuração",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PMS",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação e Definir politicas",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Produtos BMC",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "QCWEB",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "SHP",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "SH01~SH20 (CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI22",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS (CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3 (CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHQ2 SHQT (CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHS1 SHS2 SHS3 (CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSJ (CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSX (CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SJ52 (CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SN01 SN02 SN03 (CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo CICS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                         "name": "Desenvolver, Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }  
                ]
            },
        ],
    },
    {
        "id": "mf08",
        "name": "MF08",
        "description": "Desenvolvimento",
        "version": "z/OS 2.4",
        "status": "Pendente",
        "updatedAt": null,
        "applications": [
            {
                "name": "ABN",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "APT",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Pendente",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Pendente",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 Connect Aplicativo",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Mainframe",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (CICS, TABELAS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EBK Web",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (MYSQL, DEPLOY)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Avaliações",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Exceção",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "EQF",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação e Config Melhor Nota",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "ESX",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT Azure",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "IVP",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ CICS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "nan",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "MQ IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "nan",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PMS",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Definir politicas",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "Produtos BMC",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "QCWEB",
                "status": "Pendente",
                "tipo": "ECCOX",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "SHP",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "SH01-SH20 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI22",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHQ2 SHQT (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHS1 SHS2 SHS3 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSJ (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SHSX (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SJ52 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "SN01 SN02 SN03 (CICS)",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo CICS",
                "status": "Concluida",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Concluida",
                        "itemObrigatorio": "Sim",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "tipo": "IBM",
                "services": [
                    {
                        "name": "Desenvolver, Instalação",
                        "status": "Pendente",
                        "itemObrigatorio": "Não",
                        "updatedAt": null,
                        "responsible": "",
                        "comments": "",
                        "typePendencia": "",
                        "responsibleHomologacao": ""
                    }
                ]
            }
        ]
    }
] as const; 