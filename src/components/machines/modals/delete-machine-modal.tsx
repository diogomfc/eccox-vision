"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Machines } from "@/types/machines";
import { Trash2, Loader2, Server } from "lucide-react";


import ImgServerStatusConcluida from "@/assets/images/img-server-status-ok.svg";
import ImgServerStatusPendente from "@/assets/images/img-server-status-warning.svg";
import Image from "next/image";

interface DeleteMachineModalProps {
  machine: Machines | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (machineId: string) => Promise<void>;
  isDeleting: boolean;
}

export function DeleteMachineModal({ machine, isOpen, onClose, onConfirmDelete, isDeleting }: DeleteMachineModalProps) {
  if (!machine) return null;

  const handleDelete = async () => {
    await onConfirmDelete(machine.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1A1E] text-white border-gray-700">
        <DialogHeader className="flex items-center space-x-2">
          <Trash2 className="h-6 w-6 text-red-500" />
          <DialogTitle className="text-xl font-bold text-red-400">Excluir Máquina</DialogTitle>
          <DialogDescription className="text-gray-400">
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-gray-300">
            Você está prestes a excluir a máquina **"{machine.name}"**.
            Todos os dados e aplicações associados a ela serão permanentemente removidos.
          </p>
          <div className="flex items-center space-x-3 bg-[#0F0F11] p-3 rounded-md border border-gray-700">
            <Image
              src={machine.status === "Concluida" ? ImgServerStatusConcluida : ImgServerStatusPendente}
              alt="Server Status"
                className="h-8 w-8"
                width={32}
                height={32}
            />
            <div>
              <p className="text-sm font-medium">{machine.name}</p>
              <p className="text-xs text-gray-500">{machine.description}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between items-center gap-2">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isDeleting}
            className="w-full sm:w-auto bg-transparent text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Sim, excluir
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}