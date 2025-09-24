// src/components/machines/application-list.tsx
"use client";

import React, { useState, useCallback } from "react";
import { Layers, SquarePen, Trash2, Plus, Loader2 } from "lucide-react";
import type { Application as AppType } from "@/types/machines";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ApplicationEditModal from "../modals/application-edit-modal";

interface ApplicationListProps {
    machine: {
        id: string;
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
    onApplicationsUpdated?: (applications: AppType[]) => void;
}

export function ApplicationList({
    machine,
    applications,
    onSelectApp,
    selectedApp,
    onApplicationsUpdated
}: ApplicationListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<AppType | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const filteredApplications = applications.filter((app) => {
        const matchesName = app.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "" || app.status === statusFilter;
        return matchesName && matchesStatus;
    });

   const handleCreateApplication = useCallback(async (newApplication: AppType) => {
        setIsLoading(true);
        setMessage(null);

        try {
            // O ID é gerado na modal, mas vamos garantir o machine_id aqui
            const applicationToCreate = {
                ...newApplication,
                machine_id: machine.id,
            };

            console.log("Criando nova aplicação:", applicationToCreate);

            // Chama a API do Electron para criar a aplicação e todos os seus serviços de uma só vez
            const result = await window.electronAPI.syncApplication(applicationToCreate);

            if (result.success) {
                setMessage("Aplicação criada com sucesso!");
                // O componente pai (machine-details-client) deve recarregar os dados
                onApplicationsUpdated?.(applications);
                setIsCreateModalOpen(false);
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage(`Erro ao criar aplicação: ${result.message}`);
            }
        } catch (error) {
            console.error("Erro ao criar aplicação:", error);
            setMessage("Erro ao criar aplicação. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }, [machine.id, applications, onApplicationsUpdated]);


    const handleUpdateApplication = useCallback(async (updatedApplication: AppType) => {
        setIsLoading(true);
        setMessage(null);

        try {
            console.log("Atualizando aplicação:", updatedApplication);

            const result = await window.electronAPI.syncApplication(updatedApplication);

            if (result.success) {
                setMessage("Aplicação atualizada com sucesso!");
                const updatedApplications = applications.map(app =>
                    app.id === updatedApplication.id ? updatedApplication : app
                );
                onApplicationsUpdated?.(updatedApplications);
                setIsEditModalOpen(false);
                setSelectedApplication(null);
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage(`Erro ao atualizar aplicação: ${result.message}`);
            }
        } catch (error) {
            console.error("Erro ao atualizar aplicação:", error);
            setMessage("Erro ao atualizar aplicação. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }, [applications, onApplicationsUpdated]);

    const handleDeleteApplication = useCallback(async (applicationId: string) => {
        if (!confirm("Tem certeza que deseja excluir esta aplicação?")) return;

        setIsLoading(true);
        setMessage(null);

        try {
            console.log("Deletando aplicação:", applicationId);

            const result = await window.electronAPI.deleteApplication(applicationId);

            if (result.success) {
                setMessage("Aplicação excluída com sucesso!");
                const updatedApplications = applications.filter(app => app.id !== applicationId);
                onApplicationsUpdated?.(updatedApplications);
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage(`Erro ao excluir aplicação: ${result.message}`);
            }
        } catch (error) {
            console.error("Erro ao excluir aplicação:", error);
            setMessage("Erro ao excluir aplicação. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }, [applications, onApplicationsUpdated]);

    const handleEditClick = (app: AppType) => {
        setSelectedApplication(app);
        setIsEditModalOpen(true);
    };

    const handleCreateClick = () => {
        setSelectedApplication(null);
        setIsCreateModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsEditModalOpen(false);
        setIsCreateModalOpen(false);
        setSelectedApplication(null);
    };

    return (
        <div className="">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-white text-lg font-bold flex items-center gap-2">
                        <Layers size={20} className="text-gray-400" />
                        Aplicações
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-normal">
                            total {filteredApplications.length}
                        </span>
                        <Button
                            onClick={handleCreateClick}
                            size="sm"
                            className="bg-blue-600/50 hover:bg-blue-700 text-xs h-7 px-2 cursor-pointer z-10"
                            disabled={isLoading}
                        >
                            <Plus size={12} className="mr-1" />
                            Nova
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar aplicação..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#23232B] text-white text-xs px-2 py-1 rounded w-full outline-none border border-[#23232B] focus:border-gray-600 transition"
                        disabled={isLoading}
                    />
                    <select
                        aria-label="Filtrar por status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#23232B] text-white text-xs px-2 py-1 rounded outline-none border border-[#23232B] focus:border-gray-600 transition"
                        disabled={isLoading}
                    >
                        <option value="">Todos</option>
                        <option value="Concluída">Concluídos</option>
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

            <ul className="space-y-2 max-h-[calc(100vh-190px)] overflow-y-auto pr-1 custom-scrollbar mb-4">
                {isLoading && (
                    <li className="text-center py-4 text-gray-400 text-xs flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin w-4 h-4" /> Processando...
                    </li>
                )}
                {filteredApplications.map((app, index) => (
                    <li
                        key={index}
                        className={`mb-2 cursor-pointer rounded p-2 hover:bg-[#23232B] transition ${
                            selectedApp === app.name ? "bg-[#23232B]" : ""
                        } relative ${isLoading ? "opacity-50" : ""}`}
                        onMouseEnter={() => !isLoading && setHoveredAppId(app.name)}
                        onMouseLeave={() => setHoveredAppId(null)}
                        onClick={() => !isLoading && onSelectApp && onSelectApp(app.name)}
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
                        {hoveredAppId === app.name && !isLoading && (
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
                                        handleEditClick(app);
                                    }}
                                    className="cursor-pointer"
                                    aria-label="Editar aplicação"
                                >
                                    <SquarePen size={16} className="text-gray-600/80 hover:text-amber-500" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteApplication(app.id);
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
                    machineId={machine.id}
                    application={selectedApplication}
                    isEditMode={isEditModalOpen}
                    onSave={handleUpdateApplication}
                    onClose={handleCloseModals}
                    isOpen={isEditModalOpen}
                    isLoading={isLoading}
                />
            )}

            {isCreateModalOpen && (
                <ApplicationEditModal
                    machineId={machine.id}
                    application={{
                        id: `app-${Date.now()}`,
                        machine_id: machine.id,
                        name: '',
                        tipo: 'IBM',
                        status: 'Pendente',
                        services: [],
                    }}
                    isEditMode={false}
                    onSave={handleCreateApplication}
                    onClose={handleCloseModals}
                    isOpen={isCreateModalOpen}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}