"use client";

import { Machines } from "@/types/machines";
import { MachineListItem } from "./machine-list-item"; // Import the new component

interface MachineListProps {
  machines: Machines[];
}

export function MachineList({ machines }: MachineListProps) {
  return (
    <div className="space-y-2 cursor-pointer">
      {machines.map((machine, index) => (
        <MachineListItem key={machine.id} machine={machine} index={index} />
      ))}
    </div>
  );
}