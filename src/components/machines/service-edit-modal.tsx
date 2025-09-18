// src/components/machines/service-edit-modal.tsx
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
import { Check, X, Loader2, CalendarIcon, Trash2 } from "lucide-react";
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
import type { Service, ServiceStatus } from "@/types/machines";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ServiceEditModalProps {
  service: Service;
  application?: {
    name: string;
  };
  machine?: {
    name: string;
    system: string;
  };
  onClose: () => void;
  onUpdated: () => void;
  onDelete?: () => void;
}

export function ServiceEditModal({
  service,
  application,
  machine,
  onClose,
  onUpdated,
  onDelete,
}: ServiceEditModalProps) {
  const [editedService, setEditedService] = useState<Service>(service);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setEditedService((prev) => ({
      ...prev,
      updatedAt: date ? date.toISOString() : null,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      // await window.electronAPI.updateService(editedService);
      setMessage("Serviço atualizado com sucesso!");
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

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      // await window.electronAPI.deleteService(service.id);
      setMessage("Serviço excluído com sucesso!");
      setTimeout(() => {
        onDelete?.();
        onClose();
      }, 1500);
    } catch (error) {
      setMessage("Erro ao excluir o serviço.");
    } finally {
      setIsDeleting(false);
    }
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
        className="!w-[95vw] !max-w-[95vw] h-[95vh] flex flex-col p-0 bg-[#0A0A0B] text-gray-100 border border-[#1F1F23] shadow-2xl"
        style={{ width: "95vw", maxWidth: "95vw" }}
      >
        {/* Header */}
        <DialogHeader className="border-b border-[#1F1F23] p-6 bg-gradient-to-r from-[#0F0F11] to-[#1A1A1D]">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <DialogTitle className="text-2xl font-semibold text-gray-100">
                  {editedService.name}
                </DialogTitle>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {application?.name && (
                    <>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      <span>{application.name}</span>
                    </>
                  )}
                  {machine?.name && (
                    <>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      <span>Máquina {machine.name}</span>
                    </>
                  )}
                  {machine?.system && (
                    <>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      <span>Sistema {machine.system}</span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Edite os detalhes deste serviço
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={getStatusBadgeColor(editedService.status)}
              >
                {editedService.status}
              </Badge>
              {editedService.itemObrigatorio === "Sim" && (
                <Badge
                  variant="secondary"
                  className="bg-orange-500/20 text-orange-400 border-orange-500/30"
                >
                  Obrigatório
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-[#0F0F11] border-amber-500/30 border-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-100 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    Detalhes do Serviço
                  </h3>

                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="serviceName"
                        className="text-sm font-medium text-gray-300"
                      >
                        Nome do Serviço
                      </Label>
                      <Input
                        id="serviceName"
                        name="name"
                        value={editedService.name}
                        onChange={handleInputChange}
                        className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 transition-colors w-full hover:bg-[#23232B] hover:text-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="serviceStatus"
                        className="text-sm font-medium text-gray-300"
                      >
                        Status
                      </Label>
                      <Select
                        value={editedService.status}
                        onValueChange={(value) =>
                          handleSelectChange("status", value)
                        }
                      >
                        <SelectTrigger className={`
                            bg-[#8e8eaf] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 transition-colors w-full cursor-pointer ${
                              editedService.status === "Concluida"
                                ? "text-emerald-400"
                                : editedService.status === "Pendente"
                                ? "text-red-400"
                                : editedService.status === "Em andamento"
                                ? "text-amber-400"
                                : "text-gray-400"
                            }
                          `}>
                          <SelectValue placeholder="Selecione o status" />
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
                      <Label
                        htmlFor="itemObrigatorio"
                        className="text-sm font-medium text-gray-300"
                      >
                        Item Obrigatório
                      </Label>
                      <Select
                        value={editedService.itemObrigatorio}
                        onValueChange={(value) =>
                          handleSelectChange("itemObrigatorio", value)
                        }
                      >
                        <SelectTrigger className={`
                            bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 transition-colors w-full cursor-pointer ${
                              editedService.itemObrigatorio === "Sim"
                                ? "text-green-400"
                                : editedService.itemObrigatorio === "Não"
                                ? "text-red-400"
                                : "text-gray-400"
                            }
                          `}>
                          <SelectValue placeholder="Item Obrigatório" />
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
                      <Label
                        htmlFor="responsible"
                        className="text-sm font-medium text-gray-300"
                      >
                        Responsável
                      </Label>
                      <Input
                        id="responsible"
                        name="responsible"
                        value={editedService.responsible}
                        onChange={handleInputChange}
                        className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 transition-colors w-full hover:bg-[#23232B] hover:text-gray-500"
                        placeholder="Nome do responsável"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="responsibleHomologacao"
                        className="text-sm font-medium text-gray-300"
                      >
                        Responsável Homologação
                      </Label>
                      <Input
                        id="responsibleHomologacao"
                        name="responsibleHomologacao"
                        value={editedService.responsibleHomologacao}
                        onChange={handleInputChange}
                        className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 transition-colors w-full hover:bg-[#23232B] hover:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="updatedAt"
                        className="text-sm font-medium text-gray-300"
                      >
                        Última Atualização
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-start text-left font-normal bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500 w-full"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                            {editedService.updatedAt ? (
                              format(new Date(editedService.updatedAt), "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-gray-400">
                                Selecione a data
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#1A1A1D] border-[#2A2A2D]">
                          <Calendar
                            mode="single"
                            selected={
                              editedService.updatedAt
                                ? new Date(editedService.updatedAt)
                                : undefined
                            }
                            onSelect={handleDateChange}
                            className="bg-[#1A1A1D] text-gray-200"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label
                      htmlFor="comments"
                      className="text-sm font-medium text-gray-300"
                    >
                      Comentários
                    </Label>
                    <Textarea
                      id="comments"
                      name="comments"
                      value={editedService.comments}
                      onChange={handleInputChange}
                      className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 min-h-[100px] hover:bg-[#23232B] hover:text-gray-500"
                      placeholder="Comentários adicionais sobre o serviço..."
                    />
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
          <div className="border-t border-[#1F1F23] p-8 bg-[#0F0F11]">
            <div className="flex justify-between">
              <div>
                {onDelete && (
                  <Button
                    onClick={handleDelete}
                    variant="ghost"
                    disabled={isSaving || isDeleting}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-6"
                  >
                    {isDeleting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    {isDeleting ? "Excluindo..." : "Excluir Serviço"}
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  variant="ghost"
                  disabled={isSaving || isDeleting}
                  className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] px-6 cursor-pointer"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving || isDeleting}
                  className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg min-w-[160px] px-6 cursor-pointer"
                >
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  {isSaving ? "Aguarde..." : "Atualizar Serviço"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
