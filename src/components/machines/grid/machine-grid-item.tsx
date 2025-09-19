"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { SquarePen, Trash2, Eye } from "lucide-react";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Machines } from "@/types/machines";

import ImgServerStatusConcluida from "@/assets/images/img-server-status-ok.svg";
import ImgServerStatusPendente from "@/assets/images/img-server-status-warning.svg";

interface MachineGridItemProps {
  machine: Machines;
  index: number;
}

export function MachineGridItem({ machine, index }: MachineGridItemProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const allServices = machine.applications.flatMap(app => app.services);
  const total = allServices.length;
  const installed = allServices.filter(s => s.status === "Concluida").length;
  const pending = allServices.filter(s => s.status !== "Concluida").length;
  const percent = total > 0 ? Math.round((installed / total) * 100) : 0;

  const eccoxApps = machine.applications.filter(app => app.tipo === "ECCOX");
  const ibmApps = machine.applications.filter(app => app.tipo === "IBM");
  const ibmWarnings = ibmApps.filter(app => app.status !== "Concluida").length;

  const borderColor =
    machine.status === "Concluida"
      ? "border-l-4 border-[#32D583]/50"
      : "border-l-4 border-[#F04438]/50 alert-pulse";

  const handleViewDetails = () => {
    setLoading(true);
    router.push(`/machines/${machine.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/machines/edit/${machine.id}`);
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/machines/${machine.id}`);
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
      className={`bg-[#1A1A1E] hover:bg-[#0F0F10] rounded-lg p-4 border ${borderColor} relative cursor-pointer`}
    >
      {/* Overlay de loading */}
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 rounded-lg">
          <div className="w-8 h-8 border-4 border-[#298BFE] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Ações no hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-2 right-2 flex flex-col gap-[2px] z-20"
        >
          <button
            onClick={handleEyeClick}
            className="p-1 transition-colors cursor-pointer"
            aria-label="Ver detalhes da máquina"
          >
            <Eye size={16} className="text-gray-600/80 hover:text-blue-400" />
          </button>
          <button
            onClick={handleEditClick}
            className="p-1 transition-colors cursor-pointer"
            aria-label="Editar máquina"
          >
            <SquarePen size={16} className="text-gray-600/80 hover:text-amber-500" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Deletar máquina");
            }}
            className="p-1 transition-colors cursor-pointer"
            aria-label="Deletar máquina"
          >
            <Trash2 size={16} className="text-gray-600/80 hover:text-red-300" />
          </button>
        </motion.div>
      )}

      {/* Conteúdo do card */}
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={
            machine.status === "Concluida"
              ? ImgServerStatusConcluida
              : ImgServerStatusPendente
          }
          alt="Machine Icon"
          width={48}
          height={48}
        />
        <div>
          <h3 className="text-white font-medium">{machine.name}</h3>
          <span className="text-xs text-[#6C6C6C]">{machine.version || "v1.0"}</span>
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
          status={machine.status === "Concluida" ? "Concluida" : "Pendente"}
          size="md"
        />
      </div>
    </motion.div>
  );
}
