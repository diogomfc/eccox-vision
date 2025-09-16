import React from "react";
import Image from "next/image";
import ImgServerCompleta from "@/assets/images/img-server-status-frente-completa.svg";
import ImgServerWarning from "@/assets/images/img-server-status-frente-warning.svg";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface MachineImageProps {
  name: string;
  description?: string;
  system: string;
  status: string;
  update: string;
  offsetY?: number; // deslocamento vertical opcional em pixels
}

export function MachineImage({ name, description, system, status, update, offsetY = 0 }: MachineImageProps) {
  // Seleciona imagem conforme status
  const isOk = status.toLowerCase().includes("conclu");
  const imgSrc = isOk ? ImgServerCompleta : ImgServerWarning;
  const statusColor = isOk ? "text-green-400" : "text-yellow-400";

  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <div style={{ marginTop: offsetY }}>
        {/* Nome e descrição centralizados */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-200 text-center leading-tight">{name}</h2>
          {description && (
            <div className="text-gray-400 text-center text-sm mt-1">{description}</div>
          )}
        </div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div>
              <Image src={imgSrc} alt="Servidor" width={368} height={482} priority />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-64 bg-[#18181B] border border-[#23232B] shadow-lg rounded-lg p-4">
            <div className="text-white text-xs font-bold mb-2">MANFRAME</div>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Máquina</span><span className="text-white font-semibold">{name}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Sistema</span><span className="text-white font-semibold">{system}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="text-white font-semibold">{status}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">update</span><span className="text-white font-semibold">{update}</span></div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}

