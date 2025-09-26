"use client";

import { Layers, Server, Clock, CheckCircle, RefreshCw } from "lucide-react";
import { StatBadge } from "./stat-card";

interface DashboardStatsProps {
  totalMachines: number;
  totalApplications: number;
  completedServices: number;
  pendingServices: number;
  inProgressServices: number;
  totalServices: number;
}

export const DashboardStats = ({
  totalMachines,
  totalApplications,
  completedServices,
  pendingServices,
  inProgressServices,
  totalServices
}: DashboardStatsProps) => {
  const completionRate = totalServices > 0 ? Math.round((completedServices / totalServices) * 100) : 0;

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Relatório de Serviços</h1>
        <p className="text-sm text-gray-400">Gerencie e monitore todos os serviços do sistema</p>
      </div>
      
      {/* Stats como badges na direita */}
      <div className="flex items-center gap-3">
        <StatBadge
          title="Máquinas"
          value={totalMachines}
          icon={<Server className="h-4 w-4" />}
          color="gray"
        />
        <StatBadge
          title="Aplicações"
          value={totalApplications}
          icon={<Layers className="h-4 w-4" />}
          color="blue"
        />
        <StatBadge
          title="Concluídos"
          value={completedServices}
          icon={<CheckCircle className="h-4 w-4" />}
          color="green"
          description={`${completionRate}%`}
        />
        <StatBadge
          title="Pendentes"
          value={pendingServices}
          icon={<Clock className="h-4 w-4" />}
          color="red"
        />
        {inProgressServices > 0 && (
          <StatBadge
            title="Em Andamento"
            value={inProgressServices}
            icon={<RefreshCw className="h-4 w-4" />}
            color="amber"
          />
        )}
      </div>
    </div>
  );
};