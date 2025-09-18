// src/components/machines/machine-edit-modal.tsx
"use client";

import { useState } from "react";
import type { Machines } from "@/types/machines";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Loader2, CalendarIcon, Edit3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MachineEditModalProps {
  machine: Machines;
  onClose: () => void;
  onUpdated: () => void;
}

export function MachineEditModal({
  machine,
  onClose,
  onUpdated,
}: MachineEditModalProps) {
  const [editedMachine, setEditedMachine] = useState<Machines>(() => {
    // Inicializa o estado do editedMachine com uma data válida
    return {
      ...machine,
      updatedAt: machine.updatedAt
        ? new Date(machine.updatedAt).toISOString()
        : null,
    };
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedMachine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Dedicated handler for the top-level status
  const handleStatusChange = (value: "Concluida" | "Pendente") => {
    setEditedMachine((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setEditedMachine((prev) => ({
        ...prev,
        updatedAt: date.toISOString(),
      }));
    } else {
      setEditedMachine((prev) => ({
        ...prev,
        updatedAt: null,
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      // Remove applications and services from the editedMachine object
      // to ensure only the main machine data is sent for update.
      const machineToSave = {
        ...editedMachine,
        applications: [],
      };

      const result = await window.electronAPI.updateMachine(machineToSave);

      if (result.success) {
        setMessage("Máquina atualizada com sucesso!");
        setTimeout(() => {
          onUpdated();
          onClose();
        }, 1500);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Falha ao atualizar a máquina:", error);
      setMessage("Erro ao atualizar a máquina. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className=" flex flex-col p-0 bg-[#0A0A0B] text-gray-200 border border-amber-500/30">
        <DialogHeader className="border-b border-[#1F1F23] p-6 bg-gradient-to-r from-[#0F0F11] to-[#1A1A1D] rounded-t-lg">
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
             <Edit3 size={16} className="text-amber-500" />
             <span className="font-medium text-gray-100">Editando Máquina: {machine.name}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Edite os detalhes principais da máquina.
          </DialogDescription>
        </DialogHeader>

        {/* Removed Tabs for applications/services to focus on machine details */}
        <CardContent className="space-y-4 p-6">
         
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="text-gray-400">
              Nome da Máquina
            </Label>
            <Input
              id="name"
              name="name"
              value={editedMachine.name}
              onChange={handleInputChange}
              className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500 w-full"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description" className="text-gray-400">
              Descrição
            </Label>
            <Input
              id="description"
              name="description"
              value={editedMachine.description}
              onChange={handleInputChange}
              className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 w-full hover:bg-[#23232B] hover:text-gray-500"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="version" className="text-gray-400">
              Versão
            </Label>
            <Input
              id="version"
              name="version"
              value={editedMachine.version}
              onChange={handleInputChange}
              className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 w-full hover:bg-[#23232B] hover:text-gray-500"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="status" className="text-gray-400">
              Status
            </Label>
            <Select
              value={editedMachine.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger
                className={`bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 w-full cursor-pointer ${
                  editedMachine.status === "Concluida"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
               <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] ">
                <SelectItem value="Concluida" className="cursor-pointer focus:bg-green-600/10">
                  <span className="text-green-400">Concluída</span>
                </SelectItem>
                <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10">
                  <span className="text-red-400">Pendente</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="updatedAt" className="text-gray-400">
              Última Atualização
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal bg-[#1A1A1D] border-[#2A2A2D] text-gray-200 focus:!border-amber-500 hover:bg-[#23232B] hover:text-gray-500 cursor-pointer"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {editedMachine.updatedAt ? (
                    format(new Date(editedMachine.updatedAt), "PPP", {
                      locale: ptBR,
                    })
                  ) : (
                    <span className="text-gray-400">Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
                <Calendar
                  mode="single"
                  selected={
                    editedMachine.updatedAt
                      ? new Date(editedMachine.updatedAt)
                      : undefined
                  }
                  onSelect={handleDateChange}
                  className="bg-[#1A1A1E] text-gray-200 "
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>

          <div className="border-t border-[#1F1F23] p-2 bg-[#0F0F11] rounded-b-lg">
          {message && (
            <div
              className={`p-3 rounded-lg text-center font-medium mb-4 ${
                message.includes("sucesso")
                  ? "bg-green-600/20 text-green-400"
                  : "bg-red-600/20 text-red-400"
              }`}
            >
              {message}
            </div>
          )}
          <div className="flex justify-end gap-2 py-4 px-6">
            <Button
              onClick={onClose}
              disabled={isSaving}
              className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] cursor-pointer"
            >
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg min-w-[120px] cursor-pointer"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              {isSaving ? "Aguarde..." : "Salvar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
