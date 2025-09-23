// // src/app/machines/create/page.tsx
// "use client";

// import { useState, useMemo, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Check,
//   X,
//   Loader2,
//   CalendarIcon,
//   Plus,
//   ArrowLeft,
//   Server,
//   Layers,
//   Settings,
//   Edit3,
//   Trash2,
//   Save,
//   Search
// } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { motion, AnimatePresence } from "framer-motion";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import type { Machines, Application, Service, StatusType } from "@/types/machines";

// import ImgServerNew from "@/assets/images/img-server-status.svg";
// import ImgServerPendente from "@/assets/images/img-server-status-warning.svg";
// import ImgServerConcluida from "@/assets/images/img-server-status-ok.svg";
// import ApplicationForm from "@/components/machines/update/application-form";
// import ApplicationsStep from "@/components/machines/update/applications-step";
// import MachineInfoStep from "@/components/machines/update/machine-info-step";


// export default function CreateMachinePage() {
//   const router = useRouter();

//   // states para controle do formulário e navegação
//   const [activeStep, setActiveStep] = useState(1);
//   const [isSaving, setIsSaving] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);

//   // Machine data
//   const [newMachine, setNewMachine] = useState<Partial<Machines>>({
//     name: "",
//     description: "",
//     version: "",
//     status: "Pendente" as StatusType,
//     updatedAt: new Date().toISOString(),
//     applications: [],
//   });

//   // Applications data
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [isAddingApp, setIsAddingApp] = useState(false);
//   const [editingAppId, setEditingAppId] = useState<string | null>(null);
//   const [newApp, setNewApp] = useState({
//     name: "",
//     tipo: "",
//     status: "Pendente" as StatusType,
//   });

//   // Services data
//   const [isAddingService, setIsAddingService] = useState<string | null>(null);
//   const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
//   const [newService, setNewService] = useState<Partial<Service>>({
//     name: "",
//     status: "Pendente" as StatusType,
//     itemObrigatorio: "Sim" as "Sim" | "Não",
//     updatedAt: undefined,
//     responsible: "",
//     comments: "",
//     typePendencia: "",
//     responsibleHomologacao: "",
//   });

  
//   // filtros
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<StatusType | "all">("all");
//   const [serviceSearchTerm, setServiceSearchTerm] = useState("");

//   const steps = [
//     { id: 1, title: "Cadastro da Máquina", icon: ImgServerNew },
//     { id: 2, title: "Aplicações", icon: Layers },
//     { id: 3, title: "Revisão & Criação", icon: Settings },
//   ];

//   const currentStep = useMemo(() => steps.find(s => s.id === activeStep), [activeStep, steps]);

//   const handleMachineInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewMachine((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleStatusChange = (value: StatusType) => {
//     setNewMachine((prev) => ({
//       ...prev,
//       status: value,
//     }));
//   };

//   const handleDateChange = (date: Date | undefined) => {
//     setNewMachine((prev) => ({
//       ...prev,
//       updatedAt: date ? date.toISOString() : new Date().toISOString(),
//     }));
//   };

//   const handleNewServiceDateChange = (date: Date | undefined) => {
//     setNewService((prev) => ({
//       ...prev,
//       updatedAt: date ? date.toISOString() : undefined,
//     }));
//   };

//   // Application handlers
//   const handleAddApplication = () => {
//     if (!newApp.name.trim() || !newApp.tipo.trim()) {
//       setMessage("Nome e tipo da aplicação são obrigatórios.");
//       return;
//     }

//     const app: Application = {
//       id: `app-${Date.now()}`,
//       machine_id: newMachine.id || "",
//       name: newApp.name,
//       tipo: newApp.tipo as Application["tipo"],
//       status: newApp.status,
//       services: [],
//     };

//     setApplications(prev => [...prev, app]);
//     setNewApp({ name: "", tipo: "", status: "Pendente" });
//     setIsAddingApp(false);
//     setMessage(null);
//   };

//   const handleDeleteApplication = (appId: string) => {
//     setApplications(prev => prev.filter(app => app.id !== appId));
//   };

