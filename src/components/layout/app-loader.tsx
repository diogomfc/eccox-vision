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

const AppLoader: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  // Gera partículas apenas no cliente após a montagem
  useEffect(() => {
    // Gera partículas com posições fixas baseadas no índice para consistência
    const generateParticles = (): Particle[] => {
      return Array.from({ length: 50 }, (_, i) => {
        // Usa o índice para gerar posições consistentes
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
    setMounted(true);
  }, []);

  // Não renderiza partículas até estar montado no cliente
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#121214] flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="relative">
              {/* <Database className="w-16 h-16 text-blue-500 mx-auto" /> */}
               <Image src={LogoEccox} alt="Logo Eccox" className="w-16 h-16 mx-auto" />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-2"
          >
            EccoxVision
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 mb-8"
          >
            Inicializando sistema...
          </motion.p>
          
          {/* Loading bar simples */}
          <div className="w-64 h-1 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#121214] flex items-center justify-center z-50"
      style={{ opacity: 0 }}
      onAnimationComplete={() => {
        // Força o estilo inline após a animação
        const element = document.querySelector('[data-loader="true"]') as HTMLElement;
        if (element) {
          element.style.opacity = '1';
        }
      }}
      data-loader="true"
    >
      {/* Background com partículas animadas - apenas após montagem */}
      <div className="absolute inset-0">
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

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative">
            {/* <Database className="w-16 h-16 text-blue-500 mx-auto" /> */}
            <Image src={LogoEccox} alt="Logo Eccox" className="w-16 h-16 mx-auto" />
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-2"
        >
          EccoxVision
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mb-8"
        >
          Inicializando sistema...
        </motion.p>
        
        {/* Loading progress */}
        <div className="w-64 mx-auto">
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
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs text-gray-500"
        >
          Carregando componentes do sistema...
        </motion.div>
      </div>

      {/* Gradient overlay para efeito visual */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/5 to-purple-900/10 pointer-events-none" />
    </motion.div>
  );
};

export default AppLoader;