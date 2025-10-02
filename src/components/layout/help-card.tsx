"use client";

import React from 'react';
import { HelpCircle, Mail, User, Coffee, Github } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export function HelpCard() {
  const appVersion = '1.0.0';
  const buildDate = '2025-10-02';
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          className="flex items-center space-x-1.5 px-2 py-1.5 rounded-md bg-transparent border border-gray-600 cursor-pointer hover:bg-[#213444] transition-colors backdrop-blur-sm"
          title="Ajuda e informações do sistema"
        >
          <HelpCircle className="w-3 h-3 text-gray-300" />
          <span className="text-xs font-medium text-gray-300">
            Help
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-[#1A1A1D] border-gray-700 text-gray-200">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">EccoxVision</h4>
              <p className="text-xs text-gray-400">Sistema de Monitoramento</p>
            </div>
          </div>

          {/* Informações do Sistema */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Versão:</span>
              <span className="text-gray-200 font-medium">{appVersion}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Build:</span>
              <span className="text-gray-200 font-medium">{buildDate}</span>
            </div>
          </div>

          {/* Separador */}
          <div className="border-t border-gray-700"></div>

          {/* Informações do Autor */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Desenvolvedor</span>
            </div>
            <div className="ml-6 space-y-1">
              <p className="text-sm text-gray-200">Diogo Silva</p>
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-gray-400" />
                <a 
                  href="mailto:diogo.silva@eccox.com.br" 
                  className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
                >
                  diogo.silva@eccox.com.br
                </a>
              </div>
            </div>
          </div>

           {/* Links de Suporte */}
          {/* <div className="border-t border-gray-700"></div>

         
          <div className="space-y-2">
            <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Suporte & Feedback
            </h5>
            <div className="space-y-1">
              <button className="w-full text-left text-xs text-gray-400 hover:text-blue-400 transition-colors py-1">
                • Reportar Bug ou Problema
              </button>
              <button className="w-full text-left text-xs text-gray-400 hover:text-blue-400 transition-colors py-1">
                • Sugestões de Melhoria
              </button>
              <button className="w-full text-left text-xs text-gray-400 hover:text-blue-400 transition-colors py-1">
                • Documentação & Guias
              </button>
            </div>
          </div> */}

          {/* Footer */}
          <div className="pt-2 border-t border-gray-700">
            <p className="text-xs text-center text-gray-500">
              © 2025 EccoxVision
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}