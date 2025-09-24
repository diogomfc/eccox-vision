// src/components/machines/machine-form-footer.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Check, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type modeType = 'create' | 'edit';

interface MachineFormFooterProps {
  activeStep: number;
  stepsCount: number;
  isSaving: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  mode: modeType;
}

const MachineFormFooter: React.FC<MachineFormFooterProps> = ({
  activeStep,
  stepsCount,
  isSaving,
  onPrevious,
  onNext,
  onSave,
  mode,
}) => {
  const isCreateMode = mode === 'create';
  const finalButtonText = isCreateMode ? 'Criar Máquina' : 'Atualizar Máquina';
  const finalButtonSavingText = isCreateMode ? 'Criando Máquina...' : 'Atualizando Máquina...';
  const finalButtonColor = isCreateMode ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700';

  return (
    <div className="mt-8 border-t border-[#1F1F23] bg-[#0F0F11] pt-6 flex-shrink-0 rounded-b-lg">
      <div className="mx-auto">
        <div className="flex justify-between items-center">
          <div>
            {activeStep > 1 && (
              <Button
                variant="ghost"
                onClick={onPrevious}
                className="text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1D] cursor-pointer"
              >
                <ArrowLeft size={16} className="mr-2" />
                Voltar
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            {activeStep < stepsCount ? (
              <Button
                onClick={onNext}
                className={`min-w-[120px] shadow-lg cursor-pointer ${isCreateMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-600 hover:bg-amber-700'}`}
              >
                Próximo
                <ArrowLeft size={16} className="ml-2 rotate-180" />
              </Button>
            ) : (
              <Button
                onClick={onSave}
                disabled={isSaving}
                className={`${finalButtonColor} min-w-[180px] shadow-lg cursor-pointer`}
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  isCreateMode ? <Check className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />
                )}
                {isSaving ? finalButtonSavingText : finalButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineFormFooter;