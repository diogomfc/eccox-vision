// src/components/layout/app-loader.tsx - CORRIGIDO PARA SSR

"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

import LogoEccox from '../../assets/logo/logo-eccox.svg';
import Image from 'next/image';

interface Particle {
  id: number;
  left: string;
  top: string;
  delay: number;
}

interface AppLoaderProps {
  title?: string;
  subtitle?: string;
  showParticles?: boolean;
  size?: 'small' | 'medium' | 'large';
  overlay?: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({ 
  title = "EccoxVision",
  subtitle = "Inicializando sistema...",
  showParticles = true,
  size = 'large',
  overlay = true
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Configurações de tamanho baseadas na prop size
  const sizeConfig = {
    small: {
      logoSize: "w-8 h-8",
      titleSize: "text-lg",
      subtitleSize: "text-sm",
      loadingWidth: "w-32",
      containerPadding: "p-4"
    },
    medium: {
      logoSize: "w-12 h-12",
      titleSize: "text-xl",
      subtitleSize: "text-base",
      loadingWidth: "w-48",
      containerPadding: "p-6"
    },
    large: {
      logoSize: "w-16 h-16",
      titleSize: "text-3xl",
      subtitleSize: "text-base",
      loadingWidth: "w-64",
      containerPadding: "p-8"
    }
  };

  const currentSize = sizeConfig[size];

  // Gera partículas uma única vez
  useEffect(() => {
    if (showParticles) {
      const generateParticles = (): Particle[] => {
        return Array.from({ length: 50 }, (_, i) => {
          const seedX = (i * 7 + 23) % 100; // Fórmula determinística
          const seedY = (i * 13 + 47) % 100; // Fórmula determinística
          
          return {
            id: i,
            left: `${seedX}%`,
            top: `${seedY}%`,
            delay: (i * 0.1) % 3, // Delay baseado no índice
          };
        });
      };

      setParticles(generateParticles());
    }
  }, [showParticles]);



  const containerClass = overlay 
    ? `fixed inset-0 bg-[#121214] flex items-center justify-center z-50`
    : `flex items-center justify-center ${currentSize.containerPadding}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={containerClass}
    >
      {/* Background com partículas animadas - sempre que habilitado */}
      {showParticles && (
        <div className={overlay ? "absolute inset-0" : "absolute inset-0 pointer-events-none"}>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Conteúdo principal */}
      <div className={`${overlay ? 'relative z-10' : ''} text-center`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative">
            <Image src={LogoEccox} alt="Logo Eccox" className={`${currentSize.logoSize} mx-auto`} />
            <motion.div 
              className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`${currentSize.titleSize} font-bold text-white mb-2 whitespace-nowrap`}
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className={`${currentSize.subtitleSize} text-gray-400 mb-8 whitespace-nowrap`}
        >
          {subtitle}
        </motion.p>
        
        {/* Loading progress */}
        <div className={`${currentSize.loadingWidth} mx-auto`}>
          <div className="flex justify-center space-x-1 mb-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </div>
        
        {size === 'large' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-xs text-gray-500"
          >
            Carregando componentes do sistema...
          </motion.div>
        )}
      </div>

      {/* Gradient overlay para efeito visual - apenas em overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/5 to-purple-900/10 pointer-events-none" />
      )}
    </motion.div>
  );
};

export default AppLoader;