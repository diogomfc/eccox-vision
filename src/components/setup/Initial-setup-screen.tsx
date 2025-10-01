// src/components/setup/InitialSetupScreen.tsx - CRIAR ESTE ARQUIVO

import React, { useState } from 'react';
import { Database, FolderOpen, CheckCircle, AlertCircle, Settings, Loader } from 'lucide-react';

interface InitialSetupScreenProps {
  onSetupComplete: () => void;
}

const InitialSetupScreen: React.FC<InitialSetupScreenProps> = ({ onSetupComplete }) => {
  const [databasePath, setDatabasePath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSelectPath = async () => {
    try {
      if (window.electronAPI && window.electronAPI.selectDatabasePath) {
        const selectedPath = await window.electronAPI.selectDatabasePath();
        if (selectedPath) {
          setDatabasePath(selectedPath);
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
    if (!databasePath.trim()) {
      setTestResult({ success: false, message: 'Selecione um local para o banco de dados' });
      return;
    }
    
    setIsLoading(true);
    setTestResult(null);
    
    try {
      if (window.electronAPI && window.electronAPI.testDatabaseConnection) {
        const result = await window.electronAPI.testDatabaseConnection(databasePath);
        setTestResult(result);
      }
    } catch (error) {
      setTestResult({ success: false, message: 'Erro ao testar conexão' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSetup = async () => {
    if (!databasePath.trim() || !testResult?.success) {
      setTestResult({ success: false, message: 'Teste a conexão primeiro' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (window.electronAPI && window.electronAPI.completeInitialSetup) {
        const result = await window.electronAPI.completeInitialSetup(databasePath);
        
        if (result.success) {
          onSetupComplete();
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

  return (
    <div className="min-h-screen bg-[#121214] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#111113] to-[#0F0F11] border border-blue-500/30 rounded-2xl shadow-2xl w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center p-8 border-b bg-gradient-to-r from-blue-600/10 to-blue-700/5  border-blue-500/30">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Bem-vindo ao EccoxVision
          </h1>
          <p className="text-gray-400">
            Configure o local do banco de dados para começar
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          
          {/* Seleção do Banco */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-400" />
              <span>Localização do Banco de Dados</span>
            </h3>
            <p className="text-sm text-gray-400">
              Escolha onde deseja armazenar seus dados. Pode ser local ou em rede.
            </p>
            
            <div className="flex space-x-3">
              <input
                type="text"
                value={databasePath}
                onChange={(e) => setDatabasePath(e.target.value)}
                placeholder="Selecione o local para salvar o banco de dados..."
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly
              />
              <button
                onClick={handleSelectPath}
                className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Selecionar</span>
              </button>
            </div>
          </div>

          {/* Resultado do Teste */}
          {testResult && (
            <div className={`p-4 rounded-lg border ${
              testResult.success 
                ? 'bg-green-900/20 border-green-700' 
                : 'bg-red-900/20 border-red-700'
            }`}>
              <div className="flex items-start space-x-3">
                {testResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${
                    testResult.success ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {testResult.success ? 'Conexão bem-sucedida!' : 'Erro na conexão'}
                  </p>
                  <p className={`text-sm mt-1 ${
                    testResult.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {testResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Informações */}
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-2">Importante:</h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• O arquivo será criado automaticamente se não existir</li>
              <li>• Use extensão .db (exemplo: meus-dados.db)</li>
              <li>• Pode ser um caminho local ou de rede compartilhada</li>
              <li>• Esta configuração pode ser alterada posteriormente</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-8 border-t border-gray-700 bg-gray-800/30">
          <div className="text-xs text-gray-500">
            EccoxVision v1.0 - Configuração Inicial
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleTestConnection}
              disabled={isLoading || !databasePath.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Database className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Testando...' : 'Testar Conexão'}</span>
            </button>
            
            <button
              onClick={handleCompleteSetup}
              disabled={isLoading || !testResult?.success}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Salvando...' : 'Começar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialSetupScreen;