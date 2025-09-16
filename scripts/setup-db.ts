// scripts/setup-db.ts
const { setupDatabase } = require("../electron/db");

setupDatabase();
console.log("Banco de dados e tabelas criados com sucesso!");
