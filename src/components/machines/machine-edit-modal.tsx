// src/components/machines/machine-edit-modal.tsx
"use client";

import { useState } from 'react';
import type { Machines } from "@/types/machines";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Loader2, CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MachineEditModalProps {
    machine: Machines;
    onClose: () => void;
    onUpdated: () => void;
}

export function MachineEditModal({ machine, onClose, onUpdated }: MachineEditModalProps) {
     const [editedMachine, setEditedMachine] = useState<Machines>(() => {
        // Inicializa o estado do editedMachine com uma data válida
        return {
            ...machine,
            updatedAt: machine.updatedAt ? new Date(machine.updatedAt).toISOString() : null,
        };
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedMachine(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Dedicated handler for the top-level status
    const handleStatusChange = (value: "Concluida" | "Pendente") => {
        setEditedMachine(prev => ({
            ...prev,
            status: value,
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setEditedMachine(prev => ({
                ...prev,
                updatedAt: date.toISOString(),
            }));
        } else {
            setEditedMachine(prev => ({
                ...prev,
                updatedAt: null,
            }));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);

        try {
            // Remove applications and services from the editedMachine object
            // to ensure only the main machine data is sent for update.
            const machineToSave = {
                ...editedMachine,
                applications: [],
            };

            const result = await window.electronAPI.updateMachine(machineToSave);

            if (result.success) {
                setMessage("Máquina atualizada com sucesso!");
                setTimeout(() => {
                    onUpdated();
                    onClose();
                }, 1500);
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            console.error("Falha ao atualizar a máquina:", error);
            setMessage("Erro ao atualizar a máquina. Tente novamente.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className=" flex flex-col p-0 bg-[#1A1A1E] text-gray-200 border border-[#323238]">
                <DialogHeader className="p-6 pb-4 border-b border-gray-700">
                    <DialogTitle className="text-lg font-bold">Editar Máquina: {machine.name}</DialogTitle>
                    <DialogDescription className="text-gray-400">Edite os detalhes principais da máquina.</DialogDescription>
                </DialogHeader>

                {/* Removed Tabs for applications/services to focus on machine details */}
                <CardContent className="space-y-4 px-6 py-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="id" className="text-gray-400">ID</Label>
                        <Input id="id" name="id" value={editedMachine.id} className="bg-[#23232B] border-gray-600 focus:ring-[#298BFE] text-gray-300" readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name" className="text-gray-400">Nome da Máquina</Label>
                        <Input id="name" name="name" value={editedMachine.name} onChange={handleInputChange} className="bg-[#23232B] border-gray-600 focus:ring-[#298BFE] text-gray-200" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="description" className="text-gray-400">Descrição</Label>
                        <Input id="description" name="description" value={editedMachine.description} onChange={handleInputChange} className="bg-[#23232B] border-gray-600 focus:ring-[#298BFE] text-gray-200" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="version" className="text-gray-400">Versão</Label>
                        <Input id="version" name="version" value={editedMachine.version} onChange={handleInputChange} className="bg-[#23232B] border-gray-600 focus:ring-[#298BFE] text-gray-200" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="status" className="text-gray-400">Status</Label>
                        <Select 
                            value={editedMachine.status} 
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className={`bg-[#23232B] border-gray-600 text-gray-200 ${editedMachine.status === 'Concluida' ? 'text-green-400' : 'text-red-400'}`}>
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1E] border-gray-700 text-gray-200">
                                <SelectItem value="Concluida">
                                    <span className="text-green-400">Concluída</span>
                                </SelectItem>
                                <SelectItem value="Pendente">
                                    <span className="text-red-400">Pendente</span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="updatedAt" className="text-gray-400">Última Atualização</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="justify-start text-left font-normal bg-[#23232B] border-gray-600 text-gray-200 hover:bg-[#23232B] hover:text-gray-500 cursor-pointer"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                                    {editedMachine.updatedAt ? (
                                        format(new Date(editedMachine.updatedAt), "PPP", { locale: ptBR })
                                    ) : (
                                        <span className="text-gray-400">Selecione a data</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
                                <Calendar
                                    mode="single"
                                    selected={editedMachine.updatedAt ? new Date(editedMachine.updatedAt) : undefined}
                                    onSelect={handleDateChange}
                                    className='bg-[#1A1A1E] text-gray-200 '
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardContent>
            
                <div className=" border-t border-gray-700">
                    {message && (
                        <div className={`p-3 rounded-lg text-center font-medium mb-4 ${message.includes("sucesso") ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}>
                            {message}
                        </div>
                    )}
                    <div className="flex justify-end gap-2 py-4 px-6">
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
                </div>
            </DialogContent>
        </Dialog>
    );
}