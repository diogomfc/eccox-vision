// src/components/machine-update/ApplicationsStep.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import {
  X,
  Plus,
  Search,
  Layers,
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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ApplicationForm from "./application-form";
import ApplicationCard from "./application-card";

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
interface ApplicationsStepProps {
  applications: EditableApplication[];
  setApplications: React.Dispatch<React.SetStateAction<EditableApplication[]>>;
  setMessage: (message: string | null) => void;
}

export default function ApplicationsStep({
  applications,
  setApplications,
  setMessage,
}: ApplicationsStepProps) {
  // Applications data
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [newApp, setNewApp] = useState<Partial<EditableApplication>>({
    name: "",
    tipo: "",
    status: "Pendente" as "Concluida" | "Pendente",
  });
  const [editApp, setEditApp] = useState<Partial<EditableApplication>>({
    name: "",
    tipo: "",
    status: "Pendente" as "Concluida" | "Pendente",
  });

  // Services data
  const [isAddingService, setIsAddingService] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingServiceAppId, setEditingServiceAppId] = useState<string | null>(
    null
  );
  const [newService, setNewService] = useState<Partial<EditableService>>({
    name: "",
    status: "Pendente" as "Concluida" | "Pendente" | "Em andamento",
    itemObrigatorio: "Sim" as "Sim" | "Não",
    updatedAt: null,
    responsible: "",
    comments: "",
    typePendencia: "",
    responsibleHomologacao: "",
  });
  const [editService, setEditService] = useState<Partial<EditableService>>({
    name: "",
    status: "Pendente" as "Concluida" | "Pendente" | "Em andamento",
    itemObrigatorio: "Sim" as "Sim" | "Não",
    updatedAt: null,
    responsible: "",
    comments: "",
    typePendencia: "",
    responsibleHomologacao: "",
  });

  // filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Concluida" | "Pendente"
  >("all");
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");

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

  // Função para filtrar serviços
  const getFilteredServices = useCallback(
    (services: EditableService[]) => {
      if (!serviceSearchTerm) return services;
      return services.filter(
        (service) =>
          service.name
            .toLowerCase()
            .includes(serviceSearchTerm.toLowerCase()) ||
          service.responsible
            ?.toLowerCase()
            .includes(serviceSearchTerm.toLowerCase()) ||
          service.responsibleHomologacao
            ?.toLowerCase()
            .includes(serviceSearchTerm.toLowerCase()) ||
          service.typePendencia
            ?.toLowerCase()
            .includes(serviceSearchTerm.toLowerCase()) ||
          service.comments
            ?.toLowerCase()
            .includes(serviceSearchTerm.toLowerCase())
      );
    },
    [serviceSearchTerm]
  );

  // Função para filtrar aplicações (considerando pesquisa de serviços)
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesAppSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tipo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;
      const hasMatchingServices = serviceSearchTerm
        ? getFilteredServices(app.services).length > 0
        : true;
      if (serviceSearchTerm && !searchTerm) {
        return matchesStatus && hasMatchingServices;
      }
      return matchesAppSearch && matchesStatus && hasMatchingServices;
    });
  }, [
    applications,
    searchTerm,
    statusFilter,
    serviceSearchTerm,
    getFilteredServices,
  ]);

  // Application handlers
  const handleAddApplication = () => {
    if (!(newApp.name || "").trim() || !(newApp.tipo || "").trim()) {
      setMessage("Nome e tipo da aplicação são obrigatórios.");
      return;
    }

    const app: EditableApplication = {
      id: `app-${Date.now()}`,
      name: newApp.name || "",
      tipo: newApp.tipo || "",
      status: (newApp.status as EditableApplication["status"]) || "Pendente",
      services: [],
    };

    setApplications((prev) => [...prev, app]);
    setNewApp({ name: "", tipo: "", status: "Pendente" });
    setIsAddingApp(false);
    setMessage(null);
  };

  const handleEditApplication = (appId: string) => {
    const app = applications.find((a) => a.id === appId);
    if (app) {
      setEditApp({
        name: app.name,
        tipo: app.tipo,
        status: app.status,
      });
      setEditingAppId(appId);
    }
  };

  const handleSaveEditApplication = () => {
    if (!(editApp.name || "").trim() || !(editApp.tipo || "").trim()) {
      setMessage("Nome e tipo da aplicação são obrigatórios.");
      return;
    }

    setApplications((prev) =>
      prev.map((app) =>
        app.id === editingAppId
          ? {
              ...app,
              name: editApp.name ?? app.name,
              tipo: editApp.tipo ?? app.tipo,
              status: (editApp.status as EditableApplication["status"]) ?? app.status,
            }
          : app
      )
    );

    setEditingAppId(null);
    setEditApp({ name: "", tipo: "", status: "Pendente" });
    setMessage(null);
  };

  const handleCancelEditApplication = () => {
    setEditingAppId(null);
    setEditApp({ name: "", tipo: "", status: "Pendente" });
  };

  const handleDeleteApplication = (appId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
    setMessage(null);
  };

  // Service handlers
  const handleAddService = (appId: string) => {
    if (!newService.name?.trim()) {
      setMessage("Nome do serviço é obrigatório.");
      return;
    }

    const service: EditableService = {
      id: `service-${Date.now()}`,
      name: newService.name || "",
      status: (newService.status as EditableService["status"]) || "Pendente",
      itemObrigatorio:
        (newService.itemObrigatorio as EditableService["itemObrigatorio"]) ||
        "Sim",
      responsible: newService.responsible || "",
      comments: newService.comments || "",
      typePendencia: newService.typePendencia || "",
      responsibleHomologacao: newService.responsibleHomologacao || "",
      updatedAt: newService.updatedAt || new Date().toISOString(),
    };

    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, services: [...app.services, service] }
          : app
      )
    );

    setNewService({
      name: "",
      status: "Pendente",
      itemObrigatorio: "Sim",
      responsible: "",
      comments: "",
      typePendencia: "",
      responsibleHomologacao: "",
    });
    setIsAddingService(null);
    setMessage(null);
  };

  const handleEditService = (appId: string, serviceId: string) => {
    const app = applications.find((a) => a.id === appId);
    const service = app?.services.find((s) => s.id === serviceId);

    if (service) {
      setEditService({
        name: service.name,
        status: service.status,
        itemObrigatorio: service.itemObrigatorio,
        updatedAt: service.updatedAt,
        responsible: service.responsible,
        comments: service.comments,
        typePendencia: service.typePendencia,
        responsibleHomologacao: service.responsibleHomologacao,
      });
      setEditingServiceId(serviceId);
      setEditingServiceAppId(appId);
    }
  };

  const handleSaveEditService = () => {
    if (!editService.name?.trim()) {
      setMessage("Nome do serviço é obrigatório.");
      return;
    }

    setApplications((prev) =>
      prev.map((app) =>
        app.id === editingServiceAppId
          ? {
              ...app,
              services: app.services.map((service) =>
                service.id === editingServiceId
                  ? {
                      ...service,
                      name: editService.name || "",
                      status: editService.status || "Pendente",
                      itemObrigatorio: editService.itemObrigatorio || "Sim",
                      updatedAt: editService.updatedAt || service.updatedAt,
                      responsible: editService.responsible || "",
                      comments: editService.comments || "",
                      typePendencia: editService.typePendencia || "",
                      responsibleHomologacao:
                        editService.responsibleHomologacao || "",
                    }
                  : service
              ),
            }
          : app
      )
    );

    setEditingServiceId(null);
    setEditingServiceAppId(null);
    setEditService({
      name: "",
      status: "Pendente",
      itemObrigatorio: "Sim",
      updatedAt: null,
      responsible: "",
      comments: "",
      typePendencia: "",
      responsibleHomologacao: "",
    });
    setMessage(null);
  };

  const handleCancelEditService = () => {
    setEditingServiceId(null);
    setEditingServiceAppId(null);
    setEditService({
      name: "",
      status: "Pendente",
      itemObrigatorio: "Sim",
      updatedAt: null,
      responsible: "",
      comments: "",
      typePendencia: "",
      responsibleHomologacao: "",
    });
  };

  const handleDeleteService = (appId: string, serviceId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, services: app.services.filter((s) => s.id !== serviceId) }
          : app
      )
    );
    setMessage(null);
  };

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Seção de Controles - Filtros, Pesquisa e Adicionar */}
      <div className="bg-[#0F0F11] border border-gray-600/30 rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
          {/* Lado Esquerdo - Filtros e Pesquisas */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Pesquisa de Aplicações */}
            <div className="space-y-2 lg:col-span-2">
              <Label className="text-sm font-medium text-gray-200">
                Pesquisar Aplicação
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome ou tipo de aplicação..."
                  className="bg-[#1A1A1D] border-[#2A2A2D] pl-10 focus:!border-amber-500 text-gray-100 placeholder-gray-500 hover:bg-[#23232B] hover:text-gray-500"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-1 top-1/2 transform cursor-pointer -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Filtro de Status */}
            <div className="space-y-2 lg:col-span-2">
              <Label className="text-sm font-medium text-gray-200">
                Status
              </Label>
              <Select
                value={statusFilter}
                onValueChange={(value: "all" | "Concluida" | "Pendente") =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] cursor-pointer  focus:!border-amber-500 text-gray-100 w-full hover:bg-[#23232B] hover:text-gray-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] cursor-pointer">
                  <SelectItem value="all" className="cursor-pointer focus:bg-gray-600/50">
                    <span className="text-gray-300">Todos</span>
                  </SelectItem>
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

            {/* Pesquisa de Serviços */}
            <div className="space-y-2 lg:col-span-2">
              <Label className="text-sm font-medium text-gray-200">
                Pesquisar Serviço
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  value={serviceSearchTerm}
                  onChange={(e) => setServiceSearchTerm(e.target.value)}
                  placeholder="Nome ou responsável..."
                  className="bg-[#1A1A1D] border-[#2A2A2D] pl-10 focus:!border-blue-500 text-gray-100 placeholder-gray-500 hover:bg-[#23232B] hover:text-gray-500"
                />
                {serviceSearchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setServiceSearchTerm("")}
                    className="absolute right-1 top-1/2 transform cursor-pointer -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Lado Direito - Botão Adicionar e Estatísticas */}
          <div className="flex items-end gap-4">
            {/* Estatísticas Rápidas */}
            <div className="hidden lg:flex items-center gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-400 text-xs">Total</p>
                <p className="text-gray-200 font-bold">{applications.length}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs">Encontradas</p>
                <p className="text-amber-400 font-bold">
                  {filteredApplications.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs">Serviços</p>
                <p className="text-blue-400 font-bold">
                  {serviceSearchTerm
                    ? filteredApplications.reduce(
                        (acc, app) => acc + getFilteredServices(app.services).length,
                        0
                      )
                    : applications.reduce((acc, app) => acc + app.services.length, 0)}
                </p>
              </div>
            </div>

            {/* Botão Adicionar Aplicação */}
            <Button
              onClick={() => setIsAddingApp((prev) => !prev)}
              className={`${
                isAddingApp
                  ? "bg-red-600/50 hover:bg-red-700/50"
                  : "bg-blue-600/50 hover:bg-blue-700/50"
              } cursor-pointer min-w-[100px] shadow-lg`}
            >
              {isAddingApp ? (
                <>
                  <X size={16} className="" />
                  Cancelar
                </>
              ) : (
                <>
                  <Plus size={16} className="" />
                  Aplicação
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Indicadores de Filtros Ativos */}
        {(searchTerm || statusFilter !== "all" || serviceSearchTerm) && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-700/50">
            <span className="text-xs text-gray-400 font-medium">
              Filtros ativos:
            </span>

            {searchTerm && (
              <Badge
                variant="outline"
                className="bg-amber-600/20 text-amber-400 border-amber-500/30 cursor-pointer hover:bg-amber-600/30"
                onClick={() => setSearchTerm("")}
              >
                App: "{searchTerm}" <X className="ml-1 h-3 w-3" />
              </Badge>
            )}

            {statusFilter !== "all" && (
              <Badge
                variant="outline"
                className={`cursor-pointer hover:opacity-80 ${getStatusBadgeColor(
                  statusFilter
                )}`}
                onClick={() => setStatusFilter("all")}
              >
                Status: {statusFilter} <X className="ml-1 h-3 w-3" />
              </Badge>
            )}

            {serviceSearchTerm && (
              <Badge
                variant="outline"
                className="bg-blue-600/20 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-600/30"
                onClick={() => setServiceSearchTerm("")}
              >
                Serviço: "{serviceSearchTerm}" <X className="ml-1 h-3 w-3" />
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setServiceSearchTerm("");
              }}
              className="text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-600/30 h-6 px-2 cursor-pointer"
            >
              Limpar todos
            </Button>
          </div>
        )}
      </div>

      {/* Formulário de Nova Aplicação */}
      <AnimatePresence>
        {isAddingApp && (
          <ApplicationForm
            formTitle="Adicionando Nova Aplicação"
            applicationState={newApp}
            setApplicationState={setNewApp}
            onSave={handleAddApplication}
            onCancel={() => setIsAddingApp(false)}
            isNewApplication={true}
          />
        )}
      </AnimatePresence>

      {/* Lista de Aplicações */}
      <div className="space-y-4">
        {filteredApplications.length === 0 && !isAddingApp ? (
          <div className="text-center py-12 bg-[#0F0F11] rounded-lg border border-[#1F1F23]">
            {applications.length === 0 ? (
              <>
                <Layers size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 mb-2">Nenhuma aplicação adicionada</p>
                <p className="text-sm text-gray-500">
                  Clique em "Nova Aplicação" para começar
                </p>
              </>
            ) : (
              <>
                <Search size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 mb-2">Nenhuma aplicação encontrada</p>
                <p className="text-sm text-gray-500">
                  Tente ajustar os filtros de pesquisa
                </p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setServiceSearchTerm("");
                  }}
                  className="mt-3 text-gray-400 hover:text-gray-200 hover:bg-gray-600/30 cursor-pointer"
                >
                  <X className="mr-2 h-4 w-4" />
                  Limpar filtros
                </Button>
              </>
            )}
          </div>
        ) : (
          filteredApplications.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              isAddingService={isAddingService}
              setIsAddingService={setIsAddingService}
              editingAppId={editingAppId}
              setEditingAppId={setEditingAppId}
              editApp={editApp}
              setEditApp={setEditApp}
              newService={newService}
              setNewService={setNewService}
              editingServiceId={editingServiceId}
              setEditingServiceId={setEditingServiceId}
              editingServiceAppId={editingServiceAppId}
              setEditingServiceAppId={setEditingServiceAppId}
              editService={editService}
              setEditService={setEditService}
              handleEditApplication={handleEditApplication}
              handleSaveEditApplication={handleSaveEditApplication}
              handleCancelEditApplication={handleCancelEditApplication}
              handleDeleteApplication={handleDeleteApplication}
              handleAddService={handleAddService}
              handleEditService={handleEditService}
              handleSaveEditService={handleSaveEditService}
              handleCancelEditService={handleCancelEditService}
              handleDeleteService={handleDeleteService}
              getFilteredServices={getFilteredServices}
              getStatusBadgeColor={getStatusBadgeColor}
              serviceSearchTerm={serviceSearchTerm}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}