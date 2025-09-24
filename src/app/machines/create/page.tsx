// src/app/machines/create/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Plus,
  ArrowLeft,
  Layers,
  Settings,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import type { Machines, Application, StatusType } from "@/types/machines";

// Importar as imagens
import ImgServerNew from "@/assets/images/img-server-status.svg";
import ImgServerPendente from "@/assets/images/img-server-status-warning.svg";
import ImgServerConcluida from "@/assets/images/img-server-status-ok.svg";

// Importar os componentes criados

import MachineInfoStep from "@/components/machines/machine-info-step";
import MachineReviewStep from "@/components/machines/machine-review-step";
import MachineApplicationStep from "@/components/machines/machine-application-step";
import MachineFormHeader from "@/components/machines/machine-form-header";
import MessageDisplay from "@/components/machines/message-display";
import MachineFormFooter from "@/components/machines/machine-form-footer";

export default function CreateMachinePage() {
  const router = useRouter();

  // Estados para controle do formulário e navegação
  const [activeStep, setActiveStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Machine data
  const [newMachine, setNewMachine] = useState<Partial<Machines>>({
    name: "",
    description: "",
    version: "",
    status: "Pendente" as StatusType,
    updatedAt: new Date().toISOString(),
    applications: [],
  });

  // Applications data
  const [applications, setApplications] = useState<Application[]>([]);

  const steps = [
    { id: 1, title: "Cadastro da Máquina", icon: ImgServerNew },
    { id: 2, title: "Aplicações", icon: Layers },
    { id: 3, title: "Revisão & Criação", icon: Settings },
  ];

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
      // Validações antes de salvar
      if (!newMachine.name?.trim() || !newMachine.description?.trim() || !newMachine.version?.trim()) {
        setMessage("Todos os campos da máquina são obrigatórios.");
        setIsSaving(false);
        return;
      }

      // Criar objeto da máquina com todas as informações
      const machineToCreate: Machines = {
        id: `machine-${Date.now()}`,
        name: newMachine.name.trim(),
        description: newMachine.description.trim(),
        version: newMachine.version.trim(),
        status: newMachine.status || "Pendente",
        updatedAt: new Date().toISOString(),
        applications: applications.map(app => ({
          ...app,
          machine_id: `machine-${Date.now()}`, // Garantir que o machine_id está correto
          services: app.services.map(service => ({
            ...service,
            application_id: app.id, // Garantir que o application_id está correto
            updatedAt: service.updatedAt || new Date().toISOString()
          }))
        }))
      };

      console.log('Tentando criar máquina:', machineToCreate);

      // Chamar a API do Electron para criar a máquina
      const result = await window.electronAPI.createMachine(machineToCreate);

      if (result.success) {
        setMessage("Máquina criada com sucesso!");
        setTimeout(() => {
          router.push("/");
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
    <div className="h-screen text-gray-100 flex flex-col">
      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 overflow-hidden pb-10">
        <div className="max-w-6xl mx-auto h-full pb-20 flex flex-col">
          <Card className="bg-gradient-to-br pt-0 from-[#111113] to-[#0F0F11] border-blue-500/30 shadow-2xl flex flex-col flex-1 overflow-hidden">
            {/* Header Integrado: Progress Steps dentro do Card Header */}
            <MachineFormHeader
              activeStep={activeStep}
              onStepClick={setActiveStep}
              machineData={newMachine}
              applications={applications}
              mode="create"
            />

            {/* Card Content (Scrollable) */}
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

              {/* Message Display */}
              <MessageDisplay message={message} />

              {/* Footer Navigation */}
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
    </div>
  );
}