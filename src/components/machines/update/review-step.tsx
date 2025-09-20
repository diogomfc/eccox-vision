// src/components/machine-update/ReviewStep.tsx
"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, Layers } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import ImgServerNew from "@/assets/images/img-server-status.svg";
import ImgServerPendente from "@/assets/images/img-server-status-warning.svg";
import ImgServerConcluida from "@/assets/images/img-server-status-ok.svg";

import { Application, Machines } from "@/types/machines";

// Props do componente
interface ReviewStepProps {
  editingMachine: Machines;
  applications: Application[];
}

export default function ReviewStep({
  editingMachine,
  applications,
}: ReviewStepProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Concluida":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Pendente":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Em andamento":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Card Principal da Máquina */}
      <div className="bg-gradient-to-br from-[#1A1A1D] to-[#0F0F11] border border-amber-500/30 rounded-lg p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0">
            <Image
              src={editingMachine.status === "Concluida" ? ImgServerConcluida : editingMachine.status === "Pendente" ? ImgServerPendente : ImgServerNew}
              alt="Servidor"
              className="w-26 h-26 object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">
                {editingMachine.name}
              </h2>
              <Badge
                variant="outline"
                className={`${getStatusBadgeColor(
                  editingMachine.status || ""
                )} text-sm`}
              >
                {editingMachine.status}
              </Badge>
            </div>
            <p className="text-gray-400 mb-1">
              {editingMachine.version}
            </p>
            <p className="text-gray-300 text-sm">
              {editingMachine.description}
            </p>
          </div>

          {/* Estatísticas Circulares */}
          <div className="flex-shrink-0 flex items-center gap-6">
            {/* Progresso das Aplicações */}
            <div className="relative flex items-center justify-center">
              <svg
                className="w-20 h-20 transform -rotate-90"
                viewBox="0 0 32 32"
              >
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
                  strokeDasharray={`${
                    (applications.reduce(
                      (acc, app) =>
                        acc +
                        app.services.filter(
                          (s) => s.status === "Concluida"
                        ).length,
                      0
                    ) /
                      Math.max(
                        applications.reduce(
                          (acc, app) => acc + app.services.length,
                          0
                        ),
                        1
                      )) *
                    87.92
                  } 87.92`}
                  className="text-amber-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-400">
                  {applications.length > 0
                    ? Math.round(
                        (applications.reduce(
                          (acc, app) =>
                            acc +
                            app.services.filter(
                              (s) => s.status === "Concluida"
                            ).length,
                          0
                        ) /
                          Math.max(
                            applications.reduce(
                              (acc, app) => acc + app.services.length,
                              0
                            ),
                            1
                          )) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-400">
                  Instalados
                </span>
                <span className="text-sm font-bold text-green-400">
                  {applications.reduce(
                    (acc, app) =>
                      acc +
                      app.services.filter(
                        (s) => s.status === "Concluida"
                      ).length,
                    0
                  )}
                  /
                  {applications.reduce(
                    (acc, app) => acc + app.services.length,
                    0
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400">
                  Pendentes
                </span>
                <span className="text-sm font-bold text-red-400">
                  {applications.reduce(
                    (acc, app) =>
                      acc +
                      app.services.filter(
                        (s) => s.status === "Pendente"
                      ).length,
                    0
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  Total
                </span>
                <span className="text-sm font-bold text-gray-300">
                  {applications.reduce(
                    (acc, app) => acc + app.services.length,
                    0
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Data de Criação
            </p>
            <p className="text-gray-200 font-medium">
              {editingMachine.updatedAt
                ? format(new Date(editingMachine.updatedAt), "dd/MM/yyyy", {
                    locale: ptBR,
                  })
                : "Não definida"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Aplicações</p>
            <p className="text-gray-200 font-medium text-xl">
              {applications.length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Serviços</p>
            <p className="text-2xl font-bold text-gray-300">
              {applications.reduce(
                (acc, app) => acc + app.services.length,
                0
              )}
            </p>
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
            <p className="text-gray-400">
              Nenhuma aplicação configurada
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Volte ao passo anterior para adicionar aplicações
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <Card
                key={app.id}
                className="bg-[#1A1A1D] border-[#2A2A2D] overflow-hidden pt-0 pb-0"
              >
                <CardContent className="p-0">
                  <div className="flex items-center">
                    {/* Lado esquerdo - Informações da aplicação */}
                    <div className="flex-1 p-4">
                      <div className="flex flex-col gap-2 mb-4">
                        <p className="text-xs text-gray-500 font-medium">
                          Aplicação:
                        </p>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-100 text-lg">
                            {app.name}
                          </h4>
                          <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                          <p className="text-gray-400 text-sm ">
                            {app.tipo}
                          </p>
                          <div className="w-1 h-1 bg-gray-500 rounded-full translate-y-[1px]"></div>
                          <Badge variant="outline" className={getStatusBadgeColor(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Tags dos serviços */}
                      {app.services.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 font-medium">
                            Serviços configurados:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {app.services.slice(0, 10).map((service) => (
                              <span
                                key={service.id}
                                className={`text-xs px-2 py-1 rounded-full border ${
                                  service.status === "Concluida"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : service.status === "Em andamento"
                                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
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
                          <p className="text-xs text-gray-500">
                            Concluídos
                          </p>
                          <p className="text-lg font-bold text-green-400">
                            {app.services.filter((s) => s.status === "Concluida").length}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            Pendentes
                          </p>
                          <p className="text-lg font-bold text-red-400">
                            {app.services.filter((s) => s.status === "Pendente").length}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-gray-700/50">
                          <p className="text-xs text-gray-500">
                            Total
                          </p>
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
      <div className="bg-amber-600/10 border border-amber-600/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-amber-600 rounded-full mt-0.5">
            <Check className="w-3 h-3 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-400 mb-1">
              Pronto para atualizar!
            </h4>
            <p className="text-xs text-amber-300/80">
              Todos os dados foram configurados. Clique em "Atualizar Máquina" para finalizar o processo.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}