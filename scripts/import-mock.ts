// scripts/import-mock.ts
// import { getDatabase } from "../electron/db";
// import { mockMachines } from "../src/mocks/mockMachines";

const { getDatabase } = require("../electron/db");
const { mockMachines } = require("../src/mocks/mockMachines");

function importMock() {
  const db = getDatabase();
  const insertMachine = db.prepare(`INSERT OR REPLACE INTO machines (id, name, description, version, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`);
  const insertApplication = db.prepare(`INSERT INTO applications (machine_id, name, status, tipo) VALUES (?, ?, ?, ?)`);
  const insertService = db.prepare(`INSERT INTO services (application_id, name, status, itemObrigatorio, updatedAt, responsible, comments, typePendencia, responsibleHomologacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  for (const machine of mockMachines) {
    insertMachine.run(machine.id, machine.name, machine.description, machine.version, machine.status, machine.updatedAt);
    for (const app of machine.applications) {
      const appResult = insertApplication.run(machine.id, app.name, app.status, app.tipo);
      // Pega o id do application inserido
      const applicationId = appResult.lastInsertRowid;
      for (const service of app.services) {
        insertService.run(
          applicationId,
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
  console.log("Mock importado com sucesso!");
}

importMock();
