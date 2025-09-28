// src/components/database/DatabaseManager.tsx - COM AUTO-REFRESH

import React, { useState, useEffect } from 'react';
import { Database, Settings, WifiOff, AlertCircle, CheckCircle, Clock, FolderOpen, X, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

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
  const [newPath, setNewPath] = useState(currentStatus.currentPath);
  const [isLoading, setIsLoading] = useState(false);
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setNewPath(currentStatus.currentPath);
      setTestResult(null);
      setShowRefreshPrompt(false);
    }
  }, [isOpen, currentStatus.currentPath]);

  if (!isOpen) return null;

  const handleSelectPath = async () => {
    try {
      if (window.electronAPI && window.electronAPI.selectDatabasePath) {
        const selectedPath = await window.electronAPI.selectDatabasePath();
        if (selectedPath) {
          setNewPath(selectedPath);
          setTestResult(null);
        }
      }
    } catch (error) {
      console.error('Erro ao selecionar caminho:', error);
      setTestResult({
        success: false,
        message: 'Erro ao abrir seletor de arquivo'
      });
    }
  };

  const handleTestConnection = async () => {
    if (!newPath.trim()) {
      setTestResult({ success: false, message: 'Caminho não pode estar vazio' });
      return;
    }
    
    setIsLoading(true);
    setTestResult(null);
    
    try {
      if (window.electronAPI && window.electronAPI.testDatabaseConnection) {
        const result = await window.electronAPI.testDatabaseConnection(newPath);
        setTestResult(result);
      }
    } catch (error) {
      setTestResult({ success: false, message: 'Erro ao testar conexão' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newPath.trim() || !testResult?.success) {
      setTestResult({ success: false, message: 'Execute o teste de conexão primeiro' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (window.electronAPI && window.electronAPI.setDatabasePath) {
        const result = await window.electronAPI.setDatabasePath(newPath);
        
        if (result.success) {
          // Atualiza o status
          if (window.electronAPI.getDatabaseStatus) {
            const newStatus = await window.electronAPI.getDatabaseStatus();
            onStatusUpdate(newStatus);
          }
          
          // Se o caminho mudou, mostra o prompt de refresh
          if (newPath !== currentStatus.currentPath) {
            setShowRefreshPrompt(true);
            return; // Não fecha o modal ainda
          }
          
          onClose();
        } else {
          setTestResult({ success: false, message: result.message });
        }
      }
    } catch (error) {
      setTestResult({ success: false, message: 'Erro ao salvar configuração' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    // Recarrega a página/aplicação
    if (typeof window !== 'undefined' && window.location) {
      window.location.reload();
    }
  };

  const handleSkipRefresh = () => {
    setShowRefreshPrompt(false);
    onClose();
  };

  // Se deve mostrar o prompt de refresh
  if (showRefreshPrompt) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
        <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md mx-4">
          <div className="p-6 text-center">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">
              Banco alterado com sucesso!
            </h3>
            
            <p className="text-sm text-gray-300 mb-6">
              Para carregar os dados do novo banco, é recomendado recarregar a aplicação.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSkipRefresh}
                className="flex-1 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continuar sem recarregar
              </button>
              
              <button
                onClick={handleRefresh}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recarregar agora</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-lg mx-4">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-3">
            <Database className="w-6 h-6 text-blue-400" />
            <span>Configurar Banco de Dados</span>
          </h2>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Status Atual */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Status Atual</h3>
            <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              {currentStatus.status === 'online' ? (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              ) : currentStatus.status === 'offline' ? (
                <WifiOff className="w-5 h-5 text-gray-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-300">
                    {currentStatus.status === 'online' ? 'Conectado' : 'Desconectado'}
                  </span>
                  {currentStatus.message && (
                    <span className="text-xs text-gray-500">• {currentStatus.message}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate" title={currentStatus.currentPath}>
                  {currentStatus.currentPath || 'Não definido'}
                </p>
              </div>
            </div>
          </div>

          {/* Configurar Novo Caminho */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Alterar Localização</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
                placeholder="Caminho para o arquivo de banco..."
                className="flex-1 px-3 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSelectPath}
                className="px-3 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors"
                title="Selecionar arquivo"
              >
                <FolderOpen className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Aviso sobre refresh */}
          {newPath !== currentStatus.currentPath && newPath.trim() && (
            <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
              <div className="flex items-start space-x-2">
                <RefreshCw className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-300">
                  <p className="font-medium">Atenção:</p>
                  <p>Ao alterar o banco, a aplicação será recarregada para mostrar os novos dados.</p>
                </div>
              </div>
            </div>
          )}

          {/* Resultado do Teste */}
          {testResult && (
            <div className={`p-4 rounded-lg border ${
              testResult.success 
                ? 'bg-green-900/20 border-green-700' 
                : 'bg-red-900/20 border-red-700'
            }`}>
              <div className="flex items-start space-x-2">
                {testResult.success ? (
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <span className={`text-sm ${
                  testResult.success ? 'text-green-300' : 'text-red-300'
                }`}>
                  {testResult.message}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800/30">
          <div className="text-xs text-gray-500">
            <p>Formatos suportados: .db • Local ou rede</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleTestConnection}
              disabled={isLoading || !newPath.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isLoading ? 'Testando...' : 'Testar'}
            </button>
            
            <button
              onClick={handleSave}
              disabled={isLoading || !testResult?.success}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isLoading ? 'Salvando...' : 'Aplicar'}
            </button>
          </div>
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