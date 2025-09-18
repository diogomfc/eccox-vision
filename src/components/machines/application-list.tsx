// src/components/machines/application-list.tsx
"use client";

import React, { useState } from "react";
import { Layers, SquarePen, Trash2 } from "lucide-react";
import type { Application as AppType } from "@/types/machines";
import { motion } from "framer-motion";

import { ApplicationEditModal } from "./application-edit-modal";

interface ApplicationListProps {
    machine:{
        name: string;
        system: string;
        description: string;
    };
    applications: (AppType & {
        subItems?: number;
        percent?: number;
        totalServices?: number;
        instalados?: number;
    })[];
    onSelectApp?: (name: string) => void;
    selectedApp?: string;
}

export function ApplicationList({ machine, applications, onSelectApp, selectedApp }: ApplicationListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<AppType | null>(null);

    const filteredApplications = applications.filter((app) => {
        const matchesName = app.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "" || app.status === statusFilter;
        return matchesName && matchesStatus;
    });

    const handleApplicationUpdated = () => {
        setIsEditModalOpen(false);
        setSelectedApplication(null);
        // Lógica para recarregar a lista de aplicações no componente pai
        // Isso pode ser feito chamando uma função passada via props, se necessário.
    };
    
    return (
        <div className="">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-white text-lg font-bold flex items-center gap-2">
                        <Layers size={20} className="text-gray-400" />
                        Aplicações
                    </h2>
                    <span className="text-xs text-gray-400 font-normal">
                        total {filteredApplications.length}
                    </span>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar aplicação..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#23232B] text-white text-xs px-2 py-1 rounded w-full outline-none border border-[#23232B] focus:border-gray-600 transition"
                    />
                    <select
                        aria-label="Filtrar por status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
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
                {filteredApplications.map((app, index) => (
                    <li
                        key={index}
                        className={`mb-2 cursor-pointer rounded p-2 hover:bg-[#23232B] transition ${selectedApp === app.name ? "bg-[#23232B]" : ""} relative`}
                        onMouseEnter={() => setHoveredAppId(app.name)}
                        onMouseLeave={() => setHoveredAppId(null)}
                        onClick={() => onSelectApp && onSelectApp(app.name)}
                    >
                        <div className="flex justify-between items-center mb-1 pr-5">
                            <span className="text-white font-normal text-xs truncate max-w-[500px]">
                                {app.name}
                            </span>
                            <span className="text-xs text-gray-400">
                                {app.instalados ?? 0}/{app.subItems ?? 0} serviços
                            </span>
                        </div>
                        <div className="flex items-center gap-2 pr-0">
                            <div className="flex-1 h-2 bg-[#2f2f36] rounded-full overflow-hidden">
                                <div
                                    className="h-2 bg-[#298BFE]/50 rounded-full transition-all duration-500"
                                    style={{ width: `${app.percent ?? 100}%` }}
                                />
                            </div>
                        </div>
                        {hoveredAppId === app.name && (
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
                                        setSelectedApplication(app);
                                        setIsEditModalOpen(true);
                                    }}
                                    className="cursor-pointer"
                                    aria-label="Editar aplicação"
                                >
                                    <SquarePen size={16} className="text-gray-600/80 hover:text-amber-500" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        alert('Deletar aplicação');
                                    }}
                                    className="cursor-pointer"
                                    aria-label="Deletar aplicação"
                                >
                                    <Trash2 size={16} className="text-red-400/50 hover:text-red-300" />
                                </button>
                            </motion.div>
                        )}
                    </li>
                ))}
            </ul>

            {isEditModalOpen && selectedApplication && (
                <ApplicationEditModal
                    application={selectedApplication}
                    machine={
                     { name: machine.name, system: machine.system, description: machine.description}
                    }
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdated={handleApplicationUpdated}
                />
            )}
        </div>
    );
}