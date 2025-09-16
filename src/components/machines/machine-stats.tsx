// src/components/machines/machine-stats.tsx
"use client";

import { CustomGauge } from "../ui/custom-gauge";


interface MachineStatsProps {
    total: number;
    percent: number;
    pendentes: number;
    instalados: number;
    offsetY?: number;
}

export function MachineStats({ total, percent, pendentes, instalados, offsetY = 0  }: MachineStatsProps) {
    // Definimos as cores para cada velocímetro
    const installedColor = "#45D18C"; // Cor para "Serviços Instalados"
    const completeColor = "#F9BE46"; // Cor para "Instalação Completa"

    // Lógica para a cor do velocímetro de "Serviços Pendentes"
    const pendingColor = pendentes === 0 ? "#45D18C" : "#F96666";
    const pendingBackgroundColor = pendentes === 0 ? "#45D18C" : "#2D3748";
  
    return (
        <div className="flex justify-around items-center w-full max-w-4xl" style={{ transform: `translateY(${offsetY}px)` }}>
            {/* Velocímetro para Serviços Instalados */}
            <CustomGauge
                value={instalados}
                total={total}
                description="serviços instalados"
                percentage={total > 0 ? (instalados / total) * 100 : 0}
                colorProgresso={installedColor}
            />
            
            {/* Velocímetro para Instalação Completa */}
            <CustomGauge
                value={percent}
                showPercentSymbol={true}
                total={100}
                description="instalação completa"
                percentage={percent}
                colorProgresso={completeColor}
            />
            
            {/* Velocímetro para Serviços Pendentes */}
            <CustomGauge
                value={pendentes}
                total={total}
                description="serviços pendentes"
                percentage={total > 0 ? (pendentes / total) * 100 : 0}
                colorProgresso={pendingColor}
                colorBackground={pendingBackgroundColor}
            />
        </div>
    );
}