// src/components/layout/ReloadButton.tsx - CRIAR ESTE ARQUIVO

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const ReloadButton: React.FC = () => {
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = () => {
    setIsReloading(true);
    
    // Simula um delay mínimo para feedback visual
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.location) {
        window.location.reload();
      }
    }, 500);
  };

  return (
    <div 
      className="flex items-center space-x-1.5 px-2 py-1.5 rounded-md bg-transparent border border-gray-600 cursor-pointer hover:bg-[#213444] transition-colors backdrop-blur-sm"
      onClick={handleReload}
      title="Recarregar aplicação"
    >
      <RefreshCw className={`w-3 h-3 text-gray-300 ${isReloading ? 'animate-spin' : ''}`} />
      <span className="text-xs font-medium text-gray-300">
        {isReloading ? 'Recarregando...' : 'Reload'}
      </span>
    </div>
  );
};

export default ReloadButton;