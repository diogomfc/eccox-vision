// src/components/machines/service-list.tsx
"use client";

import React, { useState } from "react";
import type { Service, ServiceStatus } from "@/types/machines";
import { CheckCircle, Clock, LayoutList, MinusCircle, SquarePen, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

// Importe o novo modal (vamos criar este em seguida)
import { ServiceEditModal } from "./service-edit-modal";

interface ServiceListProps {
    services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<ServiceStatus | "">("");
    const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const filteredServices = services.filter((service) => {
        const matchesName = service.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "" || service.status === statusFilter;
        return matchesName && matchesStatus;
    });

    const getStatusIcon = (status: ServiceStatus) => {
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

    const handleServiceUpdated = () => {
        setIsEditModalOpen(false);
        setSelectedService(null);
        // Lógica para recarregar a lista de serviços
        // Isso pode ser feito chamando uma função passada via props, se necessário.
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
                    />
                    <select
                        aria-label="Filtrar por status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as "" | ServiceStatus)}
                        className="bg-[#23232B] text-white text-xs px-2 py-1 rounded outline-none border border-[#23232B] focus:border-gray-600 transition"
                    >
                        <option value="">Todos</option>
                        <option value="Concluida">Concluídos</option>
                        <option value="Pendente">Pendentes</option>
                        <option value="Em andamento">Em andamento</option>
                    </select>
                </div>
            </div>
            <ul className="space-y-2 max-h-[calc(100vh-190px)] overflow-y-auto pr-1 custom-scrollbar mb-4">
                {filteredServices.map((service, index) => (
                    <motion.li
                        key={index}
                        className="flex items-center gap-3 p-2 rounded hover:bg-[#23232B] transition mb-2 cursor-pointer relative"
                        onMouseEnter={() => setHoveredServiceId(service.id || null)}
                        onMouseLeave={() => setHoveredServiceId(null)}
                    >
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
                                            Data entrega: {service.updatedAt || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </HoverCardTrigger>
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
                                        Última Atualização: <span className="font-semibold text-white">{service.updatedAt || 'N/A'}</span>
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

                        {hoveredServiceId === service.id && (
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
                                        setSelectedService(service);
                                        setIsEditModalOpen(true);
                                    }}
                                    className="transition-colors cursor-pointer"
                                    aria-label="Editar serviço"
                                >
                                    <SquarePen size={16} className="text-gray-600/80 hover:text-amber-500" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        alert('Deletar serviço');
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
            {isEditModalOpen && selectedService && (
                <ServiceEditModal
                    service={selectedService}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdated={handleServiceUpdated}
                />
            )}
        </div>
    );
}