// src/components/database/DatabaseManager.tsx 

import React, { useState, useEffect } from 'react';
import { Database, Settings, WifiOff, AlertCircle, CheckCircle, X } from 'lucide-react';
import DatabasePanel from "../shared/database-panel";

interface DatabaseStatus {
  status: 'online' | 'offline' | 'error';
  lastUpdate: string | null;
  currentPath: string;
  message?: string;
}

// Componente de Status (mesmo que antes)
const DatabaseStatusIndicator: React.FC<{
  status: DatabaseStatus;
  onOpenConfig: () => void;
}> = ({ status, onOpenConfig }) => {
  const getStatusIcon = () => {
    switch (status.status) {
      case 'online':
        return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'offline':
        return <WifiOff className="w-3 h-3 text-gray-400" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-red-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status.status) {
      case 'online':
        return 'text-green-400';
      case 'offline':
        return 'text-gray-400';
      case 'error':
        return 'text-red-400';
    }
  };

  const formatLastUpdate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      
      if (diffMins < 1) return 'Agora';
      if (diffMins < 60) return `${diffMins}m`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h`;
      
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d`;
    } catch {
      return '?';
    }
  };

  return (
    <div 
      className="flex items-center space-x-1.5 px-2 py-1.5 rounded-md bg-transparent border border-gray-600 cursor-pointer hover:bg-[#213444] transition-colors backdrop-blur-sm"
      onClick={onOpenConfig}
      title={`Banco: ${status.status} - ${status.message || 'Clique para configurar'}`}
    >
      <Database className="w-3 h-3 text-gray-300" />
      {getStatusIcon()}
      <span className={`text-xs font-medium ${getStatusColor()}`}>
        {status.status === 'online' ? 'ON' : status.status === 'offline' ? 'OFF' : 'ERR'}
      </span>
      
      {status.lastUpdate && (
        <span className="text-xs text-gray-400">
          {formatLastUpdate(status.lastUpdate)}
        </span>
      )}
      
      <Settings className="w-2.5 h-2.5 text-gray-500" />
    </div>
  );
};



// Modal com funcionalidade de refresh
const DatabaseConfigModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentStatus: DatabaseStatus;
  onStatusUpdate: (status: DatabaseStatus) => void;
}> = ({ isOpen, onClose, currentStatus, onStatusUpdate }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [showRestartWarning, setShowRestartWarning] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTestResult(null);
      setShowRestartWarning(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDatabaseActivated = async (success: boolean, message?: string) => {
    if (success) {
      setTestResult({ success: true, message: 'Fonte de dados alterada! Reiniciando aplicação...' });
      
      // Atualizar status
      try {
        if ((window as any).electronAPI?.getDatabaseStatus) {
          const newStatus = await (window as any).electronAPI.getDatabaseStatus();
          onStatusUpdate(newStatus);
        }
      } catch (err) {
        console.warn('Erro ao atualizar status:', err);
      }
      
      setTimeout(() => {
        handleAutoReload();
      }, 1500);
    } else {
      setTestResult({ success: false, message: message || 'Falha ao ativar banco' });
    }
  };

  const handleAutoReload = () => {
    try {
      console.log('Iniciando reload após mudança de banco de dados...');
      
      // Para Electron, limpa o hash e vai para raiz
      if (typeof window !== 'undefined') {
        // Limpar o hash primeiro
        window.location.hash = '/';
        
        // Aguardar um frame e então recarregar a página
        requestAnimationFrame(() => {
          if (window.location && window.location.reload) {
            window.location.reload();
          }
        });
      }
    } catch (reloadError) {
      console.error('Erro ao recarregar automaticamente:', reloadError);
      // Fallback: apenas fecha o modal e deixa o usuário navegar manualmente
      onClose();
    }
  };

  return (
    
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-2">
      <div className="bg-gradient-to-br from-[#111113] to-[#0F0F11] border border-blue-500/30 rounded-lg lg:rounded-xl shadow-2xl w-full max-w-md lg:max-w-lg max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-3 lg:px-4 lg:py-4 border-b bg-gradient-to-r from-blue-600/10 to-blue-700/5 border-blue-500/30">
          <h2 className="text-base lg:text-lg font-semibold text-white flex items-center space-x-2">
            <Database className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
            <span>Configurar Banco de Dados</span>
          </h2>
          <button
            onClick={onClose}
            title="Fechar configuração"
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 lg:p-4 space-y-3 lg:space-y-4 overflow-y-auto max-h-[calc(90vh-4rem)]">
          
          {/* Status Atual */}
          <div>
            <h3 className="text-xs font-medium text-gray-300 mb-1.5 lg:mb-2">Status Atual</h3>
            <div className="flex items-center space-x-2 p-2 lg:p-2.5 bg-gray-800/50 rounded-md lg:rounded-lg border border-gray-700">
              {currentStatus.status === 'online' ? (
                <CheckCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-400 flex-shrink-0" />
              ) : currentStatus.status === 'offline' ? (
                <WifiOff className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-red-400 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-medium text-gray-300">
                    {currentStatus.status === 'online' ? 'Conectado' : 'Desconectado'}
                  </span>
                  {currentStatus.message && (
                    <span className="text-xs text-gray-500">• {currentStatus.message}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate" title={currentStatus.currentPath}>
                  {currentStatus.currentPath || 'Não definido'}
                </p>
              </div>
            </div>
          </div>

          {/* Database Panel Reutilizável */}
          <DatabasePanel
            mode="manager"
            activeDatabasePath={currentStatus.currentPath}
            onDatabaseActivated={handleDatabaseActivated}
            autoShowAddWhenEmpty={false}
            className="space-y-3"
          />

          {/* Restart Warning */}
          {showRestartWarning && (
            <div className="p-3 bg-orange-900/20 border border-orange-700 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-orange-300">
                  <p className="font-medium mb-1">Atenção: Reinício Necessário</p>
                  <p>Ao alterar a fonte de dados, a aplicação será <strong>reiniciada automaticamente</strong> para carregar os novos dados corretamente.</p>
                </div>
              </div>
            </div>
          )}

          {/* Resultado do Teste */}
          {testResult && (
            <div className={`p-3 rounded-lg border ${
              testResult.success 
                ? 'bg-green-900/20 border-green-700' 
                : 'bg-red-900/20 border-red-700'
            }`}>
              <div className="flex items-start space-x-2">
                {testResult.success ? (
                  <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <span className={`text-xs ${
                  testResult.success ? 'text-green-300' : 'text-red-300'
                }`}>
                  {testResult.message}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente Principal (mesmo que antes)
const DatabaseManager: React.FC = () => {
  const [status, setStatus] = useState<DatabaseStatus>({
    status: 'offline',
    lastUpdate: null,
    currentPath: '',
    message: 'Carregando...'
  });
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const loadStatus = async () => {
    try {
      if (window.electronAPI && window.electronAPI.getDatabaseStatus) {
        const currentStatus = await window.electronAPI.getDatabaseStatus();
        setStatus(currentStatus);
      } else {
        setStatus(prev => ({ ...prev, status: 'error', message: 'API não disponível' }));
      }
    } catch (error) {
      console.error('Erro ao carregar status do banco:', error);
      setStatus(prev => ({ ...prev, status: 'error', message: 'Erro ao carregar status' }));
    }
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DatabaseStatusIndicator
        status={status}
        onOpenConfig={() => setIsConfigOpen(true)}
      />
      
      <DatabaseConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        currentStatus={status}
        onStatusUpdate={setStatus}
      />
    </>
  );
};

export default DatabaseManager;