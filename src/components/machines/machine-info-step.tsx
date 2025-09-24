// src/components/machines/shared/machine-info-step.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import type { Machines, StatusType } from "@/types/machines";
import { cn } from "@/lib/utils";

export type modeType = 'create' | 'edit';

interface MachineInfoStepProps {
  machine: Partial<Machines>;
  onMachineChange: (machine: Partial<Machines>) => void;
  mode: modeType;
}

const systemVersions = [
  { value: "z/OS 3.1", label: "z/OS 3.1" },
  { value: "z/OS 2.5", label: "z/OS 2.5" },
  { value: "z/OS 2.4", label: "z/OS 2.4" },
  { value: "z/OS 2.3", label: "z/OS 2.3" },
  { value: "z/OS 2.2", label: "z/OS 2.2" },
];

export default function MachineInfoStep({
  machine,
  onMachineChange,
  mode = "create"
}: MachineInfoStepProps) {
  const isEditMode = mode === "edit";
  const [openCombobox, setOpenCombobox] = useState(false);
  
  const themeConfig = {
    focusColor: isEditMode ? "focus:!border-amber-500" : "focus:!border-blue-500",
    ringColor: isEditMode ? "focus:ring-amber-500/20" : "focus:ring-blue-500/20",
    accentColor: isEditMode ? "text-amber-400" : "text-blue-400",
  };

  const handleFieldChange = (
    field: keyof Machines,
    value: string | Date | undefined
  ) => {
    const finalValue =
      value instanceof Date ? value.toISOString() : value;
    onMachineChange({
      ...machine,
      [field]: finalValue,
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
          <Label htmlFor="name" className="text-base font-medium text-gray-200">
            Nome da Máquina <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            value={machine.name || ""}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${themeConfig.focusColor} text-gray-100`}
            autoFocus
          />
          <p className="text-xs text-gray-500">Nome identificador único da máquina Ex: Dallas, Houston...</p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="version" className="text-base font-medium text-gray-200">
            Versão do Sistema <span className="text-red-400">*</span>
          </Label>
          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  id="version"
                  value={machine.version || ""}
                  onChange={(e) => handleFieldChange('version', e.target.value)}
                  className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${themeConfig.focusColor} text-gray-100 pr-10`}
                  placeholder="Selecione ou digite uma versão..."
                />
                <Button
                  variant="ghost"
                  role="combobox"
                  aria-expanded={openCombobox}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                  onClick={() => setOpenCombobox(prev => !prev)}
                >
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </div>
            </PopoverTrigger>
            {/* ====================================================== */}
            {/* CORREÇÃO DE ESTILO APLICADA AQUI                      */}
            {/* ====================================================== */}
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-[#0F0F11] border-gray-700">
              <Command className="bg-[#0F0F11] text-gray-200">
                <CommandInput
                  placeholder="Buscar versão..."
                  className="border-0 text-gray-200 placeholder:text-gray-500 focus:ring-0"
                />
                <CommandEmpty className="py-6 text-center text-sm text-gray-500">Nenhuma versão encontrada.</CommandEmpty>
                <CommandGroup>
                  {systemVersions.map((version) => (
                    <CommandItem
                      key={version.value}
                      value={version.value}
                      onSelect={(currentValue) => {
                        handleFieldChange('version', currentValue === machine.version ? "" : currentValue);
                        setOpenCombobox(false);
                      }}
                      className="text-gray-300 aria-selected:bg-blue-600/20 aria-selected:text-blue-300 cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          machine.version === version.value ? "opacity-100 text-blue-400" : "opacity-0"
                        )}
                      />
                      {version.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <p className="text-xs text-gray-500">Versão do sistema operacional Ex: z/OS 3.1, z/OS 2.4...</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="description" className="text-base font-medium text-gray-200">
          Descrição <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="description"
          value={machine.description || ""}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          className={`min-h-[50px] bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-base resize-none text-gray-200`}
        />
        <p className="text-xs text-gray-500">Breve descrição sobre a máquina e sua função</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="status" className="text-base font-medium text-gray-200">
            Status
          </Label>
          <Select value={machine.status} onValueChange={(value: StatusType) => handleFieldChange('status', value)} disabled>
            <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${themeConfig.focusColor} text-gray-100`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
              <SelectItem value="Concluída" className="cursor-pointer focus:bg-green-600/10"><span className="text-green-400">Concluída</span></SelectItem>
              <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10"><span className="text-red-400">Pendente</span></SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">O status é calculado automaticamente com base nas aplicações.</p>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="updatedAt" className="text-base font-medium text-gray-200">
            Data de Entrega Prevista
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={`justify-start w-full text-left font-normal bg-[#1A1A1D] border-[#2A2A2D] text-gray-200 ${themeConfig.focusColor}`} disabled>
                <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                {machine.updatedAt ? format(new Date(machine.updatedAt), "PPP", { locale: ptBR }) : <span className="text-gray-400">Calculada automaticamente</span>}
              </Button>
            </PopoverTrigger>
          </Popover>
          <p className="text-xs text-gray-500">A data é calculada com base na próxima entrega de serviço.</p>
        </div>
      </div>
    </motion.div>
  );
}