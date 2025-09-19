// src/app/maquinas/[id]/page.tsx
import { MachineDetailsClient } from "@/components/machines/details/machine-details-client";
import { mockMachines } from "@/mocks/mockMachines";

// A função generateStaticParams continua a usar o mock
export async function generateStaticParams() {
    return mockMachines.map((machine) => ({
        id: machine.id,
    }));
}

export default async function MachineDetailsPage({ params }: { params: { id: string } }) {
    const awaitedParams = await params;
    const machineId = awaitedParams.id;
    
    // Passa apenas o ID da máquina para o Client Component
    return <MachineDetailsClient machineId={machineId} />;
}