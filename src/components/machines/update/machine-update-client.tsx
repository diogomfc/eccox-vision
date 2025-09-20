// src/components/machine-update/MachineUpdateClient.tsx
"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  X,
  Loader2,
  ArrowLeft,
  Settings,
  Layers,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Machines, Application, Service } from "@/types/machines";

// Importando os componentes de cada passo


import ImgServerNew from "@/assets/images/img-server-status.svg";
import ImgServerPendente from "@/assets/images/img-server-status-warning.svg";
import ImgServerConcluida from "@/assets/images/img-server-status-ok.svg";
import MachineInfoStep from "./machine-info-step";
import ApplicationsStep from "./applications-step";
import ReviewStep from "./review-step";

type StatusType = "Concluida" | "Pendente" | "Em andamento";

// Tipos adaptados para o contexto de edição
// interface EditableApplication {
//   id: string;
//   name: string;
//   tipo: string;
//   status: StatusType;
//   services: EditableService[];
// }

// interface EditableService {
//   id: string;
//   name: string;
//   status: StatusType;
//   itemObrigatorio: "Sim" | "Não";
//   updatedAt: string | null;
//   responsible: string;
//   comments: string;
//   typePendencia: string;
//   responsibleHomologacao: string;
// }

interface MachineUpdateClientProps {
  machineId: string;
}

