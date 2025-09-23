// import { de } from 'date-fns/locale';
// import React, { useState, useMemo, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Save,
//   X,
//   Plus,
//   Trash2,
//   Search,
//   Layers,
//   CalendarIcon,
//   Edit3
// } from 'lucide-react';
// import { format } from 'date-fns';
// import { ptBR } from 'date-fns/locale';
// import { Application, Service, StatusType, ApplicationType, ItemObrigatorioType } from '@/types/machines';

// export type modeType = 'create' | 'edit';

// interface ApplicationsStepProps {
//   applications: Application[];
//   setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
//   setMessage: (message: string | null) => void;
//   mode: modeType;
// }

// export default function MachineApplicationStep ({
//   applications,
//   setApplications,
//   setMessage,
// }: ApplicationsStepProps) {

// // Estados para controle dos formulários
//   const [isAddingApp, setIsAddingApp] = useState(false);
//   const [isAddingService, setIsAddingService] = useState<string | null>(null);
//   const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
//   const [editingServiceAppId, setEditingServiceAppId] = useState<string | null>(null);
//   const [editingAppId, setEditingAppId] = useState<string | null>(null);

//   // Estados para nova aplicação
//   const [newApp, setNewApp] = useState({
//     name: "",
//     tipo: "IBM" as ApplicationType,
//     status: "Pendente" as StatusType,
//   });

//   // Estados para novo serviço
//   const [newService, setNewService] = useState({
//     name: "",
//     status: "Pendente" as StatusType,
//     itemObrigatorio: "Sim" as ItemObrigatorioType,
//     responsible: "",
//     comments: "",
//     typePendencia: "",
//     responsibleHomologacao: "",
//     updatedAt: undefined as string | undefined,
//   });

//   // Estados para serviço em edição
//   const [editService, setEditService] = useState({
//     name: "",
//     status: "Pendente" as StatusType,
//     itemObrigatorio: "Sim" as ItemObrigatorioType,
//     responsible: "",
//     comments: "",
//     typePendencia: "",
//     responsibleHomologacao: "",
//     updatedAt: undefined as string | undefined,
//   });

//   // Estados para aplicação em edição
//   const [editApp, setEditApp] = useState({
//     name: "",
//     tipo: "IBM" as ApplicationType,
//     status: "Pendente" as StatusType,
//   });

//   // Estados para filtros
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"all" | "Concluida" | "Pendente">("all");
//   const [serviceSearchTerm, setServiceSearchTerm] = useState("");

//   // Handlers para aplicações
//   const handleAddApplication = () => {
//     if (!newApp.name.trim() || !newApp.tipo.trim()) {
//       setMessage("Nome e tipo da aplicação são obrigatórios.");
//       return;
//     }

//     const app: Application = {
//       id: `app-${Date.now()}`,
//       machine_id: "", // Será definido quando a máquina for salva
//       name: newApp.name,
//       tipo: newApp.tipo,
//       status: newApp.status,
//       services: [],
//     };

//     setApplications(prev => [...prev, app]);
//     setNewApp({ name: "", tipo: "IBM", status: "Pendente" });
//     setIsAddingApp(false);
//     setMessage(null);
//   };

//   const handleDeleteApplication = (appId: string) => {
//     setApplications(prev => prev.filter(app => app.id !== appId));
//     setMessage(null);
//   };

//   const handleEditApplication = (appId: string) => {
//     const app = applications.find(a => a.id === appId);
//     if (app) {
//       setEditApp({
//         name: app.name,
//         tipo: app.tipo,
//         status: app.status
//       });
//       setEditingAppId(appId);
//     }
//   };

//   const handleSaveEditApplication = () => {
//     if (!editApp.name.trim() || !editApp.tipo.trim()) {
//       setMessage("Nome e tipo da aplicação são obrigatórios.");
//       return;
//     }

//     setApplications(prev =>
//       prev.map(app =>
//         app.id === editingAppId
//           ? {
//               ...app,
//               name: editApp.name,
//               tipo: editApp.tipo,
//               status: editApp.status,
//             }
//           : app
//       )
//     );

//     setEditingAppId(null);
//     setEditApp({ name: "", tipo: "IBM", status: "Pendente" });
//     setMessage(null);
//   };

//   const handleCancelEditApplication = () => {
//     setEditingAppId(null);
//     setEditApp({ name: "", tipo: "IBM", status: "Pendente" });
//   };

//   // Handlers para serviços
//   const handleAddService = (appId: string) => {
//     if (!newService.name?.trim()) {
//       setMessage("Nome do serviço é obrigatório.");
//       return;
//     }

//     const service: Service = {
//       id: `service-${Date.now()}`,
//       application_id: appId,
//       name: newService.name,
//       status: newService.status,
//       itemObrigatorio: newService.itemObrigatorio,
//       responsible: newService.responsible,
//       comments: newService.comments,
//       typePendencia: newService.typePendencia,
//       responsibleHomologacao: newService.responsibleHomologacao,
//       updatedAt: newService.updatedAt || new Date().toISOString(),
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
//       updatedAt: undefined,
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
//     setMessage(null);
//   };

//   const handleEditService = (appId: string, serviceId: string) => {
//     const app = applications.find(a => a.id === appId);
//     const service = app?.services.find(s => s.id === serviceId);

//     if (service) {
//       setEditService({
//         name: service.name,
//         status: service.status,
//         itemObrigatorio: service.itemObrigatorio || "Sim",
//         responsible: service.responsible || "",
//         comments: service.comments || "",
//         typePendencia: service.typePendencia || "",
//         responsibleHomologacao: service.responsibleHomologacao || "",
//         updatedAt: service.updatedAt,
//       });
//       setEditingServiceId(serviceId);
//       setEditingServiceAppId(appId);
//     }
//   };

//   const handleSaveEditService = () => {
//     if (!editService.name?.trim()) {
//       setMessage("Nome do serviço é obrigatório.");
//       return;
//     }

