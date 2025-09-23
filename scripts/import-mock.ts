// scripts/import-mock.ts

const { getDatabase } = require("../electron/db");
const { mockMachines } = require("../src/mocks/mockMachines");

function importMock() {
  const db = getDatabase();

  const insertMachine = db.prepare(`
    INSERT OR REPLACE INTO machines (id, name, description, version, status, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  // Os IDs agora são TEXT, então não precisamos de AUTOINCREMENT
  const insertApplication = db.prepare(`
    INSERT OR REPLACE INTO applications (id, machine_id, name, status, tipo) 
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertService = db.prepare(`
    INSERT OR REPLACE INTO services (id, application_id, name, status, itemObrigatorio, updatedAt, responsible, comments, typePendencia, responsibleHomologacao) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Usamos uma transação para garantir que todas as inserções ocorram de uma vez
  // ou que nenhuma ocorra se houver um erro.
  const insertMany = db.transaction(() => {
    for (const machine of mockMachines) {
      // Inserir a máquina com o ID de texto do mock
      insertMachine.run(machine.id, machine.name, machine.description, machine.version, machine.status, machine.updatedAt);
      
      for (const app of machine.applications) {
        // Inserir a aplicação com o ID de texto do mock
        insertApplication.run(app.id, app.machine_id, app.name, app.status, app.tipo);
        
        for (const service of app.services) {
          // Inserir o serviço com o ID de texto do mock
          insertService.run(
            service.id,
            service.application_id,
            service.name,
            service.status,
            service.itemObrigatorio,
            service.updatedAt,
            service.responsible,
            service.comments,
            service.typePendencia,
            service.responsibleHomologacao
          );
        }
      }
    }
  });

  insertMany();
  console.log("Mock importado com sucesso!");
}

module.exports = { importMock };