//   // Service handlers
//   const handleAddService = (appId: string) => {
//     if (!newService.name?.trim()) {
//       setMessage("Nome do serviço é obrigatório.");
//       return;
//     }

//     const service: Service = {
//       id: `service-${Date.now()}`,
//       application_id: appId,
//       name: newService.name || "",
//       status: (newService.status as Service["status"]) || "Pendente",
//       itemObrigatorio: (newService.itemObrigatorio as Service["itemObrigatorio"]) || "Sim",
//       responsible: newService.responsible || "",
//       comments: newService.comments || "",
//       typePendencia: newService.typePendencia || "",
//       responsibleHomologacao: newService.responsibleHomologacao || "",
//       updatedAt: new Date().toISOString(),
//     };

//     setApplications(prev =>
//       prev.map(app =>
//         app.id === appId
//           ? { ...app, services: [...app.services, service] }
//           : app
//       )
//     );

//     setNewService({
//       name: "",
//       status: "Pendente",
//       itemObrigatorio: "Sim",
//       responsible: "",
//       comments: "",
//       typePendencia: "",
//       responsibleHomologacao: "",
//     });
//     setIsAddingService(null);
//     setMessage(null);
//   };

//   const handleDeleteService = (appId: string, serviceId: string) => {
//     setApplications(prev =>
//       prev.map(app =>
//         app.id === appId
//           ? { ...app, services: app.services.filter(s => s.id !== serviceId) }
//           : app
//       )
//     );
//   };

//   const handleNextStep = () => {
//     if (activeStep === 1) {
//       if (!newMachine.name?.trim() || !newMachine.description?.trim() || !newMachine.version?.trim()) {
//         setMessage("Todos os campos da máquina são obrigatórios.");
//         return;
//       }
//     }

//     setMessage(null);
//     if (activeStep < 3) {
//       setActiveStep(activeStep + 1);
//     }
//   };

//   const handlePreviousStep = () => {
//     if (activeStep > 1) {
//       setActiveStep(activeStep - 1);
//     }
//   };

//   // Função para filtrar serviços
//   const getFilteredServices = useCallback(
//     (services: Service[]) => {
//       if (!serviceSearchTerm) return services;
//         return services.filter(
//           (service) =>
//             service.name
//               .toLowerCase()
//               .includes(serviceSearchTerm.toLowerCase()) ||
//             service.responsible
//               ?.toLowerCase()
//               .includes(serviceSearchTerm.toLowerCase()) ||
//             service.responsibleHomologacao
//               ?.toLowerCase()
//               .includes(serviceSearchTerm.toLowerCase()) ||
//             service.typePendencia
//               ?.toLowerCase()
//               .includes(serviceSearchTerm.toLowerCase()) ||
//             service.comments
//               ?.toLowerCase()
//               .includes(serviceSearchTerm.toLowerCase())
//         );
//       },
//       [serviceSearchTerm]
//     );
  
//     // Função para filtrar aplicações (considerando pesquisa de serviços)
//     const filteredApplications = useMemo(() => {
//       return applications.filter((app) => {
//         const matchesAppSearch =
//           app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           app.tipo?.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesStatus =
//           statusFilter === "all" || app.status === statusFilter;
//         const hasMatchingServices = serviceSearchTerm
//           ? getFilteredServices(app.services).length > 0
//           : true;
//         if (serviceSearchTerm && !searchTerm) {
//           return matchesStatus && hasMatchingServices;
//         }
//         return matchesAppSearch && matchesStatus && hasMatchingServices;
//       });
//     }, [
//       applications,
//       searchTerm,
//       statusFilter,
//       serviceSearchTerm,
//       getFilteredServices,
//     ]);
  


//   // Função para salvar a máquina no banco de dados
//   const handleSave = async () => {
//   setIsSaving(true);
//   setMessage(null);

//   try {
//     // Validações antes de salvar
//     if (!newMachine.name?.trim() || !newMachine.description?.trim() || !newMachine.version?.trim()) {
//       setMessage("Todos os campos da máquina são obrigatórios.");
//       setIsSaving(false);
//       return;
//     }