//     setApplications(prev =>
//       prev.map(app =>
//         app.id === editingServiceAppId
//           ? {
//               ...app,
//               services: app.services.map(service =>
//                 service.id === editingServiceId
//                   ? {
//                       ...service,
//                       name: editService.name,
//                       status: editService.status,
//                       itemObrigatorio: editService.itemObrigatorio,
//                       responsible: editService.responsible,
//                       comments: editService.comments,
//                       typePendencia: editService.typePendencia,
//                       responsibleHomologacao: editService.responsibleHomologacao,
//                       updatedAt: editService.updatedAt || new Date().toISOString(),
//                     }
//                   : service
//               ),
//             }
//           : app
//       )
//     );

//     setEditingServiceId(null);
//     setEditingServiceAppId(null);
//     setEditService({
//       name: "",
//       status: "Pendente",
//       itemObrigatorio: "Sim",
//       responsible: "",
//       comments: "",
//       typePendencia: "",
//       responsibleHomologacao: "",
//       updatedAt: undefined,
//     });
//     setMessage(null);
//   };

//   const handleCancelEditService = () => {
//     setEditingServiceId(null);
//     setEditingServiceAppId(null);
//     setEditService({
//       name: "",
//       status: "Pendente",
//       itemObrigatorio: "Sim",
//       responsible: "",
//       comments: "",
//       typePendencia: "",
//       responsibleHomologacao: "",
//       updatedAt: undefined,
//     });
//   };

//   const handleNewServiceDateChange = (date: Date | undefined) => {
//     setNewService(prev => ({
//       ...prev,
//       updatedAt: date ? date.toISOString() : undefined,
//     }));
//   };

//   const handleEditServiceDateChange = (date: Date | undefined) => {
//     setEditService(prev => ({
//       ...prev,
//       updatedAt: date ? date.toISOString() : undefined,
//     }));
//   };

//   // Função para filtrar serviços
//   const getFilteredServices = useCallback(
//     (services: Service[]) => {
//       if (!serviceSearchTerm) return services;
//       return services.filter(
//         (service) =>
//           service.name
//             .toLowerCase()
//             .includes(serviceSearchTerm.toLowerCase()) ||
//           service.responsible
//             ?.toLowerCase()
//             .includes(serviceSearchTerm.toLowerCase()) ||
//           service.responsibleHomologacao
//             ?.toLowerCase()
//             .includes(serviceSearchTerm.toLowerCase()) ||
//           service.typePendencia
//             ?.toLowerCase()
//             .includes(serviceSearchTerm.toLowerCase()) ||
//           service.comments
//             ?.toLowerCase()
//             .includes(serviceSearchTerm.toLowerCase())
//       );
//     },
//     [serviceSearchTerm]
//   );

//   // Função para filtrar aplicações
//   const filteredApplications = useMemo(() => {
//     return applications.filter((app) => {
//       const matchesAppSearch =
//         app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.tipo?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus =
//         statusFilter === "all" || app.status === statusFilter;
//       const hasMatchingServices = serviceSearchTerm
//         ? getFilteredServices(app.services).length > 0
//         : true;

//       if (serviceSearchTerm && !searchTerm) {
//         return matchesStatus && hasMatchingServices;
//       }
//       return matchesAppSearch && matchesStatus && hasMatchingServices;
//     });
//   }, [
//     applications,
//     searchTerm,
//     statusFilter,
//     serviceSearchTerm,
//     getFilteredServices,
//   ]);

//   // Função para cores dos badges
//   const getStatusBadgeColor = (status: string) => {
//     switch (status) {
//       case 'Concluida': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
//       case 'Pendente': return 'bg-red-500/20 text-red-400 border-red-500/30';
//       case 'Em andamento': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
//       default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
//     }
//   };

//   return (
//     <motion.div
//       key="applications-step"
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-6"
//     >
//       {/* Seção de Controles - Filtros, Pesquisa e Adicionar */}
//       <div className="bg-[#0F0F11] border border-gray-600/30 rounded-lg p-4">
//         <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
//           {/* Lado Esquerdo - Filtros e Pesquisas */}
//           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
//             {/* Pesquisa de Aplicações */}
//             <div className="space-y-2 lg:col-span-2">
//               <Label className="text-sm font-medium text-gray-200">
//                 Pesquisar Aplicação
//               </Label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Nome ou tipo de aplicação..."
//                   className="bg-[#1A1A1D] border-[#2A2A2D] pl-10 focus:!border-amber-500 text-gray-100 placeholder-gray-500 hover:bg-[#23232B] hover:text-gray-500"
//                 />
//                 {searchTerm && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-1 top-1/2 transform cursor-pointer -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700 rounded-full"
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 )}
//               </div>
//             </div>

//             {/* Filtro de Status */}
//             <div className="space-y-2 lg:col-span-2">
//               <Label className="text-sm font-medium text-gray-200">
//                 Status
//               </Label>
//               <Select
//                 value={statusFilter}
//                 onValueChange={(value: "all" | "Concluida" | "Pendente") =>
//                   setStatusFilter(value)
//                 }
//               >
//                 <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] cursor-pointer focus:!border-amber-500 text-gray-100 w-full hover:bg-[#23232B] hover:text-gray-500">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] cursor-pointer">
//                   <SelectItem value="all" className="cursor-pointer focus:bg-gray-600/50">
//                     <span className="text-gray-300">Todos</span>
//                   </SelectItem>
//                   <SelectItem
//                     value="Concluida"
//                     className="cursor-pointer focus:bg-green-600/10"
//                   >
//                     <span className="text-green-400">Concluída</span>
//                   </SelectItem>
//                   <SelectItem
//                     value="Pendente"
//                     className="cursor-pointer focus:bg-red-600/10"
//                   >
//                     <span className="text-red-400">Pendente</span>
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Pesquisa de Serviços */}
//             <div className="space-y-2 lg:col-span-2">
//               <Label className="text-sm font-medium text-gray-200">
//                 Pesquisar Serviço
//               </Label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   value={serviceSearchTerm}
//                   onChange={(e) => setServiceSearchTerm(e.target.value)}
//                   placeholder="Nome ou responsável..."
//                   className="bg-[#1A1A1D] border-[#2A2A2D] pl-10 focus:!border-blue-500 text-gray-100 placeholder-gray-500 hover:bg-[#23232B] hover:text-gray-500"
//                 />
//                 {serviceSearchTerm && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setServiceSearchTerm("")}
//                     className="absolute right-1 top-1/2 transform cursor-pointer -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700 rounded-full"
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Lado Direito - Botão Adicionar e Estatísticas */}
//           <div className="flex items-end gap-4">
//             {/* Estatísticas Rápidas */}
//             <div className="hidden lg:flex items-center gap-4 text-sm">
//               <div className="text-center">
//                 <p className="text-gray-400 text-xs">Total</p>
//                 <p className="text-gray-200 font-bold">{applications.length}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-gray-400 text-xs">Encontradas</p>
//                 <p className="text-amber-400 font-bold">
//                   {filteredApplications.length}
//                 </p>
//               </div>
//               <div className="text-center">
//                 <p className="text-gray-400 text-xs">Serviços</p>
//                 <p className="text-blue-400 font-bold">
//                   {serviceSearchTerm
//                     ? filteredApplications.reduce(
//                         (acc, app) => acc + getFilteredServices(app.services).length,
//                         0
//                       )
//                     : applications.reduce((acc, app) => acc + app.services.length, 0)}
//                 </p>
//               </div>
//             </div>

