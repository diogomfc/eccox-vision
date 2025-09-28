// import Database from 'better-sqlite3';
// import path from 'path';

// // Caminho padrão (pode ser sobrescrito via configuração)
// //let dbPath = path.resolve(__dirname, '../../shared/db/eccox-vision.db');
// let dbPath = 'E:/ECCOX/localDB/eccox-vision.db';
// let db: Database.Database | null = null;

// export function setDatabasePath(newPath: string) {
//   dbPath = newPath;
//   if (db) {
//     db.close();
//     db = null;
//   }
// }

// export function getDatabase() {
//   if (!db) {
//     db = new Database(dbPath);
//   }
//   return db;
// }

// // Exemplo de função para criar tabela (chame no setup)
// export function setupDatabase() {
//   const database = getDatabase();
//   database.exec(`
//     CREATE TABLE IF NOT EXISTS machines (
//       id TEXT PRIMARY KEY,
//       name TEXT,
//       description TEXT,
//       version TEXT,
//       status TEXT,
//       productionType TEXT,
//       updatedAt TEXT,
//       machineResponsible TEXT
//     );
//     CREATE TABLE IF NOT EXISTS applications (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       machine_id TEXT,
//       name TEXT,
//       status TEXT,
//       updatedAt TEXT
//       tipo TEXT,
//       applicationResponsible TEXT,
//       FOREIGN KEY(machine_id) REFERENCES machines(id)
//     );
//     CREATE TABLE IF NOT EXISTS services (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       application_id INTEGER,
//       name TEXT,
//       status TEXT,
//       itemObrigatorio TEXT,
//       updatedAt TEXT,
//       responsible TEXT,
//       comments TEXT,
//       typePendencia TEXT,
//       responsibleHomologacao TEXT,
//       FOREIGN KEY(application_id) REFERENCES applications(id)
//     );
//   `);
// }

// src/server/db.ts - Versão atualizada com gerenciamento de banco
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { app } from "electron";

import { loadConfig, saveConfig, getSavedDatabasePath } from "./config-manager";

// Configurações do banco
interface DatabaseConfig {
  currentPath: string;
  lastUpdate: string | null;
  status: "online" | "offline" | "error";
  message?: string;
}

// Estado do banco
let db: Database.Database | null = null;
let dbConfig: DatabaseConfig = {
  currentPath: "",
  lastUpdate: null,
  status: "offline",
  message: "Não inicializado",
};

// Caminho padrão do banco
function getDefaultDatabasePath(): string {
  // Primeiro tenta usar o caminho salvo
  const savedPath = getSavedDatabasePath();
  if (savedPath && savedPath.trim()) {
    console.log("Usando caminho salvo:", savedPath);
    return savedPath;
  }

  // Se não tem caminho salvo, usa o padrão do userData
  try {
    const userDataPath = app.getPath("userData");
    const defaultPath = path.join(userDataPath, "eccox-vision.db");
    console.log("Usando caminho padrão:", defaultPath);
    return defaultPath;
  } catch (error) {
    // Fallback final
    console.log("Usando fallback fixo");
    return "E:/ECCOX/localDB/eccox-vision.db";
  }
}

// Inicializa o caminho padrão
export function initializeDefaultPath() {
  if (!dbConfig.currentPath) {
    dbConfig.currentPath = getDefaultDatabasePath();
    console.log("Caminho padrão do banco definido:", dbConfig.currentPath);
  }
}

