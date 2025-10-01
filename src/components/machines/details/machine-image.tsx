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
import { parseBrazilianDate } from "@/lib/utils";

interface MachineImageProps {
  name: string;
  description?: string;
  responsible: string;
  system: string;
  status: StatusType;
  update: string;
  offsetY?: number; // deslocamento vertical opcional em pixels
}

export function MachineImage({
  name,
  description,
  responsible,
  system,
  status,
  update,
  offsetY = 0,
}: MachineImageProps) {
  const deliveryDate = parseBrazilianDate(update);

  return (
    <div className="flex flex-col items-center justify-center cursor-pointer py-4">
      {/* Container principal centralizado */}
      <div className="flex flex-col items-center space-y-4 lg:space-y-6">
        
        {/* Nome e descrição - com quebra de texto otimizada */}
        <div className="text-center max-w-[280px] sm:max-w-[320px] lg:max-w-[380px]">
          <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-200 leading-tight break-words hyphens-auto">
            {name}
          </h2>
          {description && (
            <div className="text-gray-400 text-xs sm:text-sm lg:text-base mt-1.5 lg:mt-2 break-words leading-relaxed">
              {description}
            </div>
          )}
        </div>

        {/* Imagem do servidor - sempre centralizada e responsiva */}
        <div className="flex items-center justify-center my-2 lg:my-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <ServerSvg
                  status={status}
                  className="
                    w-[100px] h-[170px]     /* padrão - mobile */
                    sm:w-[120px] sm:h-[200px]  /* telas pequenas */
                    md:w-[140px] md:h-[230px]  /* tablets */
                    lg:w-[160px] lg:h-[270px]  /* desktop */
                    xl:w-[180px] xl:h-[300px]  /* telas grandes */
                  "
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 bg-[#18181B] border border-[#23232B] shadow-lg rounded-lg p-3 lg:p-4">
              <div className="text-white text-xs font-bold mb-2">MAINFRAME</div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Máquina</span>
                  <span className="text-white font-semibold truncate max-w-[120px]" title={name}>
                    {name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Sistema</span>
                  <span className="text-white font-semibold truncate max-w-[120px]" title={system}>
                    {system}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span
                    className={`font-semibold ${
                      status === "Concluída"
                        ? "text-green-400"
                        : status === "Pendente"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    {update && new Date(update).getTime() >= Date.now()
                      ? "Previsão conclusão:"
                      : "Última Atualização:"}
                  </span>
                  <span className="text-white font-semibold">
                    {update
                      ? format(new Date(update), "dd/MM/yy", {
                          locale: ptBR,
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        {/* Informações adicionais - posição fixa abaixo (opcional) */}
        <div className="text-center text-xs text-gray-500 max-w-xs sm:max-w-sm">
          <p>Previsão de conclusão: {update ? format(new Date(update), "dd/MM/yy", { locale: ptBR }) : "N/A"}</p>
        </div>
        
      </div>
    </div>
  );
}
