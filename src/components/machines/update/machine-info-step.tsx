// src/components/machine-update/MachineInfoStep.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

// Tipos para o componente
interface MachineInfoStepProps {
  editingMachine: any; // Substitua 'any' pelo tipo real se estiver disponível
  handleMachineInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleStatusChange: (value: "Concluida" | "Pendente" | "Em andamento") => void;
  handleDateChange: (date: Date | undefined) => void;
}

export default function MachineInfoStep({
  editingMachine,
  handleMachineInputChange,
  handleStatusChange,
  handleDateChange,
}: MachineInfoStepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label
            htmlFor="name"
            className="text-base font-medium text-gray-200 flex items-center gap-2"
          >
            Nome da Máquina
            <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={editingMachine.name || ""}
            onChange={handleMachineInputChange}
            className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
          />
          <p className="text-xs text-gray-500">
            Nome identificador único da máquina Ex: Dallas, Houston, Miami...
          </p>
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="version"
            className="text-base font-medium text-gray-200 flex items-center gap-2"
          >
            Versão do Sistema
            <span className="text-red-400">*</span>
          </Label>
          <Input
            id="version"
            name="version"
            value={editingMachine.version || ""}
            onChange={handleMachineInputChange}
            className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
            placeholder=""
          />
          <p className="text-xs text-gray-500">
            Versão do sistema operacional Ex: z/OS 3.1, z/OS 2.4...
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <Label
          htmlFor="description"
          className="text-base font-medium text-gray-200 flex items-center gap-2"
        >
          Descrição
          <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          value={editingMachine.description || ""}
          onChange={handleMachineInputChange}
          className="min-h-[50px] bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 focus:ring-1 focus:ring-amber-500/20 text-gray-100 text-base resize-none transition-all duration-200"
          placeholder=""
        />
        <p className="text-xs text-gray-500">
          Breve descrição sobre a máquina e sua função
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label
            htmlFor="status"
            className="text-base font-medium text-gray-200"
          >
            Status Inicial
          </Label>
          <Select
            value={editingMachine.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] ">
              <SelectItem
                value="Concluida"
                className="cursor-pointer focus:bg-green-600/10"
              >
                <span className="text-green-400">Concluída</span>
              </SelectItem>
              <SelectItem
                value="Pendente"
                className="cursor-pointer focus:bg-red-600/10"
              >
                <span className="text-red-400">Pendente</span>
              </SelectItem>
              <SelectItem
                value="Em andamento"
                className="cursor-pointer focus:bg-amber-600/10"
              >
                <span className="text-amber-400">Em andamento</span>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Status atual da configuração
          </p>
        </div>
        <div className="space-y-3 ">
          <Label
            htmlFor="updatedAt"
            className="text-base font-medium text-gray-200"
          >
            Data de Criação
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start w-full text-left font-normal bg-[#1A1A1D] border-[#2A2A2D] text-gray-200 focus:!border-amber-500 hover:bg-[#23232B] hover:text-gray-500 cursor-pointer"
              >
                <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                {editingMachine.updatedAt ? (
                  format(new Date(editingMachine.updatedAt), "PPP", {
                    locale: ptBR,
                  })
                ) : (
                  <span className="text-gray-400">Selecione a data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1A1A1D] border-gray-700">
              <Calendar
                mode="single"
                selected={
                  editingMachine.updatedAt
                    ? new Date(editingMachine.updatedAt)
                    : new Date()
                }
                onSelect={handleDateChange}
                className="bg-[#1A1A1D] text-gray-200"
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-gray-500">
            Data de registro no sistema
          </p>
        </div>
      </div>
      <div className="bg-amber-600/10 border border-amber-600/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-amber-600 rounded-full mt-0.5">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-400 mb-1">
              Próximo passo
            </h4>
            <p className="text-xs text-amber-300/80">
              Após editar as informações básicas, você poderá adicionar, remover
              ou editar aplicações e seus serviços específicos.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}