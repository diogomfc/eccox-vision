// src/components/machines/service-list.tsx
"use client";

import React, { useState, useCallback } from "react";
import type { Service, StatusType } from "@/types/machines";
import { CheckCircle, Clock, LayoutList, MinusCircle, SquarePen, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

import ServiceEditModal from "../modals/service-edit-modal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ServiceListProps {
    services: Service[];
    onServicesUpdated: (services: Service[]) => void; // Adicionando o callback
}

export function ServiceList({ services, onServicesUpdated }: ServiceListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusType | "">("");
    const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const filteredServices = services.filter((service) => {
        const matchesName = service.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "" || service.status === statusFilter;
        return matchesName && matchesStatus;
    });

    const getStatusIcon = (status: StatusType) => {
        switch (status) {
            case "Concluida":
                return <CheckCircle size={18} className="text-white" />;
            case "Pendente":
                return <Clock size={18} className="text-white" />;
            case "Em andamento":
                return <MinusCircle size={18} className="text-white" />;
            default:
                return null;
        }
    };
    
    // Handler para editar serviço
    const handleEditService = useCallback(async (updatedService: Service) => {
        setIsLoading(true);
        setMessage(null);
        try {
            console.log("Atualizando serviço:", updatedService);
            
            // Chama a API do Electron para atualizar o serviço
            const result = await window.electronAPI.updateService(updatedService);

            if (result.success) {
                setMessage("Serviço atualizado com sucesso!");
                // Atualiza o estado local
                const updatedServices = services.map(s => s.id === updatedService.id ? updatedService : s);
                onServicesUpdated(updatedServices); // Chama o callback para o pai
            } else {
                setMessage(`Erro ao atualizar serviço: ${result.message}`);
            }
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
            setMessage("Erro ao atualizar serviço. Tente novamente.");
        } finally {
            setIsLoading(false);
            setIsEditModalOpen(false);
            setSelectedService(null);
            setTimeout(() => setMessage(null), 3000);
        }
    }, [services, onServicesUpdated]);

    // Handler para deletar serviço
    const handleDeleteService = useCallback(async (serviceId: string) => {
        if (!confirm("Tem certeza que deseja excluir este serviço?")) return;

        setIsLoading(true);
        setMessage(null);
        try {
            console.log("Deletando serviço:", serviceId);

            // Chama a API do Electron para deletar o serviço
            const result = await window.electronAPI.deleteService(serviceId);

            if (result.success) {
                setMessage("Serviço excluído com sucesso!");
                // Atualiza o estado local
                const updatedServices = services.filter(s => s.id !== serviceId);
                onServicesUpdated(updatedServices); // Chama o callback para o pai
            } else {
                setMessage(`Erro ao excluir serviço: ${result.message}`);
            }
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
            setMessage("Erro ao excluir serviço. Tente novamente.");
        } finally {
            setIsLoading(false);
            setTimeout(() => setMessage(null), 3000);
        }
    }, [services, onServicesUpdated]);

    const handleOpenEditModal = (service: Service) => {
        setSelectedService(service);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedService(null);
    };

    return (
        <div className="">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-white text-lg font-bold flex items-center gap-2">
                        <LayoutList size={20} className="text-gray-400" />
                        Serviços
                    </h2>
                    <span className="text-xs text-gray-400 font-normal">
                        total {filteredServices.length}
                    </span>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar serviço..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#23232B] text-white text-xs px-2 py-1 rounded w-full outline-none border border-[#23232B] focus:border-gray-600 transition"
                        disabled={isLoading}
                    />
                    <select
                        aria-label="Filtrar por status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as "" | StatusType)}
                        className="bg-[#23232B] text-white text-xs px-2 py-1 rounded outline-none border border-[#23232B] focus:border-gray-600 transition"
                        disabled={isLoading}
                    >
                        <option value="">Todos</option>
                        <option value="Concluida">Concluídos</option>
                        <option value="Pendente">Pendentes</option>
                        <option value="Em andamento">Em andamento</option>
                    </select>
                </div>
            </div>
            
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-4 p-2 rounded text-xs ${
                        message.includes("Erro")
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-green-500/20 text-green-400 border border-green-500/30"
                    }`}
                >
                    {message}
                </motion.div>
            )}

            {isLoading && (
                <div className="text-center py-4 text-gray-400 text-xs flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" /> Processando...
                </div>
            )}

            <ul className="space-y-2 max-h-[calc(100vh-190px)] overflow-y-auto pr-1 custom-scrollbar mb-4">
                {filteredServices.map((service, index) => (
                    <motion.li
                        key={service.id || index}
                        className={`flex items-center gap-3 p-2 rounded hover:bg-[#23232B] transition mb-2 cursor-pointer relative ${isLoading ? 'opacity-50' : ''}`}
                        onMouseEnter={() => !isLoading && setHoveredServiceId(service.id || null)}
                        onMouseLeave={() => setHoveredServiceId(null)}
                    >
                        {/* Seu código de exibição do serviço */}
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <div className="flex items-center gap-3 flex-1">
                                    <span
                                        className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                                            service.status === "Concluida"
                                                ? "bg-green-500 border-green-500"
                                                : service.status === "Pendente"
                                                    ? "bg-red-500 border-red-500 animate-pulse"
                                                    : "bg-gray-500 border-gray-500"
                                        }`}
                                    >
                                        {getStatusIcon(service.status)}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold text-xs leading-tight">
                                            {service.name}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            Data entrega:{" "}
                                            {service.updatedAt
                                                ? format(new Date(service.updatedAt), "dd/MM/yy", { locale: ptBR })
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </HoverCardTrigger>
                            {/* Conteúdo do HoverCard */}
                            <HoverCardContent className="w-80 bg-[#23232B] text-white border border-[#333] p-4 rounded-lg shadow-lg">
                                <div className="space-y-2">
                                    <h4 className="font-bold text-sm">{service.name}</h4>
                                    <p className="text-xs text-gray-400">
                                        Status: <span className={`font-semibold ${
                                            service.status === "Concluida" ? "text-green-400" : "text-red-400"
                                        }`}>{service.status}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Item Obrigatório: <span className="font-semibold text-white">{service.itemObrigatorio}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Última Atualização:
                                        <span className="font-semibold text-white pl-1">
                                            {service.updatedAt
                                                ? format(new Date(service.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
                                                : "N/A"
                                            }
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Responsável: <span className="font-semibold text-white">{service.responsible || 'N/A'}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Responsável Homologação: <span className="font-semibold text-white">{service.responsibleHomologacao || 'N/A'}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Tipo de Pendência: <span className="font-semibold text-white">{service.typePendencia || 'N/A'}</span>
                                    </p>
                                    <div className="text-xs text-gray-400">
                                        Comentários: <p className="font-normal italic mt-1 text-white">{service.comments || 'Nenhum'}</p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        {/* Botões de Ação */}
                        {hoveredServiceId === service.id && !isLoading && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 flex flex-col gap-1 z-10"
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenEditModal(service);
                                    }}
                                    className="transition-colors cursor-pointer"
                                    aria-label="Editar serviço"
                                >
                                    <SquarePen size={16} className="text-gray-600/80 hover:text-amber-500" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteService(service.id);
                                    }}
                                    className="transition-colors cursor-pointer"
                                    aria-label="Deletar serviço"
                                >
                                    <Trash2 size={16} className="text-red-400/50 hover:text-red-300" />
                                </button>
                            </motion.div>
                        )}
                    </motion.li>
                ))}
            </ul>

            {/* Modal de Edição de Serviço */}
            {isEditModalOpen && selectedService && (
                <ServiceEditModal
                    service={selectedService}
                    onClose={handleCloseEditModal}
                    onSave={handleEditService}
                    isOpen={isEditModalOpen}
                />
            )}
        </div>
    );
}