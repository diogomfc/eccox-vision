"use client";

import Image from "next/image";
import { useElectronHashRouter } from "@/lib/simple-hash-router";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { SquarePen, Trash2, Eye, User, CalendarCheck } from "lucide-react";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Machines } from "@/types/machines";

import ImgServerStatusConcluida from "@/assets/images/img-server-status-ok.svg";
import ImgServerStatusPendente from "@/assets/images/img-server-status-warning.svg";

interface MachineGridItemProps {
  machine: Machines;
  index: number;
  onDelete: () => void;
}

export function MachineGridItem({
  machine,
  index,
  onDelete,
}: MachineGridItemProps) {
  const router = useElectronHashRouter();
  const [isPending, startTransition] = useTransition();
  const [isHovered, setIsHovered] = useState(false);
  const [loadingAction, setLoadingAction] = useState<"view" | "edit" | null>(
    null
  );

  const allServices = machine.applications.flatMap((app) => app.services);
  const total = allServices.length;
  const installed = allServices.filter((s) => s.status === "Concluída").length;
  const pending = allServices.filter((s) => s.status !== "Concluída").length;
  const percent = total > 0 ? Math.round((installed / total) * 100) : 0;

  const eccoxApps = machine.applications.filter((app) => app.tipo === "ECCOX");
  const ibmApps = machine.applications.filter((app) => app.tipo === "MAINFRAME");
  const ibmWarnings = ibmApps.filter(
    (app) => app.status !== "Concluída"
  ).length;

  // Função para verificar e formatar data
  const getFormattedDate = (dateString: string) => {
    if (!dateString || dateString === null || dateString === undefined) {
      return null;
    }
    
    const date = new Date(dateString);
    
    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      return null;
    }
    
    return date;
  };
  
  const dateComplete = getFormattedDate(machine.updatedAt);



  const borderColor =
    machine.status === "Concluída"
      ? "border-l-4 border-[#32D583]/50"
      : "border-l-4 border-[#F04438]/50 alert-pulse";

  const isLoading = isPending || loadingAction !== null;

  const handleViewDetails = () => {
    setLoadingAction("view");
    startTransition(() => {
      router.push(`/machines/${machine.id}`);
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction("edit");
    startTransition(() => {
      router.push(`/machines/edit/${machine.id}`);
    });
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction("view");
    startTransition(() => {
      router.push(`/machines/${machine.id}`);
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <motion.div
      key={machine.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
      className={`bg-[#1A1A1E] hover:bg-[#0F0F10] rounded-lg p-4 border ${borderColor} relative cursor-pointer transition-colors duration-200`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center z-30 rounded-lg backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className={`border-t-transparent rounded-full animate-spin w-8 h-8 border-4 ${
                loadingAction === "edit"
                  ? "border-[#feb329]"
                  : "border-[#298BFE]"
              }`}
            ></div>
            <span className="text-xs text-white/80">
              {loadingAction === "edit"
                ? "Abrindo editor..."
                : "Carregando detalhes..."}
            </span>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      {isHovered && !isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-10 right-2 flex flex-col z-20 p-1 shadow-lg"
        >
          <button
            onClick={handleEyeClick}
            className="p-2 transition-colors cursor-pointer"
            aria-label="Ver detalhes da máquina"
            disabled={isLoading}
          >
            <Eye
              size={16}
              className="text-gray-400/50 hover:text-blue-400 transition-colors"
            />
          </button>

          <button
            onClick={handleEditClick}
            className="p-2 transition-colors cursor-pointer"
            aria-label="Editar máquina"
            disabled={isLoading}
          >
            <SquarePen
              size={16}
              className="text-gray-400/50 hover:text-amber-500 transition-colors"
            />
          </button>

          <button
            onClick={handleDeleteClick}
            className="p-2 transition-colors cursor-pointer"
            aria-label="Deletar máquina"
            disabled={isLoading}
          >
            <Trash2
              size={16}
              className="text-gray-400/50 hover:text-red-400 transition-colors"
            />
          </button>
        </motion.div>
      )}

      {/* Conteúdo do card */}
      <div className="flex start justify-between items-start">
       <div className="flex items-center gap-3 mb-4">
           <Image
          src={
            machine.status === "Concluída"
              ? ImgServerStatusConcluida
              : ImgServerStatusPendente
          }
          alt="Machine Icon"
          width={48}
          height={48}
        />
        <div>
          <h3 className="text-white font-medium">{machine.name}</h3>
          <span className="text-xs text-[#6C6C6C]">
            {machine.version || "versão não definida"}
          </span>
        </div>
       
       </div>


          <div className="flex gap-1 items-center pt-0.5">
            <CalendarCheck size={12} className="text-gray-500" />
            <span className="text-gray-300">
              {dateComplete === null ? "Sem previsão" : dateComplete.toLocaleDateString('pt-BR')}
            </span>
          </div>
         
    
      </div>

      <p className="text-sm text-[#6C6C6C] mb-4 line-clamp-2">
        {machine.description || "Sem descrição"}
      </p>

      {/* ====================================================== */}
      {/* INÍCIO DO NOVO CAMPO ADICIONADO                      */}
      {/* ====================================================== */}
      {machine.machineResponsible && (
        <div className="flex items-center gap-2 mb-4">
          <User size={14} className="text-gray-500" />
          <p className="text-xs font-medium text-gray-400">
            {machine.machineResponsible}
          </p>
        </div>
      )}
      {/* ====================================================== */}
      {/* FIM DO NOVO CAMPO ADICIONADO                         */}
      {/* ====================================================== */}

      {/* Badges */}
      <div className="flex flex-wrap gap-1 mb-4 min-h-[20px]">
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
            +{ibmApps.length} MAINFRAME
          </span>
        )}
      </div>

      {/* Stats and Progress */}
      <div className="flex justify-between items-end">
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
        <ProgressCircle
          percentage={percent}
          status={machine.status === "Concluída" ? "Concluída" : "Pendente"}
          size="md"
        />
      </div>
    </motion.div>
  );
}
