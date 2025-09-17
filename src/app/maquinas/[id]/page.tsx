// // src/app/maquinas/[id]/page.tsx

// import { getMachineById } from "@/server/machine-repository";
// import { MachineDetailsClient } from "@/components/machines/machine-details-client";
// import { mockMachines } from "@/mocks/mockMachines";

// // A função generateStaticParams continua a usar o mock para que o Next.js
// // saiba quais páginas pré-gerar durante o build.
// export async function generateStaticParams() {
//     return mockMachines.map((machine) => ({
//         id: machine.id,
//     }));
// }

// export default async function MachineDetailsPage({ params }: { params: { id: string } }) {
//     const awaitedParams = await params;
//     const machineId = awaitedParams.id;
    
//     // Substituímos a busca no mock pela busca no banco de dados
//     const machine = getMachineById(machineId);

//     if (!machine) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <h1 className="text-2xl text-white">Máquina não encontrada</h1>
//             </div>
//         );
//     }
    
//     return (
//         <MachineDetailsClient machine={machine} />
//     );
// }


// src/app/maquinas/[id]/page.tsx

import { MachineDetailsClient } from "@/components/machines/machine-details-client";
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