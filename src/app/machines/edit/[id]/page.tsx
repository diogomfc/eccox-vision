// src/app/machines/edit/[id]/page.tsx
import MachineUpdateClient from "@/components/machines/machine-update-client";
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

export default async function MachineUpdatePage({ params }: PageProps) {
    const { id } = await params;

    return <MachineUpdateClient machineId={id} />;
}