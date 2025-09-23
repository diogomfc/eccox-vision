// src/components/machines/shared/machine-info-step.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import type { Machines, StatusType } from "@/types/machines";


export type modeType = 'create' | 'edit';

interface MachineInfoStepProps {
  machine: Partial<Machines>;
  onMachineChange: (machine: Partial<Machines>) => void;
  mode: modeType;
}

export default function MachineInfoStep({
  machine,
  onMachineChange,
  mode = "create"
}: MachineInfoStepProps) {
  const isEditMode = mode === "edit";
  
  // Configuração de cores baseada no modo
  const themeConfig = {
    focusColor: isEditMode ? "focus:!border-amber-500" : "focus:!border-blue-500",
    ringColor: isEditMode ? "focus:ring-amber-500/20" : "focus:ring-blue-500/20",
    accentColor: isEditMode ? "text-amber-400" : "text-blue-400",
    accentColorSecondary: isEditMode ? "text-amber-300/80" : "text-blue-300/80",
    bgAccent: isEditMode ? "bg-amber-600/10" : "bg-blue-600/10",
    borderAccent: isEditMode ? "border-amber-600/20" : "border-blue-600/20",
    dotAccent: isEditMode ? "bg-amber-600" : "bg-blue-600",
    selectFocusGreen: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-green-600/10",
    selectFocusRed: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-red-600/10",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onMachineChange({
      ...machine,
      [name]: value,
    });
  };

  const handleStatusChange = (value: StatusType) => {
    onMachineChange({
      ...machine,
      status: value,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    onMachineChange({
      ...machine,
      updatedAt: date ? date.toISOString() : new Date().toISOString(),
    });
  };

  return (
    <motion.div
      key="machine-info"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-base font-medium text-gray-200 flex items-center gap-2">
            Nome da Máquina
            <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={machine.name || ""}
            onChange={handleInputChange}
            className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
          />
          <p className="text-xs text-gray-500">Nome identificador único da máquina Ex: Dallas, Houston, Miami...</p>
        </div>
        <div className="space-y-3">
          <Label htmlFor="version" className="text-base font-medium text-gray-200 flex items-center gap-2">
            Versão do Sistema
            <span className="text-red-400">*</span>
          </Label>
          <Input
            id="version"
            name="version"
            value={machine.version || ""}
            onChange={handleInputChange}
            className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
            placeholder=""
          />
          <p className="text-xs text-gray-500">Versão do sistema operacional Ex: z/OS 3.1, z/OS 2.4...</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="description" className="text-base font-medium text-gray-200 flex items-center gap-2">
          Descrição
          <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          value={machine.description || ""}
          onChange={handleInputChange}
          className={`min-h-[50px] bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} ${themeConfig.ringColor} focus:ring-1 text-gray-100 text-base resize-none transition-all duration-200`}
          placeholder=""
        />
        <p className="text-xs text-gray-500">Breve descrição sobre a máquina e sua função</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="status" className="text-base font-medium text-gray-200">
            Status {isEditMode ? "Atual" : "Inicial"}
          </Label>
          <Select
            value={machine.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
              <SelectItem value="Concluida" className={`cursor-pointer ${themeConfig.selectFocusGreen}`}>
                <span className="text-green-400">Concluída</span>
              </SelectItem>
              <SelectItem value="Pendente" className={`cursor-pointer ${themeConfig.selectFocusRed}`}>
                <span className="text-red-400">Pendente</span>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">Status atual da configuração</p>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="updatedAt" className="text-base font-medium text-gray-200">
            Data de {isEditMode ? "Atualização" : "Criação"}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`justify-start w-full text-left font-normal bg-[#1A1A1D] border-[#2A2A2D] text-gray-200 ${themeConfig.focusColor} hover:bg-[#23232B] hover:text-gray-500 cursor-pointer`}
              >
                <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                {machine.updatedAt ? (
                  format(new Date(machine.updatedAt), "PPP", {
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
                  machine.updatedAt
                    ? new Date(machine.updatedAt)
                    : new Date()
                }
                onSelect={handleDateChange}
                className="bg-[#1A1A1D] text-gray-200"
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-gray-500">
            Data de {isEditMode ? "última atualização" : "registro no sistema"}
          </p>
        </div>
      </div>
      
      <div className={`${themeConfig.bgAccent} border ${themeConfig.borderAccent} rounded-lg p-4`}>
        <div className="flex items-start gap-3">
          <div className={`p-1 ${themeConfig.dotAccent} rounded-full mt-0.5`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <h4 className={`text-sm font-medium ${themeConfig.accentColor} mb-1`}>Próximo passo</h4>
            <p className={`text-xs ${themeConfig.accentColorSecondary}`}>
              {isEditMode 
                ? "Após atualizar as informações básicas, você poderá modificar aplicações e seus serviços."
                : "Após definir as informações básicas, você poderá adicionar aplicações e configurar seus serviços específicos."
              }
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}