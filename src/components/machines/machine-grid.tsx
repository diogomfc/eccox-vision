"use client";

import Image from "next/image";

import ImgServerStatusOK from "../../assets/images/img-server-status-ok.svg";
import ImgServerStatusWarning from "../../assets/images/img-server-status-warning.svg";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Machines } from "@/types/machines";

interface MachineGridProps {
  machines: Machines[];
}

export function MachineGrid({ machines }: MachineGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-min pb-4 cursor-pointer">
      {machines.map((machine) => {
        // Calcular totais dos serviços
        const allServices = machine.applications.flatMap(app => app.services);
        const total = allServices.length;
        const installed = allServices.filter(s => s.status === "Concluida").length;
        const pending = allServices.filter(s => s.status !== "Concluida").length;

        const percent = total > 0 ? Math.round((installed / total) * 100) : 0;

        // Definir cor da borda
        const borderColor =
          machine.status === "Concluida"
            ? "border-l-4 border-[#32D583]/50"
            : "border-l-4 border-[#F04438]/50 alert-pulse";

        // Separar aplicações por tipo
        const eccoxApps = machine.applications.filter(app => app.tipo === "ECCOX");
        const ibmApps = machine.applications.filter(app => app.tipo === "IBM");
        const ibmWarnings = ibmApps.filter(app => app.status === "Pendente").length;

        return (
          <div
            key={machine.id}
            className={`bg-[#1A1A1E] hover:bg-[#0F0F10] rounded-lg p-4 border ${borderColor}`}
          >
            {/* Cabeçalho do Card */}
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

            {/* Descrição */}
            <p className="text-sm text-[#6C6C6C] mb-4">
              {machine.description || "Sem descrição"}
            </p>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-1 mb-4">
              {/* ECCOX Applications */}
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
              
              {/* IBM Applications Counter */}
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

            {/* Rodapé com Stats e Progresso */}
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
  );
}
