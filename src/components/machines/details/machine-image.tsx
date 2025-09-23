import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ServerSvg from "../shared/server-svg";
import { StatusType } from "@/types/machines";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MachineImageProps {
  name: string;
  description?: string;
  system: string;
  status: StatusType;
  update: string;
  offsetY?: number; // deslocamento vertical opcional em pixels
}

export function MachineImage({
  name,
  description,
  system,
  status,
  update,
  offsetY = 0,
}: MachineImageProps) {
  // Seleciona imagem conforme status

  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <div style={{ marginTop: offsetY }}>
        {/* Nome e descrição centralizados */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-200 text-center leading-tight">
            {name}
          </h2>
          {description && (
            <div className="text-gray-400 text-center text-sm mt-1">
              {description}
            </div>
          )}
        </div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div>
              {/* <Image src={imgSrc} alt="Servidor" width={368} height={482} priority /> */}
              <ServerSvg
                status={status}
                className={`w-[169px] h-[305px] absolute translate-x-2`}
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-64 bg-[#18181B] border border-[#23232B] shadow-lg rounded-lg p-4">
            <div className="text-white text-xs font-bold mb-2">MANFRAME</div>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Máquina</span>
                <span className="text-white font-semibold">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sistema</span>
                <span className="text-white font-semibold">{system}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className={`font-semibold ${
                  status === "Concluida" ? "text-green-400" : status === "Pendente" ? "text-red-400" : "text-yellow-400"
                }`}>{status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">update</span>
                <span className="text-white font-semibold">
                  {update
                    ? format(new Date(update), "dd/MM/yy", { locale: ptBR })
                    : "N/A"}
                </span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
