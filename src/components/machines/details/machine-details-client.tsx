// src/components/machines/machine-details-client.tsx

"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';

import { motion } from "framer-motion";
import type { Machines, Application, Service } from "@/types/machines";
import { Loader2 } from "lucide-react";
import { ApplicationList } from './application-list';
import { MachineStats } from './machine-stats';
import { MachineImage } from './machine-image';
import { ServiceList } from './service-list';

interface MachineDetailsClientProps {
    machineId: string;
}

export function MachineDetailsClient({ machineId }: MachineDetailsClientProps) {
    const [machine, setMachine] = useState<Machines | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApplicationName, setSelectedApplicationName] = useState("");

    // Função para buscar os detalhes completos da máquina
    const fetchMachineDetails = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedMachine = await window.electronAPI.getMachineById(machineId);
            setMachine(fetchedMachine);
        } catch (error) {
            console.error("Falha ao carregar a máquina:", error);
        } finally {
            setIsLoading(false);
        }
    }, [machineId]);

    // Efeito para carregar os dados iniciais da máquina
    useEffect(() => {
        fetchMachineDetails();
    }, [fetchMachineDetails]);

    // Callback para lidar com atualizações nas aplicações
    const handleApplicationsUpdated = useCallback(() => {
        // Quando as aplicações são atualizadas (criadas, editadas ou excluídas),
        // recarregamos a máquina inteira para garantir que o estado seja consistente.
        fetchMachineDetails();
    }, [fetchMachineDetails]);
    
    // Callback para lidar com atualizações nos serviços
    const handleServicesUpdated = useCallback((updatedServices: Service[]) => {
        // Encontra a aplicação selecionada para atualizar sua lista de serviços
        const updatedMachine = { ...machine! };
        const appIndex = updatedMachine.applications.findIndex(app => app.name === selectedApplicationName);

        if (appIndex !== -1) {
            updatedMachine.applications[appIndex].services = updatedServices;
            setMachine(updatedMachine);
        }
        
        // Embora a atualização local seja rápida, a melhor prática é recarregar
        // os dados do banco de dados para garantir consistência.
        fetchMachineDetails();
    }, [machine, selectedApplicationName, fetchMachineDetails]);

    // Outras lógicas (filtragem, estatísticas, etc.)
    const handleApplicationClick = (appName: string) => {
        setSelectedApplicationName(appName === selectedApplicationName ? "" : appName);
    };
    
    const allServices = useMemo(() => {
        return machine?.applications.flatMap((app) => app.services) || [];
    }, [machine]);
    
    const statsData = useMemo(() => {
        const totalServices = allServices.length;
        const okServices = allServices.filter((service) => service.status === "Concluída").length;
        const pendentes = totalServices - okServices;
        const healthPercentage = totalServices > 0 ? Math.round((okServices / totalServices) * 100) : 0;
        return {
            total: totalServices,
            percent: healthPercentage,
            pendentes,
            instalados: okServices
        };
    }, [allServices]);
    
    const applicationsList = useMemo(() => {
        return machine?.applications.map(app => {
            const total = app.services.length;
            const concluidos = app.services.filter(s => s.status === "Concluída").length;
            const percent = total > 0 ? Math.round((concluidos / total) * 100) : 0;
            return {
                ...app,
                subItems: total,
                percent,
                instalados: concluidos,
                totalServices: total,
            };
        }) || [];
    }, [machine]);
    
    const mainInfo = useMemo(() => {
        if (!machine) return null;
        return {
            name: machine.name,
            description: machine.description || "",
            responsible: machine.machineResponsible || "Não definido",
            system: machine.version || "Z/OS 3.1",
            status: machine.status || "Concluída",
            update: machine.updatedAt || "12/09/2025"
        };
    }, [machine]);
    
    const displayedServices = useMemo(() => {
        if (selectedApplicationName) {
            const app = machine?.applications.find(a => a.name === selectedApplicationName);
            return app ? app.services : [];
        }
        return allServices;
    }, [selectedApplicationName, machine?.applications, allServices]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-400">
                <Loader2 className="animate-spin mr-2" /> Carregando detalhes da máquina...
            </div>
        );
    }
    
    if (!machine || !mainInfo) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl text-white">Máquina não encontrada</h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <ApplicationList
                    machine={ 
                        {   
                            id: machine.id,
                            name: machine.name, 
                            system: machine.version || "Desconhecido",
                            description: machine.description || "Desconhecido"
                        } }
                    applications={applicationsList}
                    onSelectApp={handleApplicationClick}
                    selectedApp={selectedApplicationName}
                    onApplicationsUpdated={handleApplicationsUpdated}
                />
            </motion.div>
            <motion.div
                className="md:col-span-2 flex flex-col items-center gap-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
                <MachineStats
                    total={statsData.total}
                    percent={statsData.percent}
                    pendentes={statsData.pendentes}
                    instalados={statsData.instalados}
                    offsetY={20}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                    <MachineImage {...mainInfo} offsetY={20} />
                </motion.div>
            </motion.div>
            <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
                <ServiceList 
                    services={displayedServices} 
                    onServicesUpdated={handleServicesUpdated}
                />
            </motion.div>
        </div>
    );
}