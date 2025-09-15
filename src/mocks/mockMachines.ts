import { Machines } from "@/types/machines";

export const mockMachines: Machines[] = [
    {
        "id": "dallas",
        "name": "Dallas",
        "description": "Homologação / Apresentações",
        "version": "z/OS 3.1",
        "status": "Pendente",
        "applications": [
            {
                "name": "ABN",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Serviços",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "APT",
                "status": "Pendente",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Concluida"
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Concluida"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Concluida"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Concluida"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Concluida"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Concluida"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Pendente"
                    },
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect Aplicativo",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "EBK Mainframe",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Mainframe (SMPE, CICS, TABELAS)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EBK Web",
                "status": "Concluida",
                "services": [
                    {
                        "name": "WEB (MYSQL, DEPLOY)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida"
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente"
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida"
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente"
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQF",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Config Melhor Nota",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESX",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "GIT Azure",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IVP",
                "status": "Concluida",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "MQ CICS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "MQ IMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "PMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Definir politicas",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "Produtos BMC",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "QCWEB",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "SHP",
                "status": "Pendente",
                "services": [
                    {
                        "name": "SH01-SH20",
                        "status": "Concluida"
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPI22",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPS",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHQ2 SHQT",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHS1 SHS2 SHS3",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHSJ",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHSX",
                        "status": "Concluida"
                    },
                    {
                        "name": "SJ52",
                        "status": "Concluida"
                    },
                    {
                        "name": "SN01 SN02 SN03",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Desenvolver, Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            }
        ]
    },
    {
        "id": "mf03",
        "name": "MF03",
        "description": "Suporte / Apresentações",
        "version": "z/OS 2.4",
        "status": "Pendente",
        "applications": [
            {
                "name": "ABN",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "APT",
                "status": "Pendente",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Concluida"
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Concluida"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Concluida"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Concluida"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Concluida"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Pendente"
                    },
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect Aplicativo",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação(Deploy)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "EBK Mainframe",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (CICS, TABELAS)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EBK Web",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (MYSQL, DEPLOY)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida"
                    },
                    {
                        "name": "Delta",
                        "status": "Concluida"
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida"
                    },
                    {
                        "name": "Delta",
                        "status": "Concluida"
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQF",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalaçao e Config Melhor Nota",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESX",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "GIT Azure",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IVP",
                "status": "Concluida",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "MQ CICS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação e configuração",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "MQ IMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e configuração",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "PMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e Definir politicas",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "Produtos BMC",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "QCWEB",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "SHP",
                "status": "Concluida",
                "services": [
                    {
                        "name": "SH01~SH20 (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPI22",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3 (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHQ2 SHQT (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHS1 SHS2 SHS3 (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHSJ (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHSX (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SJ52 (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SN01 SN02 SN03 (CICS)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo CICS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            }
        ]
    },
    {
        "id": "mf05",
        "name": "MF05",
        "description": " Suporte / Serviço",
        "version": "z/OS 2.4",
        "status": "Pendente",
        "applications": [
            {
                "name": "ABN",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "APT",
                "status": "Pendente",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Pendente"
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Pendente"
                    },
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect Aplicativo",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "EBK Mainframe",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação (CICS, TABELAS)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EBK Web",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação (MYSQL, DEPLOY)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Pendente"
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente"
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Pendente"
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente"
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Concluida"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQF",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Config Melhor Nota",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESX",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "GIT Azure",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IVP",
                "status": "Pendente",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "MQ CICS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "nan",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "MQ IMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "nan",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "PMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Definir politicas",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "Produtos BMC",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "QCWEB",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "SHP",
                "status": "Pendente",
                "services": [
                    {
                        "name": "SH01-SH20 (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPI22",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPS (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3 (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHQ2 SHQT (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHS1 SHS2 SHS3 (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHSJ (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHSX (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SJ52 (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SN01 SN02 SN03 (CICS)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação (Deploy)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Desenvolver, Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            }
        ]
    },
    {
        "id": "mf07",
        "name": "MF07",
        "description": "Desenvolvimento",
        "version": "z/OS 2.2",
        "status": "Pendente",
        "applications": [
            {
                "name": "ABN",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "APT",
                "status": "Pendente",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Concluida"
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Concluida"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Concluida"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Concluida"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Concluida"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Concluida"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Concluida"
                    },
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect Aplicativo ",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "EBK Mainframe",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação (CICS, TABELAS)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EBK Web",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação (MYSQL, DEPLOY)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida"
                    },
                    {
                        "name": "Delta",
                        "status": "Concluida"
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Concluida"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Concluida"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Concluida"
                    },
                    {
                        "name": "Delta",
                        "status": "Concluida"
                    },
                    {
                        "name": "Exceção",
                        "status": "Concluida"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQF",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Config Melhor Nota",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESX",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "GIT Azure",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IVP",
                "status": "Concluida",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "MQ CICS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "nan",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "MQ IMS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "nan",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "PMS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Definir politicas",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "Produtos BMC",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "QCWEB",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "SHP",
                "status": "Concluida",
                "services": [
                    {
                        "name": "SH01~SH20 (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPI22",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3 (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHQ2 SHQT (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHS1 SHS2 SHS3 (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHSJ (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SHSX (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SJ52 (CICS)",
                        "status": "Concluida"
                    },
                    {
                        "name": "SN01 SN02 SN03 (CICS)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo",
                "status": "Pendente",
                "services": [
                    {
                        "name": "nan",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo CICS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Desenvolver, Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            }
        ]
    },
    {
        "id": "mf08",
        "name": "MF08",
        "description": "Desenvolvimento",
        "version": "z/OS 2.4",
        "status": "Pendente",
        "applications": [
            {
                "name": "ABN",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "APT",
                "status": "Pendente",
                "services": [
                    {
                        "name": "APT Change Alert",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT Datamover",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Batch (JCL e PGM BATCH)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For CICS (Multi region)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for DDF (BND)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery  Programs",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Tables",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery  Transaction",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discovery Changeman",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery DLI",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Endevor",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery GIT",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery JOB",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Library",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Schedule",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT for Discovery Typing",
                        "status": "Concluida"
                    },
                    {
                        "name": "APT for Discoverys Typing for BND",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For IMS (DB)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT For IMS (DC)",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT Logstream",
                        "status": "Pendente"
                    },
                    {
                        "name": "APT SnapShot",
                        "status": "Pendente"
                    },
                    {
                        "name": "LDAP (YES/NO)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "BITBUCKET",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CA-Endevor",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.2 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.5 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    },
                    {
                        "name": "z/OS Connect",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 5.6 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "CICS 6.1 (Multi Region)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão com IMS DB",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão EXCI",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Eza TCP SOCKET",
                        "status": "Pendente"
                    },
                    {
                        "name": "LOGIN via CESN",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPI",
                        "status": "Pendente"
                    },
                    {
                        "name": "PLTPS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "Changeman (Simulador)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Criação de pacotes",
                        "status": "Pendente"
                    },
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    },
                    {
                        "name": "Script de pacote",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 Connect Aplicativo",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (C/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V12 (S/Vírgula)",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (C/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "DB2 V13 (S/Vírgula)",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Funcional",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "EBK Mainframe",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação (CICS, TABELAS)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EBK Web",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação (MYSQL, DEPLOY)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ECS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação (SMPE, CICS)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQC",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Pendente"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Pendente"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Pendente"
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente"
                    },
                    {
                        "name": "Exceção",
                        "status": "Pendente"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQD",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Abono",
                        "status": "Pendente"
                    },
                    {
                        "name": "Avaliações",
                        "status": "Pendente"
                    },
                    {
                        "name": "Cadastro de Legado",
                        "status": "Pendente"
                    },
                    {
                        "name": "Delta",
                        "status": "Pendente"
                    },
                    {
                        "name": "Exceção",
                        "status": "Pendente"
                    },
                    {
                        "name": "Massa de teste para cada regra",
                        "status": "Pendente"
                    },
                    {
                        "name": "Nota Vigente",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "EQF",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e Config Melhor Nota",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESV",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "ESX",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "GIT Azure",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "GIT LAB",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação e definição de branchs",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DB 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "DBRC",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 14",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IMS/DC 15",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão DB2",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão MQ",
                        "status": "Pendente"
                    },
                    {
                        "name": "Conexão z/OS Connect",
                        "status": "Pendente"
                    },
                    {
                        "name": "SPOC",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "IVP",
                "status": "Pendente",
                "services": [
                    {
                        "name": "IVP1, IVP2, IVP3",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "MQ CICS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "nan",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "MQ IMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "nan",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "PMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Definir politicas",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "PWD",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Concluida"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "Produtos BMC",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "QCWEB",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Instalação (DEPLOY)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "ECCOX"
            },
            {
                "name": "SHP",
                "status": "Pendente",
                "services": [
                    {
                        "name": "SH01-SH20 (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SH22-SH23 (CICS - IMS DB)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPI01 e SHPI12 (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPI22",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPI90 (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPIMQ2B-SHPIMQTB (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPS (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPS1 (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPS1J (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPS1X (IMS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHPX ST03 ST13 STWQ STH3 (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHQ2 SHQT (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHS1 SHS2 SHS3 (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHSJ (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SHSX (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SJ52 (CICS)",
                        "status": "Pendente"
                    },
                    {
                        "name": "SN01 SN02 SN03 (CICS)",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Conexão com Aplicativo de teste",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão com CICS",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão com DB2",
                        "status": "Concluida"
                    },
                    {
                        "name": "Conexão com IMS",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo CICS",
                "status": "Concluida",
                "services": [
                    {
                        "name": "Instalação( Deploy)",
                        "status": "Concluida"
                    }
                ],
                "tipo": "IBM"
            },
            {
                "name": "z/OS Connect Aplicativo IMS",
                "status": "Pendente",
                "services": [
                    {
                        "name": "Desenvolver, Instalação",
                        "status": "Pendente"
                    }
                ],
                "tipo": "IBM"
            }
        ]
    }
] as const;