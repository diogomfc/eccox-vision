export interface Status {
    name: string;
    color: string;
}

export interface Software {
    name: string;
    type: string;
    color: string;
}

export interface Machine {
    id: string;
    name: string;
    description: string;
    version: string;
    status: string;
    statuses: Software[];
    stats: {
        installed: number;
        pending: number;
        total: number;
    };
}