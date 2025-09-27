// src/components/ApplicationForm.tsx (ou onde quer que o seu componente esteja)

"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X } from 'lucide-react';
import { Application, ApplicationType, StatusType } from '@/types/machines';
import { Loader2 } from 'lucide-react';

interface ApplicationFormProps {
  appData: Partial<Application>;
  onChange: (value: any, key: keyof Application) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditMode?: boolean;
  isLoading?: boolean;
}

export const ApplicationForm = ({
  appData,
  onChange,
  onSave,
  onCancel,
  isEditMode = false,
  isLoading = false,
}: ApplicationFormProps) => {
  const themeConfig = {
    focusColor: isEditMode ? "focus:!border-amber-500" : "focus:!border-blue-500",
    textAccent: isEditMode ? "text-amber-400" : "text-blue-400",
    borderAccent: isEditMode ? "border-amber-500/30" : "border-blue-500/30",
    buttonPrimary: isEditMode ? "bg-amber-600/50 hover:bg-amber-700" : "bg-blue-600/50 hover:bg-blue-700",
    selectFocusGreen: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-green-600/10",
    selectFocusRed: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-red-600/10",
    selectFocusPrimary: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-blue-600/10",
  };

  // ALTERADO: Adicionado 'applicationResponsible' ao objeto de dados
  const data = {
    name: appData.name ?? '',
    tipo: appData.tipo ?? 'IBM',
    status: appData.status ?? 'Pendente',
    applicationResponsible: appData.applicationResponsible ?? '', // NOVO
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`overflow-hidden ${isLoading ? 'opacity-75 pointer-events-none' : ''}`}
    >
      <div className={`p-4 bg-[#0F0F11] rounded-lg border ${themeConfig.borderAccent} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-100 flex items-center gap-2">
            {isEditMode ? 'Editando Aplicação' : 'Nova Aplicação'}
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          </h4>
          <Button variant="ghost" onClick={onCancel} className="cursor-pointer hover:bg-transparent hover:text-red-500 text-red-500/50 h-6 w-6 p-0" disabled={isLoading}>
            <X size={16} />
          </Button>
        </div>

        {/* ALTERADO: Layout do grid ajustado para um 2x2 mais limpo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label className="text-gray-200">Nome da Aplicação *</Label>
            <Input
              value={data.name}
              onChange={(e) => onChange(e.target.value, 'name')}
              className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100`}
              placeholder="Digite o nome da aplicação"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* NOVO: Campo de input para o Responsável pela Aplicação */}
          <div className="space-y-2">
            <Label className="text-gray-200">Responsável</Label>
            <Input
              value={data.applicationResponsible}
              onChange={(e) => onChange(e.target.value, 'applicationResponsible')}
              className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100`}
              placeholder="Nome do responsável"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-200">Tipo da Aplicação *</Label>
            <Select value={data.tipo} onValueChange={(value: ApplicationType) => onChange(value, 'tipo')} disabled={isLoading}>
             <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 w-full`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                <SelectItem value="IBM" className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}>
                  <span className="text-blue-400">IBM</span>
                </SelectItem>
                <SelectItem value="ECCOX" className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}>
                  <span className="text-blue-400">ECCOX</span>
                </SelectItem>
                {/* NOVO: Adicionando o tipo DISTRIBUÍDA que estava nos seus types */}
                <SelectItem value="DISTRIBUÍDA" className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}>
                  <span className="text-blue-400">DISTRIBUÍDA</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-200">Status</Label>
            <Select value={data.status} onValueChange={(value: StatusType) => onChange(value, 'status')} disabled>
                <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 w-full`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                <SelectItem value="Concluída" className={`cursor-pointer ${themeConfig.selectFocusGreen}`}>
                  <span className="text-green-400">Concluída</span>
                </SelectItem>
                <SelectItem value="Pendente" className={`cursor-pointer ${themeConfig.selectFocusRed}`}>
                  <span className="text-red-400">Pendente</span>
                </SelectItem>
                {/* NOVO: Adicionando o status 'Em andamento' que estava nos seus types */}
                <SelectItem value="Em andamento" className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}>
                  <span className="text-yellow-400">Em andamento</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onSave} className={`${themeConfig.buttonPrimary} cursor-pointer min-w-[150px]`} disabled={isLoading || !data.name.trim()}>
            {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" />{isEditMode ? 'Salvando...' : 'Adicionando...'}</>
            ) : (
                <><Save size={16} className="mr-2" />{isEditMode ? 'Salvar Alterações' : 'Adicionar Aplicação'}</>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};