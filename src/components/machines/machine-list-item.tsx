// src/components/machines/machine-list-item.tsx

"use client";

import Image from "next/image";
import { Machines } from "@/types/machines";
import { motion } from "framer-motion"; // Changed from "motion/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProgressCircle } from "@/components/ui/progress-circle";

// Import icons for the new actions
import { SquarePen, Eye, Trash2 } from "lucide-react";

// Import the new modal component
import { MachineEditModal } from "./machine-edit-modal";

// Import image assets
import ImgServerStatusConcluida from "@/assets/images/img-server-status-ok.svg";
import ImgServerStatusPendente from "@/assets/images/img-server-status-warning.svg";

interface MachineListItemProps {
    machine: Machines;
    index: number;
}

export function MachineListItem({ machine, index }: MachineListItemProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const allServices = machine.applications.flatMap(app => app.services);
    const total = allServices.length;
    const installed = allServices.filter(s => s.status === "Concluida").length;
    const pending = allServices.filter(s => s.status !== "Concluida").length;
    const percent = total > 0 ? Math.round((installed / total) * 100) : 0;

    const borderClasses = machine.status === "Concluida"
        ? "border-l-4 border-[#32D583]/50"
        : "border-l-4 border-[#F04438]/50 alert-pulse";

    const handleViewDetails = () => {
        setLoading(true);
        router.push(`/maquinas/${machine.id}`);
    };

    const handleMachineUpdated = () => {
      setIsEditModalOpen(false);
      // Você vai querer adicionar a lógica de recarregar a lista de máquinas aqui
      // para que a página seja atualizada com os novos dados.
    };

    return (
        <>
            <motion.div
                key={machine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`grid grid-cols-[260px_1fr_140px_70px] items-center bg-[#1A1A1E] hover:bg-[#0F0F10] rounded-lg px-4 py-3 border ${borderClasses}  transition-colors duration-200 relative`}
            >
                {loading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 rounded-lg">
                        <div className="w-8 h-8 border-4 border-[#298BFE] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Column 1 - Icon and info */}
                <div className="flex items-center gap-3">
                    <Image
                        src={machine.status === "Concluida" ? ImgServerStatusConcluida : ImgServerStatusPendente}
                        alt="Machine Icon"
                        width={38}
                        height={38}
                    />
                    <div className="flex flex-col">
                        <span className="text-xs text-[#6C6C6C]">{machine.version}</span>
                        <h3 className="text-white font-medium">{machine.name}</h3>
                        <p className="text-xs text-[#6C6C6C]">{machine.description}</p>
                    </div>
                </div>

                {/* Column 2 - Badges */}
                <div className="flex flex-wrap gap-1">
                    {machine.applications
                        .filter(app => app.tipo === "ECCOX")
                        .map((app) => (
                            <span
                                key={`${machine.id}-${app.name}`}
                                className={`px-2 py-0.5 text-xs font-medium rounded ${
                                    app.status === "Pendente" ? "bg-[#2A0E0E] text-[#F04438]" : "bg-[#0E2A15] text-[#32D583]"
                                }`}
                            >
                                {app.name}
                            </span>
                        ))}
                    {(() => {
                        const ibmApps = machine.applications.filter(app => app.tipo === "IBM");
                        if (ibmApps.length > 0) {
                            const ibmPendentes = ibmApps.filter(app => app.status === "Pendente").length;
                            return (
                                <span
                                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                                        ibmPendentes > 0 ? "bg-[#165BAA]/20 text-[#165BAA]" : "bg-[#252728] text-[#6C6C6C]"
                                    }`}
                                >
                                    +{ibmApps.length} IBM
                                </span>
                            );
                        }
                        return null;
                    })()}
                </div>

                {/* Column 3 - Stats */}
                <div className="flex flex-col text-xs gap-0.5 w-32">
                    <div className="flex justify-between">
                        <span className="text-[#6C6C6C]">Apps instaladas</span>
                        <span className="text-[#32D583]">{installed}</span>
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

                {/* Column 4 - Progress Circle & Actions */}
                <div className="flex items-center justify-end pr-4 relative">
                    <ProgressCircle
                        percentage={percent}
                        status={machine.status === "Concluida" ? "Concluida" : "Pendente"}
                        size="md"
                    />
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-1/2 -translate-y-1/2 right-[-10px] flex flex-col gap-[2px] z-20"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditModalOpen(true);
                                }}
                                className="p-1  transition-colors cursor-pointer"
                                aria-label="Editar máquina"
                            >
                                <SquarePen size={16} className="text-gray-600/80 hover:text-white" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewDetails();
                                }}
                                className="p-1  transition-colors cursor-pointer"
                                aria-label="Ver detalhes da máquina"
                            >
                                <Eye size={16} className="text-gray-600/80 hover:text-white" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert('Deletar máquina');
                                }}
                                className="p-1  transition-colors cursor-pointer"
                                aria-label="Deletar máquina"
                            >
                                <Trash2 size={16} className="text-red-400/50 hover:text-red-300" />
                            </button>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {isEditModalOpen && (
                <MachineEditModal
                    machine={machine}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdated={handleMachineUpdated}
                />
            )}
        </>
    );
}