// electron/db.ts
// Módulo de acesso ao banco SQLite, pronto para receber caminho dinâmico

import Database from 'better-sqlite3';
import path from 'path';

// Caminho padrão (pode ser sobrescrito via configuração)
//let dbPath = path.resolve(__dirname, '../../shared/db/eccox-vision.db');
let dbPath = 'E:/ECCOX/localDB/eccox-vision.db';
let db: Database.Database | null = null;

export function setDatabasePath(newPath: string) {
  dbPath = newPath;
  if (db) {
    db.close();
    db = null;
  }
}

export function getDatabase() {
  if (!db) {
    db = new Database(dbPath);
  }
  return db;
}

// Exemplo de função para criar tabela (chame no setup)
export function setupDatabase() {
  const database = getDatabase();
  database.exec(`
    CREATE TABLE IF NOT EXISTS machines (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      version TEXT,
      status TEXT,
      updatedAt TEXT
    );
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      machine_id TEXT,
      name TEXT,
      status TEXT,
      tipo TEXT,
      FOREIGN KEY(machine_id) REFERENCES machines(id)
    );
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id INTEGER,
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
}
