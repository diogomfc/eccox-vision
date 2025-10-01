"use client";

import { useEffect, useState } from 'react';
import { MachineView } from '@/components/machines/machine-view';
import ReportsPage from '@/app/reports/page';
import { MachineDetailsClient } from '@/components/machines/details/machine-details-client';
import MachineUpdateClient from '@/components/machines/machine-update-client';
import CreateMachinePage from '@/app/machines/create/page';
import { ElectronDebug } from '@/lib/electron-debug';

export default function Home() {
    const [currentRoute, setCurrentRoute] = useState('/');
    const [routeParams, setRouteParams] = useState<{[key: string]: string}>({});

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1) || '/';
            
            ElectronDebug.log('Navegação para:', hash);
            
            // Parse route and params
            if (hash.startsWith('/machines/edit/')) {
                const id = hash.split('/').pop() || '';
                setCurrentRoute('/machines/edit/:id');
                setRouteParams({ id });
                ElectronDebug.log('Rota dinâmica - Editar máquina:', id);
            } else if (hash.startsWith('/machines/') && hash !== '/machines/create') {
                const id = hash.split('/').pop() || '';
                setCurrentRoute('/machines/:id');
                setRouteParams({ id });
                ElectronDebug.log('Rota dinâmica - Ver máquina:', id);
            } else {
                setCurrentRoute(hash);
                setRouteParams({});
                ElectronDebug.log('Rota estática:', hash);
            }
        };

        // Debug inicial
        ElectronDebug.log('Inicializando aplicação EccoxVision');
        
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Render based on current route
    switch (currentRoute) {
        case '/':
            return (
                <main className="">
                    <MachineView />
                </main>
            );
            
        case '/reports':
            return <ReportsPage />;
            
        case '/machines/create':
            return <CreateMachinePage />;
            
        case '/machines/:id':
            return <MachineDetailsClient machineId={routeParams.id} />;
            
        case '/machines/edit/:id':
            return <MachineUpdateClient machineId={routeParams.id} />;
            
        default:
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                        <p className="text-gray-400">Página não encontrada</p>
                    </div>
                </div>
            );
    }
}