//     // Criar objeto da máquina com todas as informações
//     const machineToCreate: Machines = {
//       id: `machine-${Date.now()}`,
//       name: newMachine.name.trim(),
//       description: newMachine.description.trim(),
//       version: newMachine.version.trim(),
//       status: newMachine.status || "Pendente",
//       updatedAt: new Date().toISOString(),
//       applications: applications.map(app => ({
//         ...app,
//         machine_id: `machine-${Date.now()}`, // Garantir que o machine_id está correto
//         services: app.services.map(service => ({
//           ...service,
//           application_id: app.id, // Garantir que o application_id está correto
//           updatedAt: service.updatedAt || new Date().toISOString()
//         }))
//       }))
//     };

//     console.log('Tentando criar máquina:', machineToCreate);

//     // *** AQUI ESTAVA O PROBLEMA - Você não estava chamando a API ***
//     // Chamar a API do Electron para criar a máquina
//     const result = await window.electronAPI.createMachine(machineToCreate);

//     if (result.success) {
//       setMessage("Máquina criada com sucesso!");
//       setTimeout(() => {
//         router.push("/");
//       }, 2000);
//     } else {
//       setMessage(`Erro ao criar máquina: ${result.message}`);
//     }
//   } catch (error) {
//     console.error("Erro ao criar máquina:", error);
//     setMessage("Erro interno ao criar a máquina. Tente novamente.");
//   } finally {
//     setIsSaving(false);
//   }
// };

//   const getStatusBadgeColor = (status: string) => {
//     switch (status) {
//       case 'Concluida': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
//       case 'Pendente': return 'bg-red-500/20 text-red-400 border-red-500/30';
//       case 'Em andamento': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
//       default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
//     }
//   };

//   return (
//     <div className="h-screen text-gray-100 flex flex-col">
//       {/* Main Content Area (Scrollable) */}
//       <div className="flex-1 overflow-hidden pb-10">
//         <div className="max-w-6xl mx-auto h-full pb-20 flex flex-col">
//           <Card className="bg-gradient-to-br pt-0 from-[#111113] to-[#0F0F11] border-blue-500/30 shadow-2xl flex flex-col flex-1 overflow-hidden">
//             {/* Header Integrado: Progress Steps dentro do Card Header */}
//             <CardHeader className="bg-gradient-to-r from-blue-600/10 to-blue-700/5 border-b border-[#1F1F23] pt-6 flex-shrink-0">
//               {/* Progress Steps */}
//               <div className="">
//                 <div className="flex items-center justify-center gap-8 lg:gap-12">
//                   {steps.map((step, index) => (
//                     <div key={step.id} className="flex items-center gap-4">
//                       <div className="flex flex-col items-center gap-3">
//                         {step.id === 1 ? (
//                           <Image
//                             src={newMachine.status === "Concluida" ? ImgServerConcluida : newMachine.status === "Pendente" ? ImgServerPendente : ImgServerNew}
//                             alt="Servidor"
//                             className="w-10 h-10 lg:w-12 lg:h-12 object-contain cursor-pointer"
//                             onClick={handleNextStep}
//                           />
//                         ) : (
//                           <div
//                             className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full cursor-pointer border-2 transition-all duration-300 ${activeStep >= step.id
//                               ? "bg-blue-600/20 border-blue-600/20 text-white shadow-lg shadow-blue-600/30"
//                               : activeStep === step.id - 1
//                                 ? "border-blue-400/20 text-blue-400/20 bg-blue-600/1"
//                                 : "border-gray-600 text-gray-500 bg-[#1A1A1D]"
//                               }`}
//                             onClick={handleNextStep}
//                           >
//                             <step.icon size={18} />
//                           </div>
//                         )}
//                         <div className="text-center">
//                           <p
//                             className={`text-xs lg:text-sm font-medium transition-colors ${activeStep >= step.id ? "text-gray-100" : "text-gray-500"}`}
//                           >
//                             {newMachine.name && step.id === 1 && newMachine.name.trim() !== ""
//                               ? `Máquina ${newMachine.name.length > 12 ? newMachine.name.slice(0, 8) + "..." : newMachine.name}`
//                               : step.title}
//                           </p>
//                           <p className="text-xs text-gray-600 mt-1">
//                             Passo {step.id} de {steps.length}
//                           </p>
//                         </div>
//                       </div>
//                       {index < steps.length - 1 && (
//                         <div
//                           className={`w-16 lg:w-24 h-0.5 transition-all duration-300 ${activeStep > step.id
//                             ? "bg-gradient-to-r from-blue-600/50 to-blue-500"
//                             : "bg-gray-600"
//                             }`}
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardHeader>

