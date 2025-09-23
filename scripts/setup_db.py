import sqlite3
import json
import os

# Caminho para o ficheiro da base de dados
db_path = 'E:/ECCOX/localDB/eccox-vision.db'

# Caminho para o ficheiro de mock
# Certifique-se de que o caminho para o ficheiro de mock está correto
mock_data_path = 'scripts/mockMachines.json'

def setup_database():
    """
    Cria a base de dados e as tabelas com o esquema correto.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Criar tabelas
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS machines (
            id TEXT PRIMARY KEY,
            name TEXT,
            description TEXT,
            version TEXT,
            status TEXT,
            updatedAt TEXT
        );
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS applications (
            id TEXT PRIMARY KEY,
            machine_id TEXT,
            name TEXT,
            status TEXT,
            tipo TEXT,
            FOREIGN KEY(machine_id) REFERENCES machines(id) ON DELETE CASCADE
        );
    """)

    cursor.execute("""
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
            FOREIGN KEY(application_id) REFERENCES applications(id) ON DELETE CASCADE
        );
    """)
    conn.commit()
    conn.close()
    print("Base de dados criada com sucesso!")

def import_mock_data():
    """
    Importa os dados do ficheiro de mock para a base de dados.
    """
    if not os.path.exists(mock_data_path):
        print(f"Erro: Ficheiro de mock não encontrado em {mock_data_path}")
        return

    with open(mock_data_path, 'r', encoding='utf-8') as f:
        mock_data = json.load(f)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    for machine in mock_data:
        # Inserir máquina
        cursor.execute("""
            INSERT OR REPLACE INTO machines (id, name, description, version, status, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (machine['id'], machine['name'], machine['description'], machine['version'], machine['status'], machine['updatedAt']))
        
        for app in machine['applications']:
            # Inserir aplicação
            cursor.execute("""
                INSERT OR REPLACE INTO applications (id, machine_id, name, status, tipo)
                VALUES (?, ?, ?, ?, ?)
            """, (app['id'], app['machine_id'], app['name'], app['status'], app['tipo']))
            
            for service in app['services']:
                # Inserir serviço
                cursor.execute("""
                    INSERT OR REPLACE INTO services (id, application_id, name, status, itemObrigatorio, updatedAt, responsible, comments, typePendencia, responsibleHomologacao)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (service['id'], service['application_id'], service['name'], service['status'], service.get('itemObrigatorio'), service.get('updatedAt'), service.get('responsible'), service.get('comments'), service.get('typePendencia'), service.get('responsibleHomologacao')))

    conn.commit()
    conn.close()
    print("Dados do mock importados com sucesso!")

# Executar as funções
if __name__ == '__main__':
    setup_database()
    import_mock_data()