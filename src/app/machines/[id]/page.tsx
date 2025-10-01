// src/app/machines/[id]/page.tsx
import { MachineDetailsClient } from "@/components/machines/details/machine-details-client";
import { mockMachines } from "@/mocks/mockMachines";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Necessário para export estático
export async function generateStaticParams() {
  // Gera parâmetros baseado nos dados mock ou dados reais
  return mockMachines.map((machine) => ({
    id: machine.id,
  }));
}

export default async function MachineDetailsPage({ params }: PageProps) {
    const { id } = await params;
    return <MachineDetailsClient machineId={id} />;
}
