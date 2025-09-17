// src/components/machines/application-edit-modal.tsx
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Application, Service } from "@/types/machines";

interface ApplicationEditModalProps {
    application: Application;
    onClose: () => void;
    onUpdated: () => void;
}

export function ApplicationEditModal({ application, onClose, onUpdated }: ApplicationEditModalProps) {
    const [editedApp, setEditedApp] = useState<Application>(application);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleAppInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedApp(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    // Funções para manipular a adição, edição e exclusão de serviços
    const handleAddService = () => {
        // Lógica para adicionar um novo serviço ao array `editedApp.services`
        // Por exemplo:
        // setEditedApp(prev => ({ ...prev, services: [...prev.services, { name: '', status: 'Pendente', ... }] }))
        alert('Adicionar serviço');
    };

    const handleServiceUpdate = (index: number, name: string, value: string) => {
        // Lógica para atualizar um serviço específico
        // setEditedApp(prev => {
        //     const updatedServices = [...prev.services];
        //     updatedServices[index] = { ...updatedServices[index], [name]: value };
        //     return { ...prev, services: updatedServices };
        // });
    };

    const handleDeleteService = (index: number) => {
        // Lógica para excluir um serviço
        alert(`Deletar serviço no índice ${index}`);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        // Lógica para enviar a aplicação e seus serviços para o back-end
        // await window.electronAPI.updateApplication(editedApp);
        alert('Salvar alterações');
        setIsSaving(false);
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] h-3/4 flex flex-col p-6 bg-[#0F0F10] text-gray-200 border border-[#323238]">
                <DialogHeader className="border-b border-gray-700 pb-4">
                    <DialogTitle className="text-xl font-bold">Editar Aplicação: {application.name}</DialogTitle>
                    <DialogDescription className="text-gray-400">Gerencie a aplicação e seus serviços.</DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pt-4 space-y-6 custom-scrollbar">
                    {/* Campos da Aplicação */}
                    <div className="space-y-4">
                        <Label htmlFor="appName">Nome da Aplicação</Label>
                        <Input id="appName" name="name" value={editedApp.name} onChange={handleAppInputChange} className="bg-[#1A1A1E] border-gray-600 text-gray-200" />
                        
                        <Label htmlFor="appStatus">Status da Aplicação</Label>
                        <Select value={editedApp.status} onValueChange={(value) => handleAppInputChange({ target: { name: 'status', value } } as React.ChangeEvent<HTMLSelectElement>)}>
                            <SelectTrigger className="bg-[#1A1A1E] border-gray-600 text-gray-200">
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1E] border-gray-700 text-gray-200">
                                <SelectItem value="Concluida">Concluída</SelectItem>
                                <SelectItem value="Pendente">Pendente</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator className="bg-gray-700" />

                    {/* Lista de Serviços */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-lg">Serviços</h4>
                            <Button onClick={handleAddService} className="bg-[#298BFE] hover:bg-[#165BAA]">
                                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Serviço
                            </Button>
                        </div>
                        {editedApp.services?.map((service, index) => (
                            <div key={index} className="flex items-center gap-4 bg-[#1A1A1E] p-3 rounded-lg border border-gray-700">
                                <div className="flex-1 space-y-1">
                                    <Label>Nome do Serviço</Label>
                                    <Input value={service.name} onChange={(e) => handleServiceUpdate(index, 'name', e.target.value)} className="bg-[#23232B] border-gray-600 text-gray-200" />
                                </div>
                                <div className="space-y-1 w-48 flex-shrink-0">
                                    <Label>Status</Label>
                                    <Select value={service.status} onValueChange={(value) => handleServiceUpdate(index, 'status', value)}>
                                        <SelectTrigger className="bg-[#23232B] border-gray-600 text-gray-200">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1A1A1E] border-gray-700 text-gray-200">
                                            <SelectItem value="Concluida">Concluída</SelectItem>
                                            <SelectItem value="Pendente">Pendente</SelectItem>
                                            <SelectItem value="Em andamento">Em Andamento</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button variant="ghost" onClick={() => handleDeleteService(index)} className="hover:bg-[#2A2A2E] text-red-400">
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-4 flex justify-end gap-2">
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