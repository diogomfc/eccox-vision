// src/components/machine-update/ServiceForm.tsx
"use client";

import {
  CalendarIcon,
  Edit3,
  Plus,
  Save,
  X
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
import { Service } from "@/types/machines";

// Props do componente
interface ServiceFormProps {
  formTitle: string;
  serviceState: Partial<Service>;
  setServiceState: React.Dispatch<React.SetStateAction<Partial<Service>>>;
  onSave: () => void;
  onCancel: () => void;
  isNewService: boolean;
}

export default function ServiceForm({
  formTitle,
  serviceState,
  setServiceState,
  onSave,
  onCancel,
  isNewService,
}: ServiceFormProps) {
  const handleDateChange = (date: Date | undefined) => {
    setServiceState((prev) => ({
      ...prev,
      updatedAt: date ? date.toISOString() : null,
    }));
  };

  const formBorderColor = isNewService ? "border-blue-500/30" : "border-amber-500/30";
  const saveButtonColor = isNewService ? "bg-blue-600/50 hover:bg-blue-700/50" : "bg-amber-600/50 hover:bg-amber-700/50";
  const focusBorderColor = isNewService ? "focus:!border-blue-500" : "focus:!border-amber-500";
  const icon = isNewService ? <Plus className="w-3 h-3 text-white" /> : <Edit3 className="w-3 h-3 text-white" />;


  return (
    <div className={`p-3 bg-[#0F0F11] border ${formBorderColor} rounded-lg mb-3`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-1 rounded-full ${isNewService ? "bg-blue-500" : "bg-amber-500"}`}>
          {icon}
        </div>
        <h4 className={`font-medium ${isNewService ? "text-blue-500" : "text-amber-500"}`}>
           {formTitle}
        </h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {/* Campo Nome */}
        <div className="space-y-2 col-span-2">
          <Label className="text-xs text-gray-200">
            Nome *
          </Label>
          <Input
            value={serviceState.name || ""}
            onChange={(e) =>
              setServiceState((prev) => ({ ...prev, name: e.target.value }))
            }
            className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${focusBorderColor} text-gray-200 hover:bg-[#23232B] hover:text-gray-500`}
          />
        </div>

        {/* Campo Status */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-200">
            Status
          </Label>
          <Select
            value={serviceState.status || "Pendente"}
            onValueChange={(value: "Concluida" | "Pendente" | "Em andamento") =>
              setServiceState((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${focusBorderColor} text-gray-200 hover:bg-[#23232B] hover:text-gray-500`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
              <SelectItem value="Concluida" className="cursor-pointer focus:bg-green-600/10">
                <span className="text-green-400">Concluída</span>
              </SelectItem>
              <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10">
                <span className="text-red-400">Pendente</span>
              </SelectItem>
              <SelectItem value="Em andamento" className="cursor-pointer focus:bg-amber-600/10">
                <span className="text-amber-400">Em andamento</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Campo Obrigatório */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-200">
            Obrigatório
          </Label>
          <Select
            value={serviceState.itemObrigatorio || "Sim"}
            onValueChange={(value: "Sim" | "Não") =>
              setServiceState((prev) => ({ ...prev, itemObrigatorio: value }))
            }
          >
            <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${focusBorderColor} text-gray-200 hover:bg-[#23232B] hover:text-gray-500`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
              <SelectItem value="Sim" className="cursor-pointer focus:bg-green-600/10">
                <span className="text-green-400">Sim</span>
              </SelectItem>
              <SelectItem value="Não" className="cursor-pointer focus:bg-red-600/10">
                <span className="text-red-400">Não</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Campo Responsável */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-200">
            Responsável
          </Label>
          <Input
            value={serviceState.responsible || ""}
            onChange={(e) =>
              setServiceState((prev) => ({ ...prev, responsible: e.target.value }))
            }
            className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${focusBorderColor} text-gray-200 hover:bg-[#23232B] hover:text-gray-500`}
          />
        </div>

        {/* Campo Responsável Homologação */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-200">
            Responsável Homologação
          </Label>
          <Input
            value={serviceState.responsibleHomologacao || ""}
            onChange={(e) =>
              setServiceState((prev) => ({ ...prev, responsibleHomologacao: e.target.value }))
            }
            className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${focusBorderColor} text-gray-200 hover:bg-[#23232B] hover:text-gray-500`}
          />
        </div>

        {/* Campo Tipo Pendência */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-200">
            Tipo Pendência
          </Label>
          <Input
            value={serviceState.typePendencia || ""}
            onChange={(e) =>
              setServiceState((prev) => ({ ...prev, typePendencia: e.target.value }))
            }
            className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${focusBorderColor} text-gray-200 hover:bg-[#23232B] hover:text-gray-500`}
          />
        </div>

        {/* Campo Data de Entrega */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-200">
            Data de entrega
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${focusBorderColor} bg-[#1A1A1D] border-[#2A2A2D] text-gray-200 hover:bg-[#23232B] hover:text-gray-500`}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {serviceState.updatedAt ? (
                  format(new Date(serviceState.updatedAt), "dd/MM/yyyy", {
                    locale: ptBR,
                  })
                ) : (
                  <span className="text-gray-400">
                    Selecione a data
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
              <Calendar
                mode="single"
                selected={serviceState.updatedAt ? new Date(serviceState.updatedAt) : undefined}
                onSelect={handleDateChange}
                className="bg-[#1A1A1E] text-gray-200"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Campo Comentários */}
        <div className="space-y-2 col-span-2">
          <Label className="text-xs text-gray-200">
            Comentários
          </Label>
          <Textarea
            value={serviceState.comments || ""}
            onChange={(e) =>
              setServiceState((prev) => ({ ...prev, comments: e.target.value }))
            }
            className={`bg-[#1A1A1D] border-[#2A2A2D] ${focusBorderColor} text-gray-200 resize-none min-h-[60px]`}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          onClick={onCancel}
          className="bg-gray-800/50 hover:bg-gray-700 cursor-pointer"
        >
          <X size={14} className="mr-1" />
          Cancelar
        </Button>
        <Button
          size="sm"
          onClick={onSave}
          className={`${saveButtonColor} cursor-pointer`}
        >
          <Save size={14} className="mr-1" />
          { isNewService ? "Adicionar" : "Salvar Alterações" }
        </Button>
      </div>
    </div>
  );
}