export default function MachineUpdateClient({
  machineId,
}: MachineUpdateClientProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Machine data
  const [editingMachine, setEditingMachine] = useState<Machines>({} as Machines);

  // Applications data
  const [applications, setApplications] = useState<Application[]>([]);

  const steps = [
    { id: 1, title: "Informações da Máquina", icon: ImgServerNew },
    { id: 2, title: "Aplicações", icon: Layers },
    { id: 3, title: "Revisão & Edição", icon: Settings },
  ];

  const currentStep = useMemo(
    () => steps.find((s) => s.id === activeStep),
    [activeStep, steps]
  );

  // === LÓGICA DE CARREGAMENTO DOS DADOS DO BANCO DE DADOS ===
  useEffect(() => {
    async function fetchMachineData() {
      try {
        if (!machineId) {
          setMessage("ID da máquina não fornecido.");
          setIsLoading(false);
          return;
        }

        // Simulação da chamada para a Electron API
        const machineData = await window.electronAPI.getMachineById(machineId);

        if (machineData) {
          setEditingMachine(machineData);
          setApplications(machineData.applications as Application[]);
        } else {
          setMessage("Máquina não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao carregar dados da máquina:", error);
        setMessage("Erro ao carregar os dados. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMachineData();
  }, [machineId]);

  // === LÓGICA DE ATUALIZAÇÃO DOS DADOS NO BANCO DE DADOS ===
  const handleUpdate = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      if (!editingMachine.id) {
        setMessage("ID da máquina é necessário para a atualização.");
        setIsSaving(false);
        return;
      }

      const machineToUpdate = {
        ...editingMachine,
        applications: applications.map((app) => ({
          ...app,
          services: app.services,
        })),
      } as Machines;

      // Chama a função da Electron API para atualizar a máquina
      // const success = await window.electronAPI.updateMachine(machineToUpdate);

      // Mock para demonstração:
      const success = await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 2000);
      });

      if (success) {
        setMessage("Máquina atualizada com sucesso!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage("A atualização falhou. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar máquina:", error);
      setMessage("Erro ao atualizar a máquina. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMachineInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditingMachine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value: "Concluida" | "Pendente" | "Em andamento") => {
    setEditingMachine((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setEditingMachine((prev) => ({
      ...prev,
      updatedAt: date ? date.toISOString() : new Date().toISOString(),
    }));
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (
        !editingMachine.name?.trim() ||
        !editingMachine.description?.trim() ||
        !editingMachine.version?.trim()
      ) {
        setMessage("Todos os campos da máquina são obrigatórios.");
        return;
      }
    }

    setMessage(null);
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };


  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin mr-2 text-amber-500" />
        Carregando dados da máquina...
      </div>
    );
  }

  return (
    <div className="h-screen text-gray-100 flex flex-col">
      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 overflow-hidden pb-10">
        <div className="max-w-6xl mx-auto h-full pb-20 flex flex-col">
          <Card className="bg-gradient-to-br pt-0 from-[#111113] to-[#0F0F11] border-amber-500/30 shadow-2xl flex flex-col flex-1 overflow-hidden">
            {/* Header Integrado: Progress Steps dentro do Card Header */}
            <CardHeader className="bg-amber-600/10 border-b border-[#1F1F23] pt-6 flex-shrink-0">
              {/* Progress Steps */}
              <div className="">
                <div className="flex items-center justify-center gap-8 lg:gap-12">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-3">
                        {step.id === 1 ? (
                          <Image
                              src={editingMachine.status === "Concluida" ? ImgServerConcluida : editingMachine.status === "Pendente" ? ImgServerPendente : ImgServerNew}
                            alt="Servidor"
                            className="w-10 h-10 lg:w-12 lg:h-12 object-contain cursor-pointer"
                            onClick={() => setActiveStep(step.id)}
                          />
                        ) : (
                          <div
                            className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                              activeStep >= step.id
                                ? "bg-amber-600/20 border-amber-600/20 text-white shadow-lg shadow-amber-600/30"
                                : activeStep === step.id - 1
                                ? "border-amber-400/20 text-amber-400/20 bg-amber-600/1"
                                : "border-gray-600 text-gray-500 bg-[#1A1A1D]"
                            }`}
                            onClick={() => setActiveStep(step.id)}
                          >
                            <step.icon size={18} />
                          </div>
                        )}
                        <div className="text-center">
                          <p
                            className={`text-xs lg:text-sm font-medium transition-colors ${
                              activeStep >= step.id
                                ? "text-gray-100"
                                : "text-gray-500"
                            }`}
                          >
                            {editingMachine.name && step.id === 1
                              ? `Máquina ${editingMachine.name}`
                              : step.title
                              }
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {editingMachine.status && step.id === 1
                              ? (
                                  <span className="text-gray-400">
                                    {editingMachine.status === "Concluida"
                                      ? <span className="text-green-400">Concluída</span>
                                      : editingMachine.status === "Pendente"
                                      ? <span className="text-red-400">Pendente</span>
                                      : <span className="text-amber-400">{editingMachine.status}</span>
                                    }
                                  </span>
                                )
                              : (
                                  <span className="text-gray-600">
                                    {applications?.length && step.id === 2
                                      ? `${applications.length} App${applications.length > 1 ? 's' : ''}`
                                      : step.id === 2
                                      ? <span className="text-gray-400">Sem Aplicações</span>
                                      : step.id === 3 && editingMachine.updatedAt
                                      ? `${format(new Date(editingMachine.updatedAt), "dd MMM yyyy", { locale: ptBR })}`
                                      : step.id === 3
                                      ? <span className="text-gray-400">Sem Atualização</span>
                                      : null
                                    }
                                  </span>
                                )}
                          </p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-16 lg:w-24 h-0.5 transition-all duration-300 ${
                            activeStep > step.id
                              ? "bg-gradient-to-r from-amber-600/50 to-amber-500"
                              : "bg-gray-600"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>

            {/* Card Content (Scrollable) */}
            <CardContent className="h-full overflow-y-auto custom-scrollbar flex-1 flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <MachineInfoStep
                      editingMachine={editingMachine}
                      handleMachineInputChange={handleMachineInputChange}
                      handleStatusChange={handleStatusChange}
                      handleDateChange={handleDateChange}
                    />
                  )}

                  {activeStep === 2 && (
                    <ApplicationsStep
                      applications={applications}
                      setApplications={setApplications}
                      setMessage={setMessage}
                    />
                  )}

                  {activeStep === 3 && (
                    <ReviewStep
                      editingMachine={editingMachine}
                      applications={applications}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Message Display */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`p-4 rounded-lg border ${
                      message.includes("sucesso")
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    } mt-4`}
                  >
                    <p className="text-sm font-medium">{message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer Navigation */}
              <div className="mt-8 border-t border-[#1F1F23] bg-[#0F0F11] pt-6 flex-shrink-0  rounded-b-lg">
                <div className="mx-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      {activeStep > 1 && (
                        <Button
                          variant="ghost"
                          onClick={handlePreviousStep}
                          className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] cursor-pointer"
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          Voltar
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {activeStep < 3 ? (
                        <Button
                          onClick={handleNextStep}
                          className="bg-amber-600 hover:bg-amber-700 min-w-[120px] shadow-lg cursor-pointer"
                        >
                          Próximo
                          <ArrowLeft size={16} className="ml-2 rotate-180" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleUpdate}
                          disabled={isSaving}
                          className="bg-amber-600 hover:bg-amber-700 min-w-[180px] shadow-lg cursor-pointer"
                        >
                          {isSaving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="mr-2 h-4 w-4" />
                          )}
                          {isSaving
                            ? "Atualizando Máquina..."
                            : "Atualizar Máquina"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}