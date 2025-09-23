// src/components/machines/shared/machine-review-step.tsx
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Check } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import type { Machines, Application } from "@/types/machines";

import ImgServerNew from "@/assets/images/img-server-status.svg";
import ImgServerPendente from "@/assets/images/img-server-status-warning.svg";
import ImgServerConcluida from "@/assets/images/img-server-status-ok.svg";

export type modeType = 'create' | 'edit';

interface MachineReviewStepProps {
  machine: Partial<Machines>;
  applications: Application[];
  mode: modeType;
}

export default function MachineReviewStep({
  machine,
  applications,
  mode = "create"
}: MachineReviewStepProps) {
  const isEditMode = mode === "edit";
  
  // Configuração de cores baseada no modo
  const themeConfig = {
    accentColor: isEditMode ? "text-amber-400" : "text-blue-400",
    accentColorSecondary: isEditMode ? "text-amber-300/80" : "text-blue-300/80",
    bgAccent: isEditMode ? "bg-amber-600/10" : "bg-blue-600/10",
    borderAccent: isEditMode ? "border-amber-600/20" : "border-blue-600/20",
    dotAccent: isEditMode ? "bg-amber-600" : "bg-blue-600",
    progressColor: isEditMode ? "text-amber-500" : "text-blue-500",
    progressBg: isEditMode ? "text-amber-400" : "text-blue-400",
  };

  // Função para obter a cor do badge de status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Concluida': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Pendente': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Em andamento': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Função para obter a imagem do servidor baseada no status
  const getServerImage = () => {
    switch (machine.status) {
      case "Concluida": return ImgServerConcluida;
      case "Pendente": return ImgServerPendente;
      default: return ImgServerNew;
    }
  };

  // Cálculos estatísticos
  const totalServices = applications.reduce((acc, app) => acc + app.services.length, 0);
  const completedServices = applications.reduce((acc, app) => acc + app.services.filter(s => s.status === 'Concluida').length, 0);
  const pendingServices = applications.reduce((acc, app) => acc + app.services.filter(s => s.status === 'Pendente').length, 0);
  const progressPercentage = totalServices > 0 ? Math.round((completedServices / totalServices) * 100) : 0;

  return (
    <motion.div
      key="machine-review"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Card Principal da Máquina */}
      <div className={`bg-gradient-to-br from-[#1A1A1D] to-[#0F0F11] border ${isEditMode ? 'border-amber-500/30' : 'border-blue-500/30'} rounded-lg p-6`}>
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0">
            <Image
              src={getServerImage()}
              alt="Servidor"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">{machine.name}</h2>
              <Badge variant="outline" className={`${getStatusBadgeColor(machine.status || '')} text-sm`}>
                {machine.status}
              </Badge>
            </div>
            <p className="text-gray-400 mb-1">{machine.version}</p>
            <p className="text-gray-300 text-sm">{machine.description}</p>
          </div>

          {/* Estatísticas Circulares */}
          <div className="flex-shrink-0 flex items-center gap-6">
            {/* Progresso das Aplicações */}
            <div className="relative flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-700"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${(progressPercentage / 100) * 87.92} 87.92`}
                  className={themeConfig.progressColor}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${themeConfig.progressBg}`}>
                  {progressPercentage}%
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-400">
                  {isEditMode ? "Atualizados" : "Instalados"}
                </span>
                <span className="text-sm font-bold text-green-400">
                  {completedServices}/{totalServices}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400">Pendentes</span>
                <span className="text-sm font-bold text-red-400">
                  {pendingServices}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Total</span>
                <span className="text-sm font-bold text-gray-300">
                  {totalServices}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Data de {isEditMode ? "Atualização" : "Criação"}
            </p>
            <p className="text-gray-200 font-medium">
              {machine.updatedAt
                ? format(new Date(machine.updatedAt), "dd/MM/yyyy", { locale: ptBR })
                : "Não definida"
              }
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Aplicações</p>
            <p className="text-gray-200 font-medium text-xl">{applications.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Serviços</p>
            <p className="text-gray-200 font-medium text-xl">{totalServices}</p>
          </div>
        </div>
      </div>

      {/* Seção de Aplicações */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-100">
            Aplicações ({applications.length})
          </h3>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-8 bg-[#0F0F11] rounded-lg border border-[#1F1F23]">
            <Layers size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">Nenhuma aplicação configurada</p>
            <p className="text-sm text-gray-500 mt-1">
              {isEditMode 
                ? "Volte ao passo anterior para modificar aplicações"
                : "Volte ao passo anterior para adicionar aplicações"
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <Card key={app.id} className="bg-[#1A1A1D] border-[#2A2A2D] overflow-hidden pt-0 pb-0">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    {/* Lado esquerdo - Informações da aplicação */}
                    <div className="flex-1 p-4">
                      <div className="flex flex-col gap-2 mb-4">
                        <p className="text-xs text-gray-500 font-medium">Aplicação:</p>
                        <div className="flex items-center gap-2">
                           <div className="flex items-center">
                            <Layers size={16} className="text-gray-400" />
                            <span className="ml-1 text-sm font-medium text-gray-200">
                              <h4 className="font-semibold text-gray-100 text-lg">{app.name}</h4>
                            </span>
                          </div>
                          <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                          <p className="text-gray-400 text-sm">{app.tipo}</p>
                          <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                          <Badge variant="outline" className={getStatusBadgeColor(app.status)}>
                            {app.status}
                          </Badge>
                          <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                          <span className="text-sm text-gray-400">
                              {app.services.length} serviços
                            </span>
                        </div>
                      </div>

                      {/* Tags dos serviços */}
                      {app.services.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 font-medium">Serviços configurados:</p>
                          <div className="flex flex-wrap gap-1">
                            {app.services.slice(0, 10).map((service) => (
                              <span
                                key={service.id}
                                className={`text-xs px-2 py-1 rounded-full border ${
                                  service.status === 'Concluida'
                                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                    : service.status === 'Em andamento'
                                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                                }`}
                              >
                                {service.name}
                              </span>
                            ))}
                            {app.services.length > 10 && (
                              <span className="text-xs bg-gray-600/20 text-gray-400 border border-gray-600/30 px-2 py-1 rounded-full">
                                +{app.services.length - 10} mais
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Lado direito - Estatísticas */}
                    <div className="flex-shrink-0 p-4 bg-[#0F0F11] border-l border-[#2A2A2D] min-w-[120px]">
                      <div className="text-center space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Concluídos</p>
                          <p className="text-lg font-bold text-green-400">
                            {app.services.filter(s => s.status === 'Concluida').length}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Pendentes</p>
                          <p className="text-lg font-bold text-red-400">
                            {app.services.filter(s => s.status === 'Pendente').length}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-gray-700/50">
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="text-sm font-bold text-gray-300">
                            {app.services.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Resumo Final */}
      <div className={`${themeConfig.bgAccent} border ${themeConfig.borderAccent} rounded-lg p-4`}>
        <div className="flex items-start gap-3">
          <div className={`p-1 ${themeConfig.dotAccent} rounded-full mt-0.5`}>
            <Check className="w-3 h-3 text-white" />
          </div>
          <div>
            <h4 className={`text-sm font-medium ${themeConfig.accentColor} mb-1`}>
              {isEditMode ? "Pronto para atualizar!" : "Pronto para criar!"}
            </h4>
            <p className={`text-xs ${themeConfig.accentColorSecondary}`}>
              {isEditMode 
                ? "Todas as alterações foram configuradas. Clique em \"Atualizar Máquina\" para salvar as mudanças."
                : "Todos os dados foram configurados. Clique em \"Criar Máquina\" para finalizar o processo."
              }
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}