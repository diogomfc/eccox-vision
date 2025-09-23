// src/components/machine-update/MachineUpdateClient.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import {
  Loader2,
  Settings,
  Layers,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {AnimatePresence } from "framer-motion";

import type {
  Machines,
  Application,
  StatusType,
} from "@/types/machines";

// Importando os componentes de cada passo
import MachineInfoStep from "@/components/machines/machine-info-step";
import MachineReviewStep from "@/components/machines/machine-review-step";
import MachineApplicationStep from "@/components/machines/machine-application-step";

import MachineFormHeader from "./machine-form-header";
import MessageDisplay from "./message-display";
import MachineFormFooter from "./machine-form-footer";

import ImgServerNew from "@/assets/images/img-server-status.svg";

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
  const [editingMachine, setEditingMachine] = useState<Partial<Machines>>({
    name: "",
    description: "",
    version: "",
    status: "Pendente" as StatusType,
    updatedAt: new Date().toISOString(),
    applications: [],
  });

  // Applications data
  const [applications, setApplications] = useState<Application[]>([]);

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
            applications: applications,
            updatedAt: new Date().toISOString(),
        } as Machines;

        console.log("Sincronizando máquina completa:", machineToUpdate);

        // Chama o NOVO IPC Handler
        const result = await window.electronAPI.syncMachineComplete(machineToUpdate);
        
        if (result.success) {
            setMessage("Máquina, aplicações e serviços atualizados com sucesso!");
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else {
            setMessage(`Erro ao atualizar: ${result.message}`);
        }
    } catch (error) {
        console.error("Erro ao sincronizar máquina:", error);
        setMessage("Erro ao sincronizar a máquina. Tente novamente.");
    } finally {
        setIsSaving(false);
    }
};
    
  const handleMachineChange = (updatedMachine: Partial<Machines>) => {
    setEditingMachine(updatedMachine);
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
             <MachineFormHeader
              activeStep={activeStep}
              onStepClick={setActiveStep}
              machineData={editingMachine}
              applications={applications}
              mode="edit"
            />

            {/* Card Content (Scrollable) */}
            <CardContent className="h-full overflow-y-auto custom-scrollbar flex-1 flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <MachineInfoStep
                      machine={editingMachine}
                      onMachineChange={handleMachineChange}
                      mode="edit"
                    />
                  )}

                  {activeStep === 2 && (
                    <MachineApplicationStep
                      applications={applications}
                      setApplications={setApplications}
                      setMessage={setMessage}
                      mode="edit"
                    />
                  )}

                  {activeStep === 3 && (
                    <MachineReviewStep
                      machine={editingMachine}
                      applications={applications}
                      mode="edit"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Message Display */}
               <MessageDisplay message={message} />

              {/* Footer Navigation */}
                <MachineFormFooter
                activeStep={activeStep}
                stepsCount={3}
                isSaving={isSaving}
                onPrevious={handlePreviousStep}
                onNext={handleNextStep}
                onSave={handleUpdate}
                mode="edit"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}