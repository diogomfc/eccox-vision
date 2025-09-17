// src/components/machines/service-edit-modal.tsx
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Loader2, CalendarIcon } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import type { Service, ServiceStatus } from "@/types/machines";

interface ServiceEditModalProps {
    service: Service;
    onClose: () => void;
    onUpdated: () => void;
}

export function ServiceEditModal({ service, onClose, onUpdated }: ServiceEditModalProps) {
    const [editedService, setEditedService] = useState<Service>(service);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedService(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setEditedService(prev => ({
                ...prev,
                updatedAt: date.toISOString(),
            }));
        } else {
            setEditedService(prev => ({
                ...prev,
                updatedAt: null,
            }));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        // Lógica para enviar o serviço atualizado para o back-end
        // await window.electronAPI.updateService(editedService);
        alert('Salvar alterações');
        setIsSaving(false);
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] flex flex-col p-6 bg-[#0F0F10] text-gray-200 border border-[#323238]">
                <DialogHeader className="border-b border-gray-700 pb-4">
                    <DialogTitle className="text-xl font-bold">Editar Serviço: {service.name}</DialogTitle>
                    <DialogDescription className="text-gray-400">Atualize os detalhes deste serviço.</DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pt-4 space-y-4 custom-scrollbar">
                    {/* Campos do Serviço */}
                    <div className="space-y-4">
                        <Label htmlFor="serviceName">Nome do Serviço</Label>
                        <Input id="serviceName" name="name" value={editedService.name} onChange={handleInputChange} className="bg-[#1A1A1E] border-gray-600 text-gray-200" />
                        
                        <Label htmlFor="serviceStatus">Status</Label>
                        <Select 
                            value={editedService.status} 
                            onValueChange={(value) => handleInputChange({ target: { name: 'status', value } } as React.ChangeEvent<HTMLSelectElement>)}>
                            <SelectTrigger className="bg-[#1A1A1E] border-gray-600 text-gray-200">
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1E] border-gray-700 text-gray-200">
                                <SelectItem value="Concluida">Concluída</SelectItem>
                                <SelectItem value="Pendente">Pendente</SelectItem>
                                <SelectItem value="Em andamento">Em Andamento</SelectItem>
                            </SelectContent>
                        </Select>

                        <Label htmlFor="itemObrigatorio">Item Obrigatório</Label>
                        <Select 
                            value={editedService.itemObrigatorio} 
                            onValueChange={(value) => handleInputChange({ target: { name: 'itemObrigatorio', value } } as React.ChangeEvent<HTMLSelectElement>)}>
                            <SelectTrigger className="bg-[#1A1A1E] border-gray-600 text-gray-200">
                                <SelectValue placeholder="Item Obrigatório" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1E] border-gray-700 text-gray-200">
                                <SelectItem value="Sim">Sim</SelectItem>
                                <SelectItem value="Não">Não</SelectItem>
                            </SelectContent>
                        </Select>

                        <Label htmlFor="responsible">Responsável</Label>
                        <Input id="responsible" name="responsible" value={editedService.responsible} onChange={handleInputChange} className="bg-[#1A1A1E] border-gray-600 text-gray-200" />

                        <Label htmlFor="comments">Comentários</Label>
                        <textarea id="comments" name="comments" value={editedService.comments} onChange={handleInputChange} className="bg-[#1A1A1E] border-gray-600 text-gray-200 resize-none h-24 p-2 rounded-md" placeholder="Adicione um comentário..." />

                        <Label htmlFor="typePendencia">Tipo de Pendência</Label>
                        <Input id="typePendencia" name="typePendencia" value={editedService.typePendencia} onChange={handleInputChange} className="bg-[#1A1A1E] border-gray-600 text-gray-200" />

                        <Label htmlFor="responsibleHomologacao">Responsável Homologação</Label>
                        <Input id="responsibleHomologacao" name="responsibleHomologacao" value={editedService.responsibleHomologacao} onChange={handleInputChange} className="bg-[#1A1A1E] border-gray-600 text-gray-200" />
                        
                        <Label htmlFor="updatedAt">Última Atualização</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="justify-start text-left font-normal bg-[#1A1A1E] border-gray-600 text-gray-200 hover:bg-[#1A1A1E]"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                                    {editedService.updatedAt ? (
                                        format(new Date(editedService.updatedAt), "PPP", { locale: ptBR })
                                    ) : (
                                        <span className="text-gray-400">Selecione a data</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
                                <Calendar
                                    mode="single"
                                    selected={editedService.updatedAt ? new Date(editedService.updatedAt) : undefined}
                                    onSelect={handleDateChange}
                                    className='bg-[#1A1A1E] text-gray-200'
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-4 flex justify-end gap-2">
                    {message && (
                        <div className={`p-3 rounded-lg text-center font-medium mb-4 ${message.includes("sucesso") ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}>
                            {message}
                        </div>
                    )}
                    <Button onClick={onClose} variant="secondary" disabled={isSaving} className="bg-gray-600 hover:bg-gray-700 text-white">
                        <X className="mr-2 h-4 w-4" /> Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-[#298BFE] hover:bg-[#165BAA] text-white">
                        {isSaving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Check className="mr-2 h-4 w-4" />
                        )}
                        Salvar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}