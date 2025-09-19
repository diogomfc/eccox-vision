"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  X,
  Loader2,
  CalendarIcon,
  Plus,
  ArrowLeft,
  Server,
  Layers,
  Settings,
  Edit3,
  Trash2,
  Save,
  CheckCircle,
  Search,
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import type { Machines, Application, Service } from "@/types/machines";

import ImgServerNew from "@/assets/images/img-server-status.svg";
import ImgServerPendente from "@/assets/images/img-server-status-warning.svg";
import ImgServerConcluida from "@/assets/images/img-server-status-ok.svg";


// Tipos adaptados para o contexto de edição
interface EditableApplication {
  id: string;
  name: string;
  tipo: string;
  status: "Concluida" | "Pendente";
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

interface MachineUpdateClientProps {
  machineId: string;
}

export default function MachineUpdateClient({
  machineId,
}: MachineUpdateClientProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Machine data
  const [editingMachine, setEditingMachine] = useState<Partial<Machines>>({});

  // Applications data
  const [applications, setApplications] = useState<EditableApplication[]>([]);
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [newApp, setNewApp] = useState({
    name: "",
    tipo: "",
    status: "Pendente" as "Concluida" | "Pendente",
  });
  const [editApp, setEditApp] = useState({
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

  const steps = [
    { id: 1, title: "Informações da Máquina", icon: ImgServerNew },
    { id: 2, title: "Aplicações", icon: Layers },
    { id: 3, title: "Revisão & Edição", icon: Settings },
  ];

  const currentStep = useMemo(
    () => steps.find((s) => s.id === activeStep),
    [activeStep, steps]
  );

  // === LÓGICA DE CARREGAMENTO DOS DADOS DO BANCO DE DADOS ===
  useEffect(() => {
    async function fetchMachineData() {
      try {
        if (!machineId) {
          setMessage("ID da máquina não fornecido.");
          setIsLoading(false);
          return;
        }

        // Simulação da chamada para a Electron API
        const machineData = await window.electronAPI.getMachineById(machineId);

        if (machineData) {
          setEditingMachine(machineData);
          setApplications(machineData.applications as EditableApplication[]);
        } else {
          setMessage("Máquina não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao carregar dados da máquina:", error);
        setMessage("Erro ao carregar os dados. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMachineData();
  }, [machineId]);

  // === LÓGICA DE ATUALIZAÇÃO DOS DADOS NO BANCO DE DADOS ===
  const handleUpdate = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      if (!editingMachine.id) {
        setMessage("ID da máquina é necessário para a atualização.");
        setIsSaving(false);
        return;
      }

      const machineToUpdate = {
        ...editingMachine,
        applications: applications.map((app) => ({
          ...app,
          services: app.services,
        })),
      } as Machines;

      // Chama a função da Electron API para atualizar a máquina
      // const success = await window.electronAPI.updateMachine(machineToUpdate);

      // Mock para demonstração:
      const success = await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 2000);
      });

      if (success) {
        setMessage("Máquina atualizada com sucesso!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage("A atualização falhou. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar máquina:", error);
      setMessage("Erro ao atualizar a máquina. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMachineInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditingMachine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value: "Concluida" | "Pendente") => {
    setEditingMachine((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setEditingMachine((prev) => ({
      ...prev,
      updatedAt: date ? date.toISOString() : new Date().toISOString(),
    }));
  };

  const handleNewServiceDateChange = (date: Date | undefined) => {
    setNewService((prev) => ({
      ...prev,
      updatedAt: date ? date.toISOString() : null,
    }));
  };

  const handleEditServiceDateChange = (date: Date | undefined) => {
    setEditService((prev) => ({
      ...prev,
      updatedAt: date ? date.toISOString() : null,
    }));
  };

  // Application handlers
  const handleAddApplication = () => {
    if (!newApp.name.trim() || !newApp.tipo.trim()) {
      setMessage("Nome e tipo da aplicação são obrigatórios.");
      return;
    }

    const app: EditableApplication = {
      id: `app-${Date.now()}`,
      name: newApp.name,
      tipo: newApp.tipo,
      status: newApp.status,
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
    if (!editApp.name.trim() || !editApp.tipo.trim()) {
      setMessage("Nome e tipo da aplicação são obrigatórios.");
      return;
    }

    setApplications((prev) =>
      prev.map((app) =>
        app.id === editingAppId
          ? {
              ...app,
              name: editApp.name,
              tipo: editApp.tipo,
              status: editApp.status,
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
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (
        !editingMachine.name?.trim() ||
        !editingMachine.description?.trim() ||
        !editingMachine.version?.trim()
      ) {
        setMessage("Todos os campos da máquina são obrigatórios.");
        return;
      }
    }

    setMessage(null);
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
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
      // Filtro por nome/tipo da aplicação
      const matchesAppSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tipo.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por status da aplicação
      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      // Se há pesquisa de serviço, só mostra app se tiver serviços que batem com a pesquisa
      const hasMatchingServices = serviceSearchTerm
        ? getFilteredServices(app.services).length > 0
        : true;

      // Se está pesquisando serviço, ignora pesquisa de app (mostra app se tem serviço correspondente)
      if (serviceSearchTerm && !searchTerm) {
        return matchesStatus && hasMatchingServices;
      }

      // Se está pesquisando app, aplica filtros normais
      return matchesAppSearch && matchesStatus && hasMatchingServices;
    });
  }, [
    applications,
    searchTerm,
    statusFilter,
    serviceSearchTerm,
    getFilteredServices,
  ]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin mr-2 text-amber-500" />
        Carregando dados da máquina...
      </div>
    );
  }

  return (
    <div className="h-screen text-gray-100 flex flex-col">
      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 overflow-hidden pb-10">
        <div className="max-w-6xl mx-auto h-full pb-20 flex flex-col">
          <Card className="bg-gradient-to-br pt-0 from-[#111113] to-[#0F0F11] border-amber-500/30 shadow-2xl flex flex-col flex-1 overflow-hidden">
            {/* Header Integrado: Progress Steps dentro do Card Header */}
            <CardHeader className="bg-gradient-to-r from-amber-600/10 to-amber-700/5 border-b border-[#1F1F23] pt-6 flex-shrink-0">
              {/* Progress Steps */}
              <div className="">
                <div className="flex items-center justify-center gap-8 lg:gap-12">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-3">
                        {step.id === 1 ? (
                          <Image
                              src={editingMachine.status === "Concluida" ? ImgServerConcluida : editingMachine.status === "Pendente" ? ImgServerPendente : ImgServerNew}
                            alt="Servidor"
                            className="w-10 h-10 lg:w-12 lg:h-12 object-contain cursor-pointer"
                            onClick={() => setActiveStep(step.id)}
                          />
                        ) : (
                          <div
                            className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                              activeStep >= step.id
                                ? "bg-amber-600/20 border-amber-600/20 text-white shadow-lg shadow-amber-600/30"
                                : activeStep === step.id - 1
                                ? "border-amber-400/20 text-amber-400/20 bg-amber-600/1"
                                : "border-gray-600 text-gray-500 bg-[#1A1A1D]"
                            }`}
                            onClick={() => setActiveStep(step.id)}
                          >
                            <step.icon size={18} />
                          </div>
                        )}
                        <div className="text-center">
                          <p
                            className={`text-xs lg:text-sm font-medium transition-colors ${
                              activeStep >= step.id
                                ? "text-gray-100"
                                : "text-gray-500"
                            }`}
                          >
                            {/* {step.title} */}
                            {editingMachine.name && step.id === 1
                              ? `Máquina ${editingMachine.name}`
                              : step.title
                              }
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {editingMachine.status && step.id === 1
                              ? (
                                  <span className="text-gray-400">
                                    {editingMachine.status === "Concluida"
                                      ? <span className="text-green-400">Concluída</span>
                                      : editingMachine.status === "Pendente"
                                      ? <span className="text-red-400">Pendente</span>
                                      : <span className="text-amber-400">{editingMachine.status}</span>
                                    }
                                  </span>
                                )
                              : (
                                  <span className="text-gray-600">
                                    {editingMachine.applications?.length && step.id === 2
                                      ? `${editingMachine.applications.length} App${editingMachine.applications.length > 1 ? 's' : ''}`
                                      : step.id === 2
                                      ? <span className="text-gray-400">Sem Aplicações</span>
                                      : step.id === 3 && editingMachine.updatedAt
                                      ? `${format(new Date(editingMachine.updatedAt), "dd MMM yyyy", { locale: ptBR })}`
                                      : step.id === 3
                                      ? <span className="text-gray-400">Sem Atualização</span>
                                      : null
                                    }
                                  </span>
                                )}
                          </p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-16 lg:w-24 h-0.5 transition-all duration-300 ${
                            activeStep > step.id
                              ? "bg-gradient-to-r from-amber-600/50 to-amber-500"
                              : "bg-gray-600"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>

            {/* Card Content (Scrollable) */}
            <CardContent className="h-full overflow-y-auto custom-scrollbar flex-1 flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label
                            htmlFor="name"
                            className="text-base font-medium text-gray-200 flex items-center gap-2"
                          >
                            Nome da Máquina
                            <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={editingMachine.name || ""}
                            onChange={handleMachineInputChange}
                            className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
                          />
                          <p className="text-xs text-gray-500">
                            Nome identificador único da máquina Ex: Dallas,
                            Houston, Miami...
                          </p>
                        </div>
                        <div className="space-y-3">
                          <Label
                            htmlFor="version"
                            className="text-base font-medium text-gray-200 flex items-center gap-2"
                          >
                            Versão do Sistema
                            <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="version"
                            name="version"
                            value={editingMachine.version || ""}
                            onChange={handleMachineInputChange}
                            className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
                            placeholder=""
                          />
                          <p className="text-xs text-gray-500">
                            Versão do sistema operacional Ex: z/OS 3.1, z/OS
                            2.4...
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="description"
                          className="text-base font-medium text-gray-200 flex items-center gap-2"
                        >
                          Descrição
                          <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={editingMachine.description || ""}
                          onChange={handleMachineInputChange}
                          className="min-h-[50px] bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 focus:ring-1 focus:ring-amber-500/20 text-gray-100 text-base resize-none transition-all duration-200"
                          placeholder=""
                        />
                        <p className="text-xs text-gray-500">
                          Breve descrição sobre a máquina e sua função
                        </p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label
                            htmlFor="status"
                            className="text-base font-medium text-gray-200"
                          >
                            Status Inicial
                          </Label>
                          <Select
                            value={editingMachine.status}
                            onValueChange={handleStatusChange}
                          >
                            <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] ">
                              <SelectItem
                                value="Concluida"
                                className="cursor-pointer focus:bg-green-600/10"
                              >
                                <span className="text-green-400">
                                  Concluída
                                </span>
                              </SelectItem>
                              <SelectItem
                                value="Pendente"
                                className="cursor-pointer focus:bg-red-600/10"
                              >
                                <span className="text-red-400">Pendente</span>
                              </SelectItem>
                              <SelectItem
                                value="Em andamento"
                                className="cursor-pointer focus:bg-amber-600/10"
                              >
                                <span className="text-amber-400">
                                  Em andamento
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500">
                            Status atual da configuração
                          </p>
                        </div>
                        <div className="space-y-3 ">
                          <Label
                            htmlFor="updatedAt"
                            className="text-base font-medium text-gray-200"
                          >
                            Data de Criação
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="justify-start w-full text-left font-normal bg-[#1A1A1D] border-[#2A2A2D] text-gray-200 focus:!border-amber-500 hover:bg-[#23232B] hover:text-gray-500 cursor-pointer"
                              >
                                <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                                {editingMachine.updatedAt ? (
                                  format(
                                    new Date(editingMachine.updatedAt),
                                    "PPP",
                                    {
                                      locale: ptBR,
                                    }
                                  )
                                ) : (
                                  <span className="text-gray-400">
                                    Selecione a data
                                  </span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#1A1A1D] border-gray-700">
                              <Calendar
                                mode="single"
                                selected={
                                  editingMachine.updatedAt
                                    ? new Date(editingMachine.updatedAt)
                                    : new Date()
                                }
                                onSelect={handleDateChange}
                                className="bg-[#1A1A1D] text-gray-200"
                              />
                            </PopoverContent>
                          </Popover>
                          <p className="text-xs text-gray-500">
                            Data de registro no sistema
                          </p>
                        </div>
                      </div>
                      <div className="bg-amber-600/10 border border-amber-600/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-1 bg-amber-600 rounded-full mt-0.5">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-amber-400 mb-1">
                              Próximo passo
                            </h4>
                            <p className="text-xs text-amber-300/80">
                              Após editar as informações básicas, você poderá
                              adicionar, remover ou editar aplicações e seus
                              serviços específicos.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
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
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  placeholder="Nome ou tipo de aplicação..."
                                  className="bg-[#1A1A1D] border-[#2A2A2D] pl-10 focus:!border-amber-500 text-gray-100 placeholder-gray-500 hover:bg-[#23232B] hover:text-gray-500"
                                />
                                {searchTerm && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700 rounded-full"
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
                                onValueChange={(
                                  value: "all" | "Concluida" | "Pendente"
                                ) => setStatusFilter(value)}
                              >
                                <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-100 w-full hover:bg-[#23232B] hover:text-gray-500">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                                  <SelectItem
                                    value="all"
                                    className="cursor-pointer"
                                  >
                                    <span className="text-gray-300">Todos</span>
                                  </SelectItem>
                                  <SelectItem
                                    value="Concluida"
                                    className="cursor-pointer focus:bg-green-600/10"
                                  >
                                    <span className="text-green-400">
                                      Concluída
                                    </span>
                                  </SelectItem>
                                  <SelectItem
                                    value="Pendente"
                                    className="cursor-pointer focus:bg-red-600/10"
                                  >
                                    <span className="text-red-400">
                                      Pendente
                                    </span>
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
                                  onChange={(e) =>
                                    setServiceSearchTerm(e.target.value)
                                  }
                                  placeholder="Nome ou responsável..."
                                  className="bg-[#1A1A1D] border-[#2A2A2D] pl-10 focus:!border-blue-500 text-gray-100 placeholder-gray-500 hover:bg-[#23232B] hover:text-gray-500"
                                />
                                {serviceSearchTerm && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setServiceSearchTerm("")}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700 rounded-full"
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
                                <p className="text-gray-200 font-bold">
                                  {applications.length}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-400 text-xs">
                                  Encontradas
                                </p>
                                <p className="text-amber-400 font-bold">
                                  {filteredApplications.length}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-400 text-xs">
                                  Serviços
                                </p>
                                <p className="text-blue-400 font-bold">
                                  {serviceSearchTerm
                                    ? filteredApplications.reduce(
                                        (acc, app) =>
                                          acc +
                                          getFilteredServices(app.services)
                                            .length,
                                        0
                                      )
                                    : applications.reduce(
                                        (acc, app) => acc + app.services.length,
                                        0
                                      )}
                                </p>
                              </div>
                            </div>

                            {/* Botão Adicionar Aplicação */}
                            <Button
                              onClick={() => setIsAddingApp((prev) => !prev)}
                              className={`${
                                isAddingApp
                                  ? "bg-red-600/50 hover:bg-red-700/50"
                                  : "bg-green-600/50 hover:bg-green-700/50"
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
                        {(searchTerm ||
                          statusFilter !== "all" ||
                          serviceSearchTerm) && (
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
                                App: "{searchTerm}"{" "}
                                <X className="ml-1 h-3 w-3" />
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
                                Status: {statusFilter}{" "}
                                <X className="ml-1 h-3 w-3" />
                              </Badge>
                            )}

                            {serviceSearchTerm && (
                              <Badge
                                variant="outline"
                                className="bg-blue-600/20 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-600/30"
                                onClick={() => setServiceSearchTerm("")}
                              >
                                Serviço: "{serviceSearchTerm}"{" "}
                                <X className="ml-1 h-3 w-3" />
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
                              className="text-xs text-gray-400 hover:text-gray-200 h-6 px-2"
                            >
                              Limpar todos
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Formulário de Nova Aplicação */}
                      <AnimatePresence>
                        {isAddingApp && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-[#0F0F11] border border-green-500/30 rounded-lg">
                              <div className="flex items-center gap-2 mb-4">
                                <div className="p-1 bg-green-600 rounded-full">
                                  <Plus className="w-3 h-3 text-white" />
                                </div>
                                <h4 className="font-medium text-green-400">
                                  Adicionando Nova Aplicação
                                </h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                  <Label className="text-gray-200">
                                    Nome da Aplicação *
                                  </Label>
                                  <Input
                                    value={newApp.name}
                                    onChange={(e) =>
                                      setNewApp((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                      }))
                                    }
                                    className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-green-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
                                    placeholder="Ex: Sistema de Controle..."
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-gray-200">
                                    Tipo da Aplicação *
                                  </Label>
                                  <Input
                                    value={newApp.tipo}
                                    onChange={(e) =>
                                      setNewApp((prev) => ({
                                        ...prev,
                                        tipo: e.target.value,
                                      }))
                                    }
                                    className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-green-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
                                    placeholder="Ex: Web, Desktop, API..."
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-gray-200">
                                    Status
                                  </Label>
                                  <Select
                                    value={newApp.status}
                                    onValueChange={(
                                      value: "Concluida" | "Pendente"
                                    ) =>
                                      setNewApp((prev) => ({
                                        ...prev,
                                        status: value,
                                      }))
                                    }
                                  >
                                    <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-green-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                                      <SelectItem
                                        value="Concluida"
                                        className="cursor-pointer focus:bg-green-600/10"
                                      >
                                        <span className="text-green-400">
                                          Concluída
                                        </span>
                                      </SelectItem>
                                      <SelectItem
                                        value="Pendente"
                                        className="cursor-pointer focus:bg-red-600/10"
                                      >
                                        <span className="text-red-400">
                                          Pendente
                                        </span>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  onClick={() => setIsAddingApp(false)}
                                  className="bg-gray-800 hover:bg-gray-700/50 cursor-pointer"
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  onClick={handleAddApplication}
                                  className="bg-green-600/50 hover:bg-green-700/50 cursor-pointer"
                                >
                                  <Save size={16} className="mr-2" />
                                  Salvar Aplicação
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Lista de Aplicações */}
                      <div className="space-y-4">
                        {filteredApplications.length === 0 && !isAddingApp ? (
                          <div className="text-center py-12 bg-[#0F0F11] rounded-lg border border-[#1F1F23]">
                            {applications.length === 0 ? (
                              <>
                                <Layers
                                  size={48}
                                  className="mx-auto text-gray-600 mb-4"
                                />
                                <p className="text-gray-400 mb-2">
                                  Nenhuma aplicação adicionada
                                </p>
                                <p className="text-sm text-gray-500">
                                  Clique em "Nova Aplicação" para começar
                                </p>
                              </>
                            ) : (
                              <>
                                <Search
                                  size={48}
                                  className="mx-auto text-gray-600 mb-4"
                                />
                                <p className="text-gray-400 mb-2">
                                  Nenhuma aplicação encontrada
                                </p>
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
                                  className="mt-3 text-amber-400 hover:text-amber-300"
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Limpar filtros
                                </Button>
                              </>
                            )}
                          </div>
                        ) : (
                          filteredApplications.map((app) => (
                            <Card
                              key={app.id}
                              className="bg-[#1A1A1D] border-[#2A2A2D]"
                            >
                              <CardContent className="p-4">
                                <AnimatePresence>
                                  {editingAppId === app.id ? (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="p-3 bg-[#0F0F11] border border-blue-500/30 rounded-lg mb-3"
                                    >
                                      <h5 className="text-sm font-medium text-blue-400 mb-3">
                                        Editando Aplicação
                                      </h5>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="space-y-2">
                                          <Label className="text-gray-200">
                                            Nome da Aplicação *
                                          </Label>
                                          <Input
                                            value={editApp.name}
                                            onChange={(e) =>
                                              setEditApp((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                              }))
                                            }
                                            className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-gray-200">
                                            Tipo da Aplicação *
                                          </Label>
                                          <Input
                                            value={editApp.tipo}
                                            onChange={(e) =>
                                              setEditApp((prev) => ({
                                                ...prev,
                                                tipo: e.target.value,
                                              }))
                                            }
                                            className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-gray-200">
                                            Status
                                          </Label>
                                          <Select
                                            value={editApp.status}
                                            onValueChange={(
                                              value: "Concluida" | "Pendente"
                                            ) =>
                                              setEditApp((prev) => ({
                                                ...prev,
                                                status: value,
                                              }))
                                            }
                                          >
                                            <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                                              <SelectItem
                                                value="Concluida"
                                                className="cursor-pointer focus:bg-green-600/10"
                                              >
                                                <span className="text-green-400">
                                                  Concluída
                                                </span>
                                              </SelectItem>
                                              <SelectItem
                                                value="Pendente"
                                                className="cursor-pointer focus:bg-red-600/10"
                                              >
                                                <span className="text-red-400">
                                                  Pendente
                                                </span>
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          size="sm"
                                          onClick={handleCancelEditApplication}
                                          className="bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer"
                                        >
                                          Cancelar
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={handleSaveEditApplication}
                                          className="bg-blue-600/50 hover:bg-blue-700/50 cursor-pointer"
                                        >
                                          <Save size={14} className="mr-1" />
                                          Salvar
                                        </Button>
                                      </div>
                                    </motion.div>
                                  ) : (
                                    <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center gap-3">
                                        <h4 className="font-medium text-gray-100">
                                          {app.name}
                                        </h4>
                                        <Badge
                                          variant="outline"
                                          className={getStatusBadgeColor(
                                            app.status
                                          )}
                                        >
                                          {app.status}
                                        </Badge>
                                        <span className="text-sm text-gray-400">
                                          {app.services.length} serviços
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            setIsAddingService(app.id)
                                          }
                                          className=" bg-amber-600/10 hover:bg-amber-700/10 text-gray-200 hover:text-gray-200 cursor-pointer h-8 w-8 p-0 rounded-full flex items-center justify-center"
                                        >
                                          <Plus size={14} className="" />
                                          
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            handleEditApplication(app.id)
                                          }
                                          className="text-blue-400 cursor-pointer hover:text-gray-200 bg-transparent hover:bg-blue-600/10 h-8 w-8 p-0 rounded-full flex items-center justify-center"
                                        >
                                          <Edit3 size={14} />
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            handleDeleteApplication(app.id)
                                          }
                                          className="text-red-400 cursor-pointer hover:text-gray-200 bg-transparent hover:bg-red-600/10 h-8 w-8 p-0 rounded-full flex items-center justify-center"
                                        >
                                          <Trash2 size={14} />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </AnimatePresence>

                                {/* Add Service Form */}
                                <AnimatePresence>
                                  {isAddingService === app.id && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="p-3 bg-[#0F0F11] border border-amber-500/30 rounded-lg mb-3"
                                    >
                                      <h5 className="text-sm font-medium text-gray-200 mb-3">
                                        Novo Serviço
                                      </h5>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                                        <div className="space-y-2 col-span-2">
                                          <Label className="text-xs text-gray-200">
                                            Nome *
                                          </Label>
                                          <Input
                                            value={newService.name}
                                            onChange={(e) =>
                                              setNewService((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                              }))
                                            }
                                            className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-200 hover:bg-[#23232B] hover:text-gray-500"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-xs text-gray-200">
                                            Status
                                          </Label>
                                          <Select
                                            value={newService.status}
                                            onValueChange={(
                                              value:
                                                | "Concluida"
                                                | "Pendente"
                                                | "Em andamento"
                                            ) =>
                                              setNewService((prev) => ({
                                                ...prev,
                                                status: value,
                                              }))
                                            }
                                          >
                                            <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                                              <SelectItem
                                                value="Concluida"
                                                className="cursor-pointer focus:bg-green-600/10"
                                              >
                                                <span className="text-green-400">
                                                  Concluída
                                                </span>
                                              </SelectItem>
                                              <SelectItem
                                                value="Pendente"
                                                className="cursor-pointer focus:bg-red-600/10"
                                              >
                                                <span className="text-red-400">
                                                  Pendente
                                                </span>
                                              </SelectItem>
                                              <SelectItem
                                                value="Em andamento"
                                                className="cursor-pointer focus:bg-amber-600/10"
                                              >
                                                <span className="text-amber-400">
                                                  Em andamento
                                                </span>
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-xs text-gray-200">
                                            Obrigatório
                                          </Label>
                                          <Select
                                            value={newService.itemObrigatorio}
                                            onValueChange={(
                                              value: "Sim" | "Não"
                                            ) =>
                                              setNewService((prev) => ({
                                                ...prev,
                                                itemObrigatorio: value,
                                              }))
                                            }
                                          >
                                            <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
                                              <SelectItem
                                                value="Sim"
                                                className="cursor-pointer focus:bg-green-600/10"
                                              >
                                                <span className="text-green-400">
                                                  Sim
                                                </span>
                                              </SelectItem>
                                              <SelectItem
                                                value="Não"
                                                className="cursor-pointer focus:bg-red-600/10"
                                              >
                                                <span className="text-red-400">
                                                  Não
                                                </span>
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-xs text-gray-200">
                                            Responsável
                                          </Label>
                                          <Input
                                            value={newService.responsible}
                                            onChange={(e) =>
                                              setNewService((prev) => ({
                                                ...prev,
                                                responsible: e.target.value,
                                              }))
                                            }
                                            className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-200 hover:bg-[#23232B] hover:text-gray-500"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-xs text-gray-200">
                                            Responsável Homologação
                                          </Label>
                                          <Input
                                            value={
                                              newService.responsibleHomologacao
                                            }
                                            onChange={(e) =>
                                              setNewService((prev) => ({
                                                ...prev,
                                                responsibleHomologacao:
                                                  e.target.value,
                                              }))
                                            }
                                            className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-200 hover:bg-[#23232B] hover:text-gray-500"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-xs text-gray-200">
                                            Tipo Pendência
                                          </Label>
                                          <Input
                                            value={newService.typePendencia}
                                            onChange={(e) =>
                                              setNewService((prev) => ({
                                                ...prev,
                                                typePendencia: e.target.value,
                                              }))
                                            }
                                            className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-amber-500 text-gray-200 hover:bg-[#23232B] hover:text-gray-500"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-xs text-gray-200">
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
                                                    new Date(
                                                      newService.updatedAt
                                                    ),
                                                    "dd/MM/yyyy",
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
                                                    ? new Date(
                                                        newService.updatedAt
                                                      )
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
                                        <div className="space-y-2 col-span-2">
                                          <Label className="text-xs text-gray-200">
                                            Comentários
                                          </Label>
                                          <Textarea
                                            value={newService.comments}
                                            onChange={(e) =>
                                              setNewService((prev) => ({
                                                ...prev,
                                                comments: e.target.value,
                                              }))
                                            }
                                            className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-amber-500 text-gray-200 resize-none min-h-[60px]"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            setIsAddingService(null)
                                          }
                                          className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
                                        >
                                          Cancelar
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            handleAddService(app.id)
                                          }
                                          className="bg-amber-600 hover:bg-amber-700 cursor-pointer"
                                        >
                                          <Save size={14} className="mr-1" />
                                          Salvar
                                        </Button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                {/* Services List - com filtro aplicado */}
                                {app.services.length > 0 && (
                                  <div className="space-y-2 mt-4">
                                    <div className="flex items-center justify-between">
                                      <h5 className="text-sm font-medium text-gray-300">
                                        Serviços:
                                      </h5>
                                      {serviceSearchTerm &&
                                        getFilteredServices(app.services)
                                          .length !== app.services.length && (
                                          <Badge
                                            variant="outline"
                                            className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-xs"
                                          >
                                            {
                                              getFilteredServices(app.services)
                                                .length
                                            }{" "}
                                            de {app.services.length}
                                          </Badge>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                      {getFilteredServices(app.services)
                                        .length === 0 ? (
                                        <div className="text-center py-4 bg-[#0A0A0C] rounded border border-[#2A2A2D]">
                                          <p className="text-xs text-gray-500">
                                            Nenhum serviço encontrado com "
                                            {serviceSearchTerm}"
                                          </p>
                                        </div>
                                      ) : (
                                        getFilteredServices(app.services).map(
                                          (service) => (
                                            <div key={service.id}>
                                              {/* Service Edit Form */}
                                              <AnimatePresence>
                                                {editingServiceId ===
                                                  service.id &&
                                                editingServiceAppId ===
                                                  app.id ? (
                                                  <motion.div
                                                    initial={{
                                                      opacity: 0,
                                                      height: 0,
                                                    }}
                                                    animate={{
                                                      opacity: 1,
                                                      height: "auto",
                                                    }}
                                                    exit={{
                                                      opacity: 0,
                                                      height: 0,
                                                    }}
                                                    className="p-3 bg-[#0A0A0C] border border-blue-500/30 rounded-lg mb-2"
                                                  >
                                                    <h6 className="text-xs font-medium text-blue-400 mb-3">
                                                      Editando Serviço
                                                    </h6>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
                                                      <div className="space-y-2 col-span-2">
                                                        <Label className="text-xs text-gray-200">
                                                          Nome *
                                                        </Label>
                                                        <Input
                                                          value={
                                                            editService.name
                                                          }
                                                          onChange={(e) =>
                                                            setEditService(
                                                              (prev) => ({
                                                                ...prev,
                                                                name: e.target
                                                                  .value,
                                                              })
                                                            )
                                                          }
                                                          className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] text-sm"
                                                        />
                                                      </div>
                                                      <div className="space-y-2">
                                                        <Label className="text-xs text-gray-200">
                                                          Status
                                                        </Label>
                                                        <Select
                                                          value={
                                                            editService.status
                                                          }
                                                          onValueChange={(
                                                            value:
                                                              | "Concluida"
                                                              | "Pendente"
                                                              | "Em andamento"
                                                          ) =>
                                                            setEditService(
                                                              (prev) => ({
                                                                ...prev,
                                                                status: value,
                                                              })
                                                            )
                                                          }
                                                        >
                                                          <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] text-sm">
                                                            <SelectValue />
                                                          </SelectTrigger>
                                                          <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                                                            <SelectItem
                                                              value="Concluida"
                                                              className="cursor-pointer focus:bg-green-600/10"
                                                            >
                                                              <span className="text-green-400">
                                                                Concluída
                                                              </span>
                                                            </SelectItem>
                                                            <SelectItem
                                                              value="Pendente"
                                                              className="cursor-pointer focus:bg-red-600/10"
                                                            >
                                                              <span className="text-red-400">
                                                                Pendente
                                                              </span>
                                                            </SelectItem>
                                                            <SelectItem
                                                              value="Em andamento"
                                                              className="cursor-pointer focus:bg-amber-600/10"
                                                            >
                                                              <span className="text-amber-400">
                                                                Em andamento
                                                              </span>
                                                            </SelectItem>
                                                          </SelectContent>
                                                        </Select>
                                                      </div>
                                                      <div className="space-y-2">
                                                        <Label className="text-xs text-gray-200">
                                                          Obrigatório
                                                        </Label>
                                                        <Select
                                                          value={
                                                            editService.itemObrigatorio
                                                          }
                                                          onValueChange={(
                                                            value: "Sim" | "Não"
                                                          ) =>
                                                            setEditService(
                                                              (prev) => ({
                                                                ...prev,
                                                                itemObrigatorio:
                                                                  value,
                                                              })
                                                            )
                                                          }
                                                        >
                                                          <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] text-sm">
                                                            <SelectValue />
                                                          </SelectTrigger>
                                                          <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
                                                            <SelectItem
                                                              value="Sim"
                                                              className="cursor-pointer focus:bg-green-600/10"
                                                            >
                                                              <span className="text-green-400">
                                                                Sim
                                                              </span>
                                                            </SelectItem>
                                                            <SelectItem
                                                              value="Não"
                                                              className="cursor-pointer focus:bg-red-600/10"
                                                            >
                                                              <span className="text-red-400">
                                                                Não
                                                              </span>
                                                            </SelectItem>
                                                          </SelectContent>
                                                        </Select>
                                                      </div>
                                                      <div className="space-y-2">
                                                        <Label className="text-xs text-gray-200">
                                                          Responsável
                                                        </Label>
                                                        <Input
                                                          value={
                                                            editService.responsible
                                                          }
                                                          onChange={(e) =>
                                                            setEditService(
                                                              (prev) => ({
                                                                ...prev,
                                                                responsible:
                                                                  e.target
                                                                    .value,
                                                              })
                                                            )
                                                          }
                                                          className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] text-sm"
                                                        />
                                                      </div>
                                                      <div className="space-y-2">
                                                        <Label className="text-xs text-gray-200">
                                                          Responsável
                                                          Homologação
                                                        </Label>
                                                        <Input
                                                          value={
                                                            editService.responsibleHomologacao
                                                          }
                                                          onChange={(e) =>
                                                            setEditService(
                                                              (prev) => ({
                                                                ...prev,
                                                                responsibleHomologacao:
                                                                  e.target
                                                                    .value,
                                                              })
                                                            )
                                                          }
                                                          className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] text-sm"
                                                        />
                                                      </div>
                                                      <div className="space-y-2">
                                                        <Label className="text-xs text-gray-200">
                                                          Tipo Pendência
                                                        </Label>
                                                        <Input
                                                          value={
                                                            editService.typePendencia
                                                          }
                                                          onChange={(e) =>
                                                            setEditService(
                                                              (prev) => ({
                                                                ...prev,
                                                                typePendencia:
                                                                  e.target
                                                                    .value,
                                                              })
                                                            )
                                                          }
                                                          className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] text-sm"
                                                        />
                                                      </div>
                                                      <div className="space-y-2">
                                                        <Label className="text-xs text-gray-200">
                                                          Data de entrega
                                                        </Label>
                                                        <Popover>
                                                          <PopoverTrigger
                                                            asChild
                                                          >
                                                            <Button
                                                              variant="outline"
                                                              className="justify-start text-left font-normal bg-[#1A1A1E] border-gray-600 text-gray-200 hover:bg-[#1A1A1E] w-full text-sm"
                                                            >
                                                              <CalendarIcon className="mr-2 h-3 w-3 text-gray-400" />
                                                              {editService.updatedAt ? (
                                                                format(
                                                                  new Date(
                                                                    editService.updatedAt
                                                                  ),
                                                                  "dd/MM/yyyy",
                                                                  {
                                                                    locale:
                                                                      ptBR,
                                                                  }
                                                                )
                                                              ) : (
                                                                <span className="text-gray-400">
                                                                  Selecione a
                                                                  data
                                                                </span>
                                                              )}
                                                            </Button>
                                                          </PopoverTrigger>
                                                          <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
                                                            <Calendar
                                                              mode="single"
                                                              selected={
                                                                editService.updatedAt
                                                                  ? new Date(
                                                                      editService.updatedAt
                                                                    )
                                                                  : undefined
                                                              }
                                                              onSelect={
                                                                handleEditServiceDateChange
                                                              }
                                                              className="bg-[#1A1A1E] text-gray-200"
                                                            />
                                                          </PopoverContent>
                                                        </Popover>
                                                      </div>
                                                      <div className="space-y-2 col-span-2">
                                                        <Label className="text-xs text-gray-200">
                                                          Comentários
                                                        </Label>
                                                        <Textarea
                                                          value={
                                                            editService.comments
                                                          }
                                                          onChange={(e) =>
                                                            setEditService(
                                                              (prev) => ({
                                                                ...prev,
                                                                comments:
                                                                  e.target
                                                                    .value,
                                                              })
                                                            )
                                                          }
                                                          className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-200 resize-none min-h-[50px] text-sm"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                      <Button
                                                        size="sm"
                                                        onClick={
                                                          handleCancelEditService
                                                        }
                                                        className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-xs"
                                                      >
                                                        Cancelar
                                                      </Button>
                                                      <Button
                                                        size="sm"
                                                        onClick={
                                                          handleSaveEditService
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-xs"
                                                      >
                                                        <Save
                                                          size={12}
                                                          className="mr-1"
                                                        />
                                                        Salvar
                                                      </Button>
                                                    </div>
                                                  </motion.div>
                                                ) : (
                                                  <div className="flex items-center justify-between p-2 bg-[#0F0F11] rounded border border-[#2A2A2D]">
                                                    <div className="flex items-center gap-2 flex-1">
                                                      <span className="text-sm text-gray-300">
                                                        {service.name}
                                                      </span>
                                                      <span className="text-xs text-gray-500">
                                                        |
                                                      </span>
                                                      <span className="text-xs text-gray-500">
                                                        {service.responsible ||
                                                          "Sem responsável"}
                                                      </span>
                                                      <span className="text-xs text-gray-500">
                                                        |
                                                      </span>
                                                      <span className="text-xs text-gray-500">
                                                        {service.updatedAt
                                                          ? format(
                                                              new Date(
                                                                service.updatedAt
                                                              ),
                                                              "dd/MM/yyyy",
                                                              { locale: ptBR }
                                                            )
                                                          : "Sem data"}
                                                      </span>
                                                      <Badge
                                                        variant="outline"
                                                        className={getStatusBadgeColor(
                                                          service.status
                                                        )}
                                                      >
                                                        {service.status}
                                                      </Badge>
                                                      {service.itemObrigatorio ===
                                                        "Sim" && (
                                                        <Badge
                                                          variant="outline"
                                                          className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
                                                        >
                                                          Obrigatório
                                                        </Badge>
                                                      )}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                      <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                          handleEditService(
                                                            app.id,
                                                            service.id
                                                          )
                                                        }
                                                        className="text-blue-400 hover:text-blue-300 h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-blue-600/10"
                                                      >
                                                        <Edit3 size={12} />
                                                      </Button>
                                                      <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                          handleDeleteService(
                                                            app.id,
                                                            service.id
                                                          )
                                                        }
                                                        className="text-red-400 hover:text-red-300 h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-red-600/10"
                                                      >
                                                        <Trash2 size={12} />
                                                      </Button>
                                                    </div>
                                                  </div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          )
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Card Principal da Máquina */}
                      <div className="bg-gradient-to-br from-[#1A1A1D] to-[#0F0F11] border border-amber-500/30 rounded-lg p-6">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="flex-shrink-0">
                            <Image
                              src={editingMachine.status === "Concluida" ? ImgServerConcluida : editingMachine.status === "Pendente" ? ImgServerPendente : ImgServerNew}
                              alt="Servidor"
                              className="w-26 h-26 object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h2 className="text-2xl font-bold text-white">
                                {editingMachine.name}
                              </h2>
                              <Badge
                                variant="outline"
                                className={`${getStatusBadgeColor(
                                  editingMachine.status || ""
                                )} text-sm`}
                              >
                                {editingMachine.status}
                              </Badge>
                            </div>
                            <p className="text-gray-400 mb-1">
                              {editingMachine.version}
                            </p>
                            <p className="text-gray-300 text-sm">
                              {editingMachine.description}
                            </p>
                          </div>

                          {/* Estatísticas Circulares */}
                          <div className="flex-shrink-0 flex items-center gap-6">
                            {/* Progresso das Aplicações */}
                            <div className="relative flex items-center justify-center">
                              <svg
                                className="w-20 h-20 transform -rotate-90"
                                viewBox="0 0 32 32"
                              >
                                <circle
                                  cx="16"
                                  cy="16"
                                  r="14"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  className="text-gray-700"
                                />
                                <circle
                                  cx="16"
                                  cy="16"
                                  r="14"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeDasharray={`${
                                    (applications.reduce(
                                      (acc, app) =>
                                        acc +
                                        app.services.filter(
                                          (s) => s.status === "Concluida"
                                        ).length,
                                      0
                                    ) /
                                      Math.max(
                                        applications.reduce(
                                          (acc, app) =>
                                            acc + app.services.length,
                                          0
                                        ),
                                        1
                                      )) *
                                    87.92
                                  } 87.92`}
                                  className="text-amber-500"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold text-amber-400">
                                  {applications.length > 0
                                    ? Math.round(
                                        (applications.reduce(
                                          (acc, app) =>
                                            acc +
                                            app.services.filter(
                                              (s) => s.status === "Concluida"
                                            ).length,
                                          0
                                        ) /
                                          Math.max(
                                            applications.reduce(
                                              (acc, app) =>
                                                acc + app.services.length,
                                              0
                                            ),
                                            1
                                          )) *
                                          100
                                      )
                                    : 0}
                                  %
                                </span>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="text-right space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-green-400">
                                  Instalados
                                </span>
                                <span className="text-sm font-bold text-green-400">
                                  {applications.reduce(
                                    (acc, app) =>
                                      acc +
                                      app.services.filter(
                                        (s) => s.status === "Concluida"
                                      ).length,
                                    0
                                  )}
                                  /
                                  {applications.reduce(
                                    (acc, app) => acc + app.services.length,
                                    0
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-red-400">
                                  Pendentes
                                </span>
                                <span className="text-sm font-bold text-red-400">
                                  {applications.reduce(
                                    (acc, app) =>
                                      acc +
                                      app.services.filter(
                                        (s) => s.status === "Pendente"
                                      ).length,
                                    0
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">
                                  Total
                                </span>
                                <span className="text-sm font-bold text-gray-300">
                                  {applications.reduce(
                                    (acc, app) => acc + app.services.length,
                                    0
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Informações Adicionais */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
                          <div className="text-center">
                            <p className="text-gray-400 text-sm">
                              Data de Criação
                            </p>
                            <p className="text-gray-200 font-medium">
                              {editingMachine.updatedAt
                                ? format(
                                    new Date(editingMachine.updatedAt),
                                    "dd/MM/yyyy",
                                    { locale: ptBR }
                                  )
                                : "Não definida"}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-sm">Aplicações</p>
                            <p className="text-gray-200 font-medium text-xl">
                              {applications.length}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-sm">Serviços</p>
                            <p className="text-2xl font-bold text-gray-300">
                              {applications.reduce(
                                (acc, app) => acc + app.services.length,
                                0
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Seção de Aplicações */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-gray-100">
                            Aplicações ({applications.length})
                          </h3>
                        </div>

                        {applications.length === 0 ? (
                          <div className="text-center py-8 bg-[#0F0F11] rounded-lg border border-[#1F1F23]">
                            <Layers
                              size={48}
                              className="mx-auto text-gray-600 mb-4"
                            />
                            <p className="text-gray-400">
                              Nenhuma aplicação configurada
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Volte ao passo anterior para adicionar aplicações
                            </p>
                          </div>
                        ) : (
                          <div className="grid gap-4">
                            {applications.map((app) => (
                              <Card
                                key={app.id}
                                className="bg-[#1A1A1D] border-[#2A2A2D] overflow-hidden pt-0 pb-0"
                              >
                                <CardContent className="p-0">
                                  <div className="flex items-center">
                                    {/* Lado esquerdo - Informações da aplicação */}
                                    <div className="flex-1 p-4">
                                      <div className="flex flex-col gap-2 mb-4">
                                        <p className="text-xs text-gray-500 font-medium">
                                          Aplicação:
                                        </p>
                                        <div className="flex items-center gap-2">
                                          <h4 className="font-semibold text-gray-100 text-lg">
                                            {app.name}
                                          </h4>
                                          <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                                          <p className="text-gray-400 text-sm ">
                                            {app.tipo}
                                          </p>
                                          <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                                          <Badge
                                            variant="outline"
                                            className={getStatusBadgeColor(
                                              app.status
                                            )}
                                          >
                                            {app.status}
                                          </Badge>
                                        </div>
                                      </div>

                                      {/* Tags dos serviços */}
                                      {app.services.length > 0 && (
                                        <div className="space-y-2">
                                          <p className="text-xs text-gray-500 font-medium">
                                            Serviços configurados:
                                          </p>
                                          <div className="flex flex-wrap gap-1">
                                            {app.services
                                              .slice(0, 10)
                                              .map((service) => (
                                                <span
                                                  key={service.id}
                                                  className={`text-xs px-2 py-1 rounded-full border ${
                                                    service.status ===
                                                    "Concluida"
                                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                      : service.status ===
                                                        "Em andamento"
                                                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                                      : "bg-red-500/20 text-red-400 border-red-500/30"
                                                  }`}
                                                >
                                                  {service.name}
                                                </span>
                                              ))}
                                            {app.services.length > 10 && (
                                              <span className="text-xs bg-gray-600/20 text-gray-400 border border-gray-600/30 px-2 py-1 rounded-full">
                                                +{app.services.length - 10} mais
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Lado direito - Estatísticas */}
                                    <div className="flex-shrink-0 p-4 bg-[#0F0F11] border-l border-[#2A2A2D] min-w-[120px]">
                                      <div className="text-center space-y-2">
                                        <div>
                                          <p className="text-xs text-gray-500">
                                            Concluídos
                                          </p>
                                          <p className="text-lg font-bold text-green-400">
                                            {
                                              app.services.filter(
                                                (s) => s.status === "Concluida"
                                              ).length
                                            }
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-500">
                                            Pendentes
                                          </p>
                                          <p className="text-lg font-bold text-red-400">
                                            {
                                              app.services.filter(
                                                (s) => s.status === "Pendente"
                                              ).length
                                            }
                                          </p>
                                        </div>
                                        <div className="pt-2 border-t border-gray-700/50">
                                          <p className="text-xs text-gray-500">
                                            Total
                                          </p>
                                          <p className="text-sm font-bold text-gray-300">
                                            {app.services.length}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Resumo Final */}
                      <div className="bg-amber-600/10 border border-amber-600/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-1 bg-amber-600 rounded-full mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-amber-400 mb-1">
                              Pronto para atualizar!
                            </h4>
                            <p className="text-xs text-amber-300/80">
                              Todos os dados foram configurados. Clique em
                              "Atualizar Máquina" para finalizar o processo.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Display */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`p-4 rounded-lg border ${
                      message.includes("sucesso")
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    } mt-4`}
                  >
                    <p className="text-sm font-medium">{message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer Navigation */}
              <div className="mt-8 border-t border-[#1F1F23] bg-[#0F0F11] pt-6 flex-shrink-0  rounded-b-lg">
                <div className="mx-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      {activeStep > 1 && (
                        <Button
                          variant="ghost"
                          onClick={handlePreviousStep}
                          className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] cursor-pointer"
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          Voltar
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {activeStep < 3 ? (
                        <Button
                          onClick={handleNextStep}
                          className="bg-amber-600 hover:bg-amber-700 min-w-[120px] shadow-lg cursor-pointer"
                        >
                          Próximo
                          <ArrowLeft size={16} className="ml-2 rotate-180" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleUpdate}
                          disabled={isSaving}
                          className="bg-amber-600 hover:bg-amber-700 min-w-[180px] shadow-lg cursor-pointer"
                        >
                          {isSaving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="mr-2 h-4 w-4" />
                          )}
                          {isSaving
                            ? "Atualizando Máquina..."
                            : "Atualizar Máquina"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
