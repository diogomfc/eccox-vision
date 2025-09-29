// src/app/machines/edit/[id]/page.tsx
import MachineUpdateClient from "@/components/machines/machine-update-client";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MachineUpdatePage({ params }: PageProps) {
    const { id } = await params;

    return <MachineUpdateClient machineId={id} />;
}