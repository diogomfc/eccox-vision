// src/components/machines/machine-grid.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import ImgServerStatusOK from "../../assets/images/img-server-status-ok.svg";
import ImgServerStatusWarning from "../../assets/images/img-server-status-warning.svg";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Machines } from "@/types/machines";
import { motion } from "framer-motion"; // Adicionado framer-motion para animações

// Import icons for the new actions
import { SquarePen, Eye, Trash2 } from "lucide-react";
import { MachineEditModal } from "./machine-edit-modal"; // Importa o modal de edição

interface MachineGridProps {
    machines: Machines[];
}

export function MachineGrid({ machines }: MachineGridProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [hoveredMachineId, setHoveredMachineId] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState<Machines | null>(null);

    const handleMachineUpdated = () => {
      setIsEditModalOpen(false);
      setSelectedMachine(null);
      // Aqui você precisará de uma forma de recarregar a lista de máquinas na página principal
      // para que as alterações sejam refletidas. Isso pode envolver um `router.refresh()`
      // ou uma chamada de API para buscar os dados novamente.
    };

    const handleViewDetails = (id: string) => {
        setLoadingId(id);
        router.push(`/maquinas/${id}`);
    };

    const handleEditClick = (machine: Machines) => {
      setSelectedMachine(machine);
      setIsEditModalOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-min pb-4">
                {machines.map((machine) => {
                    const allServices = machine.applications.flatMap(app => app.services);
                    const total = allServices.length;
                    const installed = allServices.filter(s => s.status === "Concluida").length;
                    const pending = allServices.filter(s => s.status !== "Concluida").length;
                    const percent = total > 0 ? Math.round((installed / total) * 100) : 0;

                    const eccoxApps = machine.applications.filter(app => app.tipo === 'ECCOX');
                    const ibmApps = machine.applications.filter(app => app.tipo === 'IBM');
                    const ibmWarnings = ibmApps.filter(app => app.status !== 'Concluida').length;

                    const borderColor =
                        machine.status === "Concluida"
                            ? "border-l-4 border-[#32D583]/50"
                            : "border-l-4 border-[#F04438]/50 alert-pulse";

                    return (
                        <div
                            key={machine.id}
                            className={`bg-[#1A1A1E] hover:bg-[#0F0F10] rounded-lg p-4 border ${borderColor} relative`}
                            onMouseEnter={() => setHoveredMachineId(machine.id)}
                            onMouseLeave={() => setHoveredMachineId(null)}
                        >
                            {/* Loading overlay */}
                            {loadingId === machine.id && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 rounded-lg">
                                    <div className="w-8 h-8 border-4 border-[#298BFE] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {/* Ícones de Ação (visíveis apenas no hover) */}
                            {hoveredMachineId === machine.id && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-2 right-2 flex gap-1 z-20"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditClick(machine);
                                        }}
                                        className="p-1 rounded-full hover:bg-[#2A2A2E] transition-colors cursor-pointer"
                                        aria-label="Editar máquina"
                                    >
                                        <SquarePen size={16} className="text-gray-400 hover:text-white" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleViewDetails(machine.id);
                                        }}
                                        className="p-1 rounded-full hover:bg-[#2A2A2E] transition-colors cursor-pointer"
                                        aria-label="Ver detalhes da máquina"
                                    >
                                        <Eye size={16} className="text-gray-400 hover:text-white" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            alert('Deletar máquina');
                                        }}
                                        className="p-1 rounded-full hover:bg-[#2A2A2E] transition-colors cursor-pointer"
                                        aria-label="Deletar máquina"
                                    >
                                        <Trash2 size={16} className="text-red-400 hover:text-red-300" />
                                    </button>
                                </motion.div>
                            )}

                            {/* Conteúdo do card */}
                            <div className="flex items-center gap-3 mb-4">
                                <Image
                                    src={
                                        machine.status === "Concluida"
                                            ? ImgServerStatusOK
                                            : ImgServerStatusWarning
                                    }
                                    alt="Machine Icon"
                                    width={48}
                                    height={48}
                                />
                                <div>
                                    <h3 className="text-white font-medium">{machine.name}</h3>
                                    <span className="text-xs text-[#6C6C6C]">
                                        {machine.version || "v1.0"}
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-[#6C6C6C] mb-4">
                                {machine.description || "Sem descrição"}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {eccoxApps.map((app) => (
                                    <span
                                        key={`${machine.id}-${app.name}`}
                                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                                            app.status === "Pendente"
                                                ? "bg-[#2A0E0E] text-[#F04438]"
                                                : "bg-[#0E2A15] text-[#32D583]"
                                        }`}
                                    >
                                        {app.name}
                                    </span>
                                ))}
                                {ibmApps.length > 0 && (
                                    <span
                                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                                            ibmWarnings > 0
                                                ? "bg-[#165BAA]/20 text-[#165BAA]"
                                                : "bg-[#252728] text-[#6C6C6C]"
                                        }`}
                                    >
                                        +{ibmApps.length} IBM
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="flex flex-col text-xs gap-0.5 w-32">
                                    <div className="flex justify-between">
                                        <span className="text-[#6C6C6C]">Apps instaladas</span>
                                        <span className="text-[#32D583]">
                                        {installed}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#6C6C6C]">Apps pendentes</span>
                                        <span className="text-[#F04438]">{pending}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#6C6C6C]">Total de apps</span>
                                        <span className="text-white">{total}</span>
                                    </div>
                                </div>
                                <ProgressCircle
                                    percentage={percent}
                                    status={machine.status === "Concluida" ? "Concluida" : "Pendente"}
                                    size="md"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            {isEditModalOpen && selectedMachine && (
                <MachineEditModal
                    machine={selectedMachine}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdated={handleMachineUpdated}
                />
            )}
        </>
    );
}
