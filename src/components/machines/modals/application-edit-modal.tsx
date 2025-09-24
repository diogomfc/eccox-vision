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
import {
  Dialog,
  DialogContentLarge,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Save,
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
  machineId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApplication: Application) => void;
  isEditMode?: boolean;
  isLoading?: boolean;
}

export default function ApplicationEditModal({
  application,
  machineId,
  isOpen,
  onClose,
  onSave,
  isEditMode = false,
  isLoading = false,
}: ApplicationEditModalProps) {
  const themeConfig = {
    focusColor: isEditMode ? "focus:!border-amber-500" : "focus:!border-blue-500",
    textAccent: isEditMode ? "text-amber-400" : "text-blue-400",
    borderAccent: isEditMode ? "border-amber-500/30" : "border-blue-500/30",
    buttonPrimary: isEditMode ? "bg-amber-600/50 hover:bg-amber-700" : "bg-blue-600/50 hover:bg-blue-700",
    selectFocusGreen: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-green-600/10",
    selectFocusRed: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-red-600/10",
    selectFocusPrimary: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-blue-600/10",
  };

  const [editApp, setEditApp] = useState<Application>({
    id: "", machine_id: "", name: "", tipo: "IBM", status: "Pendente", services: [],
  });

  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [serviceMessage, setServiceMessage] = useState<string | null>(null);

  const [newService, setNewService] = useState<Omit<Service, "id" | "application_id">>({
    name: "", status: "Pendente", itemObrigatorio: "Sim", responsible: "", comments: "", typePendencia: "", responsibleHomologacao: "", updatedAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (isOpen) {
      if (application) {
        setEditApp({ ...application });
      } else {
        setEditApp({
          id: `app-${Date.now()}`,
          machine_id: machineId,
          name: "",
          tipo: "IBM",
          status: "Pendente",
          services: [],
        });
      }
      setIsAddingService(false);
      setEditingServiceId(null);
      setServiceSearchTerm("");
      setServiceMessage(null);
    }
  }, [application, isOpen, machineId]);

  const handleServiceChange = (serviceId: string, key: string, value: any) => {
    setEditApp((prevApp) => {
      const updatedServices = prevApp.services.map((service) => {
        if (service.id === serviceId) {
          const finalValue = (key === 'updatedAt' && value instanceof Date) ? value.toISOString() : value;
          return { ...service, [key]: finalValue };
        }
        return service;
      });
      return { ...prevApp, services: updatedServices };
    });
  };

  const handleAddService = useCallback(() => {
    if (!newService.name.trim()) {
      setServiceMessage("Nome do serviço é obrigatório.");
      return;
    }
    const serviceToCreate: Service = {
      id: `service-${Date.now()}`,
      application_id: editApp.id,
      ...newService,
    };
    setEditApp((prev) => ({
      ...prev,
      services: [...prev.services, serviceToCreate],
    }));
    setNewService({
        name: "", status: "Pendente", itemObrigatorio: "Sim", responsible: "", comments: "", typePendencia: "", responsibleHomologacao: "", updatedAt: new Date().toISOString()
    });
    setIsAddingService(false);
    setServiceMessage("Serviço adicionado. Salve a aplicação para registrar.");
    setTimeout(() => setServiceMessage(null), 3000);
  }, [newService, editApp.id]);

  const handleConfirmEditService = () => {
    setEditingServiceId(null);
    setServiceMessage("Alterações no serviço prontas. Salve a aplicação para registrar.");
    setTimeout(() => setServiceMessage(null), 3000);
  };

  const handleDeleteService = useCallback((serviceId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
        setEditApp((prev) => ({
            ...prev,
            services: prev.services.filter((s) => s.id !== serviceId),
        }));
        setServiceMessage("Serviço removido. Salve a aplicação para confirmar.");
        setTimeout(() => setServiceMessage(null), 3000);
    }
  }, []);

  const handleSaveApplication = useCallback(() => {
    if (!editApp.name.trim()) {
      setServiceMessage("Nome da aplicação é obrigatório.");
      return;
    }
    onSave(editApp);
  }, [editApp, onSave]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Concluída": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Pendente": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Em andamento": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredServices = useMemo(() => {
    if (!serviceSearchTerm) return editApp.services;
    return editApp.services.filter(
      (s) =>
        s.name.toLowerCase().includes(serviceSearchTerm.toLowerCase()) ||
        s.responsible?.toLowerCase().includes(serviceSearchTerm.toLowerCase()) ||
        s.responsibleHomologacao?.toLowerCase().includes(serviceSearchTerm.toLowerCase())
    );
  }, [editApp.services, serviceSearchTerm]);

  const isFormValid = useMemo(() => editApp.name.trim() !== "", [editApp.name]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContentLarge className="mx-auto w-full h-[85vh] p-6 flex flex-col bg-[#0A0A0C] border border-gray-700/50">
        <DialogHeader className="flex-shrink-0 pb-4 border-b border-gray-700/50">
          <DialogTitle className="text-xl font-bold text-gray-100 flex items-center gap-3">
            <Layers className={`w-6 h-6 ${themeConfig.textAccent}`} />
            {isEditMode ? "Editar" : "Criar"} Aplicação
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
            <div className={`p-4 bg-[#0F0F11] border ${themeConfig.borderAccent} rounded-lg`}>
              <h3 className="font-medium text-gray-100 mb-4">Informações da Aplicação</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label className="text-gray-200">Nome da Aplicação *</Label>
                  <Input value={editApp.name} onChange={(e) => setEditApp((prev) => ({ ...prev, name: e.target.value }))} className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B]`} disabled={isLoading}/>
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Tipo da Aplicação *</Label>
                    <Select value={editApp.tipo} onValueChange={(value: ApplicationType) => setEditApp((prev) => ({ ...prev, tipo: value }))} disabled={isLoading}>
                        <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] w-full`}><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                            <SelectItem value="IBM" className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}><span className="text-blue-400">IBM</span></SelectItem>
                            <SelectItem value="ECCOX" className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}><span className="text-blue-400">ECCOX</span></SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Status</Label>
                    <Select value={editApp.status} onValueChange={(value: StatusType) => setEditApp((prev) => ({ ...prev, status: value }))} disabled>
                        <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] w-full`}><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                            <SelectItem value="Concluída" className={`cursor-pointer ${themeConfig.selectFocusGreen}`}><span className="text-green-400">Concluída</span></SelectItem>
                            <SelectItem value="Pendente" className={`cursor-pointer ${themeConfig.selectFocusRed}`}><span className="text-red-400">Pendente</span></SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
            </div>

            <div className="bg-[#0F0F11] border border-gray-600/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3"><LayoutList size={20} className="text-gray-200" /><h3 className="font-medium text-gray-100">Serviços ({editApp.services.length})</h3></div>
                <div className="flex items-center gap-2">
                    <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><Input value={serviceSearchTerm} onChange={(e) => setServiceSearchTerm(e.target.value)} placeholder="Buscar serviço..." className={`bg-[#1A1A1D] border-[#2A2A2D] pl-10 ${themeConfig.focusColor} text-gray-100 placeholder-gray-500 w-48`} disabled={isLoading}/></div>
                    <Button onClick={() => { setEditingServiceId(null); setIsAddingService(true); }} className="cursor-pointer bg-blue-600/50 hover:bg-blue-700" disabled={isLoading || isAddingService}><Plus size={16} className="mr-1" />Serviço</Button>
                </div>
              </div>

              <AnimatePresence>
                {isAddingService && (
                  <ServiceForm
                    serviceData={newService}
                    // AQUI ESTÁ A CORREÇÃO CRÍTICA
                    onChange={(value, key) => {
                      const finalValue = (key === 'updatedAt' && value instanceof Date)
                        ? value.toISOString()
                        : value;
                      setNewService(prev => ({ ...prev, [key]: finalValue }));
                    }}
                    onSave={handleAddService}
                    onCancel={() => setIsAddingService(false)}
                    isEditMode={false}
                    isLoading={isLoading}
                  />
                )}
              </AnimatePresence>

              <div className="space-y-2 mt-4">
                {filteredServices.length === 0 && !isAddingService ? (
                    <div className="text-center py-8 bg-[#0A0A0C] rounded border border-[#2A2A2D]"><p className="text-gray-400">Nenhum serviço adicionado</p></div>
                ) : (
                  filteredServices.map((service) => (
                    <div key={service.id}>
                        {editingServiceId === service.id ? (
                          <ServiceForm serviceData={service} onChange={(value, key) => handleServiceChange(service.id, key, value)} onSave={handleConfirmEditService} onCancel={() => setEditingServiceId(null)} isEditMode={true} isLoading={isLoading}/>
                        ) : (
                          <div className="flex items-center justify-between p-2 bg-[#1A1A1E] rounded border border-[#2A2A2D]">
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-sm text-gray-300">{service.name}</span><span className="text-xs text-gray-500">|</span><span className="text-xs text-gray-500">{service.responsible || "N/A"}</span>
                                <Badge variant="outline" className={getStatusBadgeColor(service.status)}>{service.status}</Badge>
                                {service.itemObrigatorio === "Sim" && (<Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Obrigatório</Badge>)}
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" onClick={() => { setIsAddingService(false); setEditingServiceId(service.id); }} className="text-amber-400 hover:text-amber-300 h-6 w-6 p-0 cursor-pointer bg-transparent hover:bg-transparent" disabled={isLoading}><Edit3 size={12} /></Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteService(service.id)} className="text-red-400 hover:text-red-300 h-6 w-6 p-0 cursor-pointer bg-transparent hover:bg-transparent" disabled={isLoading}><Trash2 size={12} /></Button>
                            </div>
                          </div>
                        )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 pt-4 border-t border-gray-700/50 flex justify-end gap-3">
          <Button onClick={onClose} variant="ghost" className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] cursor-pointer" disabled={isLoading}>Cancelar</Button>
          <Button onClick={handleSaveApplication} className={`${themeConfig.buttonPrimary} min-w-[140px] cursor-pointer`} disabled={!isFormValid || isLoading}>
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Salvando...</> : <><Save size={16} className="mr-2" />{isEditMode ? "Salvar Alterações" : "Criar Aplicação"}</>}
          </Button>
        </div>
      </DialogContentLarge>
    </Dialog>
  );
}