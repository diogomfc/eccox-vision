// src/types/electron.d.ts

import { Machines } from "./machines";

declare global {
  interface Window {
    electronAPI: {
      getAllMachines: () => Promise<Machines[]>;
      getMachineById: (id: string) => Promise<Machines | null>;
      updateMachine: (machine: Machines) => Promise<{ success: boolean; message: string }>;
    };
  }
}