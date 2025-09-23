import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X } from 'lucide-react';
import { ApplicationType, StatusType } from '@/types/machines';

interface ApplicationFormProps {
  appData: {
    name: string;
    tipo: ApplicationType;
    status: StatusType;
  };
  // Simplificamos o onChange para aceitar apenas o valor final
  onChange: (value: string, key: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditMode?: boolean;
}

export const ApplicationForm = ({
  appData,
  onChange,
  onSave,
  onCancel,
  isEditMode = false,
}: ApplicationFormProps) => {
    // Configuração de temas
  const themeConfig = {
    focusColor: isEditMode ? "focus:!border-amber-500" : "focus:!border-blue-500",
    textAccent: isEditMode ? "text-amber-400" : "text-blue-400",
    borderAccent: isEditMode ? "border-amber-500/30" : "border-blue-500/30",
    buttonPrimary: isEditMode ? "bg-amber-600/50 hover:bg-amber-700" : "bg-blue-600/50 hover:bg-blue-700",
    selectFocusGreen: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-green-600/10",
    selectFocusRed: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-red-600/10",
    selectFocusPrimary: isEditMode ? "focus:bg-amber-600/10" : "focus:bg-blue-600/10",
  };

  
    return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className={`p-4 bg-[#0F0F11] rounded-lg border ${themeConfig.borderAccent} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-100">
            {isEditMode ? 'Editando Aplicação' : 'Nova Aplicação'}
          </h4>
          <Button
            variant={"ghost"}
            onClick={onCancel}
            className="cursor-pointer hover:bg-transparent hover:text-red-500 text-red-500/50"
          >
            <X size={16} className="" />
            {/* Cancelar */}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2 col-span-2">
            <Label className="text-gray-200">Nome da Aplicação *</Label>
            <Input
              value={appData.name}
              // Chamamos a função com o valor diretamente
              onChange={(e) => onChange(e.target.value, 'name')}
              className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">Tipo da Aplicação *</Label>
            <Select
              value={appData.tipo}
              // Chamamos a função com o valor diretamente
              onValueChange={(value) => onChange(value, 'tipo')}
            >
             <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500 w-full`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                      <SelectItem value="IBM" className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}>
                  <span className="text-blue-400">IBM</span>
                </SelectItem>
                <SelectItem value="ECCOX" className={`cursor-pointer ${themeConfig.selectFocusPrimary}`}>
                  <span className="text-blue-400">ECCOX</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">Status</Label>
            <Select
              value={appData.status}
              // Chamamos a função com o valor diretamente
              onValueChange={(value) => onChange(value, 'status')}
            >
                <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500 w-full`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
                <SelectItem value="Concluida" className={`cursor-pointer ${themeConfig.selectFocusGreen}`}>
                  <span className="text-green-400">Concluída</span>
                </SelectItem>
                <SelectItem value="Pendente" className={`cursor-pointer ${themeConfig.selectFocusRed}`}>
                  <span className="text-red-400">Pendente</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onSave}
            className={`${themeConfig.buttonPrimary} cursor-pointer`}
          >
            <Save size={16} className="mr-2" />
            {isEditMode ? 'Salvar Alterações' : 'Adicionar Aplicação'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};