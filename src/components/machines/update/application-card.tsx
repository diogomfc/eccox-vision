// src/components/machine-update/ApplicationCard.tsx
"use client";

import {
  Edit3,
  Trash2,
  Plus,
  X,
  Save,
  CalendarIcon,
  SquarePen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import ApplicationForm from "./application-form";
import ServiceForm from "./service-form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Importando os componentes já criados

// Tipos
interface EditableApplication {
  id: string;
  name: string;
  tipo: string;
  status: "Concluida" | "Pendente" | "Em andamento";
  services: EditableService[];
}

interface EditableService {
  id: string;
  name: string;
  status: "Concluida" | "Pendente" | "Em andamento";
  itemObrigatorio: "Sim" | "Não";
  updatedAt: string | null;
  responsible: string;
  comments: string;
  typePendencia: string;
  responsibleHomologacao: string;
}

// Props do componente
interface ApplicationCardProps {
  app: EditableApplication;
  isAddingService: string | null;
  setIsAddingService: React.Dispatch<React.SetStateAction<string | null>>;
  editingAppId: string | null;
  setEditingAppId: React.Dispatch<React.SetStateAction<string | null>>;
  editApp: Partial<EditableApplication>;
  setEditApp: React.Dispatch<
    React.SetStateAction<Partial<EditableApplication>>
  >;
  newService: Partial<EditableService>;
  setNewService: React.Dispatch<React.SetStateAction<Partial<EditableService>>>;
  editingServiceId: string | null;
  setEditingServiceId: React.Dispatch<React.SetStateAction<string | null>>;
  editingServiceAppId: string | null;
  setEditingServiceAppId: React.Dispatch<React.SetStateAction<string | null>>;
  editService: Partial<EditableService>;
  setEditService: React.Dispatch<
    React.SetStateAction<Partial<EditableService>>
  >;
  handleEditApplication: (appId: string) => void;
  handleSaveEditApplication: () => void;
  handleCancelEditApplication: () => void;
  handleDeleteApplication: (appId: string) => void;
  handleAddService: (appId: string) => void;
  handleEditService: (appId: string, serviceId: string) => void;
  handleSaveEditService: () => void;
  handleCancelEditService: () => void;
  handleDeleteService: (appId: string, serviceId: string) => void;
  getFilteredServices: (services: EditableService[]) => EditableService[];
  getStatusBadgeColor: (status: string) => string;
  serviceSearchTerm: string;
}

export default function ApplicationCard({
  app,
  isAddingService,
  setIsAddingService,
  editingAppId,
  setEditingAppId,
  editApp,
  setEditApp,
  newService,
  setNewService,
  editingServiceId,
  setEditingServiceId,
  editingServiceAppId,
  setEditingServiceAppId,
  editService,
  setEditService,
  handleEditApplication,
  handleSaveEditApplication,
  handleCancelEditApplication,
  handleDeleteApplication,
  handleAddService,
  handleEditService,
  handleSaveEditService,
  handleCancelEditService,
  handleDeleteService,
  getFilteredServices,
  getStatusBadgeColor,
  serviceSearchTerm,
}: ApplicationCardProps) {
  // Lógica para manusear a data do novo serviço (passado para ServiceForm)
  const handleNewServiceDateChange = (date: Date | undefined) => {
    setNewService((prev) => ({
      ...prev,
      updatedAt: date ? date.toISOString() : null,
    }));
  };

  // Lógica para manusear a data do serviço em edição (passado para ServiceForm)
  const handleEditServiceDateChange = (date: Date | undefined) => {
    setEditService((prev) => ({
      ...prev,
      updatedAt: date ? date.toISOString() : null,
    }));
  };

  return (
    <Card className="bg-[#1A1A1D] border-[#2A2A2D]">
      <CardContent className="p-4">
        <AnimatePresence>
          {editingAppId === app.id ? (
            <ApplicationForm
              formTitle="Editando Aplicação"
              applicationState={editApp}
              setApplicationState={setEditApp}
              onSave={handleSaveEditApplication}
              onCancel={handleCancelEditApplication}
              isNewApplication={false}
            />
          ) : (
            // card da aplicação editar excluir e adicionar serviço
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-gray-100">{app.name}</h4>
                <Badge
                  variant="outline"
                  className={getStatusBadgeColor(app.status)}
                >
                  {app.status}
                </Badge>
                <span className="text-sm text-gray-400">
                  {app.services.length} serviços
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HoverCard>
                  <HoverCardTrigger>
                    <Button
                      size="sm"
                      onClick={() => handleEditApplication(app.id)}
                      className="text-amber-400 hover:text-gray-200 bg-transparent hover:bg-amber-700/10 cursor-pointer h-8 w-8 p-0 rounded-full flex items-center justify-center"
                    >
                      <SquarePen size={14} />
                    </Button>
                  </HoverCardTrigger>

                  <HoverCardContent className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded-md flex items-center justify-center shadow-md border border-zinc-700 max-w-[120px]">
                    <p className="text-xs font-normal truncate">
                      Editar Aplicação
                    </p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger>
                    <Button
                      size="sm"
                      onClick={() => setIsAddingService(app.id)}
                      className="text-blue-400 cursor-pointer hover:text-gray-200 bg-transparent hover:bg-blue-600/10 h-8 w-8 p-0 rounded-full flex items-center justify-center"
                    >
                      <Plus size={14} className="" />
                    </Button>
                  </HoverCardTrigger>

                  <HoverCardContent className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded-md flex items-center justify-center shadow-md border border-zinc-700 max-w-[120px]">
                    <p className="text-xs font-normal truncate">
                      Adicionar Serviço
                    </p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger>
                    <Button
                      size="sm"
                      onClick={() => handleDeleteApplication(app.id)}
                      className="text-red-400 cursor-pointer hover:text-gray-200 bg-transparent hover:bg-red-600/10 h-8 w-8 p-0 rounded-full flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded-md flex items-center justify-center shadow-md border border-zinc-700 max-w-[120px]">
                    <p className="text-xs font-normal truncate">
                      Excluir aplicação
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Formulário de Adição de Serviço */}
        <AnimatePresence>
          {isAddingService === app.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className=""
            >
              <ServiceForm
                formTitle="Novo Serviço"
                serviceState={newService}
                setServiceState={setNewService}
                onSave={() => handleAddService(app.id)}
                onCancel={() => setIsAddingService(null)}
                isNewService={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lista de Serviços */}
        {app.services.length > 0 && (
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-medium text-gray-300">Serviços:</h5>
              {serviceSearchTerm &&
                getFilteredServices(app.services).length !==
                  app.services.length && (
                  <Badge
                    variant="outline"
                    className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-xs"
                  >
                    {getFilteredServices(app.services).length} de{" "}
                    {app.services.length}
                  </Badge>
                )}
            </div>
            <div className="space-y-2">
              {getFilteredServices(app.services).length === 0 ? (
                <div className="text-center py-4 bg-[#0A0A0C] rounded border border-[#2A2A2D]">
                  <p className="text-xs text-gray-500">
                    Nenhum serviço encontrado com "{serviceSearchTerm}"
                  </p>
                </div>
              ) : (
                getFilteredServices(app.services).map((service) => (
                  <div key={service.id}>
                    <AnimatePresence>
                      {editingServiceId === service.id &&
                      editingServiceAppId === app.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <ServiceForm
                            formTitle="Editando Serviço"
                            serviceState={editService}
                            setServiceState={setEditService}
                            onSave={handleSaveEditService}
                            onCancel={handleCancelEditService}
                            isNewService={false}
                          />
                        </motion.div>
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
                            <HoverCard>
                              <HoverCardTrigger>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleEditService(app.id, service.id)
                                  }
                                  className="text-amber-400 hover:text-amber-300 h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-amber-600/10"
                                >
                                  <Edit3 size={12} />
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded-md flex items-center justify-center shadow-md border border-zinc-700 max-w-[100px]">
                                <p className="text-xs font-normal truncate">
                                  Editar Serviço
                                </p>
                              </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                              <HoverCardTrigger>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteService(app.id, service.id)
                                  }
                                  className="text-red-400 hover:text-red-300 h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-red-600/10"
                                >
                                  <Trash2 size={12} />
                                </Button>
                              </HoverCardTrigger>

                              <HoverCardContent className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded-md flex items-center justify-center shadow-md border border-zinc-700 max-w-[110px]">
                                <p className="text-xs font-normal truncate">
                                  Excluir Serviço
                                </p>
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
        )}
      </CardContent>
    </Card>
  );
}
