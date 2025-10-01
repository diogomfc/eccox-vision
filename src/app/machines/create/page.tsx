"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useElectronHashRouter } from "@/lib/simple-hash-router";
import { ElectronDebug } from "@/lib/electron-debug";
import BgOverview from '@/assets/images/bg-overview.svg';
import {
  Loader2,
  Plus,
  ArrowLeft,
  Layers,
  Settings,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import type { Machines, Application, StatusType } from "@/types/machines";

// Importar os componentes criados
import MachineInfoStep from "@/components/machines/machine-info-step";
import MachineReviewStep from "@/components/machines/machine-review-step";
import MachineApplicationStep from "@/components/machines/machine-application-step";
import MachineFormHeader from "@/components/machines/machine-form-header";
import MessageDisplay from "@/components/machines/message-display";
import MachineFormFooter from "@/components/machines/machine-form-footer";

export default function CreateMachinePage() {
  const { push } = useElectronHashRouter();

  // Estados para controle do formulário e navegação
  const [activeStep, setActiveStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  useEffect(() => {
    ElectronDebug.log('Componente CreateMachinePage carregado');
  }, []);

  // Estado dos dados da Máquina
  const [newMachine, setNewMachine] = useState<Partial<Machines>>({
    name: "",
    description: "",
    version: "",
    machineResponsible: "",
    status: "Pendente" as StatusType,
    updatedAt: new Date().toISOString(),
    applications: [],
  });

  // Estado dos dados das Aplicações
  const [applications, setApplications] = useState<Application[]>([]);

  const handleMachineChange = (updatedMachine: Partial<Machines>) => {
    setNewMachine(updatedMachine);
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (!newMachine.name?.trim() || !newMachine.description?.trim() || !newMachine.version?.trim()) {
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

  // Função para salvar a máquina no banco de dados
  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      if (!newMachine.name?.trim() || !newMachine.description?.trim() || !newMachine.version?.trim()) {
        setMessage("Todos os campos da máquina são obrigatórios.");
        setIsSaving(false);
        return;
      }

      // *** CORREÇÃO DE BUG: Gerar o ID da máquina uma única vez ***
      const machineId = `machine-${Date.now()}`;

      const machineToCreate: Machines = {
        id: machineId, // Usar o ID gerado
        name: newMachine.name.trim(),
        description: newMachine.description.trim(),
        version: newMachine.version.trim(),
        machineResponsible: newMachine.machineResponsible?.trim() || "",
        status: newMachine.status || "Pendente",
        updatedAt: new Date().toISOString(),
        // O campo 'applicationResponsible' já vem no objeto 'app' do estado 'applications'
        applications: applications.map(app => ({
          ...app,
          machine_id: machineId, // Reutilizar o mesmo ID para garantir a consistência
          services: app.services.map(service => ({
            ...service,
            application_id: app.id,
            updatedAt: service.updatedAt || new Date().toISOString()
          }))
        }))
      };

      const result = await window.electronAPI.createMachine(machineToCreate);

      if (result.success) {
        setMessage("Máquina criada com sucesso!");
        setTimeout(() => {
          push("/");
        }, 2000);
      } else {
        setMessage(`Erro ao criar máquina: ${result.message}`);
      }
    } catch (error) {
      console.error("Erro ao criar máquina:", error);
      setMessage("Erro interno ao criar a máquina. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative h-screen text-gray-100 flex flex-col pt-15">
      <Image
        src={BgOverview}
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="relative z-10 flex-1 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full pb-20 flex flex-col">
          <Card className="bg-gradient-to-br pt-0 from-[#111113] to-[#0F0F11] border-blue-500/30 shadow-2xl flex flex-col flex-1 overflow-hidden">
            <MachineFormHeader
              activeStep={activeStep}
              onStepClick={setActiveStep}
              machineData={newMachine}
              applications={applications}
              mode="create"
            />
            <CardContent className="h-full overflow-y-auto custom-scrollbar flex-1 flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <MachineInfoStep
                      machine={newMachine}
                      onMachineChange={handleMachineChange}
                      mode="create"
                    />
                  )}
                  
                  {activeStep === 2 && (
                     <MachineApplicationStep
                        applications={applications}
                        setApplications={setApplications}
                        setMessage={setMessage}
                        mode='create'
                    />
                  )}
                  
                  {activeStep === 3 && (
                    <MachineReviewStep
                      machine={newMachine}
                      applications={applications}
                      mode="create"
                    />
                  )}
                </AnimatePresence>
              </div>
              
              <MessageDisplay message={message} />
              
              <MachineFormFooter
                activeStep={activeStep}
                stepsCount={3}
                isSaving={isSaving}
                onPrevious={handlePreviousStep}
                onNext={handleNextStep}
                onSave={handleSave}
                mode="create"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}