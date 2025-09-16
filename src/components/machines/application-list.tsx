// src/components/machines/application-list.tsx

"use client";

import React, { useState } from "react";
import { Layers } from "lucide-react";
import type { Application as AppType } from "@/types/machines";

interface ApplicationListProps {
    applications: (AppType & {
        subItems?: number;
        percent?: number;
        totalServices?: number;
        instalados?: number;
    })[];
    onSelectApp?: (name: string) => void;
    selectedApp?: string;
}

export function ApplicationList({ applications, onSelectApp, selectedApp }: ApplicationListProps) {
    // Estado de busca e filtro local
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");

    const filteredApplications = applications.filter((app) => {
        const matchesName = app.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "" || app.status === statusFilter;
        return matchesName && matchesStatus;
    });

    return (
        //bg-[#18181B] rounded-lg p-4 h-full flex flex-col
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
                        className={`mb-2 cursor-pointer rounded p-2 hover:bg-[#23232B] transition ${selectedApp === app.name ? "bg-[#23232B]" : ""}`}
                        onClick={() => onSelectApp && onSelectApp(app.name)}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-normal text-xs truncate max-w-[500px]">
                                {app.name}
                            </span>
                            <span className="text-xs text-gray-400">
                                {app.instalados ?? 0}/{app.subItems ?? 0} serviços
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-[#23232B] rounded-full overflow-hidden">
                                <div
                                    className="h-2 bg-[#298BFE]/50 rounded-full transition-all duration-500"
                                    style={{ width: `${app.percent ?? 100}%` }}
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}