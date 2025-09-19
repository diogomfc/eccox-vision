// src/components/machines/application-edit-modal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  X,
  Loader2,
  Plus,
  Edit3,
  Trash2,
  CalendarIcon,
  Save,
  SquarePen,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import type { Application, Service, ServiceStatus } from "@/types/machines";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";



interface ApplicationEditModalProps {
  application: Application;
  machine?: {
    name: string;
    system: string;
    description?: string;
  };
  onClose: () => void;
  onUpdated: () => void;
}

export function ApplicationEditModal({
  application,
  machine,
  onClose,
  onUpdated,
}: ApplicationEditModalProps) {
  const [editedApp, setEditedApp] = useState<Application>(application);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | undefined>(
    undefined
  );
  const [editingServiceId, setEditingServiceId] = useState<string | undefined>(
    undefined
  );
  const [newService, setNewService] = useState<Partial<Service>>({
    name: "",
    status: "Pendente",
    itemObrigatorio: "Sim",
    updatedAt: "",
    responsible: "",
    comments: "",
    typePendencia: "",
    responsibleHomologacao: "",
  });

  const handleAppInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedApp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceUpdate = (index: number, field: string, value: string) => {
    setEditedApp((prev) => {
      const updatedServices = [...(prev.services || [])];
      updatedServices[index] = { ...updatedServices[index], [field]: value };
      return { ...prev, services: updatedServices };
    });
  };

  const handleNewServiceInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewServiceSelectChange = (name: string, value: string) => {
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewService = () => {
    if (newService.name && newService.status) {
      setEditedApp((prev) => ({
        ...prev,
        services: [
          ...(prev.services || []),
          {
            ...(newService as Service),
            id: `new-${Date.now()}`,
            updatedAt: newService.updatedAt || "",
            itemObrigatorio: newService.itemObrigatorio || "Não",
            responsible: newService.responsible || "",
            comments: newService.comments || "",
            typePendencia: newService.typePendencia || "",
            responsibleHomologacao: newService.responsibleHomologacao || "",
          },
        ],
      }));
      setNewService({
        name: "",
        status: "Pendente",
        itemObrigatorio: "Sim",
        updatedAt: "",
        responsible: "",
        comments: "",
        typePendencia: "",
        responsibleHomologacao: "",
      });
      setIsAddingService(false);
    } else {
      setMessage("Nome e status do serviço são obrigatórios.");
    }
  };

  const handleDeleteService = (index: number) => {
    setEditedApp((prev) => ({
      ...prev,
      services: prev.services?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      // await window.electronAPI.updateApplication(editedApp);
      setMessage("Aplicação atualizada com sucesso!");
      setTimeout(() => {
        onUpdated();
        onClose();
      }, 1500);
    } catch (error) {
      setMessage("Erro ao salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewServiceDateChange = (date: Date | undefined) => {
    setNewService((prev) => ({
      ...prev,
      updatedAt: date ? date.toISOString() : null,
    }));
  };

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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="!w-[95vw] !max-w-[95vw] h-[95vh] flex flex-col p-0 bg-[#0A0A0B] text-gray-100 border border-[#1F1F23] shadow-2xl rounded-t-lg"
        style={{ width: "95vw", maxWidth: "95vw" }}
      >
        {/* Header */}
        <DialogHeader className="border-b border-[#1F1F23] p-6 bg-gradient-to-r from-[#0F0F11] to-[#1A1A1D]">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex-col items-center gap-4 mb-2">
                <DialogTitle className="text-2xl font-semibold text-gray-100">
                  Aplicação - {application.name}
                </DialogTitle>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {machine?.name && (
                    <div className="flex items-center gap-1">
                      <span className="leading-none">
                        Máquina {machine.name}
                      </span>
                    </div>
                  )}
                  {machine?.system && (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                      <span>Sistema {machine.system}</span>
                    </div>
                  )}
                  {machine?.description && (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                      <span>{machine.description}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Gerencie os detalhes da aplicação e seus serviços relacionados
              </p>
            </div>
            <Badge
              variant="outline"
              className={getStatusBadgeColor(editedApp.status)}
            >
              {editedApp.status}
            </Badge>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 custom-scrollbar">
            {/* Application Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-[#111113] border-[#1F1F23] shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Detalhes da Aplicação
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <Label
                        htmlFor="appName"
                        className="text-sm font-medium text-gray-300"
                      >
                        Nome da Aplicação
                      </Label>
                      <Input
                        id="appName"
                        name="name"
                        value={editedApp.name}
                        onChange={handleAppInputChange}
                        className="bg-[#1A1A1D] border-[#2A2A2D] focus:border-blue-500 w-full text-gray-100 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="appType"
                        className="text-sm font-medium text-gray-300"
                      >
                        Tipo da Aplicação
                      </Label>
                      <Input
                        id="appType"
                        name="tipo"
                        value={editedApp.tipo}
                        onChange={handleAppInputChange}
                        className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:border-blue-500 text-gray-100 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="appStatus"
                        className="text-sm font-medium text-gray-300"
                      >
                        Status da Aplicação
                      </Label>
                      <Select
                        value={editedApp.status}
                        onValueChange={(value) =>
                          handleAppInputChange({
                            target: { name: "status", value },
                          } as React.ChangeEvent<HTMLSelectElement>)
                        }
                      >
                        <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] focus:border-blue-500 w-full text-gray-100">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
                          <SelectItem value="Concluida">Concluída</SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Separator className="bg-[#1F1F23]" />

            {/* Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="bg-[#111113] border-[#1F1F23] shadow-lg">
                <CardContent className="p-6">
                  <header className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-100 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Serviços associados
                      <Badge
                        variant="secondary"
                        className="ml-2 bg-[#1A1A1D] text-gray-400"
                      >
                        {editedApp.services?.length || 0}
                      </Badge>
                    </h3>
                    <Button
                      onClick={() => setIsAddingService(true)}
                      className="bg-blue-600/10 hover:bg-blue-700/50 text-white gap-2 shadow-lg cursor-pointer"
                    >
                      <Plus size={16} />
                      Adicionar Serviço
                    </Button>
                  </header>

                  {/* Add New Service Form */}
                  <AnimatePresence>
                    {isAddingService && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 overflow-hidden"
                      >
                        <Card className="bg-[#0F0F11] border-blue-500/30 border-2">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Plus size={16} className="text-blue-500" />
                              <h4 className="font-medium text-gray-100">
                                Novo Serviço
                              </h4>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label className="text-sm text-gray-300">
                                  Nome do Serviço *
                                </Label>
                                <Input
                                  name="name"
                                  value={newService.name || ""}
                                  onChange={handleNewServiceInputChange}
                                  className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100"
                                  placeholder="Digite o nome do serviço"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm text-gray-300">
                                  Status *
                                </Label>
                                <Select
                                  value={newService.status}
                                  onValueChange={(value) =>
                                    handleNewServiceSelectChange(
                                      "status",
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger className="bg-[#1A1A1D] w-full border-[#2A2A2D] focus:!border-blue-500 text-gray-100">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
                                    <SelectItem value="Pendente">
                                      Pendente
                                    </SelectItem>
                                    <SelectItem value="Em andamento">
                                      Em Andamento
                                    </SelectItem>
                                    <SelectItem value="Concluida">
                                      Concluída
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm text-gray-300">
                                  Item Obrigatório
                                </Label>
                                <Select
                                  value={newService.itemObrigatorio}
                                  onValueChange={(value) =>
                                    handleNewServiceSelectChange(
                                      "itemObrigatorio",
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger className="bg-[#1A1A1D]  border-[#2A2A2D] focus:!border-blue-500 w-full text-gray-100">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
                                    <SelectItem value="Sim">Sim</SelectItem>
                                    <SelectItem value="Não">Não</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm text-gray-300">
                                  Responsável
                                </Label>
                                <Input
                                  name="responsible"
                                  value={newService.responsible || ""}
                                  onChange={handleNewServiceInputChange}
                                  className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 w-full text-gray-100"
                                  placeholder="Nome do responsável"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm text-gray-300">
                                  Resp. Homologação
                                </Label>
                                <Input
                                  name="responsibleHomologacao"
                                  value={
                                    newService.responsibleHomologacao || ""
                                  }
                                  onChange={handleNewServiceInputChange}
                                  className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 w-full text-gray-100"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm text-gray-300">
                                  Data de entrega
                                </Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="justify-start text-left font-normal bg-[#1A1A1E] border-gray-600 text-gray-200 hover:bg-[#1A1A1E] w-full"
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                                      {newService.updatedAt ? (
                                        format(
                                          new Date(newService.updatedAt),
                                          "PPP",
                                          { locale: ptBR }
                                        )
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
                                      selected={
                                        newService.updatedAt
                                          ? new Date(newService.updatedAt)
                                          : undefined
                                      }
                                      onSelect={handleNewServiceDateChange}
                                      className="bg-[#1A1A1E] text-gray-200"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                            <div className="space-y-2 mb-4">
                              <Label className="text-sm text-gray-300">
                                Comentários
                              </Label>
                              <Textarea
                                name="comments"
                                value={newService.comments || ""}
                                onChange={handleNewServiceInputChange}
                                className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-100 min-h-[80px]"
                              />
                            </div>
                            <div className="flex justify-end gap-3">
                              <Button
                                variant="ghost"
                                onClick={() => setIsAddingService(false)}
                                className="text-gray-400 bg-transparent hover:bg-zinc-900 hover:text-gray-400 cursor-pointer"
                              >
                                Cancelar
                              </Button>
                              <Button
                                onClick={handleAddNewService}
                                className="bg-blue-600/10 hover:bg-blue-700/50 text-white cursor-pointer"
                              >
                                <Save size={16} className="mr-2" />
                                Salvar Serviço
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Services List */}
                  <div className="space-y-3">
                    {editedApp.services?.length === 0 && !isAddingService ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-[#1A1A1D] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Plus size={24} className="text-gray-500" />
                        </div>
                        <p className="text-gray-400 mb-2">
                          Nenhum serviço cadastrado
                        </p>
                        <p className="text-sm text-gray-500">
                          Clique em "Adicionar Serviço" para começar
                        </p>
                      </div>
                    ) : (
                      <AnimatePresence>
                        {editedApp.services?.map((service, index) => (
                          <motion.div
                            key={service.id || index}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="group"
                          >
                            {editingServiceId === service.id ? (
                              <Card className="bg-[#0F0F11] border-amber-500/30 border-2">
                                <CardContent className="p-6">
                                  <div className="flex items-center gap-2 mb-4">
                                    <Edit3
                                      size={16}
                                      className="text-amber-500"
                                    />
                                    <h4 className="font-medium text-gray-100">
                                      Editando: {service.name}
                                    </h4>
                                  </div>
                                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
                                    <div className="space-y-2 ">
                                      <Label className="text-sm text-gray-300">
                                        Nome do Serviço
                                      </Label>
                                      <Input
                                        value={service.name}
                                        onChange={(e) =>
                                          handleServiceUpdate(
                                            index,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                        className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 w-full hover:bg-[#23232B] hover:text-gray-500"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm text-gray-300">
                                        Status
                                      </Label>
                                      <Select
                                        value={service.status}
                                        onValueChange={(value) =>
                                          handleServiceUpdate(
                                            index,
                                            "status",
                                            value
                                          )
                                        }
                                      >
                                        <SelectTrigger className={`
                                            bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 w-full  hover:bg-[#23232B] hover:text-gray-500 ${
                                                service.status === "Concluida"
                                                    ? "text-emerald-400"
                                                    : service.status === "Pendente"
                                                    ? "text-red-400"
                                                    : service.status === "Em andamento"
                                                    ? "text-amber-400"
                                                    : "text-gray-400"
                                                }
                                            `}>
                                          <SelectValue />
                                        </SelectTrigger>
                                            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
                                                <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10">
                                                    <span className="text-red-400">Pendente</span>
                                                </SelectItem>
                                                <SelectItem value="Em andamento" className="cursor-pointer focus:bg-amber-600/10">
                                                    <span className="text-amber-400">Em Andamento</span>
                                                </SelectItem>
                                                <SelectItem value="Concluida" className="cursor-pointer focus:bg-emerald-600/10">
                                                    <span className="text-emerald-400">Concluída</span>
                                                </SelectItem>
                                            </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-2">
                                      <Label className="text-sm text-gray-300">
                                        Item Obrigatório
                                      </Label>
                                      <Select
                                        value={service.itemObrigatorio}
                                        onValueChange={(value) =>
                                          handleServiceUpdate(
                                            index,
                                            "itemObrigatorio",
                                            value
                                          )
                                        }
                                      >
                                        <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 w-full">
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

                                    <div className="space-y-2">
                                      <Label className="text-sm text-gray-300">
                                        Responsável
                                      </Label>
                                      <Input
                                        value={service.responsible}
                                        onChange={(e) =>
                                          handleServiceUpdate(
                                            index,
                                            "responsible",
                                            e.target.value
                                          )
                                        }
                                        className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label className="text-sm text-gray-300">
                                        Resp. Homologação
                                      </Label>
                                      <Input
                                        value={service.responsibleHomologacao}
                                        onChange={(e) =>
                                          handleServiceUpdate(
                                            index,
                                            "responsibleHomologacao",
                                            e.target.value
                                          )
                                        }
                                        className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 w-full text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label className="text-sm text-gray-300">
                                        Data de entrega
                                      </Label>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            className="justify-start text-left font-normal bg-[#1A1A1E] border-gray-600 text-gray-200 hover:bg-[#1A1A1E] w-full"
                                          >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                                            {service.updatedAt ? (
                                              format(
                                                new Date(service.updatedAt),
                                                "PPP",
                                                { locale: ptBR }
                                              )
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
                                            selected={
                                              service.updatedAt
                                                ? new Date(service.updatedAt)
                                                : undefined
                                            }
                                            onSelect={
                                              handleNewServiceDateChange
                                            }
                                            className="bg-[#1A1A1E] text-gray-200"
                                          />
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  </div>
                                  <div className="space-y-2 mb-4">
                                    <Label className="text-sm text-gray-300">
                                      Comentários
                                    </Label>
                                    <Textarea
                                      value={service.comments}
                                      onChange={(e) =>
                                        handleServiceUpdate(
                                          index,
                                          "comments",
                                          e.target.value
                                        )
                                      }
                                      className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 min-h-[80px] hover:bg-[#23232B] hover:text-gray-500"
                                    />
                                  </div>
                                  <div className="flex justify-end gap-3">
                                    <Button
                                      onClick={() =>
                                        setEditingServiceId(undefined)
                                      }
                                      className="text-gray-400 bg-transparent hover:bg-zinc-900 cursor-pointer"
                                    >
                                      Cancelar
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        setEditingServiceId(undefined)
                                      }
                                      className="bg-amber-600 hover:bg-amber-700 cursor-pointer"
                                    >
                                      <Check size={16} className="mr-2" />
                                      Atualizar
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ) : (
                              <Card className="bg-[#1A1A1D] border-[#2A2A2D] hover:border-[#3A3A3D] transition-all duration-200 group relative">
                                <CardContent
                                  className="p-4"
                                  onMouseEnter={() =>
                                    setHoveredServiceId(service.id)
                                  }
                                  onMouseLeave={() =>
                                    setHoveredServiceId(undefined)
                                  }
                                >
                                  <div className="flex items-center justify-between pr-8">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-medium text-gray-100">
                                          {service.name}
                                        </h4>
                                        <Badge
                                          variant="outline"
                                          className={getStatusBadgeColor(
                                            service.status
                                          )}
                                        >
                                          {service.status}
                                        </Badge>
                                        {service.itemObrigatorio === "Sim" && (
                                          <Badge
                                            variant="secondary"
                                            className="bg-orange-500/20 text-orange-400 border-orange-500/30"
                                          >
                                            Obrigatório
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="text-sm text-gray-400 space-y-1">
                                        {service.responsible && (
                                          <p>
                                            Responsável: {service.responsible}
                                          </p>
                                        )}
                                        {service.updatedAt && (
                                          <p>
                                            Atualizado:{" "}
                                            {format(
                                              new Date(service.updatedAt),
                                              "PPP",
                                              { locale: ptBR }
                                            )}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {hoveredServiceId === service.id && (
                                    <motion.div
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 10 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col gap-1 z-10"
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingServiceId(service.id);
                                        }}
                                        className="cursor-pointer"
                                        aria-label="Editar serviço"
                                      >
                                        <SquarePen
                                          size={16}
                                          className="text-gray-600/80 hover:text-amber-500"
                                        />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteService(index);
                                        }}
                                        className="cursor-pointer"
                                        aria-label="Deletar serviço"
                                      >
                                        <Trash2
                                          size={16}
                                          className="text-red-400/50 hover:text-red-300"
                                        />
                                      </button>
                                    </motion.div>
                                  )}
                                </CardContent>
                              </Card>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Message Display */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mx-8 p-4 rounded-lg border ${
                  message.includes("sucesso")
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Actions */}
          <div className="border-t border-[#1F1F23] p-8 bg-[#0F0F11] rounded-b-lg">
            <div className="flex justify-end gap-3">
              <Button
                onClick={onClose}
                variant="ghost"
                disabled={isSaving}
                className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] cursor-pointer"
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg min-w-[120px] cursor-pointer"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                {isSaving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
