// src/components/layout/AppInitializer.tsx 

"use client";

import React, { useState, useEffect } from 'react';

import AppLoader from '@/components/layout/app-loader';
import InitialSetupScreen from '../setup/Initial-setup-screen';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const [needsInitialSetup, setNeedsInitialSetup] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função auxiliar para aplicar delay mínimo
  const finishLoading = (startTime: number, minLoadTime: number, setupNeeded: boolean) => {
    setNeedsInitialSetup(setupNeeded);
    
    const elapsedTime = Date.now() - startTime;
    const remainingTime = minLoadTime - elapsedTime;
    
    if (remainingTime > 0) {
      setTimeout(() => setIsLoading(false), remainingTime);
    } else {
      setIsLoading(false);
    }
  };

  // Verifica se precisa mostrar a tela de configuração inicial
  useEffect(() => {
    const checkInitializationStatus = async () => {
      const startTime = Date.now();
      const minLoadTime = 2500; // 2.5 segundos mínimo
      
      try {
        // Primeiro verifica se é primeira execução
        let isFirstRun = true;
        if (window.electronAPI?.isFirstRun) {
          isFirstRun = await window.electronAPI.isFirstRun();
        }

        // Se não é primeira execução, verifica se há banco ativo configurado
        if (!isFirstRun) {
          try {
            // Verifica se há uma configuração de banco ativo
            if (window.electronAPI?.getAppConfig) {
              const config = await window.electronAPI.getAppConfig();
              const hasDatabasePath = !!(config?.databasePath);
              
              // Se tem banco configurado, não precisa do setup
              if (hasDatabasePath) {
                finishLoading(startTime, minLoadTime, false);
                return;
              }
            }

            // Fallback: verifica se há bancos salvos como indicador
            if ((window as any).electronAPI?.getSavedDatabases) {
              const savedDatabases = await (window as any).electronAPI.getSavedDatabases();
              const hasSavedDatabases = Array.isArray(savedDatabases) && savedDatabases.length > 0;
              
              if (hasSavedDatabases) {
                finishLoading(startTime, minLoadTime, false);
                return;
              }
            }
          } catch (error) {
            console.warn('Erro ao verificar configuração de banco:', error);
          }
        }

        // Se chegou até aqui, precisa do setup inicial
        finishLoading(startTime, minLoadTime, true);

      } catch (error) {
        console.error('Erro ao verificar status de inicialização:', error);
        // Em caso de erro, assume que precisa do setup
        finishLoading(startTime, minLoadTime, true);
      }
    };

    checkInitializationStatus();
  }, []);

  const handleSetupComplete = () => {
    // Após completar o setup, não precisa mais mostrar a tela inicial
    setNeedsInitialSetup(false);
  };

  // Loading inicial
  if (isLoading) {
    return <AppLoader />;
  }

  // Se precisa de configuração inicial, mostra tela de setup
  if (needsInitialSetup) {
    return <InitialSetupScreen onSetupComplete={handleSetupComplete} />;
  }

  // Senão, mostra a aplicação normal (banco já configurado)
  return <>{children}</>;
};

export default AppInitializer;