//             {/* Card Content (Scrollable) */}
//             <CardContent className="h-full overflow-y-auto custom-scrollbar flex-1 flex flex-col">
//               <div className="flex-1">
//                 <AnimatePresence mode="wait">
//                   {activeStep === 1 && (
//                     <motion.div
//                       key="step1"
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -30 }}
//                       transition={{ duration: 0.4 }}
//                       className="space-y-5"
//                     >
//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         <div className="space-y-3">
//                           <Label htmlFor="name" className="text-base font-medium text-gray-200 flex items-center gap-2">
//                             Nome da Máquina
//                             <span className="text-red-400">*</span>
//                           </Label>
//                           <Input
//                             id="name"
//                             name="name"
//                             value={newMachine.name || ""}
//                             onChange={handleMachineInputChange}
//                             className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
//                           />
//                           <p className="text-xs text-gray-500">Nome identificador único da máquina Ex: Dallas, Houston, Miami...</p>
//                         </div>
//                         <div className="space-y-3">
//                           <Label htmlFor="version" className="text-base font-medium text-gray-200 flex items-center gap-2">
//                             Versão do Sistema
//                             <span className="text-red-400">*</span>
//                           </Label>
//                           <Input
//                             id="version"
//                             name="version"
//                             value={newMachine.version || ""}
//                             onChange={handleMachineInputChange}
//                             className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
//                             placeholder=""
//                           />
//                           <p className="text-xs text-gray-500">Versão do sistema operacional Ex: z/OS 3.1, z/OS 2.4...</p>
//                         </div>
//                       </div>
//                       <div className="space-y-3">
//                         <Label htmlFor="description" className="text-base font-medium text-gray-200 flex items-center gap-2">
//                           Descrição
//                           <span className="text-red-400">*</span>
//                         </Label>
//                         <Textarea
//                           id="description"
//                           name="description"
//                           value={newMachine.description || ""}
//                           onChange={handleMachineInputChange}
//                           className="min-h-[50px] bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-gray-100 text-base resize-none transition-all duration-200"
//                           placeholder=""
//                         />
//                         <p className="text-xs text-gray-500">Breve descrição sobre a máquina e sua função</p>
//                       </div>
//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         <div className="space-y-3">
//                           <Label htmlFor="status" className="text-base font-medium text-gray-200">
//                             Status Inicial
//                           </Label>
//                           <Select
//                             value={newMachine.status}
//                             onValueChange={handleStatusChange}
//                           >
//                             <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
//                               <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] ">
//                               <SelectItem value="Concluida" className="cursor-pointer focus:bg-green-600/10">
//                                 <span className="text-green-400">Concluída</span>
//                               </SelectItem>
//                               <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10">
//                                 <span className="text-red-400">Pendente</span>
//                               </SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <p className="text-xs text-gray-500">Status atual da configuração</p>
//                         </div>
//                         <div className="space-y-3 ">
//                           <Label htmlFor="updatedAt" className="text-base font-medium text-gray-200">
//                             Data de Criação
//                           </Label>
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <Button
//                                 variant="outline"
//                                 className="justify-start w-full text-left font-normal bg-[#1A1A1D] border-[#2A2A2D] text-gray-200 focus:!border-amber-500 hover:bg-[#23232B] hover:text-gray-500 cursor-pointer"
//                               >
//                                 <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
//                                 {newMachine.updatedAt ? (
//                                   format(new Date(newMachine.updatedAt), "PPP", {
//                                     locale: ptBR,
//                                   })
//                                 ) : (
//                                   <span className="text-gray-400">Selecione a data</span>
//                                 )}
//                               </Button>
//                             </PopoverTrigger>
//                             <PopoverContent className="w-auto p-0 bg-[#1A1A1D] border-gray-700">
//                               <Calendar
//                                 mode="single"
//                                 selected={
//                                   newMachine.updatedAt
//                                     ? new Date(newMachine.updatedAt)
//                                     : new Date()
//                                 }
//                                 onSelect={handleDateChange}
//                                 className="bg-[#1A1A1D] text-gray-200"
//                               />
//                             </PopoverContent>
//                           </Popover>
//                           <p className="text-xs text-gray-500">Data de registro no sistema</p>
//                         </div>
//                       </div>
//                       <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
//                         <div className="flex items-start gap-3">
//                           <div className="p-1 bg-blue-600 rounded-full mt-0.5">
//                             <div className="w-2 h-2 bg-white rounded-full"></div>
//                           </div>
//                           <div>
//                             <h4 className="text-sm font-medium text-blue-400 mb-1">Próximo passo</h4>
//                             <p className="text-xs text-blue-300/80">
//                               Após definir as informações básicas, você poderá adicionar aplicações e configurar seus serviços específicos.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                   {activeStep === 2 && (
//                   <ApplicationsStep
//                     applications={applications}
//                     setApplications={setApplications}
//                     setMessage={setMessage}
//                   />

