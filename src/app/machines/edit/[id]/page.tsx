// src/app/machines/edit/[id]/page.tsx
import MachineUpdateClient from "@/components/machines/machine-update-client";


export default async function MachineUpdatePage({ params }: { params: { id: string } }) {
    const awaitedParams = await params;
    const machineId = awaitedParams.id;

    return <MachineUpdateClient machineId={machineId} />;
}