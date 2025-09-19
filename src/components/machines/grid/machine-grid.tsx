// src/components/machines/machine-grid.tsx
"use client";

import { Machines } from "@/types/machines";
import { MachineGridItem } from "./machine-grid-item";


interface MachineGridProps {
  machines: Machines[];
}

export function MachineGrid({ machines }: MachineGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-min pb-4">
      {machines.map((machine, index) => (
        <MachineGridItem key={machine.id} machine={machine} index={index} />
      ))}
    </div>
  );
}

