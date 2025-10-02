// src/components/machines/machine-form-header.tsx
"use client";

import Image from 'next/image';
import { Layers, Settings } from 'lucide-react';
import { CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Machines, Application, StatusType } from '@/types/machines';

import ImgServerNew from "@/assets/images/img-server-status.svg";
import ImgServerPendente from "@/assets/images/img-server-status-warning.svg";
import ImgServerConcluida from "@/assets/images/img-server-status-ok.svg";


export type modeType = 'create' | 'edit';

interface MachineFormHeaderProps {
  activeStep: number;
  onStepClick: (stepId: number) => void;
  machineData: Partial<Machines>;
  applications: Application[];
  mode: modeType;
}

const steps = [
  { id: 1, title: "Informações da Máquina", icon: Settings, createTitle: "Cadastro da Máquina" },
  { id: 2, title: "Aplicações", icon: Layers, createTitle: "Aplicações" },
  { id: 3, title: "Revisão", icon: Settings, createTitle: "Revisão & Criação" },
];

const MachineFormHeader: React.FC<MachineFormHeaderProps> = ({
  activeStep,
  onStepClick,
  machineData,
  applications,
  mode
}) => {
  const getStepStatus = (stepId: number) => {
    if (stepId < activeStep) {
      return "completed";
    }
    if (stepId === activeStep) {
      return "active";
    }
    return "inactive";
  };

  const getStepTitle = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return "";
    
    if (stepId === 1 && machineData.name?.trim()) {
      //return `Máquina ${machineData.name.length > 12 ? machineData.name.slice(0, 8) + "..." : machineData.name}`;

       //Caso o modo seja create, mostrar "Criando: {nome da máquina}"
       //Caso o modo seja edit, mostrar "Editando: {nome da máquina}"
      return (
        mode === 'create' 
        ? `Criando: ${machineData.name.length > 20 ? machineData.name.slice(0, 17) + "..." : machineData.name}` 
        : `Editando: ${machineData.name.length > 20 ? machineData.name.slice(0, 17) + "..." : machineData.name}`
      )

    }
    
    return mode === 'create' ? step.createTitle : step.title;
  };

  const getStepSubTitle = (stepId: number) => {
    if (stepId === 1) {
        if (!machineData.status) return `Passo ${stepId} de ${steps.length}`;
        switch(machineData.status) {
            case 'Concluída': return <span className="text-green-400">Concluída</span>;
            case 'Pendente': return <span className="text-red-400">Pendente</span>;
            default: return <span className="text-amber-400">{machineData.status}</span>;
        }
    }
    if (stepId === 2) {
        return applications.length > 0 ? 
            `${applications.length} App${applications.length > 1 ? 's' : ''}` : 
            <span className="text-gray-400">Sem Aplicações</span>;
    }
    if (stepId === 3) {
        return machineData.updatedAt ? 
            `${format(new Date(machineData.updatedAt), "dd MMM yyyy", { locale: ptBR })}` : 
            <span className="text-gray-400">Sem Atualização</span>;
    }
    return `Passo ${stepId} de ${steps.length}`;
  }

  const getStepIcon = (stepId: number) => {
    if (stepId === 1) {
        switch(machineData.status) {
            case 'Concluída': return ImgServerConcluida;
            case 'Pendente': return ImgServerPendente;
            default: return ImgServerNew;
        }
    }
    return steps.find(s => s.id === stepId)?.icon;
  };

  const isLastStep = (index: number) => index === steps.length - 1;

  const headerColorClass = mode === 'create' ? "from-blue-600/10 to-blue-700/5 border-b border-blue-500/30" : "from-amber-600/10 to-amber-700/5 border-b border-amber-500/30";
  const iconColorClass = mode === 'create' ? "bg-blue-600/20 border-blue-600/20 shadow-blue-600/30" : "bg-amber-600/20 border-amber-600/20 shadow-amber-600/30";
  const separatorColorClass = mode === 'create' ? "bg-gradient-to-r from-blue-600/50 to-blue-500" : "bg-gradient-to-r from-amber-600/50 to-amber-500";

  return (
    <CardHeader className={`bg-gradient-to-r pt-6 flex-shrink-0 border-b border-[#1F1F23] ${headerColorClass}`}>
      <div className="flex items-center justify-center gap-8 lg:gap-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-3">
              {step.id === 1 ? (
                <Image
                  src={getStepIcon(step.id)}
                  alt="Ícone do Passo"
                  className="w-10 h-10 lg:w-12 lg:h-12 object-contain cursor-pointer"
                  onClick={() => onStepClick(step.id)}
                />
              ) : (
                <div
                  className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                    activeStep >= step.id
                      ? iconColorClass + " text-white"
                      : "border-gray-600 text-gray-500 bg-[#1A1A1D]"
                  }`}
                  onClick={() => onStepClick(step.id)}
                >
                  <step.icon size={18} />
                </div>
              )}
              <div className="text-center">
                <p className={`text-xs lg:text-sm font-medium transition-colors ${activeStep >= step.id ? "text-gray-100" : "text-gray-500"}`}>
                  {getStepTitle(step.id)}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {getStepSubTitle(step.id)}
                </p>
              </div>
            </div>
            {!isLastStep(index) && (
              <div
                className={`w-16 lg:w-24 h-0.5 transition-all duration-300 ${
                  activeStep > step.id ? separatorColorClass : "bg-gray-600"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </CardHeader>
  );
};

export default MachineFormHeader;