//                   )}
//                   {activeStep === 3 && (
//                     <motion.div
//                       key="step3"
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       className="space-y-6"
//                     >
//                       {/* Card Principal da Máquina */}
//                       <div className="bg-gradient-to-br from-[#1A1A1D] to-[#0F0F11] border border-blue-500/30 rounded-lg p-6">
//                         <div className="flex items-start gap-4 mb-6">
//                           <div className="flex-shrink-0">
//                             <Image
//                               src={ImgServerNew}
//                               alt="Servidor"
//                               className="w-16 h-16 object-contain"
//                             />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-3 mb-2">
//                               <h2 className="text-2xl font-bold text-white">{newMachine.name}</h2>
//                               <Badge variant="outline" className={`${getStatusBadgeColor(newMachine.status || '')} text-sm`}>
//                                 {newMachine.status}
//                               </Badge>
//                             </div>
//                             <p className="text-gray-400 mb-1">{newMachine.version}</p>
//                             <p className="text-gray-300 text-sm">{newMachine.description}</p>
//                           </div>

//                           {/* Estatísticas Circulares */}
//                           <div className="flex-shrink-0 flex items-center gap-6">
//                             {/* Progresso das Aplicações */}
//                             <div className="relative flex items-center justify-center">
//                               <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 32 32">
//                                 <circle
//                                   cx="16"
//                                   cy="16"
//                                   r="14"
//                                   stroke="currentColor"
//                                   strokeWidth="2"
//                                   fill="none"
//                                   className="text-gray-700"
//                                 />
//                                 <circle
//                                   cx="16"
//                                   cy="16"
//                                   r="14"
//                                   stroke="currentColor"
//                                   strokeWidth="2"
//                                   fill="none"
//                                   strokeDasharray={`${(applications.reduce((acc, app) => acc + app.services.filter(s => s.status === 'Concluida').length, 0) /
//                                       Math.max(applications.reduce((acc, app) => acc + app.services.length, 0), 1)) * 87.92
//                                     } 87.92`}
//                                   className="text-blue-500"
//                                   strokeLinecap="round"
//                                 />
//                               </svg>
//                               <div className="absolute inset-0 flex items-center justify-center">
//                                 <span className="text-2xl font-bold text-blue-400">
//                                   {applications.length > 0
//                                     ? Math.round(
//                                       (applications.reduce((acc, app) => acc + app.services.filter(s => s.status === 'Concluida').length, 0) /
//                                         Math.max(applications.reduce((acc, app) => acc + app.services.length, 0), 1)) * 100
//                                     )
//                                     : 0}%
//                                 </span>
//                               </div>

//                             </div>

