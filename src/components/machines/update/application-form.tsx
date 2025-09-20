// src/components/machine-update/ApplicationForm.tsx
"use client";

import {
  Save,
  Plus,
  X,
  Edit3,
  SquarePen
} from "lucide-react";
import {
  motion,
  AnimatePresence
} from "framer-motion";

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

// Tipos
interface EditableApplication {
  id: string;
  name: string;
  tipo: string;
  status: "Concluida" | "Pendente" | "Em andamento";
}

// Props do componente
interface ApplicationFormProps {
  formTitle: string;
  applicationState: Partial<EditableApplication>;
  setApplicationState: React.Dispatch<React.SetStateAction<Partial<EditableApplication>>>;
  onSave: () => void;
  onCancel: () => void;
  isNewApplication: boolean;
}

export default function ApplicationForm({
  formTitle,
  applicationState,
  setApplicationState,
  onSave,
  onCancel,
  isNewApplication,
}: ApplicationFormProps) {
  const formBorderColor = isNewApplication ?  "border-blue-500/30" : "border-amber-500/30";
  const saveButtonColor = isNewApplication ? "bg-blue-600/50 hover:bg-blue-700/50" : "bg-amber-600/50 hover:bg-amber-700/50";
  const focusBorderColor = isNewApplication ? "focus:!border-blue-500" : "focus:!border-amber-500";
  const icon = isNewApplication ? <Plus className="w-3 h-3 text-white" /> : <SquarePen className="w-3 h-3 text-white" />;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className={`p-4 bg-[#0F0F11] border ${formBorderColor} rounded-lg`}>
       <div className="flex items-center gap-2 mb-4">
        <div className={`p-1 rounded-full ${isNewApplication ? "bg-blue-500" : "bg-amber-500"}`}>
          {icon}
        </div>
        <h4 className={`font-medium ${isNewApplication ? "text-blue-500" : "text-amber-500"}`}>
           {formTitle}
        </h4>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <Label className="text-gray-200">
              Nome da Aplicação *
            </Label>
            <Input
              value={applicationState.name || ""}
              onChange={(e) =>
                setApplicationState((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${focusBorderColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
              placeholder="Ex: Sistema de Controle..."
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">
              Tipo da Aplicação *
            </Label>
            <Input
              value={applicationState.tipo || ""}
              onChange={(e) =>
                setApplicationState((prev) => ({
                  ...prev,
                  tipo: e.target.value,
                }))
              }
              className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${focusBorderColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
              placeholder="Ex: Web, Desktop, API..."
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">Status</Label>
            <Select
              value={applicationState.status || "Pendente"}
              onValueChange={(value: "Concluida" | "Pendente") =>
                setApplicationState((prev) => ({
                  ...prev,
                  status: value,
                }))
              }
            >
              <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] w-full ${focusBorderColor} text-gray-200 hover:bg-[#23232B] hover:text-gray-500`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
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
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onCancel}
            className="bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer"
          >
            <X size={16} className="mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            className={`${saveButtonColor} cursor-pointer`}
          >
            <Save size={16} className="mr-2" />
           { isNewApplication ? "Adicionar" : "Salvar Alterações" }
          </Button>
        </div>
      </div>
    </motion.div>
  );
}