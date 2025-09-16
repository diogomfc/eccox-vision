// src/components/machines/service-list.tsx

"use client";

import React, { useState } from "react";
import type { Service, ServiceStatus } from "@/types/machines";
import { CheckCircle, Clock, LayoutList, MinusCircle } from "lucide-react";


import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ServiceListProps {
    services: Service[]; // Removido o campo opcional 'date'
}

export function ServiceList({ services }: ServiceListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<ServiceStatus | "">("");

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
                    // Cada item da lista é agora um HoverCard
                    <HoverCard key={index}>
                        <HoverCardTrigger asChild>
                            <li
                                className="flex items-center gap-3 p-2 rounded hover:bg-[#23232B] transition mb-2 cursor-pointer"
                            >
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
                            </li>
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
                ))}
            </ul>
        </div>
    );
}