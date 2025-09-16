// Nao ha "use client" aqui. Este arquivo e um Server Component.
import { mockMachines } from "@/mocks/mockMachines";
import { MachineDetailsClient } from "@/components/machines/machine-details-client";

// A função generateStaticParams deve estar neste arquivo
export async function generateStaticParams() {
    return mockMachines.map((machine) => ({
        id: machine.id,
    }));
}

export default async function MachineDetailsPage({ params }: { params: { id: string } }) {
    const awaitedParams = await params;
    const machineId = awaitedParams.id;
    const machine = mockMachines.find((m) => m.id === machineId);

    if (!machine) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl text-white">Máquina não encontrada</h1>
            </div>
        );
    }
    
    return (
        <MachineDetailsClient machine={machine} />
    );
}