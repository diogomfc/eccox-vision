"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ReportsTable } from "@/components/reports/reports-table";
import { toast } from "sonner";
import { Machines } from "@/types/machines";
import { DashboardStats } from "@/components/reports/dashboard-stats";
import { ElectronDebug } from "@/lib/electron-debug";
import BgOverview from '@/assets/images/bg-overview.svg';

// ALTERADO: Adicionado 'applicationResponsible' à interface de dados do relatório
export interface ReportData {
  serviceId: string;
  machineName: string;
  machineId: string;
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
      ElectronDebug.log('Carregando dados de relatórios...');
      
      // Verificar se Electron API está disponível
      if (!window.electronAPI || !window.electronAPI.getAllMachines) {
        throw new Error('Electron API não disponível');
      }
      
      const machines: Machines[] = await window.electronAPI.getAllMachines();
      ElectronDebug.log('Máquinas carregadas:', machines.length);
      ElectronDebug.log('Primeira máquina:', machines[0]);

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
                  machineId: machine.id,
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
      ElectronDebug.log('Dados processados para relatório:', processedData.length);

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
      ElectronDebug.error("Erro ao carregar dados de relatórios:", error);
      toast.error("Erro ao carregar dados dos relatórios");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);



  return (
    <main className="relative h-screen text-gray-100 flex flex-col py-16 px-6 overflow-hidden">
      <Image
        src={BgOverview}
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="relative z-10 flex flex-col h-full">
        {/* Header com Stats */}
      <div className="flex-none pt-2 border-gray-800">
        <DashboardStats {...stats} />
      </div>

        {/* Tabela */}
        <div className="flex-1 overflow-hidden">
          <ReportsTable initialData={reportData} />
        </div>
      </div>
    </main>
  );
}