//             {/* Botão Adicionar Aplicação */}
//             <Button
//               onClick={() => setIsAddingApp((prev) => !prev)}
//               className={`${
//                 isAddingApp
//                   ? "bg-red-600/50 hover:bg-red-700/50"
//                   : "bg-blue-600/50 hover:bg-blue-700/50"
//               } cursor-pointer min-w-[100px] shadow-lg`}
//             >
//               {isAddingApp ? (
//                 <>
//                   <X size={16} className="" />
//                   Cancelar
//                 </>
//               ) : (
//                 <>
//                   <Plus size={16} className="" />
//                   Aplicação
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Indicadores de Filtros Ativos */}
//         {(searchTerm || statusFilter !== "all" || serviceSearchTerm) && (
//           <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-700/50">
//             <span className="text-xs text-gray-400 font-medium">
//               Filtros ativos:
//             </span>

//             {searchTerm && (
//               <Badge
//                 variant="outline"
//                 className="bg-amber-600/20 text-amber-400 border-amber-500/30 cursor-pointer hover:bg-amber-600/30"
//                 onClick={() => setSearchTerm("")}
//               >
//                 App: "{searchTerm}" <X className="ml-1 h-3 w-3" />
//               </Badge>
//             )}

//             {statusFilter !== "all" && (
//               <Badge
//                 variant="outline"
//                 className={`cursor-pointer hover:opacity-80 ${getStatusBadgeColor(
//                   statusFilter
//                 )}`}
//                 onClick={() => setStatusFilter("all")}
//               >
//                 Status: {statusFilter} <X className="ml-1 h-3 w-3" />
//               </Badge>
//             )}