// Define um novo caminho para o banco
export function setDatabasePath(newPath: string): {
  success: boolean;
  message: string;
  newPath?: string;
} {
  try {
    // Valida o caminho
    if (!newPath || !newPath.trim()) {
      return { success: false, message: "Caminho não pode estar vazio" };
    }

    // Verifica se é um arquivo .db
    if (!newPath.toLowerCase().endsWith(".db")) {
      return { success: false, message: "O arquivo deve ter extensão .db" };
    }

    // Tenta acessar o diretório
    const dir = path.dirname(newPath);
    try {
      if (!fs.existsSync(dir)) {
        return { success: false, message: "Diretório não existe" };
      }
    } catch (dirError) {
      return {
        success: false,
        message: "Não foi possível acessar o diretório",
      };
    }

    // Fecha conexão atual se existir
    if (db) {
      try {
        db.close();
        console.log("Conexão anterior fechada");
      } catch (closeError) {
        console.warn("Erro ao fechar conexão anterior:", closeError);
      }
      db = null;
    }

    // Atualiza o caminho
    const previousPath = dbConfig.currentPath;
    dbConfig.currentPath = newPath;
    dbConfig.status = "offline";
    dbConfig.message = "Caminho atualizado, aguardando conexão";

    // Tenta conectar no novo caminho
    const connectionResult = testDatabaseConnection(newPath);

    if (connectionResult.success) {
      // Se a conexão foi bem-sucedida, tenta fazer o setup
      try {
        const setupSuccess = setupDatabase();
        if (setupSuccess) {
          dbConfig.status = "online";
          dbConfig.lastUpdate = new Date().toISOString();
          dbConfig.message = "Conectado com sucesso";

          // NOVA FUNCIONALIDADE: Salva o caminho nas configurações
          const configSaved = saveConfig({ databasePath: newPath });
          if (configSaved) {
            console.log("Caminho do banco salvo nas configurações");
          } else {
            console.warn("Erro ao salvar caminho do banco nas configurações");
          }

          console.log(
            "Banco configurado com sucesso no novo caminho:",
            newPath
          );
        } else {
          dbConfig.status = "error";
          dbConfig.message = "Conectado, mas erro no setup das tabelas";
        }
      } catch (setupError) {
        dbConfig.status = "error";
        dbConfig.message = "Conectado, mas erro no setup";
        console.error("Erro no setup após mudança de caminho:", setupError);
      }
    } else {
      // Se não conseguiu conectar, volta para o caminho anterior
      dbConfig.currentPath = previousPath;
      dbConfig.status = "error";
      dbConfig.message = `Erro na conexão: ${connectionResult.message}`;
    }

    return {
      success: connectionResult.success,
      message: connectionResult.success
        ? "Caminho alterado e conectado com sucesso"
        : `Erro: ${connectionResult.message}`,
      newPath: connectionResult.success ? newPath : undefined,
    };
  } catch (error) {
    dbConfig.status = "error";
    dbConfig.message =
      error instanceof Error ? error.message : "Erro desconhecido";

    return {
      success: false,
      message: `Erro ao alterar caminho: ${dbConfig.message}`,
    };
  }
}

