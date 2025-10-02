// src/components/machines/machine-list.tsx

"use client";

import { Machines } from "@/types/machines";
import { MachineListItem } from "./machine-list-item";


// Definimos a interface de props para o componente `MachineList`
interface MachineListProps {
  machines: Machines[];
  handleOpenDeleteModal: (machine: Machines) => void;
}

export function MachineList({ machines, handleOpenDeleteModal }: MachineListProps) {
    return (
        <>
            <div className="space-y-2 cursor-pointer">
                {machines.map((machine, index) => (
                    <MachineListItem 
                        key={machine.id} 
                        machine={machine} 
                        index={index} 
                        onDelete={() => handleOpenDeleteModal(machine)} 
                    />
                ))}
            </div>
        </>
    );
}