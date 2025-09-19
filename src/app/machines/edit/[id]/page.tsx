// src/app/machines/edit/[id]/page.tsx

import MachineUpdateClient from "@/components/machines/machine-update-client";
import { mockMachines } from "@/mocks/mockMachines";

// Gera os parâmetros estáticos para exportação
export async function generateStaticParams() {
    return mockMachines.map((machine) => ({
        id: machine.id,
    }));
}

export default async function MachineUpdatePage({ params }: { params: { id: string } }) {
    const awaitedParams = await params;
    const machineId = awaitedParams.id;

    return <MachineUpdateClient machineId={machineId} />;
}