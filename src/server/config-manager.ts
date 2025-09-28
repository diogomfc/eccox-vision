// src/server/config-manager.ts

import fs from 'fs';
import path from 'path';
import { app } from 'electron';

interface AppConfig {
  databasePath: string;
  isFirstRun: boolean;
  lastConfigUpdate: string;
}

let configPath: string;
let currentConfig: AppConfig | null = null;

// Inicializa o caminho do arquivo de configuração
export function initConfigPath() {
  try {
    const userDataPath = app.getPath('userData');
    configPath = path.join(userDataPath, 'app-config.json');
  } catch (error) {
    // Fallback se não conseguir acessar userData
    configPath = path.join(process.cwd(), 'app-config.json');
  }
}

// Carrega a configuração do arquivo
export function loadConfig(): AppConfig {
  if (currentConfig) {
    return currentConfig;
  }

  if (!configPath) {
    initConfigPath();
  }

  const defaultConfig: AppConfig = {
    databasePath: '',
    isFirstRun: true,
    lastConfigUpdate: new Date().toISOString()
  };

  try {
    if (fs.existsSync(configPath)) {
      const fileContent = fs.readFileSync(configPath, 'utf8');
      const loadedConfig = JSON.parse(fileContent) as AppConfig;
      currentConfig = { ...defaultConfig, ...loadedConfig };
      console.log('Configuração carregada:', currentConfig);
    } else {
      currentConfig = defaultConfig;
      console.log('Arquivo de configuração não encontrado, usando padrão');
    }
  } catch (error) {
    console.error('Erro ao carregar configuração, usando padrão:', error);
    currentConfig = defaultConfig;
  }

  return currentConfig;
}

// Salva a configuração no arquivo
export function saveConfig(config: Partial<AppConfig>): boolean {
  try {
    if (!configPath) {
      initConfigPath();
    }

    const existingConfig = loadConfig();
    const updatedConfig: AppConfig = {
      ...existingConfig,
      ...config,
      lastConfigUpdate: new Date().toISOString()
    };

    // Garante que o diretório existe
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
    currentConfig = updatedConfig;
    console.log('Configuração salva:', updatedConfig);
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar configuração:', error);
    return false;
  }
}

// Verifica se é a primeira execução
export function isFirstRun(): boolean {
  const config = loadConfig();
  return config.isFirstRun;
}

// Marca como configuração completa
export function markAsConfigured(databasePath: string): boolean {
  return saveConfig({
    databasePath,
    isFirstRun: false
  });
}

// Obtém o caminho do banco salvo
export function getSavedDatabasePath(): string {
  const config = loadConfig();
  return config.databasePath;
}