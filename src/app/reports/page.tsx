// src/app/reports/page.tsx
"use client";

import { useEffect, useState } from "react";

import { ReportsTable } from "@/components/reports/reports-table";
import { toast } from "sonner";
import { Machines } from "@/types/machines"; // Assumindo que o tipo existe aqui
import { DashboardStats } from "@/components/reports/dashboard-stats";

export interface ReportData {
  serviceId: string;
  machineName: string;
  applicationName: string;
  serviceName: string;
  applicationType: string;
  status: "Concluída" | "Pendente" | "Em andamento";
  itemObrigatorio: "Sim" | "Não";
  responsible: string;
  responsibleHomologacao: string;
  updatedAt: string;
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
      
      // Carregar todos os dados em uma única chamada
      const machines: Machines[] = await window.electronAPI.getAllMachines();

      // Processar dados para a tabela - percorrer máquinas -> aplicações -> serviços
      const processedData: ReportData[] = [];
      let totalApplications = 0;

      machines.forEach((machine) => {
        if (machine.applications && machine.applications.length > 0) {
          totalApplications += machine.applications.length;
          
          machine.applications.forEach((application) => {
            if (application.services && application.services.length > 0) {
              application.services.forEach((service) => {
                processedData.push({
                  serviceId: service.id,
                  machineName: machine.name || "N/A",
                  applicationName: application.name || "N/A",
                  serviceName: service.name || "N/A",
                  applicationType: application.tipo || "N/A",
                  status: service.status || "Pendente",
                  itemObrigatorio: service.itemObrigatorio || "Não",
                  responsible: service.responsible || "N/A",
                  responsibleHomologacao: service.responsibleHomologacao || "N/A",
                  updatedAt: service.updatedAt || new Date().toISOString(),
                  comments: service.comments || "",
                });
              });
            }
          });
        }
      });

      setReportData(processedData);

      // Calcular estatísticas de forma mais eficiente
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
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen text-gray-100 flex flex-col">
      {/* Header com Stats */}
      <div className="flex-none px-6 border-gray-800">
        <DashboardStats {...stats} />
      </div>

      {/* Tabela */}
      <div className="flex-1 overflow-hidden pb-30">
        <ReportsTable initialData={reportData} />
      </div>
    </div>
  );
}