//             {serviceSearchTerm && (
//               <Badge
//                 variant="outline"
//                 className="bg-blue-600/20 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-600/30"
//                 onClick={() => setServiceSearchTerm("")}
//               >
//                 Serviço: "{serviceSearchTerm}" <X className="ml-1 h-3 w-3" />
//               </Badge>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => {
//                 setSearchTerm("");
//                 setStatusFilter("all");
//                 setServiceSearchTerm("");
//               }}
//               className="text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-600/30 h-6 px-2 cursor-pointer"
//             >
//               Limpar todos
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Formulário de Nova Aplicação */}
//       <AnimatePresence>
//         {isAddingApp && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="overflow-hidden"
//           >
//             <div className="p-4 bg-[#0F0F11] border border-green-500/30 rounded-lg">
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="font-medium text-gray-100">Nova Aplicação</h4>
//                 <Button
//                   onClick={() => setIsAddingApp(false)}
//                   className="bg-red-600 hover:bg-red-700 cursor-pointer"
//                 >
//                   <X size={16} className="mr-2" />
//                   Cancelar
//                 </Button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-200">Nome da Aplicação *</Label>
//                   <Input
//                     value={newApp.name}
//                     onChange={(e) => setNewApp(prev => ({ ...prev, name: e.target.value }))}
//                     className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-green-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
//                     placeholder=""
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-gray-200">Tipo da Aplicação *</Label>
//                   <Select
//                     value={newApp.tipo}
//                     onValueChange={(value: "IBM" | "ECCOX") => setNewApp(prev => ({ ...prev, tipo: value }))}
//                   >
//                     <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-green-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500 w-full">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
//                       <SelectItem value="IBM" className="cursor-pointer focus:bg-blue-600/10">
//                         <span className="text-blue-400">IBM</span>
//                       </SelectItem>
//                       <SelectItem value="ECCOX" className="cursor-pointer focus:bg-blue-600/10">
//                         <span className="text-blue-400">ECCOX</span>
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-gray-200">Status</Label>
//                   <Select
//                     value={newApp.status}
//                     onValueChange={(value: "Concluida" | "Pendente") =>
//                       setNewApp(prev => ({ ...prev, status: value }))
//                     }
//                   >
//                     <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-green-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
//                       <SelectItem value="Concluida" className="cursor-pointer focus:bg-green-600/10">
//                         <span className="text-green-400">Concluída</span>
//                       </SelectItem>
//                       <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10">
//                         <span className="text-red-400">Pendente</span>
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="flex justify-end gap-2">
//                 <Button
//                   onClick={handleAddApplication}
//                   className="bg-green-600 hover:bg-green-700 cursor-pointer"
//                 >
//                   <Save size={16} className="mr-2" />
//                   Salvar Aplicação
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Lista de Aplicações */}
//       <div className="space-y-4">
//         {filteredApplications.length === 0 && !isAddingApp ? (
//           <div className="text-center py-12 bg-[#0F0F11] rounded-lg border border-[#1F1F23]">
//             {applications.length === 0 ? (
//               <>
//                 <Layers size={48} className="mx-auto text-gray-600 mb-4" />
//                 <p className="text-gray-400 mb-2">Nenhuma aplicação adicionada</p>
//                 <p className="text-sm text-gray-500">
//                   Clique em "Aplicação" para começar
//                 </p>
//               </>
//             ) : (
//               <>
//                 <Search size={48} className="mx-auto text-gray-600 mb-4" />
//                 <p className="text-gray-400 mb-2">Nenhuma aplicação encontrada</p>
//                 <p className="text-sm text-gray-500">
//                   Tente ajustar os filtros de pesquisa
//                 </p>
//                 <Button
//                   variant="ghost"
//                   onClick={() => {
//                     setSearchTerm("");
//                     setStatusFilter("all");
//                     setServiceSearchTerm("");
//                   }}
//                   className="mt-3 text-gray-400 hover:text-gray-200 hover:bg-gray-600/30 cursor-pointer"
//                 >
//                   <X className="mr-2 h-4 w-4" />
//                   Limpar filtros
//                 </Button>
//               </>
//             )}
//           </div>
//         ) : (
//           [...filteredApplications]
//             .sort((a, b) => {
//               const getIdNumber = (id: string) => {
//                 const match = id.match(/(\d+)$/);
//                 return match ? Number(match[1]) : 0;
//               };
//               return getIdNumber(b.id) - getIdNumber(a.id);
//             })
//             .map((app) => (
//               <Card key={app.id} className="bg-[#1A1A1D] border-[#2A2A2D]">
//                 <CardContent className="p-4">
//                   <AnimatePresence>
//                     {editingAppId === app.id ? (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="p-4 bg-[#0F0F11] border border-blue-500/30 rounded-lg">
//                           <div className="flex items-center justify-between mb-4">
//                             <h4 className="font-medium text-gray-100">Editar Aplicação</h4>
//                             <Button
//                               onClick={handleCancelEditApplication}
//                               className="bg-red-600 hover:bg-red-700 cursor-pointer"
//                             >
//                               <X size={16} className="mr-2" />
//                               Cancelar
//                             </Button>
//                           </div>
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                             <div className="space-y-2">
//                               <Label className="text-gray-200">Nome da Aplicação *</Label>
//                               <Input
//                                 value={editApp.name}
//                                 onChange={(e) => setEditApp(prev => ({ ...prev, name: e.target.value }))}
//                                 className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-gray-200">Tipo da Aplicação *</Label>
//                               <Select
//                                 value={editApp.tipo}
//                                 onValueChange={(value: "IBM" | "ECCOX") => setEditApp(prev => ({ ...prev, tipo: value }))}
//                               >
//                                 <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500 w-full">
//                                   <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
//                                   <SelectItem value="IBM" className="cursor-pointer focus:bg-blue-600/10">
//                                     <span className="text-blue-400">IBM</span>
//                                   </SelectItem>
//                                   <SelectItem value="ECCOX" className="cursor-pointer focus:bg-blue-600/10">
//                                     <span className="text-blue-400">ECCOX</span>
//                                   </SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-gray-200">Status</Label>
//                               <Select
//                                 value={editApp.status}
//                                 onValueChange={(value: "Concluida" | "Pendente") => setEditApp(prev => ({ ...prev, status: value }))}
//                               >
//                                 <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
//                                   <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
//                                   <SelectItem value="Concluida" className="cursor-pointer focus:bg-green-600/10">
//                                     <span className="text-green-400">Concluída</span>
//                                   </SelectItem>
//                                   <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10">
//                                     <span className="text-red-400">Pendente</span>
//                                   </SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                           </div>
//                           <div className="flex justify-end gap-2">
//                             <Button onClick={handleSaveEditApplication} className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
//                               <Save size={16} className="mr-2" />
//                               Salvar
//                             </Button>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ) : (
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-3">
//                           <h4 className="font-medium text-gray-100">{app.name}</h4>
//                           <Badge variant="outline" className={getStatusBadgeColor(app.status)}>
//                             {app.status}
//                           </Badge>
//                           <span className="text-sm text-gray-400">
//                             {app.services.length} serviços
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Button
//                             size="sm"
//                             onClick={() => setIsAddingService(app.id)}
//                             className="bg-blue-600/10 hover:bg-blue-700/10 text-gray-200 hover:text-gray-200 cursor-pointer"
//                           >
//                             <Plus size={14} className="mr-1" />
//                             Serviço
//                           </Button>
//                           <Button
//                             size="sm"
//                             onClick={() => handleEditApplication(app.id)}
//                             className="text-blue-400 cursor-pointer hover:text-gray-200 bg-transparent hover:bg-blue-600/10 h-8 w-8 p-0 rounded-full flex items-center justify-center"
//                           >
//                             <Edit3 size={14} />
//                           </Button>
//                           <Button
//                             size="sm"
//                             onClick={() => handleDeleteApplication(app.id)}
//                             className="text-red-400 cursor-pointer hover:text-gray-200 bg-transparent hover:bg-red-600/10 h-8 w-8 p-0 rounded-full flex items-center justify-center"
//                           >
//                             <Trash2 size={14} />
//                           </Button>
//                         </div>
//                       </div>
//                     )}
//                   </AnimatePresence>

