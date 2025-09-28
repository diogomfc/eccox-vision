// src/components/machines/modals/service-edit-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Save, Settings, Loader2, CalendarIcon } from "lucide-react";
import { ItemObrigatorioType, Service, StatusType } from "@/types/machines";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ServiceEditModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedService: Service) => void;
  isLoading?: boolean;
}

export default function ServiceEditModal({
  service,
  isOpen,
  onClose,
  onSave,
  isLoading = false,
}: ServiceEditModalProps) {
  const [editService, setEditService] = useState<Service | null>(null);

  useEffect(() => {
    if (service && isOpen) {
      setEditService({ ...service });
    } else {
      setEditService(null);
    }
  }, [service, isOpen]);

  const handleServiceChange = (value: any, key: string) => {
    if (editService) {
      const finalValue = key === "updatedAt" && value instanceof Date ? value.toISOString() : value;
      setEditService((prev) => (prev ? { ...prev, [key]: finalValue } : null));
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      handleServiceChange(date.toISOString(), "updatedAt");
    }
  };

  const handleSave = () => {
    if (editService && editService.name.trim()) {
      onSave(editService);
    }
  };

  const isFormValid = editService ? editService.name.trim() !== "" : false;

  if (!isOpen || !editService) {
    return null;
  }

 const themeConfig = {
    focusColor: "focus:!border-amber-500 focus:!ring-transparent",
    textAccent: "text-amber-400",
    borderAccent: "border-amber-500/30",
    buttonPrimary: "bg-amber-600/50 hover:bg-amber-700",
    selectFocusGreen: "focus:bg-amber-600/10",
    selectFocusRed: "focus:bg-amber-600/10",
    selectFocusPrimary: "focus:bg-amber-600/10",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[55vw] bg-gradient-to-br from-[#111113] to-[#0F0F11] border-gray-700">
        <DialogHeader className="pb-4 border-b border-gray-700/50">
          <DialogTitle className="text-xl font-bold text-gray-100 flex items-center gap-3">
            <Settings className="w-6 h-6 text-amber-400" />
            Editar Serviço
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400 ml-2" />}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar pr-2 pb-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            <div className="space-y-2 col-span-full sm:col-span-2">
              <Label className="text-xs text-gray-200">Nome *</Label>
              <Input
                value={editService.name ?? ""}
                onChange={(e) => handleServiceChange(e.target.value, "name")}
                className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100`}
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-gray-200">Status</Label>
              <Select
                value={editService.status ?? "Pendente"}
                onValueChange={(value: StatusType) => handleServiceChange(value, "status")}
                disabled={isLoading}
              >
                <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 w-full`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                  <SelectItem value="Concluída" className={`cursor-pointer hover:!bg-[#23232B] hover:!text-green-400 `}><span className="text-green-400">Concluída</span></SelectItem>
                  <SelectItem value="Pendente" className={`cursor-pointer hover:!bg-[#23232B] hover:!text-red-400 `}><span className="text-red-400">Pendente</span></SelectItem>
                  <SelectItem value="Em andamento" className={`cursor-pointer hover:!bg-[#23232B] hover:!text-amber-400 `}><span className="text-amber-400">Em andamento</span></SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-gray-200">Obrigatório</Label>
              <Select
                value={editService.itemObrigatorio ?? "Não"}
                onValueChange={(value: ItemObrigatorioType) => handleServiceChange(value, "itemObrigatorio")}
                disabled={isLoading}
              >
                <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 w-full`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
                  <SelectItem value="Sim" className={`cursor-pointer hover:!bg-[#23232B] hover:!text-green-400 text-green-400`}><span className="text-green-400">Sim</span></SelectItem>
                  <SelectItem value="Não" className={`cursor-pointer hover:!bg-[#23232B] hover:!text-red-400 text-red-400`}><span className="text-red-400">Não</span></SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-gray-200">Responsável</Label>
              <Input
                value={editService.responsible ?? ""}
                onChange={(e) => handleServiceChange(e.target.value, "responsible")}
                className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100`}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-gray-200">Responsável Homologação</Label>
              <Input
                value={editService.responsibleHomologacao ?? ""}
                onChange={(e) => handleServiceChange(e.target.value, "responsibleHomologacao")}
                className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100`}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-gray-200">Tipo Pendência</Label>
              <Input
                value={editService.typePendencia ?? ""}
                onChange={(e) => handleServiceChange(e.target.value, "typePendencia")}
                className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100`}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-gray-200">Data de entrega</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`justify-start text-left font-normal bg-[#1A1A1E] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 w-full`}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    {editService.updatedAt ? (
                      format(new Date(editService.updatedAt), "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                      <span className="text-gray-400">Selecione a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
                  <Calendar
                    mode="single"
                    selected={editService.updatedAt ? new Date(editService.updatedAt) : undefined}
                    onSelect={handleDateChange}
                    className="bg-[#1A1A1E] text-gray-200"
                    disabled={isLoading}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 col-span-full">
              <Label className="text-xs text-gray-200">Comentários</Label>
              <Textarea
                value={editService.comments ?? ""}
                onChange={(e) => handleServiceChange(e.target.value, "comments")}
                className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 resize-none min-h-[60px] w-full`}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
            <Button onClick={onClose} variant="ghost" className="text-gray-400 cursor-pointer hover:text-gray-200 hover:bg-[#1A1A1D]" disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700 min-w-[140px] cursor-pointer" disabled={!isFormValid || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