//                             {/* Stats */}
//                             <div className="text-right space-y-1">
//                               <div className="flex items-center gap-2">
//                                 <span className="text-xs text-green-400">Instalados</span>
//                                 <span className="text-sm font-bold text-green-400">
//                                   {applications.reduce((acc, app) => acc + app.services.filter(s => s.status === 'Concluida').length, 0)}/
//                                   {applications.reduce((acc, app) => acc + app.services.length, 0)}
//                                 </span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-xs text-red-400">Pendentes</span>
//                                 <span className="text-sm font-bold text-red-400">
//                                   {applications.reduce((acc, app) => acc + app.services.filter(s => s.status === 'Pendente').length, 0)}
//                                 </span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-xs text-gray-400">Total</span>
//                                 <span className="text-sm font-bold text-gray-300">
//                                   {applications.reduce((acc, app) => acc + app.services.length, 0)}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Informações Adicionais */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
//                           <div className="text-center">
//                             <p className="text-gray-400 text-sm">Data de Criação</p>
//                             <p className="text-gray-200 font-medium">
//                               {newMachine.updatedAt
//                                 ? format(new Date(newMachine.updatedAt), "dd/MM/yyyy", { locale: ptBR })
//                                 : "Não definida"
//                               }
//                             </p>
//                           </div>
//                           <div className="text-center">
//                             <p className="text-gray-400 text-sm">Aplicações</p>
//                             <p className="text-gray-200 font-medium text-xl">{applications.length}</p>
//                           </div>
//                           <div className="text-center">
//                             <p className="text-gray-400 text-sm">Serviços</p>
//                             <p className="text-gray-200 font-medium text-xl">
//                               {applications.reduce((acc, app) => acc + app.services.length, 0)}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Seção de Aplicações */}
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <h3 className="text-xl font-semibold text-gray-100">
//                             Aplicações ({applications.length})
//                           </h3>
//                         </div>

//                         {applications.length === 0 ? (
//                           <div className="text-center py-8 bg-[#0F0F11] rounded-lg border border-[#1F1F23]">
//                             <Layers size={48} className="mx-auto text-gray-600 mb-4" />
//                             <p className="text-gray-400">Nenhuma aplicação configurada</p>
//                             <p className="text-sm text-gray-500 mt-1">Volte ao passo anterior para adicionar aplicações</p>
//                           </div>
//                         ) : (
//                           <div className="grid gap-4">
//                             {applications.map((app) => (
//                               <Card key={app.id} className="bg-[#1A1A1D] border-[#2A2A2D] overflow-hidden pt-0 pb-0">
//                                 <CardContent className="p-0">
//                                   <div className="flex items-center">
//                                     {/* Lado esquerdo - Informações da aplicação */}
//                                     <div className="flex-1 p-4">
//                                       <div className="flex flex-col gap-2 mb-4">
//                                         <p className="text-xs text-gray-500 font-medium">Aplicação:</p>
//                                         <div className="flex items-center gap-2">
//                                           <h4 className="font-semibold text-gray-100 text-lg">{app.name}</h4>
//                                           <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
//                                           <p className="text-gray-400 text-sm ">{app.tipo}</p>
//                                           <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
//                                           <Badge variant="outline" className={getStatusBadgeColor(app.status)}>
//                                             {app.status}
//                                           </Badge>
//                                         </div>
//                                       </div>


//                                       {/* Tags dos serviços */}
//                                       {app.services.length > 0 && (
//                                         <div className="space-y-2">
//                                           <p className="text-xs text-gray-500 font-medium">Serviços configurados:</p>
//                                           <div className="flex flex-wrap gap-1">
//                                             {app.services.map((service) => (
//                                               <span
//                                                 key={service.id}
//                                                 className={`text-xs px-2 py-1 rounded-full border ${service.status === 'Concluida'
//                                                   ? 'bg-green-500/20 text-green-400 border-green-500/30'
//                                                   : service.status === 'Em andamento'
//                                                     ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
//                                                     : 'bg-red-500/20 text-red-400 border-red-500/30'
//                                                   }`}
//                                               >
//                                                 {service.name}
//                                               </span>
//                                             ))}
//                                             {app.services.length > 10 && (
//                                               <span className="text-xs bg-gray-600/20 text-gray-400 border border-gray-600/30 px-2 py-1 rounded-full">
//                                                 +{app.services.length - 10} mais
//                                               </span>
//                                             )}
//                                           </div>
//                                         </div>
//                                       )}
//                                     </div>

