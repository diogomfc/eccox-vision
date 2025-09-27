"use client";

import { useEffect, useState } from "react";
import { ReportsTable } from "@/components/reports/reports-table";
import { toast } from "sonner";
import { Machines } from "@/types/machines";
import { DashboardStats } from "@/components/reports/dashboard-stats";

// ALTERADO: Adicionado 'applicationResponsible' à interface de dados do relatório
export interface ReportData {
  serviceId: string;
  machineName: string;
  machineResponsible: string;
  applicationName: string;
  applicationResponsible: string; // NOVO
  serviceName: string;
  applicationType: string;
  status: "Concluída" | "Pendente" | "Em andamento";
  itemObrigatorio: "Sim" | "Não";
  responsible: string;
  responsibleHomologacao: string;
  updatedAt: string | null; // ALTERADO: Permitir null
  comments: string;
}

interface PageStats {
  totalMachines: number;
  totalApplications: number;
  completedServices: number;
  pendingServices: number;
  inProgressServices: number;
  totalServices: number;
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [stats, setStats] = useState<PageStats>({
    totalMachines: 0,
    totalApplications: 0,
    completedServices: 0,
    pendingServices: 0,
    inProgressServices: 0,
    totalServices: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      const machines: Machines[] = await window.electronAPI.getAllMachines();

      const processedData: ReportData[] = [];
      let totalApplications = 0;

      machines.forEach((machine) => {
        if (machine.applications && machine.applications.length > 0) {
          totalApplications += machine.applications.length;
          
          machine.applications.forEach((application) => {
            if (application.services && application.services.length > 0) {
              application.services.forEach((service) => {
                // CORRIGIDO: Não usar data atual como fallback, manter null quando não há data
                processedData.push({
                  serviceId: service.id,
                  machineName: machine.name || "N/A",
                  machineResponsible: machine.machineResponsible || "N/A",
                  applicationName: application.name || "N/A",
                  applicationResponsible: application.applicationResponsible || "N/A",
                  serviceName: service.name || "N/A",
                  applicationType: application.tipo || "N/A",
                  status: service.status || "Pendente",
                  itemObrigatorio: service.itemObrigatorio || "Não",
                  responsible: service.responsible || "N/A",
                  responsibleHomologacao: service.responsibleHomologacao || "N/A",
                  updatedAt: service.updatedAt || null, 
                  comments: service.comments || "",
                });
              });
            }
          });
        }
      });

      setReportData(processedData);

      const completedCount = processedData.filter(item => item.status === "Concluída").length;
      const pendingCount = processedData.filter(item => item.status === "Pendente").length;
      const inProgressCount = processedData.filter(item => item.status === "Em andamento").length;

      setStats({
        totalMachines: machines.length,
        totalApplications,
        completedServices: completedCount,
        pendingServices: pendingCount,
        inProgressServices: inProgressCount,
        totalServices: processedData.length,
      });

    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar dados dos relatórios");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#111113]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#111113] text-gray-100 flex flex-col">
      {/* Header com Stats */}
      <div className="flex-none px-6 border-gray-800">
        <DashboardStats {...stats} />
      </div>

      {/* Tabela */}
      <div className="flex-1 overflow-hidden p-6 pb-30">
        <ReportsTable initialData={reportData} />
      </div>
    </div>
  );
}