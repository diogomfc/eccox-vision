// src/components/machines/modals/application-edit-modal.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Badge } from "@/components/ui/badge";
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
  Plus,
  Trash2,
  Search,
  Edit3,
  Layers,
  LayoutList,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Application,
  Service,
  StatusType,
  ApplicationType,
  ItemObrigatorioType,
} from "@/types/machines";
import { ServiceForm } from "../service-form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ApplicationEditModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApplication: Application) => void;
  mode?: "create" | "edit";
  isLoading?: boolean;
}

export default function ApplicationEditModal({
  application,
  isOpen,
  onClose,
  onSave,
  mode = "edit",
  isLoading = false,
}: ApplicationEditModalProps) {
  const isEditMode = mode === "edit";

  // Configuração de temas
  const themeConfig = {
    focusColor: isEditMode
      ? "focus:!border-amber-500"
      : "focus:!border-blue-500",
    textAccent: isEditMode ? "text-amber-400" : "text-blue-400",
    borderAccent: isEditMode ? "border-amber-500/30" : "border-blue-500/30",
    buttonPrimary: isEditMode
      ? "bg-amber-600/50 hover:bg-amber-700"
      : "bg-blue-600/50 hover:bg-blue-700",
    selectFocusGreen: isEditMode
      ? "focus:bg-amber-600/10"
      : "focus:bg-green-600/10",
    selectFocusRed: isEditMode
      ? "focus:bg-amber-600/10"
      : "focus:bg-red-600/10",
    selectFocusPrimary: isEditMode
      ? "focus:bg-amber-600/10"
      : "focus:bg-blue-600/10",
  };

  // Estados da aplicação
  const [editApp, setEditApp] = useState<Application>({
    id: "",
    machine_id: "",
    name: "",
    tipo: "IBM",
    status: "Pendente",
    services: [],
  });

  // Estados para serviços
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [isSavingServices, setIsSavingServices] = useState(false);
  const [serviceMessage, setServiceMessage] = useState<string | null>(null);

  const [newService, setNewService] = useState({
    name: "",
    status: "Pendente" as StatusType,
    itemObrigatorio: "Sim" as ItemObrigatorioType,
    responsible: "",
    comments: "",
    typePendencia: "",
    responsibleHomologacao: "",
    updatedAt: undefined as string | undefined,
  });

  const [editService, setEditService] = useState({
    name: "",
    status: "Pendente" as StatusType,
    itemObrigatorio: "Sim" as ItemObrigatorioType,
    responsible: "",
    comments: "",
    typePendencia: "",
    responsibleHomologacao: "",
    updatedAt: undefined as string | undefined,
  });

  // Inicializar dados quando a modal abrir
  useEffect(() => {
    if (isOpen) {
      if (application && isEditMode) {
        setEditApp({ ...application });
      } else if (!isEditMode) {
        // Modo create - resetar formulário
        setEditApp({
          id: "",
          machine_id: "",
          name: "",
          tipo: "IBM",
          status: "Pendente",
          services: [],
        });
      }

      // Reset estados de serviços
      setIsAddingService(false);
      setEditingServiceId(null);
      setServiceSearchTerm("");
      setServiceMessage(null);
    }
  }, [application, isOpen, isEditMode]);

  // Função para obter cor do badge de status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Concluida":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Pendente":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Em andamento":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Filtrar serviços
  const filteredServices = useMemo(() => {
    if (!serviceSearchTerm) return editApp.services;
    return editApp.services.filter(
      (service) =>
        service.name.toLowerCase().includes(serviceSearchTerm.toLowerCase()) ||
        service.responsible
          ?.toLowerCase()
          .includes(serviceSearchTerm.toLowerCase()) ||
        service.responsibleHomologacao
          ?.toLowerCase()
          .includes(serviceSearchTerm.toLowerCase())
    );
  }, [editApp.services, serviceSearchTerm]);

  // Validação do formulário
  const isFormValid = useMemo(() => {
    return editApp.name.trim() !== "";
  }, [editApp.name]);

  // Handler para salvar aplicação
  const handleSaveApplication = useCallback(async () => {
    if (!isFormValid) {
      setServiceMessage("Nome da aplicação é obrigatório.");
      return;
    }

    setServiceMessage(null);
    onSave(editApp);
  }, [editApp, onSave, isFormValid]);

  // === OPERAÇÕES DE SERVIÇOS ===

  // Criar novo serviço
  const handleAddService = useCallback(async () => {
    if (!newService.name.trim()) {
      setServiceMessage("Nome do serviço é obrigatório.");
      return;
    }

    setIsSavingServices(true);
    setServiceMessage(null);

    try {
      const serviceToCreate: Service = {
        id: `service-${Date.now()}`,
        application_id: editApp.id,
        name: newService.name,
        status: newService.status,
        itemObrigatorio: newService.itemObrigatorio,
        responsible: newService.responsible,
        comments: newService.comments,
        typePendencia: newService.typePendencia,
        responsibleHomologacao: newService.responsibleHomologacao,
        updatedAt: newService.updatedAt || new Date().toISOString(),
      };

      // Se estamos editando uma aplicação existente, criar o serviço diretamente
      if (isEditMode && editApp.id) {
        console.log("Criando serviço:", serviceToCreate);
        const result = await window.electronAPI.createService(serviceToCreate, editApp.id);

        if (result.success) {
          setServiceMessage("Serviço criado com sucesso!");
          setEditApp((prev) => ({
            ...prev,
            services: [...prev.services, serviceToCreate],
          }));
        } else {
          setServiceMessage(`Erro ao criar serviço: ${result.message}`);
          return;
        }
      } else {
        // Modo create ou aplicação sem ID - adicionar localmente
        setEditApp((prev) => ({
          ...prev,
          services: [...prev.services, serviceToCreate],
        }));
        setServiceMessage("Serviço adicionado localmente.");
      }

      // Reset form
      setNewService({
        name: "",
        status: "Pendente",
        itemObrigatorio: "Sim",
        responsible: "",
        comments: "",
        typePendencia: "",
        responsibleHomologacao: "",
        updatedAt: undefined,
      });
      setIsAddingService(false);

      // Limpar mensagem após 3 segundos
      setTimeout(() => setServiceMessage(null), 3000);
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
      setServiceMessage("Erro ao criar serviço. Tente novamente.");
    } finally {
      setIsSavingServices(false);
    }
  }, [newService, editApp.id, isEditMode]);

  // Atualizar serviço existente
  const handleSaveEditService = useCallback(async () => {
    if (!editService.name.trim()) {
      setServiceMessage("Nome do serviço é obrigatório.");
      return;
    }

    setIsSavingServices(true);
    setServiceMessage(null);

    try {
      const updatedService = {
        ...editApp.services.find((s) => s.id === editingServiceId)!,
        name: editService.name,
        status: editService.status,
        itemObrigatorio: editService.itemObrigatorio,
        responsible: editService.responsible,
        comments: editService.comments,
        typePendencia: editService.typePendencia,
        responsibleHomologacao: editService.responsibleHomologacao,
        updatedAt: editService.updatedAt || new Date().toISOString(),
      };

      // Se estamos editando uma aplicação existente, atualizar o serviço diretamente
      if (isEditMode && editApp.id) {
        console.log("Atualizando serviço:", updatedService);
        const result = await window.electronAPI.updateService(updatedService);

        if (result.success) {
          setServiceMessage("Serviço atualizado com sucesso!");
        } else {
          setServiceMessage(`Erro ao atualizar serviço: ${result.message}`);
          return;
        }
      } else {
        setServiceMessage("Serviço atualizado localmente.");
      }

      // Atualizar estado local
      setEditApp((prev) => ({
        ...prev,
        services: prev.services.map((service) =>
          service.id === editingServiceId ? updatedService : service
        ),
      }));

      setEditingServiceId(null);
      setEditService({
        name: "",
        status: "Pendente",
        itemObrigatorio: "Sim",
        responsible: "",
        comments: "",
        typePendencia: "",
        responsibleHomologacao: "",
        updatedAt: undefined,
      });

      // Limpar mensagem após 3 segundos
      setTimeout(() => setServiceMessage(null), 3000);
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
      setServiceMessage("Erro ao atualizar serviço. Tente novamente.");
    } finally {
      setIsSavingServices(false);
    }
  }, [editService, editingServiceId, editApp.services, editApp.id, isEditMode]);

  // Deletar serviço
  const handleDeleteService = useCallback(
    async (serviceId: string) => {
      if (!confirm("Tem certeza que deseja excluir este serviço?")) return;

      setIsSavingServices(true);
      setServiceMessage(null);

      try {
        // Se estamos editando uma aplicação existente, deletar o serviço diretamente
        if (isEditMode && editApp.id) {
          console.log("Deletando serviço:", serviceId);
          const result = await window.electronAPI.deleteService(serviceId);

          if (result.success) {
            setServiceMessage("Serviço excluído com sucesso!");
          } else {
            setServiceMessage(`Erro ao excluir serviço: ${result.message}`);
            return;
          }
        } else {
          setServiceMessage("Serviço removido localmente.");
        }

        // Atualizar estado local
        setEditApp((prev) => ({
          ...prev,
          services: prev.services.filter((s) => s.id !== serviceId),
        }));

        // Limpar mensagem após 3 segundos
        setTimeout(() => setServiceMessage(null), 3000);
      } catch (error) {
        console.error("Erro ao excluir serviço:", error);
        setServiceMessage("Erro ao excluir serviço. Tente novamente.");
      } finally {
        setIsSavingServices(false);
      }
    },
    [editApp.id, isEditMode]
  );

  const handleEditService = (serviceId: string) => {
    const service = editApp.services.find((s) => s.id === serviceId);
    if (service) {
      setEditService({
        name: service.name,
        status: service.status,
        itemObrigatorio: service.itemObrigatorio || "Sim",
        responsible: service.responsible || "",
        comments: service.comments || "",
        typePendencia: service.typePendencia || "",
        responsibleHomologacao: service.responsibleHomologacao || "",
        updatedAt: service.updatedAt,
      });
      setEditingServiceId(serviceId);
    }
  };

  const handleClose = () => {
    setEditingServiceId(null);
    setIsAddingService(false);
    setServiceSearchTerm("");
    setServiceMessage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!w-[95vw] !max-w-[95vw] h-[95vh] bg-gradient-to-br from-[#111113] to-[#0F0F11] border-gray-700 overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4 border-b border-gray-700/50">
          <DialogTitle className="text-xl font-bold text-gray-100 flex items-center gap-3">
            <Layers className={`w-6 h-6 ${themeConfig.textAccent}`} />
            {isEditMode ? "Editar" : "Criar"} Aplicação
            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
            {/* Formulário da Aplicação */}
            <div
              className={`p-4 bg-[#0F0F11] border ${themeConfig.borderAccent} rounded-lg`}
            >
              <h3 className="font-medium text-gray-100 mb-4">
                Informações da Aplicação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label className="text-gray-200">Nome da Aplicação *</Label>
                  <Input
                    value={editApp.name}
                    onChange={(e) =>
                      setEditApp((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B]`}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-200">Tipo da Aplicação *</Label>
                  <Select
                    value={editApp.tipo}
                    onValueChange={(value: ApplicationType) =>
                      setEditApp((prev) => ({ ...prev, tipo: value }))
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] w-full`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                      <SelectItem
                        value="IBM"
                        className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}
                      >
                        <span className="text-blue-400">IBM</span>
                      </SelectItem>
                      <SelectItem
                        value="ECCOX"
                        className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}
                      >
                        <span className="text-blue-400">ECCOX</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-200">Status</Label>
                  <Select
                    value={editApp.status}
                    onValueChange={(value: StatusType) =>
                      setEditApp((prev) => ({ ...prev, status: value }))
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] w-full`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                      <SelectItem
                        value="Concluida"
                        className={`cursor-pointer ${themeConfig.selectFocusGreen}`}
                      >
                        <span className="text-green-400">Concluída</span>
                      </SelectItem>
                      <SelectItem
                        value="Pendente"
                        className={`cursor-pointer ${themeConfig.selectFocusRed}`}
                      >
                        <span className="text-red-400">Pendente</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Seção de Serviços */}
            <div className="bg-[#0F0F11] border border-gray-600/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <LayoutList size={20} className="text-gray-200" />
                    <h3 className="font-medium text-gray-100">
                      Serviços ({editApp.services.length})
                    </h3>
                  </div>

                  {serviceSearchTerm && (
                    <Badge
                      variant="outline"
                      className={`${themeConfig.textAccent
                        .replace("text", "bg")
                        .replace("400", "600/20")} ${
                        themeConfig.textAccent
                      } border-current/30 text-xs`}
                    >
                      {filteredServices.length} encontrados
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* Pesquisa de Serviços */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      value={serviceSearchTerm}
                      onChange={(e) => setServiceSearchTerm(e.target.value)}
                      placeholder="Buscar serviço..."
                      className={`bg-[#1A1A1D] border-[#2A2A2D] pl-10 ${themeConfig.focusColor} text-gray-100 placeholder-gray-500 w-48`}
                      disabled={isLoading || isSavingServices}
                    />
                  </div>
                  <Button
                    onClick={() => setIsAddingService(true)}
                    className="cursor-pointer bg-blue-600/50 hover:bg-blue-700"
                    disabled={isLoading || isSavingServices || isAddingService}
                  >
                    <Plus size={16} className="mr-1" />
                    Serviço
                  </Button>
                </div>
              </div>

              {/* Mensagem de feedback para serviços */}
              {serviceMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-4 p-2 rounded text-xs ${
                    serviceMessage.includes("Erro")
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                  }`}
                >
                  {serviceMessage}
                </motion.div>
              )}

              {/* Loading indicator para serviços */}
              {isSavingServices && (
                <div className="mb-4 flex items-center gap-2 text-gray-400 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processando serviço...
                </div>
              )}

              {/* Formulário de Novo Serviço */}
              <AnimatePresence>
                {isAddingService && (
                  <ServiceForm
                    serviceData={newService}
                    onChange={(
                      value: string | Date | undefined,
                      key: string
                    ) => {
                      if (key === "updatedAt") {
                        setNewService((prev) => ({
                          ...prev,
                          updatedAt: value
                            ? (value as Date).toISOString()
                            : undefined,
                        }));
                      } else {
                        setNewService((prev) => ({
                          ...prev,
                          [key]: value as string,
                        }));
                      }
                    }}
                    onSave={handleAddService}
                    onCancel={() => setIsAddingService(false)}
                    isEditMode={false}
                    isLoading={isSavingServices}
                  />
                )}
              </AnimatePresence>

              {/* Lista de Serviços */}
              <div className="space-y-2">
                {filteredServices.length === 0 ? (
                  <div className="text-center py-8 bg-[#0A0A0C] rounded border border-[#2A2A2D]">
                    <p className="text-gray-400 mb-2">
                      {serviceSearchTerm
                        ? "Nenhum serviço encontrado"
                        : "Nenhum serviço adicionado"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {serviceSearchTerm
                        ? "Tente outro termo de pesquisa"
                        : "Clique em 'Serviço' para começar"}
                    </p>
                  </div>
                ) : (
                  filteredServices.map((service) => (
                    <div key={service.id}>
                      <AnimatePresence>
                        {editingServiceId === service.id ? (
                          <ServiceForm
                            serviceData={editService}
                            onChange={(
                              value: string | Date | undefined,
                              key: string
                            ) => {
                              if (key === "updatedAt") {
                                setEditService((prev) => ({
                                  ...prev,
                                  updatedAt: value
                                    ? value instanceof Date
                                      ? value.toISOString()
                                      : (value as string)
                                    : undefined,
                                }));
                              } else {
                                setEditService((prev) => ({
                                  ...prev,
                                  [key]: value as string,
                                }));
                              }
                            }}
                            onSave={handleSaveEditService}
                            onCancel={() => setEditingServiceId(null)}
                            isEditMode={true}
                            isLoading={isSavingServices}
                          />
                        ) : (
                          <div className="flex items-center justify-between p-2 bg-[#0F0F11] rounded border border-[#2A2A2D]">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-sm text-gray-300">
                                {service.name}
                              </span>
                              <span className="text-xs text-gray-500">|</span>
                              <span className="text-xs text-gray-500">
                                {service.responsible || "Sem responsável"}
                              </span>
                              <span className="text-xs text-gray-500">|</span>
                              <span className="text-xs text-gray-500">
                                {service.updatedAt
                                  ? format(
                                      new Date(service.updatedAt),
                                      "dd/MM/yyyy",
                                      { locale: ptBR }
                                    )
                                  : "Sem data"}
                              </span>
                              <Badge
                                variant="outline"
                                className={getStatusBadgeColor(service.status)}
                              >
                                {service.status}
                              </Badge>
                              {service.itemObrigatorio === "Sim" && (
                                <Badge
                                  variant="outline"
                                  className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
                                >
                                  Obrigatório
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {/* Editar serviço */}
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleEditService(service.id)
                                    }
                                    className={`${themeConfig.textAccent} hover:text-gray-300 h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-blue-600/10`}
                                    disabled={isSavingServices}
                                  >
                                    <Edit3 size={12} />
                                  </Button>
                                </HoverCardTrigger>
                                <HoverCardContent
                                  side="top"
                                  align="center"
                                  className="bg-zinc-900 text-zinc-200 border border-zinc-700 shadow-lg rounded-md px-2 py-1 text-xs flex justify-center items-center w-30"
                                >
                                  Editar serviço
                                </HoverCardContent>
                              </HoverCard>

                              {/* Excluir serviço */}
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteService(service.id)
                                    }
                                    className="text-red-400 hover:text-red-300 h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-red-600/10"
                                    disabled={isSavingServices}
                                  >
                                    <Trash2 size={12} />
                                  </Button>
                                </HoverCardTrigger>
                                <HoverCardContent
                                  side="top"
                                  align="center"
                                  className="bg-zinc-900 text-zinc-200 border border-zinc-700 shadow-lg rounded-md px-2 py-1 text-xs flex justify-center items-center w-30"
                                >
                                  Excluir serviço
                                </HoverCardContent>
                              </HoverCard>
                            </div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Footer com botões de ação */}
          <div className="flex-shrink-0 pt-4 border-t border-gray-700/50 flex justify-end gap-3">
            <Button
              onClick={handleClose}
              variant="ghost"
              className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] cursor-pointer"
              disabled={isLoading || isSavingServices}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveApplication}
              className={`${themeConfig.buttonPrimary} cursor-pointer min-w-[140px]`}
              disabled={!isFormValid || isLoading || isSavingServices}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {isEditMode ? "Salvando..." : "Criando..."}
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {isEditMode ? "Salvar Alterações" : "Criar Aplicação"}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