//                                     {/* Lado direito - Estatísticas */}
//                                     <div className="flex-shrink-0 p-4 bg-[#0F0F11] border-l border-[#2A2A2D] min-w-[120px]">
//                                       <div className="text-center space-y-2">
//                                         <div>
//                                           <p className="text-xs text-gray-500">Concluídos</p>
//                                           <p className="text-lg font-bold text-green-400">
//                                             {app.services.filter(s => s.status === 'Concluida').length}
//                                           </p>
//                                         </div>
//                                         <div>
//                                           <p className="text-xs text-gray-500">Pendentes</p>
//                                           <p className="text-lg font-bold text-red-400">
//                                             {app.services.filter(s => s.status === 'Pendente').length}
//                                           </p>
//                                         </div>
//                                         <div className="pt-2 border-t border-gray-700/50">
//                                           <p className="text-xs text-gray-500">Total</p>
//                                           <p className="text-sm font-bold text-gray-300">
//                                             {app.services.length}
//                                           </p>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </CardContent>
//                               </Card>
//                             ))}
//                           </div>
//                         )}
//                       </div>

//                       {/* Resumo Final */}
//                       <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
//                         <div className="flex items-start gap-3">
//                           <div className="p-1 bg-blue-600 rounded-full mt-0.5">
//                             <Check className="w-3 h-3 text-white" />
//                           </div>
//                           <div>
//                             <h4 className="text-sm font-medium text-blue-400 mb-1">Pronto para criar!</h4>
//                             <p className="text-xs text-blue-300/80">
//                               Todos os dados foram configurados. Clique em "Criar Máquina" para finalizar o processo.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Message Display */}
//               <AnimatePresence>
//                 {message && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     className={`p-4 rounded-lg border ${message.includes("sucesso")
//                       ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
//                       : "bg-red-500/10 text-red-400 border-red-500/30"
//                       } mt-4`}
//                   >
//                     <p className="text-sm font-medium">{message}</p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Footer Navigation */}
//               <div className="mt-8 border-t border-[#1F1F23] bg-[#0F0F11] pt-6 flex-shrink-0  rounded-b-lg">
//                 <div className="mx-auto">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       {activeStep > 1 && (
//                         <Button
//                           variant="ghost"
//                           onClick={handlePreviousStep}
//                           className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] cursor-pointer"
//                         >
//                           <ArrowLeft size={16} className="mr-2" />
//                           Voltar
//                         </Button>
//                       )}
//                     </div>
//                     <div className="flex gap-3">
//                       {activeStep < 3 ? (
//                         <Button
//                           onClick={handleNextStep}
//                           className="bg-blue-600 hover:bg-blue-700 min-w-[120px] shadow-lg cursor-pointer"
//                         >
//                           Próximo
//                           <ArrowLeft size={16} className="ml-2 rotate-180" />
//                         </Button>
//                       ) : (
//                         <Button
//                           onClick={handleSave}
//                           disabled={isSaving}
//                           className="bg-green-600 hover:bg-green-700 min-w-[180px] shadow-lg cursor-pointer"
//                         >
//                           {isSaving ? (
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                           ) : (
//                             <Check className="mr-2 h-4 w-4" />
//                           )}
//                           {isSaving ? "Criando Máquina..." : "Criar Máquina"}
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/app/machines/create/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Plus,
  ArrowLeft,
  Layers,
  Settings,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import type { Machines, Application, StatusType } from "@/types/machines";

// Importar as imagens
import ImgServerNew from "@/assets/images/img-server-status.svg";
import ImgServerPendente from "@/assets/images/img-server-status-warning.svg";
import ImgServerConcluida from "@/assets/images/img-server-status-ok.svg";

// Importar os componentes criados

import MachineInfoStep from "@/components/machines/machine-info-step";
import MachineReviewStep from "@/components/machines/machine-review-step";
import MachineApplicationStep from "@/components/machines/machine-application-step";
import MachineFormHeader from "@/components/machines/machine-form-header";
import MessageDisplay from "@/components/machines/message-display";
import MachineFormFooter from "@/components/machines/machine-form-footer";

export default function CreateMachinePage() {
  const router = useRouter();

  // Estados para controle do formulário e navegação
  const [activeStep, setActiveStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Machine data
  const [newMachine, setNewMachine] = useState<Partial<Machines>>({
    name: "",
    description: "",
    version: "",
    status: "Pendente" as StatusType,
    updatedAt: new Date().toISOString(),
    applications: [],
  });

  // Applications data
  const [applications, setApplications] = useState<Application[]>([]);

  const steps = [
    { id: 1, title: "Cadastro da Máquina", icon: ImgServerNew },
    { id: 2, title: "Aplicações", icon: Layers },
    { id: 3, title: "Revisão & Criação", icon: Settings },
  ];

  const handleMachineChange = (updatedMachine: Partial<Machines>) => {
    setNewMachine(updatedMachine);
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (!newMachine.name?.trim() || !newMachine.description?.trim() || !newMachine.version?.trim()) {
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

  // Função para salvar a máquina no banco de dados
  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      // Validações antes de salvar
      if (!newMachine.name?.trim() || !newMachine.description?.trim() || !newMachine.version?.trim()) {
        setMessage("Todos os campos da máquina são obrigatórios.");
        setIsSaving(false);
        return;
      }

      // Criar objeto da máquina com todas as informações
      const machineToCreate: Machines = {
        id: `machine-${Date.now()}`,
        name: newMachine.name.trim(),
        description: newMachine.description.trim(),
        version: newMachine.version.trim(),
        status: newMachine.status || "Pendente",
        updatedAt: new Date().toISOString(),
        applications: applications.map(app => ({
          ...app,
          machine_id: `machine-${Date.now()}`, // Garantir que o machine_id está correto
          services: app.services.map(service => ({
            ...service,
            application_id: app.id, // Garantir que o application_id está correto
            updatedAt: service.updatedAt || new Date().toISOString()
          }))
        }))
      };

      console.log('Tentando criar máquina:', machineToCreate);

      // Chamar a API do Electron para criar a máquina
      const result = await window.electronAPI.createMachine(machineToCreate);

      if (result.success) {
        setMessage("Máquina criada com sucesso!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage(`Erro ao criar máquina: ${result.message}`);
      }
    } catch (error) {
      console.error("Erro ao criar máquina:", error);
      setMessage("Erro interno ao criar a máquina. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen text-gray-100 flex flex-col">
      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 overflow-hidden pb-10">
        <div className="max-w-6xl mx-auto h-full pb-20 flex flex-col">
          <Card className="bg-gradient-to-br pt-0 from-[#111113] to-[#0F0F11] border-blue-500/30 shadow-2xl flex flex-col flex-1 overflow-hidden">
            {/* Header Integrado: Progress Steps dentro do Card Header */}
            <MachineFormHeader
              activeStep={activeStep}
              onStepClick={setActiveStep}
              machineData={newMachine}
              applications={applications}
              mode="create"
            />

            {/* Card Content (Scrollable) */}
            <CardContent className="h-full overflow-y-auto custom-scrollbar flex-1 flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <MachineInfoStep
                      machine={newMachine}
                      onMachineChange={handleMachineChange}
                      mode="create"
                    />
                  )}
                  
                  {activeStep === 2 && (
                     <MachineApplicationStep
                        applications={applications}
                        setApplications={setApplications}
                        setMessage={setMessage}
                        mode='create'
                    />
                  )}
                  
                  {activeStep === 3 && (
                    <MachineReviewStep
                      machine={newMachine}
                      applications={applications}
                      mode="create"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Message Display */}
              <MessageDisplay message={message} />

              {/* Footer Navigation */}
              <MachineFormFooter
                activeStep={activeStep}
                stepsCount={3}
                isSaving={isSaving}
                onPrevious={handlePreviousStep}
                onNext={handleNextStep}
                onSave={handleSave}
                mode="create"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}