//                   {/* Formulário de Novo Serviço */}
//                   <AnimatePresence>
//                     {isAddingService === app.id && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="p-3 bg-[#0F0F11] border border-blue-500/30 rounded-lg mb-3"
//                       >
//                         <h5 className="text-sm font-medium text-gray-200 mb-3">Novo Serviço</h5>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
//                           <div className="space-y-2 col-span-2">
//                             <Label className="text-xs text-gray-200">Nome *</Label>
//                             <Input
//                               value={newService.name}
//                               onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
//                               className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] hover:text-gray-500"
//                               placeholder=""
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label className="text-xs text-gray-200">Status</Label>
//                             <Select
//                               value={newService.status}
//                               onValueChange={(value: "Concluida" | "Pendente" | "Em andamento") =>
//                                 setNewService(prev => ({ ...prev, status: value }))
//                               }
//                             >
//                               <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
//                                 <SelectValue />
//                               </SelectTrigger>
//                               <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
//                                 <SelectItem value="Concluida" className="cursor-pointer focus:bg-green-600/10">
//                                   <span className="text-green-400">Concluída</span>
//                                 </SelectItem>
//                                 <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10">
//                                   <span className="text-red-400">Pendente</span>
//                                 </SelectItem>
//                                 <SelectItem value="Em andamento" className="cursor-pointer focus:bg-amber-600/10">
//                                   <span className="text-amber-400">Em andamento</span>
//                                 </SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div className="space-y-2">
//                             <Label className="text-xs text-gray-200">Obrigatório</Label>
//                             <Select
//                               value={newService.itemObrigatorio}
//                               onValueChange={(value: "Sim" | "Não") =>
//                                 setNewService(prev => ({ ...prev, itemObrigatorio: value }))
//                               }
//                             >
//                               <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] hover:text-gray-500">
//                                 <SelectValue />
//                               </SelectTrigger>
//                               <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
//                                 <SelectItem value="Sim" className="cursor-pointer focus:bg-green-600/10">
//                                   <span className="text-green-400">Sim</span>
//                                 </SelectItem>
//                                 <SelectItem value="Não" className="cursor-pointer focus:bg-red-600/10">
//                                   <span className="text-red-400">Não</span>
//                                 </SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div className="space-y-2">
//                             <Label className="text-xs text-gray-200">Responsável</Label>
//                             <Input
//                               value={newService.responsible}
//                               onChange={(e) => setNewService(prev => ({ ...prev, responsible: e.target.value }))}
//                               className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] hover:text-gray-500"
//                               placeholder=""
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label className="text-xs text-gray-200">Responsável Homologação</Label>
//                             <Input
//                               value={newService.responsibleHomologacao}
//                               onChange={(e) => setNewService(prev => ({ ...prev, responsibleHomologacao: e.target.value }))}
//                               className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] hover:text-gray-500"
//                               placeholder=""
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label className="text-xs text-gray-200">Tipo Pendência</Label>
//                             <Input
//                               value={newService.typePendencia}
//                               onChange={(e) => setNewService(prev => ({ ...prev, typePendencia: e.target.value }))}
//                               className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] hover:text-gray-500"
//                               placeholder=""
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label className="text-xs text-gray-200">Data de entrega</Label>
//                             <Popover>
//                               <PopoverTrigger asChild>
//                                 <Button
//                                   variant="outline"
//                                   className="justify-start text-left font-normal bg-[#1A1A1E] border-gray-600 text-gray-200 hover:bg-[#1A1A1E] w-full"
//                                 >
//                                   <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
//                                   {newService.updatedAt ? (
//                                     format(new Date(newService.updatedAt), "dd/MM/yyyy", { locale: ptBR })
//                                   ) : (
//                                     <span className="text-gray-400">
//                                       Selecione a data
//                                     </span>
//                                   )}
//                                 </Button>
//                               </PopoverTrigger>
//                               <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
//                                 <Calendar
//                                   mode="single"
//                                   selected={newService.updatedAt ? new Date(newService.updatedAt) : undefined}
//                                   onSelect={handleNewServiceDateChange}
//                                   className="bg-[#1A1A1E] text-gray-200"
//                                 />
//                               </PopoverContent>
//                             </Popover>
//                           </div>
//                           <div className="space-y-2 col-span-2">
//                             <Label className="text-xs text-gray-200">Comentários</Label>
//                             <Textarea
//                               value={newService.comments}
//                               onChange={(e) => setNewService(prev => ({ ...prev, comments: e.target.value }))}
//                               className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-200 resize-none min-h-[60px]"
//                             />
//                           </div>
//                         </div>
//                         <div className="flex justify-end gap-2">
//                           <Button
//                             size="sm"
//                             onClick={() => setIsAddingService(null)}
//                             className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
//                           >
//                             <X size={14} className="mr-1" />
//                             Cancelar
//                           </Button>
//                           <Button
//                             size="sm"
//                             onClick={() => handleAddService(app.id)}
//                             className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
//                           >
//                             <Save size={14} className="mr-1" />
//                             Salvar
//                           </Button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Lista de Serviços */}
//                   {app.services.length > 0 && (
//                     <div className="space-y-2 mt-4">
//                       <div className="flex items-center justify-between">
//                         <h5 className="text-sm font-medium text-gray-300">Serviços:</h5>
//                         {serviceSearchTerm && getFilteredServices(app.services).length !== app.services.length && (
//                           <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-xs">
//                             {getFilteredServices(app.services).length} de {app.services.length}
//                           </Badge>
//                         )}
//                       </div>
//                       <div className="space-y-2">
//                         {getFilteredServices(app.services).length === 0 ? (
//                           <div className="text-center py-4 bg-[#0A0A0C] rounded border border-[#2A2A2D]">
//                             <p className="text-xs text-gray-500">Nenhum serviço encontrado com "{serviceSearchTerm}"</p>
//                           </div>
//                         ) : (
//                           getFilteredServices(app.services).map((service) => (
//                             <div key={service.id}>
//                               <AnimatePresence>
//                                 {editingServiceId === service.id && editingServiceAppId === app.id ? (
//                                   <motion.div
//                                     initial={{ opacity: 0, height: 0 }}
//                                     animate={{ opacity: 1, height: "auto" }}
//                                     exit={{ opacity: 0, height: 0 }}
//                                     className="p-3 bg-[#0A0A0C] border border-blue-500/30 rounded-lg mb-2"
//                                   >
//                                     <h6 className="text-xs font-medium text-blue-400 mb-3">
//                                       Editando Serviço
//                                     </h6>
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
//                                       <div className="space-y-2 col-span-2">
//                                         <Label className="text-xs text-gray-200">Nome *</Label>
//                                         <Input
//                                           value={editService.name}
//                                           onChange={(e) => setEditService(prev => ({ ...prev, name: e.target.value }))}
//                                           className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] text-sm"
//                                         />
//                                       </div>
//                                       <div className="space-y-2">
//                                         <Label className="text-xs text-gray-200">Status</Label>
//                                         <Select
//                                           value={editService.status}
//                                           onValueChange={(value: "Concluida" | "Pendente" | "Em andamento") => setEditService(prev => ({ ...prev, status: value }))}
//                                         >
//                                           <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] text-sm">
//                                             <SelectValue />
//                                           </SelectTrigger>
//                                           <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
//                                             <SelectItem value="Concluida" className="cursor-pointer focus:bg-green-600/10">
//                                               <span className="text-green-400">Concluída</span>
//                                             </SelectItem>
//                                             <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10">
//                                               <span className="text-red-400">Pendente</span>
//                                             </SelectItem>
//                                             <SelectItem value="Em andamento" className="cursor-pointer focus:bg-amber-600/10">
//                                               <span className="text-amber-400">Em andamento</span>
//                                             </SelectItem>
//                                           </SelectContent>
//                                         </Select>
//                                       </div>
//                                       <div className="space-y-2">
//                                         <Label className="text-xs text-gray-200">Obrigatório</Label>
//                                         <Select
//                                           value={editService.itemObrigatorio}
//                                           onValueChange={(value: "Sim" | "Não") => setEditService(prev => ({ ...prev, itemObrigatorio: value }))}
//                                         >
//                                           <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-100 hover:bg-[#23232B] text-sm">
//                                             <SelectValue />
//                                           </SelectTrigger>
//                                           <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
//                                             <SelectItem value="Sim" className="cursor-pointer focus:bg-green-600/10">
//                                               <span className="text-green-400">Sim</span>
//                                             </SelectItem>
//                                             <SelectItem value="Não" className="cursor-pointer focus:bg-red-600/10">
//                                               <span className="text-red-400">Não</span>
//                                             </SelectItem>
//                                           </SelectContent>
//                                         </Select>
//                                       </div>
//                                       <div className="space-y-2">
//                                         <Label className="text-xs text-gray-200">Responsável</Label>
//                                         <Input
//                                           value={editService.responsible}
//                                           onChange={(e) => setEditService(prev => ({ ...prev, responsible: e.target.value }))}
//                                           className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] text-sm"
//                                         />
//                                       </div>
//                                       <div className="space-y-2">
//                                         <Label className="text-xs text-gray-200">Responsável Homologação</Label>
//                                         <Input
//                                           value={editService.responsibleHomologacao}
//                                           onChange={(e) => setEditService(prev => ({ ...prev, responsibleHomologacao: e.target.value }))}
//                                           className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] text-sm"
//                                         />
//                                       </div>
//                                       <div className="space-y-2">
//                                         <Label className="text-xs text-gray-200">Tipo Pendência</Label>
//                                         <Input
//                                           value={editService.typePendencia}
//                                           onChange={(e) => setEditService(prev => ({ ...prev, typePendencia: e.target.value }))}
//                                           className="bg-[#1A1A1D] border-[#2A2A2D] w-full focus:!border-blue-500 text-gray-200 hover:bg-[#23232B] text-sm"
//                                         />
//                                       </div>
//                                       <div className="space-y-2">
//                                         <Label className="text-xs text-gray-200">Data de entrega</Label>
//                                         <Popover>
//                                           <PopoverTrigger asChild>
//                                             <Button
//                                               variant="outline"
//                                               className="justify-start text-left font-normal bg-[#1A1A1E] border-gray-600 text-gray-200 hover:bg-[#1A1A1E] w-full text-sm"
//                                             >
//                                               <CalendarIcon className="mr-2 h-3 w-3 text-gray-400" />
//                                               {editService.updatedAt ? (
//                                                 format(new Date(editService.updatedAt), "dd/MM/yyyy", { locale: ptBR })
//                                               ) : (
//                                                 <span className="text-gray-400">
//                                                   Selecione a data
//                                                 </span>
//                                               )}
//                                             </Button>
//                                           </PopoverTrigger>
//                                           <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
//                                             <Calendar
//                                               mode="single"
//                                               selected={editService.updatedAt ? new Date(editService.updatedAt) : undefined}
//                                               onSelect={handleEditServiceDateChange}
//                                               className="bg-[#1A1A1E] text-gray-200"
//                                             />
//                                           </PopoverContent>
//                                         </Popover>
//                                       </div>
//                                       <div className="space-y-2 col-span-2">
//                                         <Label className="text-xs text-gray-200">Comentários</Label>
//                                         <Textarea
//                                           value={editService.comments}
//                                           onChange={(e) => setEditService(prev => ({ ...prev, comments: e.target.value }))}
//                                           className="bg-[#1A1A1D] border-[#2A2A2D] focus:!border-blue-500 text-gray-200 resize-none min-h-[50px] text-sm"
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="flex justify-end gap-2">
//                                       <Button
//                                         size="sm"
//                                         onClick={handleCancelEditService}
//                                         className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-xs"
//                                       >
//                                         Cancelar
//                                       </Button>
//                                       <Button
//                                         size="sm"
//                                         onClick={handleSaveEditService}
//                                         className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-xs"
//                                       >
//                                         <Save size={12} className="mr-1" />
//                                         Salvar
//                                       </Button>
//                                     </div>
//                                   </motion.div>
//                                 ) : (
//                                   <div className="flex items-center justify-between p-2 bg-[#0F0F11] rounded border border-[#2A2A2D]">
//                                     <div className="flex items-center gap-2 flex-1">
//                                       <span className="text-sm text-gray-300">
//                                         {service.name}
//                                       </span>
//                                       <span className="text-xs text-gray-500">
//                                         |
//                                       </span>
//                                       <span className="text-xs text-gray-500">
//                                         {service.responsible || "Sem responsável"}
//                                       </span>
//                                       <span className="text-xs text-gray-500">
//                                         |
//                                       </span>
//                                       <span className="text-xs text-gray-500">
//                                         {service.updatedAt
//                                           ? format(new Date(service.updatedAt), "dd/MM/yyyy", { locale: ptBR })
//                                           : "Sem data"}
//                                       </span>
//                                       <Badge
//                                         variant="outline"
//                                         className={getStatusBadgeColor(service.status)}
//                                       >
//                                         {service.status}
//                                       </Badge>
//                                       {service.itemObrigatorio === "Sim" && (
//                                         <Badge
//                                           variant="outline"
//                                           className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
//                                         >
//                                           Obrigatório
//                                         </Badge>
//                                       )}
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                       <Button
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={() => handleEditService(app.id, service.id)}
//                                         className="text-blue-400 hover:text-blue-300 h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-blue-600/10"
//                                       >
//                                         <Edit3 size={12} />
//                                       </Button>
//                                       <Button
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={() => handleDeleteService(app.id, service.id)}
//                                         className="text-red-400 hover:text-red-300 h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-red-600/10"
//                                       >
//                                         <Trash2 size={12} />
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 )}
//                               </AnimatePresence>
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))
//         )}
//       </div>
//     </motion.div>
//   );
// };

