// src/components/layout/page-loader.tsx

"use client";

import React from 'react';
import AppLoader from './app-loader';

interface PageLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = "Carregando dados...",
  size = 'medium',
  fullScreen = false
}) => {
  return (
    <AppLoader
      title="Carregando"
      subtitle={message}
      showParticles={fullScreen}
      size={size}
      overlay={fullScreen}
    />
  );
};

export default PageLoader;