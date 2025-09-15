import { Machine } from "@/types/machine";

export const mockMachines: Machine[] = [
    {
        id: "dallas",
        name: "Dallas",
        description: "Homologação / Apresentações",
        version: "z/OS 3.1",
        status: "OK",
        statuses: [
            { name: "APT", type: "status", color: "green" },
            { name: "ABN", type: "status", color: "green" },
            { name: "EK Mainframe", type: "environment", color: "green" },
            { name: "EK Web", type: "environment", color: "green" },
            { name: "ECS", type: "status", color: "green" },
            { name: "EOC", type: "status", color: "green" },
            { name: "EOD", type: "status", color: "green" },
            { name: "EGF", type: "status", color: "green" },
            { name: "ESV", type: "status", color: "green" },
        ],
        stats: {
            installed: 30,
            pending: 0,
            total: 30
        }
    },
    {
        id: "mf03",
        name: "MF03",
        description: "Suporte / Apresentações",
        version: "z/OS 3.1",
        status: "Warning",
        statuses: [
            { name: "APT", type: "status", color: "red" },
            { name: "ABN", type: "status", color: "green" },
            { name: "EK Mainframe", type: "environment", color: "neutral" },
            { name: "EK Web", type: "environment", color: "neutral" },
            { name: "ESX", type: "status", color: "green" },
            { name: "IVP", type: "status", color: "red" },
            { name: "PMS", type: "status", color: "green" },
            { name: "PWD", type: "status", color: "neutral" },
            { name: "EBK Mainframe", type: "environment", color: "green" },
        ],
        stats: {
            installed: 10,
            pending: 20,
            total: 30
        }
    },
    {
        id: "mf05",
        name: "MF05",
        description: "Suporte / Serviço",
        version: "z/OS 2.4",
        status: "OK",
        statuses: [
            { name: "APT", type: "status", color: "green" },
            { name: "ABN", type: "status", color: "green" },
            { name: "EBK Mainframe", type: "environment", color: "green" },
            { name: "EBK Web", type: "environment", color: "green" },
            { name: "ECS", type: "status", color: "green" },
            { name: "EQC", type: "status", color: "green" },
            { name: "EQD", type: "status", color: "green" },
            { name: "EQF", type: "status", color: "green" },
            { name: "ESV", type: "status", color: "green" },
        ],
        stats: {
            installed: 25,
            pending: 5,
            total: 30
        }
    },
    {
        id: "mf06",
        name: "MF06",
        description: "QA",
        version: "z/OS 3.1",
        status: "OK",
        statuses: [
            { name: "APT", type: "status", color: "green" },
            { name: "ABN", type: "status", color: "green" },
            { name: "EBK Mainframe", type: "environment", color: "green" },
            { name: "EBK Web", type: "environment", color: "green" },
            { name: "ECS", type: "status", color: "green" },
            { name: "EQC", type: "status", color: "green" },
            { name: "EQD", type: "status", color: "green" },
            { name: "EQF", type: "status", color: "green" },
            { name: "ESV", type: "status", color: "green" },
        ],
        stats: {
            installed: 15,
            pending: 15,
            total: 30
        }
    },
    {
        id: "mf07",
        name: "MF07",
        description: "Desenvolvimento",
        version: "z/OS 2.4",
        status: "Warning",
        statuses: [
            { name: "APT", type: "status", color: "neutral" },
            { name: "ABN", type: "status", color: "neutral" },
            { name: "EBK Mainframe", type: "environment", color: "neutral" },
            { name: "EBK Web", type: "environment", color: "neutral" },
            { name: "ESX", type: "status", color: "red" },
            { name: "IVP", type: "status", color: "red" },
            { name: "PMS", type: "status", color: "red" },
            { name: "PWD", type: "status", color: "red" },
            { name: "EBK Mainframe", type: "environment", color: "neutral" },
        ],
        stats: {
            installed: 5,
            pending: 25,
            total: 30
        }
    },
    {
        id: "mf08",
        name: "MF08",
        description: "Desenvolvimento",
        version: "z/OS 3.1",
        status: "Warning",
        statuses: [
            { name: "APT", type: "status", color: "red" },
            { name: "ABN", type: "status", color: "red" },
            { name: "EK Mainframe", type: "environment", color: "red" },
            { name: "EK Web", type: "environment", color: "red" },
            { name: "ESX", type: "status", color: "red" },
            { name: "IVP", type: "status", color: "red" },
            { name: "PMS", type: "status", color: "red" },
            { name: "PWD", type: "status", color: "red" },
            { name: "EBK Mainframe", type: "environment", color: "red" },
        ],
        stats: {
            installed: 0,
            pending: 30,
            total: 30
        }
    },
    {
        id: "mf09",
        name: "MF09",
        description: "SandBox Accenture",
        version: "z/OS 2.4",
        status: "OK",
        statuses: [
            { name: "APT", type: "status", color: "green" },
            { name: "ABN", type: "status", color: "green" },
            { name: "EBK Mainframe", type: "environment", color: "green" },
            { name: "EBK Web", type: "environment", color: "green" },
            { name: "ECS", type: "status", color: "green" },
            { name: "EQC", type: "status", color: "green" },
            { name: "EQD", type: "status", color: "green" },
            { name: "EQF", type: "status", color: "green" },
            { name: "ESV", type: "status", color: "green" },
        ],
        stats: {
            installed: 28,
            pending: 2,
            total: 30
        }
    },
];