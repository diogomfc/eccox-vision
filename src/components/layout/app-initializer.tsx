// src/components/layout/AppInitializer.tsx 

"use client";

import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import InitialSetupScreen from '../setup/Initial-setup-screen';


interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const [isFirstRun, setIsFirstRun] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se é primeira execução
  useEffect(() => {
    const checkFirstRun = async () => {
      try {
        if (window.electronAPI && window.electronAPI.isFirstRun) {
          const firstRun = await window.electronAPI.isFirstRun();
          setIsFirstRun(firstRun);
        } else {
          // Se API não estiver disponível, assume que não é primeira execução
          setIsFirstRun(false);
        }
      } catch (error) {
        console.error('Erro ao verificar primeira execução:', error);
        setIsFirstRun(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstRun();
  }, []);

  const handleSetupComplete = () => {
    setIsFirstRun(false);
  };

  // Loading inicial
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121214] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Inicializando EccoxVision...</p>
        </div>
      </div>
    );
  }

  // Se é primeira execução, mostra tela de configuração
  if (isFirstRun) {
    return <InitialSetupScreen onSetupComplete={handleSetupComplete} />;
  }

  // Senão, mostra a aplicação normal
  return <>{children}</>;
};

export default AppInitializer;