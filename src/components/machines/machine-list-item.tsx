"use client";

import Image from "next/image";
import { Machines } from "@/types/machines";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import ImgServerStatusConcluida from "../../assets/images/img-server-status-ok.svg";
import ImgServerStatusPendente from "../../assets/images/img-server-status-warning.svg";
import { ProgressCircle } from "@/components/ui/progress-circle";

interface MachineListItemProps {
  machine: Machines;
  index: number;
}

export function MachineListItem({ machine, index }: MachineListItemProps) {
  const router = useRouter();
  const allServices = machine.applications.flatMap(app => app.services);
  const total = allServices.length;
  const installed = allServices.filter(s => s.status === "Concluida").length;
  const pending = allServices.filter(s => s.status !== "Concluida").length;
  const percent = total > 0 ? Math.round((installed / total) * 100) : 0;

  const borderClasses = machine.status === "Concluida"
    ? "border-l-4 border-[#32D583]/50"
    : "border-l-4 border-[#F04438]/50 alert-pulse";

  return (
    <motion.div
      key={machine.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      onClick={() => router.push(`/maquinas/${machine.id}`)}
      className={`grid grid-cols-[260px_1fr_140px_70px] items-center bg-[#1A1A1E] hover:bg-[#0F0F10] rounded-lg px-4 py-3 border ${borderClasses} cursor-pointer transition-colors duration-200`}
    >
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

      {/* Column 4 - Progress Circle */}
      <div className="flex items-center justify-center">
        <ProgressCircle
          percentage={percent}
          status={machine.status === "Concluida" ? "Concluida" : "Pendente"}
          size="md"
        />
      </div>
    </motion.div>
  );
}