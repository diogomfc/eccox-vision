import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Save, X, CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ItemObrigatorioType, StatusType } from '@/types/machines';

interface ServiceFormProps {
  serviceData: {
    name: string;
    status: StatusType;
    itemObrigatorio: ItemObrigatorioType;
    responsible: string;
    comments: string;
    typePendencia: string;
    responsibleHomologacao: string;
    updatedAt: string | undefined;
  };
  onChange: (value: string | Date | undefined, key: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditMode?: boolean;
  isLoading?: boolean; // Nova prop para loading
}

export const ServiceForm = ({
  serviceData,
  onChange,
  onSave,
  onCancel,
  isEditMode = false,
  isLoading = false, // Valor padrão false
}: ServiceFormProps) => {
  const handleDateChange = (date: Date | undefined) => {
    onChange(date, 'updatedAt');
  };

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
      className={`p-4 bg-[#0F0F11] border ${themeConfig.borderAccent} rounded-lg ${isLoading ? 'opacity-75' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-sm font-medium text-gray-200 flex items-center gap-2">
          {isEditMode ? 'Editando Serviço' : 'Novo Serviço'}
          {isLoading && (
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          )}
        </h5>
        <Button
          variant={"ghost"}
          onClick={onCancel}
          className="cursor-pointer hover:bg-transparent hover:text-red-500 text-red-500/50"
          disabled={isLoading}
        >
          <X size={12} className="" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <div className="space-y-2 col-span-2">
          <Label className="text-xs text-gray-200">Nome *</Label>
          <Input
            value={serviceData.name}
            onChange={(e) => onChange(e.target.value, 'name')}
            className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
            placeholder=""
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-gray-200">Status</Label>
          <Select
            value={serviceData.status}
            onValueChange={(value) => onChange(value, 'status')}
            disabled={isLoading}
          >
            <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500 w-full`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D]">
              <SelectItem value="Concluida" className="cursor-pointer focus:bg-green-600/10">
                <span className="text-green-400">Concluída</span>
              </SelectItem>
              <SelectItem value="Pendente" className="cursor-pointer focus:bg-red-600/10">
                <span className="text-red-400">Pendente</span>
              </SelectItem>
              <SelectItem value="Em andamento" className="cursor-pointer focus:bg-amber-600/10">
                <span className="text-amber-400">Em andamento</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs text-gray-200">Obrigatório</Label>
          <Select
            value={serviceData.itemObrigatorio}
            onValueChange={(value) => onChange(value, 'itemObrigatorio')}
            disabled={isLoading}
          >
            <SelectTrigger className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500 w-full`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1D] border-[#2A2A2D] text-gray-100">
              <SelectItem value="Sim" className="cursor-pointer focus:bg-green-600/10">
                <span className="text-green-400">Sim</span>
              </SelectItem>
              <SelectItem value="Não" className="cursor-pointer focus:bg-red-600/10">
                <span className="text-red-400">Não</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-gray-200">Responsável</Label>
          <Input
            value={serviceData.responsible}
            onChange={(e) => onChange(e.target.value, 'responsible')}
            className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
            placeholder=""
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-gray-200">Responsável Homologação</Label>
          <Input
            value={serviceData.responsibleHomologacao}
            onChange={(e) => onChange(e.target.value, 'responsibleHomologacao')}
            className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
            placeholder=""
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-gray-200">Tipo Pendência</Label>
          <Input
            value={serviceData.typePendencia}
            onChange={(e) => onChange(e.target.value, 'typePendencia')}
            className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500`}
            placeholder=""
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-gray-200">Data de entrega</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`justify-start text-left font-normal bg-[#1A1A1E] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 hover:bg-[#23232B] hover:text-gray-500 w-full`}
                disabled={isLoading}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {serviceData.updatedAt ? (
                  format(new Date(serviceData.updatedAt), "dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span className="text-gray-400">
                    Selecione a data
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
              <Calendar
                mode="single"
                selected={serviceData.updatedAt ? new Date(serviceData.updatedAt) : undefined}
                onSelect={handleDateChange}
                className="bg-[#1A1A1E] text-gray-200"
                disabled={isLoading}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 col-span-4">
          <Label className="text-xs text-gray-200">Comentários</Label>
          <Textarea
            value={serviceData.comments}
            onChange={(e) => onChange(e.target.value, 'comments')}
            className={`bg-[#1A1A1D] border-[#2A2A2D] ${themeConfig.focusColor} text-gray-100 resize-none min-h-[60px] w-full`}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          onClick={onSave}
          size="sm"
          className={`${themeConfig.buttonPrimary} cursor-pointer text-xs min-w-[120px]`}
          disabled={isLoading || !serviceData.name.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin mr-1" />
              {isEditMode ? 'Salvando...' : 'Adicionando...'}
            </>
          ) : (
            <>
              <Save size={14} className="mr-1" />
              {isEditMode ? 'Salvar Alterações' : 'Adicionar Serviço'}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};