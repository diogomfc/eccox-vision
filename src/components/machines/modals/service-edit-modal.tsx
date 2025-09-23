// src/components/machines/modals/service-edit-modal.tsx
"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Save,
  X,
  CalendarIcon,
  Settings,
  Info
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Service, StatusType, ItemObrigatorioType } from "@/types/machines";

interface ServiceEditModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedService: Service) => void;
  mode?: "create" | "edit";
  applicationName?: string; // Para mostrar qual aplicação pertence
}

export default function ServiceEditModal({
  service,
  isOpen,
  onClose,
  onSave,
  mode = "edit",
  applicationName
}: ServiceEditModalProps) {
  const isEditMode = mode === "edit";
  
  // Configuração de temas
  const themeConfig = {
    focusColor: isEditMode ? "focus:!border-amber-500" : "focus:!border-blue-500",
    textAccent: isEditMode ? "text-amber-400" : "text-blue-400",
    borderAccent: isEditMode ? "border-amber-500/30" : "border-blue-500/30",
    buttonPrimary: isEditMode ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-700",
    ringColor: isEditMode ? "focus:ring-amber-500/20" : "focus:ring-blue-500/20",
    bgAccent: isEditMode ? "bg-amber-600/10" : "bg-blue-600/10",
    selectFocusGreen: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-green-600/10",
    selectFocusRed: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-red-600/10",
  };

  const [editService, setEditService] = useState<Service>({
    id: "",
    application_id: "",
    name: "",
    status: "Pendente",
    itemObrigatorio: "Sim",
    responsible: "",
    comments: "",
    typePendencia: "",
    responsibleHomologacao: "",
    updatedAt: new Date().toISOString(),
  });

  // Inicializar dados quando a modal abrir
  useEffect(() => {
    if (service && isOpen) {
      setEditService({ ...service });
    } else if (!service && isOpen) {
      // Reset para novo serviço
      setEditService({
        id: `service-${Date.now()}`,
        application_id: "",
        name: "",
        status: "Pendente",
        itemObrigatorio: "Sim",
        responsible: "",
        comments: "",
        typePendencia: "",
        responsibleHomologacao: "",
        updatedAt: new Date().toISOString(),
      });
    }
  }, [service, isOpen]);

  // Função para obter cor do badge de status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Concluida': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Pendente': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Em andamento': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setEditService(prev => ({
      ...prev,
      updatedAt: date ? date.toISOString() : new Date().toISOString(),
    }));
  };

  const handleSave = () => {
    if (!editService.name.trim()) return;
    
    const updatedService = {
      ...editService,
      updatedAt: editService.updatedAt || new Date().toISOString(),
    };
    
    onSave(updatedService);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-[55vw] bg-gradient-to-br from-[#111113] to-[#0F0F11] border-gray-700">
        <DialogHeader className="pb-4 border-b border-gray-700/50">
          <DialogTitle className="text-xl font-bold text-gray-100 flex items-center gap-3">
            <Settings className={`w-6 h-6 ${themeConfig.textAccent}`} />
            {isEditMode ? "Editar" : "Criar"} Serviço
          </DialogTitle>
          {applicationName && (
            <div className="flex items-center gap-2 mt-2">
              <Info className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">
                Aplicação: <span className="text-gray-300 font-medium">{applicationName}</span>
              </span>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2 pb-3">
          {/* Header com informações do serviço */}
          {isEditMode && (
            <div className={`p-4 ${themeConfig.bgAccent} border ${themeConfig.borderAccent} rounded-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-gray-100">{service?.name}</h3>
                  {service && (
                    <Badge variant="outline" className={getStatusBadgeColor(service.status)}>
                      {service.status}
                    </Badge>
                  )}
                  {service?.itemObrigatorio === "Sim" && (
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      Obrigatório
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  {service?.updatedAt && (
                    <span>Atualizado em: {format(new Date(service.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Formulário principal */}
          <div className="bg-[#0F0F11] border border-gray-600/30 rounded-lg p-6">
            <h3 className="font-medium text-gray-100 mb-6">Informações do Serviço</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primeira linha */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  Nome do Serviço
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  value={editService.name}
                  onChange={(e) => setEditService(prev => ({ ...prev, name: e.target.value }))}
                  className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} ${themeConfig.ringColor} focus:ring-1 text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
                  placeholder="Digite o nome do serviço..."
                />
                <p className="text-xs text-gray-500">Nome identificador único do serviço</p>
              </div>

              {/* Segunda linha */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-200">Status</Label>
                <Select
                  value={editService.status}
                  onValueChange={(value: StatusType) => setEditService(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                    <SelectItem value="Concluida" className={`cursor-pointer ${themeConfig.selectFocusGreen}`}>
                      <span className="text-green-400">Concluída</span>
                    </SelectItem>
                    <SelectItem value="Pendente" className={`cursor-pointer ${themeConfig.selectFocusRed}`}>
                      <span className="text-red-400">Pendente</span>
                    </SelectItem>
                    <SelectItem value="Em andamento" className="cursor-pointer focus:bg-amber-600/10">
                      <span className="text-amber-400">Em andamento</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-200">Item Obrigatório</Label>
                <Select
                  value={editService.itemObrigatorio}
                  onValueChange={(value: ItemObrigatorioType) => setEditService(prev => ({ ...prev, itemObrigatorio: value }))}
                >
                  <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
                    <SelectItem value="Sim" className={`cursor-pointer ${themeConfig.selectFocusGreen}`}>
                      <span className="text-green-400">Sim</span>
                    </SelectItem>
                    <SelectItem value="Não" className={`cursor-pointer ${themeConfig.selectFocusRed}`}>
                      <span className="text-red-400">Não</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Terceira linha */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-200">Responsável</Label>
                <Input
                  value={editService.responsible}
                  onChange={(e) => setEditService(prev => ({ ...prev, responsible: e.target.value }))}
                  className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
                  placeholder="Nome do responsável..."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-200">Responsável Homologação</Label>
                <Input
                  value={editService.responsibleHomologacao}
                  onChange={(e) => setEditService(prev => ({ ...prev, responsibleHomologacao: e.target.value }))}
                  className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
                  placeholder="Nome do responsável pela homologação..."
                />
              </div>

              {/* Quarta linha */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-200">Tipo de Pendência</Label>
                <Input
                  value={editService.typePendencia}
                  onChange={(e) => setEditService(prev => ({ ...prev, typePendencia: e.target.value }))}
                  className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
                  placeholder="Tipo da pendência..."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-200">Data de Entrega</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`justify-start text-left font-normal bg-[#1A1A1D] border-[#2A2A2D] text-gray-200 ${themeConfig.focusColor} hover:bg-[#23232B] hover:text-gray-500 cursor-pointer w-full`}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                      {editService.updatedAt ? (
                        format(new Date(editService.updatedAt), "PPP", { locale: ptBR })
                      ) : (
                        <span className="text-gray-400">Selecione a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#1A1A1D] border-gray-700">
                    <Calendar
                      mode="single"
                      selected={editService.updatedAt ? new Date(editService.updatedAt) : new Date()}
                      onSelect={handleDateChange}
                      className="bg-[#1A1A1D] text-gray-200"
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-gray-500">Data prevista para conclusão</p>
              </div>

              {/* Quinta linha - Comentários */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium text-gray-200">Comentários</Label>
                <Textarea
                  value={editService.comments}
                  onChange={(e) => setEditService(prev => ({ ...prev, comments: e.target.value }))}
                  className={`min-h-[80px] bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} ${themeConfig.ringColor} focus:ring-1 text-gray-100 text-sm resize-none transition-all duration-200`}
                  placeholder="Adicione observações, comentários ou detalhes adicionais sobre o serviço..."
                />
                <p className="text-xs text-gray-500">Informações adicionais sobre o serviço (opcional)</p>
              </div>
            </div>
          </div>

          {/* Informações adicionais para modo de edição */}
          {isEditMode && service && (
            <div className="bg-[#0F0F11] border border-gray-600/30 rounded-lg p-4">
              <h4 className="font-medium text-gray-200 mb-3">Informações do Sistema</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">ID do Serviço:</span>
                  <span className="ml-2 text-gray-300 font-mono text-xs">{service.id}</span>
                </div>
                <div>
                  <span className="text-gray-400">ID da Aplicação:</span>
                  <span className="ml-2 text-gray-300 font-mono text-xs">{service.application_id}</span>
                </div>
                <div>
                  <span className="text-gray-400">Criado em:</span>
                  <span className="ml-2 text-gray-300">
                    {service.updatedAt 
                      ? format(new Date(service.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
                      : "Data não disponível"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Status atual:</span>
                  <Badge variant="outline" className={`ml-2 ${getStatusBadgeColor(service.status)}`}>
                    {service.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer com botões */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
          <Button
            onClick={handleClose}
            variant="ghost"
            className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className={`${themeConfig.buttonPrimary} cursor-pointer min-w-[140px]`}
            disabled={!editService.name.trim()}
          >
            <Save size={16} className="mr-2" />
            {isEditMode ? "Salvar Alterações" : "Criar Serviço"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}