// Testa conexão com um caminho específico
export function testDatabaseConnection(testPath: string): {
  success: boolean;
  message: string;
} {
  try {
    // Valida o caminho primeiro
    if (!testPath || !testPath.trim()) {
      return { success: false, message: "Caminho vazio" };
    }

    if (!testPath.toLowerCase().endsWith(".db")) {
      return { success: false, message: "Arquivo deve ter extensão .db" };
    }

    // Verifica se o arquivo existe
    if (!fs.existsSync(testPath)) {
      // Tenta criar o arquivo se não existir
      try {
        const dir = path.dirname(testPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // Cria um banco temporário para testar
        const testDb = new Database(testPath);
        testDb.close();

        return {
          success: true,
          message: "Arquivo criado e testado com sucesso",
        };
      } catch (createError) {
        return {
          success: false,
          message: `Não foi possível criar o arquivo: ${
            createError instanceof Error
              ? createError.message
              : "Erro desconhecido"
          }`,
        };
      }
    }

    // Tenta abrir o banco para teste
    let testDb: Database.Database;
    try {
      testDb = new Database(testPath, { readonly: false });
    } catch (openError) {
      return {
        success: false,
        message: `Erro ao abrir arquivo: ${
          openError instanceof Error ? openError.message : "Erro desconhecido"
        }`,
      };
    }

    // Testa uma query simples
    try {
      const result = testDb.prepare("SELECT 1 as test").get();
      testDb.close();

      if (result) {
        return { success: true, message: "Conexão testada com sucesso" };
      } else {
        return { success: false, message: "Falha no teste de query" };
      }
    } catch (queryError) {
      try {
        testDb.close();
      } catch (closeError) {
        console.warn("Erro ao fechar banco de teste:", closeError);
      }

      return {
        success: false,
        message: `Erro na query de teste: ${
          queryError instanceof Error ? queryError.message : "Erro desconhecido"
        }`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Erro inesperado: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`,
    };
  }
}

// Retorna o status atual do banco
export function getDatabaseStatus(): DatabaseConfig {
  // Atualiza o status baseado na conexão atual
  if (db && dbConfig.status !== "error") {
    try {
      // Testa se a conexão ainda está válida
      db.prepare("SELECT 1").get();
      dbConfig.status = "online";
      if (!dbConfig.message || dbConfig.message.includes("Erro")) {
        dbConfig.message = "Conectado";
      }
    } catch (error) {
      dbConfig.status = "error";
      dbConfig.message = `Erro na conexão: ${
        error instanceof Error ? error.message : "Desconhecido"
      }`;
    }
  } else if (!db) {
    if (dbConfig.status === "online") {
      dbConfig.status = "offline";
      dbConfig.message = "Desconectado";
    }
  }

  return { ...dbConfig };
}

// Obtém a instância do banco (versão atualizada)
export function getDatabase(): Database.Database {
  if (!db) {
    try {
      if (!dbConfig.currentPath) {
        initializeDefaultPath();
      }

      db = new Database(dbConfig.currentPath);
      dbConfig.status = "online";
      dbConfig.lastUpdate = new Date().toISOString();
      dbConfig.message = "Conectado";

      console.log("Conexão com banco estabelecida:", dbConfig.currentPath);
    } catch (error) {
      dbConfig.status = "error";
      dbConfig.message =
        error instanceof Error ? error.message : "Erro na conexão";
      console.error("Falha ao conectar com o banco:", error);
      throw new Error(`Falha ao conectar com o banco: ${dbConfig.message}`);
    }
  }

  return db;
}

// Setup do banco (versão atualizada com melhor tratamento de erro)
export function setupDatabase(): boolean {
  try {
    const database = getDatabase();

    // Executa as queries de criação de tabelas
    database.exec(`
      CREATE TABLE IF NOT EXISTS machines (
        id TEXT PRIMARY KEY,
        name TEXT,
        description TEXT,
        version TEXT,
        status TEXT,
        productionType TEXT,
        updatedAt TEXT,
        machineResponsible TEXT
      );
      
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        machine_id TEXT,
        name TEXT,
        status TEXT,
        updatedAt TEXT,
        tipo TEXT,
        applicationResponsible TEXT,
        FOREIGN KEY(machine_id) REFERENCES machines(id)
      );
      
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        application_id TEXT,
        name TEXT,
        status TEXT,
        itemObrigatorio TEXT,
        updatedAt TEXT,
        responsible TEXT,
        comments TEXT,
        typePendencia TEXT,
        responsibleHomologacao TEXT,
        FOREIGN KEY(application_id) REFERENCES applications(id)
      );
    `);

    dbConfig.status = "online";
    dbConfig.lastUpdate = new Date().toISOString();
    dbConfig.message = "Tabelas criadas/verificadas com sucesso";

    console.log("Setup do banco concluído com sucesso");
    return true;
  } catch (error) {
    dbConfig.status = "error";
    dbConfig.message = `Erro no setup: ${
      error instanceof Error ? error.message : "Erro desconhecido"
    }`;
    console.error("Erro no setup do banco:", error);
    return false;
  }
}

// Função para fechar a conexão (útil para cleanup)
export function closeDatabaseConnection(): void {
  if (db) {
    try {
      db.close();
      db = null;
      dbConfig.status = "offline";
      dbConfig.message = "Conexão fechada";
      console.log("Conexão com banco fechada");
    } catch (error) {
      console.error("Erro ao fechar conexão:", error);
      dbConfig.status = "error";
      dbConfig.message = "Erro ao fechar conexão";
    }
  }
}
