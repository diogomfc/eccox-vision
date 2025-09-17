// src/components/machines/machine-view.tsx

"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { List, Grid, Search, ChevronDown, CaptionsOff, Loader2 } from "lucide-react";

import { Machines } from "@/types/machines";
import { MachineList } from "./machine-list";
import { MachineGrid } from "./machine-grid";

import { StatsClient } from "@/components/overview/stats-client";
import Image from "next/image";
import BgImage from '@/assets/images/bg-overview.svg';
import ImgServerStatus from '@/assets/images/img-server-status.svg';
import ImgServerStatusWarning from '@/assets/images/img-server-status-warning.svg';
import AppStatusOk from '@/assets/images/img-app-status-ok.svg';
import AppStatusWarning from '@/assets/images/img-app-status-warning.svg';

export function MachineView() {
    const [machines, setMachines] = useState<Machines[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "Concluida" | "Pendente">("all");
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchMachines = async () => {
        setIsLoading(true);
        try {
            const fetchedMachines = await window.electronAPI.getAllMachines();
            setMachines(fetchedMachines);
        } catch (error) {
            console.error("Falha ao carregar máquinas:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMachines();
    }, []);

    const filteredMachines = useMemo(() => {
        return machines.filter((machine) => {
            const matchesSearch = machine.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || machine.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [machines, searchQuery, statusFilter]);

    const statsData = useMemo(() => {
        const totalMachines = machines.length;
        const appStats = machines.reduce((acc, machine) => {
            const okApps = machine.applications?.filter(app => app.status === "Concluida").length || 0;
            const warningApps = machine.applications?.filter(app => app.status === "Pendente").length || 0;
            return {
                okApps: acc.okApps + okApps,
                warningApps: acc.warningApps + warningApps
            };
        }, { okApps: 0, warningApps: 0 });
    
        const criticalMachines = machines.filter(machine => {
            const allServicesInMachine = machine.applications?.flatMap(app => app.services) || [];
            const totalServices = allServicesInMachine.length;
            const okServices = allServicesInMachine.filter(service => service.status === "Concluida").length;
            const percentComplete = totalServices > 0 ? (okServices / totalServices) * 100 : 0;
            return percentComplete < 50;
        }).length;

        return [
            { title: 'Total de Máquinas', value: totalMachines, description: 'Mainframe monitorados', imageSrc: ImgServerStatus },
            { title: 'Aplicações instaladas', value: appStats.okApps, description: 'Configuração concluída', imageSrc: AppStatusOk },
            { title: 'Aplicações pendentes', value: appStats.warningApps, description: 'Aguardando configuração', imageSrc: AppStatusWarning },
            { title: 'Máquinas críticas', value: criticalMachines, description: 'Menos de 50% completas', imageSrc: ImgServerStatusWarning },
        ];
    }, [machines]);
    
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
              setIsStatusDropdownOpen(false);
          }
      };
      if (isStatusDropdownOpen) {
          document.addEventListener('mousedown', handleOutsideClick);
      }
      return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [isStatusDropdownOpen]);

    if (isLoading) {
        return (
            <main className="relative flex flex-col min-h-screen text-gray-100 pt-8 px-6">
                <div className="flex-1 flex items-center justify-center text-gray-400">
                    <Loader2 className="animate-spin mr-2" /> Carregando máquinas...
                </div>
            </main>
        );
    }
    
    return (
        <main className="relative flex flex-col h-screen text-gray-100 pt-16 px-6 overflow-hidden">
            <Image
                src={BgImage}
                alt="Background"
                fill
                className="object-cover z-0"
                priority
            />
            <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
                {/* Cards */}
                <StatsClient statsData={statsData} />
                
                {/*  Filtros */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex justify-between items-center mb-4 gap-4 flex-shrink-0"
                >
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar máquina..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1E] rounded-lg text-white placeholder-gray-400 focus:outline-none border border-transparent focus:border-[#2B62EC]/20 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1E] rounded-lg hover:bg-[#0F0F10] transition-colors border border-transparent focus:border-[#2B62EC]/20"
                        >
                            <span className="text-gray-400">Status:</span>
                            <span className={`
                                ${statusFilter === "all" ? "text-white" : ""}
                                ${statusFilter === "Concluida" ? "text-[#32D583]" : ""}
                                ${statusFilter === "Pendente" ? "text-[#F04438]" : ""}
                            `}>
                                {statusFilter === "all" ? "Todos" : statusFilter}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isStatusDropdownOpen ? 'transform rotate-180' : ''}`} />
                        </button>

                        {isStatusDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A1E] rounded-lg shadow-lg py-1 z-10 border border-[#2B62EC]/10">
                                <button
                                    onClick={() => { setStatusFilter("all"); setIsStatusDropdownOpen(false); }}
                                    className="w-full px-4 py-2 text-left text-white hover:bg-[#0F0F10] transition-colors flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                    Todos
                                </button>
                                <button
                                    onClick={() => { setStatusFilter("Concluida"); setIsStatusDropdownOpen(false); }}
                                    className="w-full px-4 py-2 text-left text-[#32D583] hover:bg-[#0F0F10] transition-colors flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 rounded-full bg-[#32D583]"></div>
                                    Concluida
                                </button>
                                <button
                                    onClick={() => { setStatusFilter("Pendente"); setIsStatusDropdownOpen(false); }}
                                    className="w-full px-4 py-2 text-left text-[#F04438] hover:bg-[#0F0F10] transition-colors flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 rounded-full bg-[#F04438]"></div>
                                    Pendente
                                </button>
                            </div>
                        )}
                        
                        <button
                            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                            className="p-2 rounded-lg bg-[#1A1A1E] hover:bg-[#0F0F10] transition-colors"
                            title={viewMode === "list" ? "Visualizar em grade" : "Visualizar em lista"}
                        >
                            {viewMode === "list" ? (
                                <Grid className="w-5 h-5 text-gray-400" />
                            ) : (
                                <List className="w-5 h-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                </motion.div>
                 
                 {/* Lista */}
                <div className="flex-1 overflow-y-auto pr-2 pb-4 custom-scrollbar">
                    {filteredMachines.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <CaptionsOff className="w-12 h-12 text-gray-600 mb-4" />
                            <h3 className="text-xl font-semibold text-white">Nenhuma máquina encontrada</h3>
                            <p className="text-gray-400 mt-2">
                                Não localizamos nenhuma máquina com os filtros aplicados.
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            key={viewMode}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-2"
                        >
                            {viewMode === "list" ? (
                                <MachineList machines={filteredMachines} />
                            ) : (
                                <MachineGrid machines={filteredMachines} />
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </main>
    );
}