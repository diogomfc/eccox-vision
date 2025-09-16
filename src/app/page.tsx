import { getAllMachines } from '@/server/machine-repository';
import Image from 'next/image';
import { StatsClient } from '@/components/overview/stats-client'; 
import { MachineView } from '@/components/machines/machine-view'; 

import BgImage from '../assets/images/bg-overview.svg';
import ImgServerStatus from '../assets/images/img-server-status.svg';
import ImgServerStatusWarning from '../assets/images/img-server-status-warning.svg';
import AppStatusOk from '../assets/images/img-app-status-ok.svg';
import AppStatusWarning from '../assets/images/img-app-status-warning.svg';


export default function Home() {
    // Buscar máquinas do banco (isso é uma operação de servidor)
    const machines = getAllMachines();

    // Calcular estatísticas das máquinas (isso também é feito no servidor)
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
        const allServices = machine.applications?.flatMap(app => app.services) || [];
        const totalServices = allServices.length;
        const okServices = allServices.filter(service => service.status === "Concluida").length;
        const percentComplete = totalServices > 0 ? (okServices / totalServices) * 100 : 0;
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
            <Image
                src={BgImage}
                alt="Background"
                fill
                className="object-cover z-0"
                priority
            />

            {/* Renderiza o Client Component que lida com a animação */}
            <StatsClient statsData={statsData} />

            <div className="relative flex-1">
                <section className="relative z-10">
                    <MachineView machines={machines} />
                </section>
            </div>
        </main>
    );
}