import React, { useState, useMemo, useCallback } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Save,
  X,
  Plus,
  Trash2,
  Search,
  Layers,
  CalendarIcon,
  Edit3,
  SquarePen,
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
import { ApplicationForm } from "./application-form";
import { ServiceForm } from "./service-form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export type modeType = "create" | "edit";

interface ApplicationsStepProps {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  setMessage: (message: string | null) => void;
  mode: modeType;
}

export default function MachineApplicationStep({
  applications,
  setApplications,
  setMessage,
}: ApplicationsStepProps) {
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [isAddingService, setIsAddingService] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingServiceAppId, setEditingServiceAppId] = useState<string | null>(
    null
  );
  const [editingAppId, setEditingAppId] = useState<string | null>(null);

  const [newApp, setNewApp] = useState({
    name: "",
    tipo: "IBM" as ApplicationType,
    status: "Pendente" as StatusType,
  });

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

  const [editApp, setEditApp] = useState({
    name: "",
    tipo: "IBM" as ApplicationType,
    status: "Pendente" as StatusType,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Concluida" | "Pendente"
  >("all");
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");

  const handleAddApplication = () => {
    if (!newApp.name.trim() || !newApp.tipo.trim()) {
      setMessage("Nome e tipo da aplicação são obrigatórios.");
      return;
    }
    const app: Application = {
      id: `app-${Date.now()}`,
      machine_id: "",
      name: newApp.name,
      tipo: newApp.tipo,
      status: newApp.status,
      services: [],
    };
    setApplications((prev) => [...prev, app]);
    setNewApp({ name: "", tipo: "IBM", status: "Pendente" });
    setIsAddingApp(false);
    setMessage(null);
  };

  const handleDeleteApplication = (appId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
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
    setEditApp({ name: "", tipo: "IBM", status: "Pendente" });
    setMessage(null);
  };

  const handleCancelEditApplication = () => {
    setEditingAppId(null);
    setEditApp({ name: "", tipo: "IBM", status: "Pendente" });
  };

  const handleAddService = (appId: string) => {
    if (!newService.name?.trim()) {
      setMessage("Nome do serviço é obrigatório.");
      return;
    }
    const service: Service = {
      id: `service-${Date.now()}`,
      application_id: appId,
      name: newService.name,
      status: newService.status,
      itemObrigatorio: newService.itemObrigatorio,
      responsible: newService.responsible,
      comments: newService.comments,
      typePendencia: newService.typePendencia,
      responsibleHomologacao: newService.responsibleHomologacao,
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
      updatedAt: undefined,
    });
    setIsAddingService(null);
    setMessage(null);
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

  const handleEditService = (appId: string, serviceId: string) => {
    const app = applications.find((a) => a.id === appId);
    const service = app?.services.find((s) => s.id === serviceId);
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
                      name: editService.name,
                      status: editService.status,
                      itemObrigatorio: editService.itemObrigatorio,
                      responsible: editService.responsible,
                      comments: editService.comments,
                      typePendencia: editService.typePendencia,
                      responsibleHomologacao:
                        editService.responsibleHomologacao,
                      updatedAt:
                        editService.updatedAt || new Date().toISOString(),
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
      responsible: "",
      comments: "",
      typePendencia: "",
      responsibleHomologacao: "",
      updatedAt: undefined,
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
      responsible: "",
      comments: "",
      typePendencia: "",
      responsibleHomologacao: "",
      updatedAt: undefined,
    });
  };

  const getFilteredServices = useCallback(
    (services: Service[]) => {
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

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesAppSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tipo?.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleApplicationFormChange = useCallback(
    (value: string, key: string) => {
      if (isAddingApp) {
        setNewApp((prev) => ({
          ...prev,
          [key]: value as ApplicationType | StatusType,
        }));
      } else if (editingAppId) {
        setEditApp((prev) => ({
          ...prev,
          [key]: value as ApplicationType | StatusType,
        }));
      }
    },
    [isAddingApp, editingAppId]
  );

  // Handler para o formulário de serviço
  // Esta função já estava correta, mas a anotação de tipo pode ser ajustada para clareza
  const handleServiceFormChange = useCallback(
    (value: string | Date | undefined, key: string) => {
      if (isAddingService) {
        setNewService((prev) => ({
          ...prev,
          [key]: value instanceof Date ? value.toISOString() : value,
        }));
      } else if (editingServiceId) {
        setEditService((prev) => ({
          ...prev,
          [key]: value instanceof Date ? value.toISOString() : value,
        }));
      }
    },
    [isAddingService, editingServiceId]
  );

  return (
    <motion.div
      key="applications-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-[#0F0F11] border border-gray-600/30 rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Pesquisa de Aplicação */}
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
                <SelectTrigger className="bg-[#1A1A1D] border-[#2A2A2D] cursor-pointer focus:!border-amber-500 text-gray-100 w-full hover:bg-[#23232B] hover:text-gray-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] cursor-pointer">
                  <SelectItem
                    value="all"
                    className="cursor-pointer focus:bg-gray-600/50"
                  >
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
          <div className="flex items-end gap-4">
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
                        (acc, app) =>
                          acc + getFilteredServices(app.services).length,
                        0
                      )
                    : applications.reduce(
                        (acc, app) => acc + app.services.length,
                        0
                      )}
                </p>
              </div>
            </div>
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

      <AnimatePresence>
        {isAddingApp && (
          <ApplicationForm
            appData={newApp}
            onChange={handleApplicationFormChange}
            onSave={handleAddApplication}
            onCancel={() => setIsAddingApp(false)}
            isEditMode={false}
          />
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {filteredApplications.length === 0 && !isAddingApp ? (
          <div className="text-center py-12 bg-[#0F0F11] rounded-lg border border-[#1F1F23]">
            {applications.length === 0 ? (
              <>
                <Layers size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 mb-2">
                  Nenhuma aplicação adicionada
                </p>
                <p className="text-sm text-gray-500">
                  Clique em "Aplicação" para começar
                </p>
              </>
            ) : (
              <>
                <Search size={48} className="mx-auto text-gray-600 mb-4" />
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
                  className="mt-3 text-gray-400 hover:text-gray-200 hover:bg-gray-600/30 cursor-pointer"
                >
                  <X className="mr-2 h-4 w-4" />
                  Limpar filtros
                </Button>
              </>
            )}
          </div>
        ) : (
          [...filteredApplications]
            .sort((a, b) => {
              const getIdNumber = (id: string) => {
                const match = id.match(/(\d+)$/);
                return match ? Number(match[1]) : 0;
              };
              return getIdNumber(b.id) - getIdNumber(a.id);
            })
            .map((app) => (
              <Card key={app.id} className="bg-[#1A1A1D] border-[#2A2A2D]">
                <CardContent className="px-4">
                  <AnimatePresence>
                    {editingAppId === app.id ? (
                      <ApplicationForm
                        appData={editApp}
                        onChange={handleApplicationFormChange}
                        onSave={handleSaveEditApplication}
                        onCancel={handleCancelEditApplication}
                        isEditMode={true}
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex flex-col gap-2 mb-4">
                            <p className="text-xs text-gray-500 font-medium">
                              Aplicação:
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Layers size={16} className="text-gray-400" />
                                <span className="ml-1 text-sm font-medium text-gray-200">
                                  <h4 className="font-semibold text-gray-100 text-lg">
                                    {app.name}
                                  </h4>
                                </span>
                              </div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                              <p className="text-gray-400 text-sm">
                                {app.tipo}
                              </p>
                              <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                              <Badge
                                variant="outline"
                                className={getStatusBadgeColor(app.status)}
                              >
                                {app.status}
                              </Badge>
                              <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                              <span className="text-sm text-gray-400">
                                {app.services.length} serviços
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => setIsAddingService(app.id)}
                              className="bg-blue-600/10 hover:bg-blue-700/10 text-gray-200 hover:text-gray-200 cursor-pointer"
                            >
                              <Plus size={14} className="mr-1" />
                              Serviço
                            </Button>
                            {/* Botão Editar Aplicação */}
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() => handleEditApplication(app.id)}
                                  className="text-amber-400 cursor-pointer hover:text-gray-200 bg-transparent hover:bg-amber-600/10 h-8 w-8 p-0 rounded-full flex items-center justify-center"
                                >
                                  <SquarePen size={14} />
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent
                                side="top"
                                align="center"
                                className="bg-zinc-900 text-zinc-200 border border-zinc-700 shadow-lg rounded-md px-2 py-1 text-xs flex justify-center items-center w-30"
                              >
                                Editar aplicação
                              </HoverCardContent>
                            </HoverCard>

                            {/* Botão Excluir Aplicação */}
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteApplication(app.id)
                                  }
                                  className="text-red-400 cursor-pointer hover:text-gray-200 bg-transparent hover:bg-red-600/10 h-8 w-8 p-0 rounded-full flex items-center justify-center"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent
                                side="top"
                                align="center"
                                className="bg-zinc-900 text-zinc-200 border border-zinc-700 shadow-lg rounded-md px-2 py-1 text-xs flex justify-center items-center w-30"
                              >
                                Excluir aplicação
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isAddingService === app.id && (
                      <ServiceForm
                        serviceData={newService}
                        onChange={handleServiceFormChange}
                        onSave={() => handleAddService(app.id)}
                        onCancel={() => setIsAddingService(null)}
                        isEditMode={false}
                      />
                    )}
                  </AnimatePresence>

                  {app.services.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium text-gray-300">
                          Serviços:
                        </h5>
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
                              Nenhum serviço encontrado com "{serviceSearchTerm}
                              "
                            </p>
                          </div>
                        ) : (
                          getFilteredServices(app.services).map((service) => (
                            <div key={service.id}>
                              <AnimatePresence>
                                {editingServiceId === service.id &&
                                editingServiceAppId === app.id ? (
                                  <ServiceForm
                                    serviceData={editService}
                                    onChange={handleServiceFormChange}
                                    onSave={handleSaveEditService}
                                    onCancel={handleCancelEditService}
                                    isEditMode={true}
                                  />
                                ) : (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-between p-2 bg-[#0F0F11] rounded border border-[#2A2A2D]"
                                  >
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
                                              new Date(service.updatedAt),
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
                                        <HoverCardTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              handleEditService(
                                                app.id,
                                                service.id
                                              )
                                            }
                                            className="text-amber-400 hover:text-amber-300 h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-amber-600/10"
                                          >
                                            <Edit3 size={12} />
                                          </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent
                                          side="top"
                                          align="center"
                                          className="bg-zinc-900 text-zinc-200 flex justify-center items-center w-25 border border-zinc-700 shadow-lg rounded-md px-2 py-1 text-xs "
                                        >
                                          Editar serviço
                                        </HoverCardContent>
                                      </HoverCard>

                                      <HoverCard>
                                        <HoverCardTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              handleDeleteService(
                                                app.id,
                                                service.id
                                              )
                                            }
                                            className="text-red-400 hover:text-red-300  h-6 w-6 p-0 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-red-600/10"
                                          >
                                            <Trash2 size={12} />
                                          </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent
                                          side="top"
                                          align="center"
                                          className="bg-zinc-900 text-zinc-200 flex justify-center items-center border border-zinc-700 shadow-lg rounded-md px-2 py-1 text-xs w-25"
                                        >
                                          Excluir serviço
                                        </HoverCardContent>
                                      </HoverCard>
                                    </div>
                                  </motion.div>
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
            ))
        )}
      </div>
    </motion.div>
  );
}
