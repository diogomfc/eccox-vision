"use client";

import { StatsCard } from '@/components/overview/stats-card';
import ImgServerStatus from '../assets/images/img-server-status.svg';
import ImgServerStatusWarning from '../assets/images/img-server-status-warning.svg';
import AppStatusOk from '../assets/images/img-app-status-ok.svg';
import AppStatusWarning from '../assets/images/img-app-status-warning.svg';

import BgImage from '../assets/images/bg-overview.svg';
import { MachineView } from '@/components/machines/machine-view';
import { mockMachines } from '@/mocks/mockMachines';
import Image from 'next/image';
// Importa o componente 'motion' do pacote Motion One para React
import { motion } from "motion/react";

export default function OverviewPage() {
  // Calcular estatísticas das máquinas
  const totalMachines = mockMachines.length;

  // Calcular total de aplicações e seus status
  const appStats = mockMachines.reduce((acc, machine) => {
    const okApps = machine.applications.filter(app => app.status === "Concluida").length;
    const warningApps = machine.applications.filter(app => app.status === "Pendente").length;

    return {
      okApps: acc.okApps + okApps,
      warningApps: acc.warningApps + warningApps
    };
  }, { okApps: 0, warningApps: 0 });

  // Calcular máquinas críticas (menos de 50% dos serviços OK)
  const criticalMachines = mockMachines.filter(machine => {
    const allServices = machine.applications.flatMap(app => app.services);
    const totalServices = allServices.length;
    const okServices = allServices.filter(service => service.status === "Concluida").length;
    const percentComplete = (okServices / totalServices) * 100;
    
    return percentComplete < 50;
  }).length;

  const statsData = [
    { title: 'Total de Máquinas', value: totalMachines, description: 'Mainframe monitorados', imageSrc: ImgServerStatus },
    { title: 'Aplicações instaladas', value: appStats.okApps, description: 'Configuração concluída', imageSrc: AppStatusOk },
    { title: 'Aplicações pendentes', value: appStats.warningApps, description: 'Aguardando configuração', imageSrc: AppStatusWarning },
    { title: 'Máquinas críticas', value: criticalMachines, description: 'Menos de 50% completas', imageSrc: ImgServerStatusWarning },
  ];

  return (
    <main className="relative min-h-screen text-gray-100 py-16 px-6 overflow-hidden h-screen">
      {/* Imagem de fundo */}
      <Image
        src={BgImage}
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Conteúdo sobreposto */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 mt-0">
        {statsData.map((data, index) => (
         
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.5, 
                delay: index * 0.1, 
                ease: "easeOut" 
            }}
          >
            <StatsCard {...data} />
          </motion.div>
        ))}
      </section>

      <div className="relative flex-1">
        <section className="relative z-10">
          <MachineView machines={mockMachines} />
        </section>
      </div>
    </main>
  );
}