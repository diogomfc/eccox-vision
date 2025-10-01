// src/components/shared/DatabasePanel.tsx
import React, { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle,
  AlertCircle,
  Play,
  Plus,
  Edit3,
  Trash2,
  TestTube,
  FolderOpen,
  X,
  RefreshCw,
} from 'lucide-react';

interface SavedDatabase {
  id: string;
  name: string;
  path: string;
  addedAt: string;
}

interface TestResult {
  success: boolean;
  message: string;
}

export interface DatabasePanelProps {
  /** Modo de operação: 'setup' mostra botão de criar/iniciar, 'manager' mostra seleção/aplicação */
  mode: 'setup' | 'manager';
  
  /** Caminho do banco ativo atual (para manager mode) */
  activeDatabasePath?: string;
  
  /** Callback quando setup é completado (setup mode) */
  onSetupComplete?: () => void;
  
  /** Callback quando banco é ativado (manager mode) */
  onDatabaseActivated?: (success: boolean, message?: string) => void;
  
  /** Se deve mostrar o painel de adição automaticamente quando não há bancos */
  autoShowAddWhenEmpty?: boolean;
  
  /** Classe CSS adicional para customização */
  className?: string;
}

const DatabasePanel: React.FC<DatabasePanelProps> = ({
  mode,
  activeDatabasePath,
  onSetupComplete,
  onDatabaseActivated,
  autoShowAddWhenEmpty = true,
  className = '',
}) => {
  // Estados do painel
  const [savedDatabases, setSavedDatabases] = useState<SavedDatabase[]>([]);
  const [selectedDatabaseId, setSelectedDatabaseId] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  
  // Estados do formulário de adição
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [databasePath, setDatabasePath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Buscar bancos salvos do processo principal
  const fetchSavedDatabases = async () => {
    try {
      setLoadingList(true);
      const api = (window as any).electronAPI;
      const list = api?.getSavedDatabases ? await api.getSavedDatabases() : [];
      const arr: SavedDatabase[] = Array.isArray(list) ? list : [];
      setSavedDatabases(arr);

      // Auto-selecionar banco ativo ou primeiro disponível
      if (mode === 'manager' && activeDatabasePath) {
        const activeMatch = arr.find((db) => db.path === activeDatabasePath);
        if (activeMatch) setSelectedDatabaseId(activeMatch.id);
      } else if (mode === 'setup') {
        // No setup, tentar pegar banco ativo do config
        const cfg = api?.getAppConfig ? await api.getAppConfig().catch(() => null) : null;
        if (cfg?.databasePath) {
          const match = arr.find((db) => db.path === cfg.databasePath);
          if (match) setSelectedDatabaseId(match.id);
          else if (!selectedDatabaseId && arr.length > 0) setSelectedDatabaseId(arr[0].id);
        } else {
          if (!selectedDatabaseId && arr.length > 0) setSelectedDatabaseId(arr[0].id);
        }
      }

      // Auto-mostrar painel de adição se não houver bancos
      if (autoShowAddWhenEmpty && arr.length === 0) {
        setShowAddPanel(true);
      }
    } catch (err) {
      console.warn('Erro ao carregar saved DBs:', err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchSavedDatabases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, activeDatabasePath]);

  // Handlers para seleção de arquivo
  const handleSelectPath = async () => {
    try {
      const api = (window as any).electronAPI;
      if (api?.selectDatabasePath) {
        const selected = await api.selectDatabasePath();
        if (selected) {
          setDatabasePath(selected);
          setTestResult(null);
        }
      }
    } catch (err) {
      setTestResult({ success: false, message: 'Erro ao abrir seletor' });
    }
  };

  // Testar conexão com banco
  const handleTestConnection = async (pathToTest?: string) => {
    const p = pathToTest || databasePath;
    if (!p || !p.trim()) {
      return setTestResult({ success: false, message: 'Selecione um caminho' });
    }
    
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const api = (window as any).electronAPI;
      if (api?.testDatabaseConnection) {
        const result = await api.testDatabaseConnection(p);
        setTestResult(result);
      }
    } catch (err) {
      setTestResult({ success: false, message: 'Erro ao testar conexão' });
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar novo banco na lista
  const handleSaveToList = async (name?: string) => {
    if (!databasePath.trim()) return;
    
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const inferred = name || databasePath.split(/\\|\//).pop() || `db-${id}`;
    const entry = {
      id,
      name: inferred,
      path: databasePath,
      addedAt: new Date().toISOString(),
    };
    
    try {
      const api = (window as any).electronAPI;
      if (api?.addSavedDatabase) {
        const result = await api.addSavedDatabase(entry);
        if (result?.success) {
          // Recarregar lista e auto-selecionar novo item
          await fetchSavedDatabases();
          setSelectedDatabaseId(entry.id);
          
          // Auto-fechar painel após salvar
          setShowAddPanel(false);
          setDatabasePath('');
          setTestResult(null);
        }
      }
    } catch (err) {
      console.warn('Erro ao salvar banco:', err);
    }
  };

  // Remover banco da lista
  const handleRemoveSaved = async (id: string) => {
    try {
      const api = (window as any).electronAPI;
      if (api?.removeSavedDatabase) {
        const result = await api.removeSavedDatabase(id);
        if (result?.success) {
          await fetchSavedDatabases();
          // Se removeu o selecionado, limpar seleção
          if (selectedDatabaseId === id) {
            setSelectedDatabaseId(null);
          }
        }
      }
    } catch (err) {
      console.warn('Erro ao remover banco:', err);
    }
  };

  // Ativar banco selecionado (setup mode)
  const handleUseSaved = async (id: string) => {
    if (mode !== 'setup') return;
    
    try {
      const api = (window as any).electronAPI;
      if (api?.setActiveDatabase) {
        const result = await api.setActiveDatabase(id);
        if (result?.success) {
          onSetupComplete?.();
        } else {
          setTestResult({
            success: false,
            message: result?.message || 'Falha ao ativar banco',
          });
        }
      }
    } catch (err) {
      setTestResult({ success: false, message: 'Erro ao ativar banco' });
    }
  };

  // Criar e iniciar (setup mode)
  const handleCreateAndStart = async () => {
    if (mode !== 'setup') return;
    
    if (!databasePath.trim()) {
      return setTestResult({ success: false, message: 'Selecione um caminho' });
    }
    if (!testResult?.success) {
      return setTestResult({
        success: false,
        message: 'Teste a conexão primeiro',
      });
    }
    
    setIsLoading(true);
    
    try {
      const api = (window as any).electronAPI;
      if (api?.completeInitialSetup) {
        const result = await api.completeInitialSetup(databasePath);
        if (result?.success) {
          onSetupComplete?.();
        } else {
          setTestResult({
            success: false,
            message: result?.message || 'Falha ao salvar',
          });
        }
      }
    } catch (err) {
      setTestResult({ success: false, message: 'Erro ao salvar configuração' });
    } finally {
      setIsLoading(false);
    }
  };

  // Ativar banco selecionado (manager mode)
  const handleActivateSelected = async () => {
    if (mode !== 'manager' || !selectedDatabaseId) return;
    
    try {
      const api = (window as any).electronAPI;
      if (api?.setActiveDatabase) {
        const result = await api.setActiveDatabase(selectedDatabaseId);
        onDatabaseActivated?.(result?.success || false, result?.message);
      }
    } catch (err) {
      onDatabaseActivated?.(false, 'Erro ao ativar banco');
    }
  };

  const hasChanges = mode === 'manager' && selectedDatabaseId && 
    savedDatabases.find(d => d.id === selectedDatabaseId && d.path !== activeDatabasePath);

  return (
    <div className={`space-y-3 lg:space-y-4 ${className}`}>
      {/* Título */}
      <div>
        <h3 className="text-xs lg:text-sm font-medium text-gray-300 mb-2 lg:mb-3 flex items-center gap-1.5 lg:gap-2">
          <Database className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-400" />
          Bancos Cadastrados
        </h3>
      </div>

      {/* Caso não tenha bancos salvos */}
      {(!savedDatabases || savedDatabases.length === 0) && !showAddPanel ? (
        <div className="p-3 lg:p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700 rounded-md lg:rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-gray-700 rounded-full mb-1.5 lg:mb-2">
            <Database className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300" />
          </div>
          <p className="text-xs text-gray-400 mb-2 lg:mb-3">Nenhum banco cadastrado</p>
          <button
            onClick={() => setShowAddPanel(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 lg:px-3 lg:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md lg:rounded-lg text-xs transition-colors mx-auto"
          >
            <Plus className="w-3 h-3" />
            Adicionar banco
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Painel de Adição - Acima da lista */}
          {showAddPanel && (
            <div className="p-2.5 lg:p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-md lg:rounded-lg">
              <div className="flex items-center justify-between mb-2 lg:mb-2.5">
                <div className="flex items-center gap-1">
                  <Plus className="w-3 h-3 text-green-400" />
                  <h4 className="text-xs font-medium text-white">Adicionar novo banco</h4>
                </div>
                <button
                  title="Fechar painel de adição"
                  onClick={() => {
                    setShowAddPanel(false);
                    setDatabasePath('');
                    setTestResult(null);
                  }}
                  className="flex items-center cursor-pointer gap-1 px-1.5 py-0.5 lg:px-2 lg:py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
                >
                  <X className="w-3 h-3" />
                  Fechar
                </button>
              </div>

              <div className="space-y-1.5 lg:space-y-2">
                <div className="flex gap-1.5 lg:gap-2">
                  <input
                    readOnly
                    value={databasePath}
                    placeholder="Selecione o local do arquivo..."
                    className="flex-1 px-2 py-1 lg:py-1.5 text-xs rounded bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSelectPath}
                    className="flex items-center cursor-pointer gap-1 px-2 py-1 lg:py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-xs whitespace-nowrap"
                  >
                    <FolderOpen className="w-3 h-3" />
                    <span className="hidden sm:inline">Procurar</span>
                  </button>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleSaveToList()}
                    disabled={!databasePath.trim()}
                    className={`flex-1 flex items-center cursor-pointer justify-center gap-1 px-2 py-1 lg:py-1.5 rounded transition-colors text-xs ${
                      databasePath.trim()
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Database className="w-3 h-3" />
                    <span className="hidden sm:inline">Salvar</span>
                  </button>
                  <button
                    onClick={() => handleTestConnection()}
                    disabled={!databasePath.trim()}
                    className={`flex items-center justify-center cursor-pointer gap-1 px-2 py-1 lg:py-1.5 rounded transition-colors text-xs ${
                      databasePath.trim()
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <TestTube className="w-3 h-3" />
                    <span className="hidden sm:inline">Testar</span>
                  </button>
                  {mode === 'setup' && (
                    <button
                      onClick={handleCreateAndStart}
                      disabled={!databasePath.trim() || !testResult?.success || isLoading}
                      className={`flex items-center cursor-pointer justify-center gap-1 px-2 py-1.5 rounded transition-colors text-xs ${
                        databasePath.trim() && testResult?.success && !isLoading
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      Criar
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Lista de Bancos Salvos */}
          {savedDatabases.length > 0 && (
            <div className="bg-gray-900/30 border border-gray-800 rounded-md lg:rounded-lg">
              <div className="flex items-center justify-between p-2 lg:p-2.5 border-b border-gray-700">
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <h4 className="text-xs font-medium text-gray-300">Bancos salvos</h4>
                  <span className="px-1 py-0.5 text-xs bg-gray-700 text-gray-300 rounded">
                    {savedDatabases.length}
                  </span>
                </div>
                {!showAddPanel && (
                  <button
                    onClick={() => setShowAddPanel(true)}
                    className="flex items-center cursor-pointer gap-1 px-1.5 py-0.5 lg:px-2 lg:py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span className="hidden sm:inline">Adicionar</span>
                  </button>
                )}
              </div>

              <div className="max-h-36 lg:max-h-48 overflow-y-auto space-y-1.5 lg:space-y-2 p-1.5 lg:p-2 custom-scrollbar">
                {savedDatabases.map((db) => (
                  <div
                    key={db.id}
                    className={`group relative p-2 lg:p-2.5 rounded border transition-all duration-200 ${
                      mode === 'manager' && db.path === activeDatabasePath
                        ? 'border-green-500 bg-green-950/20'
                        : selectedDatabaseId === db.id
                        ? 'border-blue-500 bg-blue-950/20'
                        : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                    }`}
                  >
                    <div className="flex items-start gap-2 lg:gap-2.5">
                      {/* Radio button */}
                      <input
                        type="radio"
                        name={`selectedDb-${mode}`}
                        checked={selectedDatabaseId === db.id}
                        onChange={() => setSelectedDatabaseId(db.id)}
                        className="mt-0.5 w-3 h-3 text-blue-600 cursor-pointer bg-gray-700 border-gray-600 focus:ring-blue-500"
                        aria-label={`Selecionar ${db.name}`}
                      />

                      {/* Database info */}
                      <div 
                      className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => setSelectedDatabaseId(db.id)}
                      >
                        <div className="flex items-center gap-1 mb-0.5">
                          <Database className="w-3 h-3 text-blue-400" />
                          <h5 className="text-xs font-medium text-white truncate">{db.name}</h5>
                          {mode === 'manager' && db.path === activeDatabasePath && (
                            <span className="px-1 py-0.5 text-xs bg-green-600 text-white rounded">
                              Ativo
                            </span>
                          )}
                          {selectedDatabaseId === db.id && (!activeDatabasePath || db.path !== activeDatabasePath) && (
                            <span className="px-1 py-0.5 text-xs bg-blue-600 text-white rounded">
                              Selecionado
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 truncate">{db.path}</p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={async () => {
                            try {
                              const api = (window as any).electronAPI;
                              if (api?.selectDatabasePath) {
                                const selected = await api.selectDatabasePath();
                                if (selected) {
                                  const updatedEntry = { ...db, path: selected };
                                  await api.removeSavedDatabase(db.id);
                                  await api.addSavedDatabase(updatedEntry);
                                  await fetchSavedDatabases();
                                  setTestResult({ success: true, message: 'Local atualizado!' });
                                }
                              }
                            } catch (err) {
                              setTestResult({ success: false, message: 'Erro ao atualizar local' });
                            }
                          }}
                          className="p-1 text-gray-400 cursor-pointer hover:text-blue-400 hover:bg-gray-700 rounded transition-colors"
                          title="Editar local"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleTestConnection(db.path)}
                          className="p-1 text-gray-400 cursor-pointer hover:text-green-400 hover:bg-gray-700 rounded transition-colors"
                          title="Testar conexão"
                        >
                          <TestTube className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            // eslint-disable-next-line no-restricted-globals
                            if (confirm(`Remover '${db.name}' da lista?`)) {
                              handleRemoveSaved(db.id);
                            }
                          }}
                          className="p-1 text-gray-400 cursor-pointer hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resultado do teste */}
      {testResult && (
        <div className={`p-2 lg:p-2.5 rounded-md lg:rounded-lg border ${
          testResult.success 
            ? 'bg-green-900/20 border-green-700' 
            : 'bg-red-900/20 border-red-700'
        }`}>
          <div className="flex items-start space-x-1.5 lg:space-x-2">
            {testResult.success ? (
              <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
            )}
            <span className={`text-xs leading-tight ${
              testResult.success ? 'text-green-300' : 'text-red-300'
            }`}>
              {testResult.message}
            </span>
          </div>
        </div>
      )}

      {/* Botões de ação por modo */}
      {mode === 'setup' && savedDatabases.length > 0 && (
        <button
          onClick={() => selectedDatabaseId && handleUseSaved(selectedDatabaseId)}
          disabled={!selectedDatabaseId || isLoading}
          className={`w-full flex items-center cursor-pointer justify-center gap-1.5 lg:gap-2 px-3 py-2 lg:py-2.5 rounded-md lg:rounded-lg font-medium transition-colors text-sm lg:text-base ${
            selectedDatabaseId && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Play className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
          Iniciar com banco selecionado
        </button>
      )}

      {/* Botão de ação para manager mode */}
      {mode === 'manager' && savedDatabases.length > 0 && (
        <button
          onClick={handleActivateSelected}
          disabled={!hasChanges || isLoading}
          className={`w-full flex items-center cursor-pointer justify-center gap-1.5 lg:gap-2 px-3 py-2 lg:py-2.5 rounded-md lg:rounded-lg font-medium transition-colors text-sm lg:text-base ${
            hasChanges && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 lg:w-4 lg:h-4 animate-spin" />
              <span className="text-sm lg:text-base">Aplicando mudança...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="text-sm lg:text-base">{hasChanges ? 'Aplicar mudança de origem' : 'Nenhuma alteração para aplicar'}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default DatabasePanel;