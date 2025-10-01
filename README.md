s# 📌 EccoxVision

**Monitoramento e Observabilidade de Serviços e Recursos Mainframe**

Aplicação desktop desenvolvida com **Electron + Next.js + TailwindCSS + TypeScript** para acompanhamento centralizado do status de serviços, softwares e pacotes instalados em máquinas mainframe.

O objetivo é substituir planilhas manuais por uma interface moderna, visual e executiva que permita ao time monitorar pendências, validar entregas e gerar insights para gestores como Maurício, trazendo clareza e padronização ao processo.

---

## 🚀 Funcionalidades

* **Dashboard geral** com visão executiva por máquina/projeto.
* **Status visual** dos itens: obrigatório, não se aplica, concluído, pendente.
* **Controle de datas**: previsão de entrega e conclusão efetiva.
* **Registro de responsáveis** e papéis associados.
* **Histórico de mudanças** para auditoria e rastreabilidade.
* **Comentários locais** para anotações rápidas da equipe.
* **Integração futura** com Project e BI para relatórios gerenciais.

---

## 🛠️ Stack utilizada

* **Next.js** – frontend reativo e moderno.
* **Electron.js** – empacotamento como app desktop.
* **TailwindCSS** – design limpo e responsivo.
* **TypeScript** – tipagem e robustez.
* **Electron-builder** – criação de instaladores.
* **SQLite** – banco de dados local embarcado.

---

## 📜 Scripts NPM

| Script           | Descrição                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------- |
| `dev`            | Inicia o Next.js em modo de desenvolvimento em `localhost:3000`                           |
| `build:next`     | Compila e exporta os arquivos estáticos do Next.js para a pasta `out/`                    |
| `move:out`       | Copia a pasta `out` para `electron/dist/` para ser incluída na build                      |
| `build:electron` | Compila os arquivos TypeScript do Electron (`main.ts`, `preload.ts`) para `electron/dist` |
| `dev:electron`   | Executa Next.js e Electron juntos com recarregamento automático do frontend               |
| `build:app`      | Compila Next.js + Electron e cria o instalador da aplicação usando `electron-builder`     |

---

## 🔗 Configuração de Build (`electron-builder`)

```json
"build": {
  "appId": "com.eccox.eccoxvision",
  "productName": "EccoxVision",
  "files": [
    "electron/dist/**/*",
    "out/**/*",
    "package.json"
  ],
  "directories": {
    "buildResources": "electron/assets"
  },
  "win": {
    "target": [
      "portable",
      "nsis"
    ],
    "icon": "electron/assets/logo.ico"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "EccoxVision"
  }
}
```

---

## 📁 Saída

Após a build, o arquivo `.exe` ou instalador da aplicação estará disponível na pasta raiz `dist/`.

---

## 🚀 Começando o desenvolvimento

```bash
npm install
npm run build:electron
npm run dev:electron
```

---

## 🏗️ **GUIA COMPLETO DE BUILD - FLUXO CORRETO**

### � **Pré-requisitos**
- Node.js (versão 18+)
- Yarn ou NPM
- Windows (para gerar executável .exe)

### 🔄 **Fluxo de Desenvolvimento**

#### 1️⃣ **Setup Inicial**
```bash
# Clone e instale dependências
git clone <repo>
cd eccox-vision
yarn install

# Reconstruir dependências nativas
yarn rebuild
```

#### 2️⃣ **Desenvolvimento Local**
```bash
# Modo desenvolvimento (Next.js + Electron)
yarn dev:electron

# OU individual:
yarn dev              # Só Next.js (localhost:3000)
yarn build:electron   # Compilar Electron
electron .           # Executar Electron
```

### �🚀 **Fluxo de Build para Produção**

#### **Comando Único (RECOMENDADO)**
```bash
yarn build:app
```

#### **OU Passo a Passo Manual:**
```bash
# 1. Build do Next.js + correção de paths
yarn build:next

# 2. Mover arquivos para Electron
yarn move:out

# 3. Compilar TypeScript do Electron
yarn build:electron

# 4. Gerar executável
electron-builder
```

### 📁 **Estrutura de Arquivos Após Build**

```
📦 eccox-vision/
├── 📁 out/                    # Build Next.js (temporário)
├── 📁 electron/dist/          # Arquivos finais Electron
│   ├── 📁 out/               # Frontend compilado
│   ├── 📁 assets/            # Ícones e recursos
│   ├── main.js               # Processo principal
│   └── preload.js            # Script de preload
└── 📁 dist/                   # 🎯 EXECUTÁVEIS FINAIS
    ├── EccoxVision 1.0.0.exe     # Portable
    ├── EccoxVision Setup 1.0.0.exe  # Instalador
    └── win-unpacked/              # Versão descompactada
```

### ⚙️ **Configurações Importantes**

#### **next.config.ts**
```typescript
const nextConfig: NextConfig = {
  output: "export",           // Gerar arquivos estáticos
  assetPrefix: ".",          // Assets relativos
  basePath: "",              
  images: { unoptimized: true },
  devIndicators: false,
  trailingSlash: false,
  distDir: 'out'             // Pasta de saída
};
```

#### **package.json - Scripts Essenciais**
```json
{
  "scripts": {
    "build:next": "next build && node fix-paths.js",
    "move:out": "node move-out.js", 
    "build:electron": "tsc -p tsconfig.electron.json && node move-assets.js",
    "build:app": "yarn build:next && yarn move:out && yarn build:electron && electron-builder"
  }
}
```

### 🔧 **Scripts Auxiliares Automáticos**

#### **fix-paths.js** - Correção de Assets
- Converte `/_next/` → `./_next/`
- Essencial para funcionamento no Electron
- Executado automaticamente no `build:next`

#### **move-out.js** - Organização de Arquivos  
- Move `out/` → `electron/dist/out/`
- Prepara estrutura para o Electron

#### **move-assets.js** - Recursos Visuais
- Copia `electron/assets/` → `electron/dist/assets/`
- Inclui ícones e imagens

### ✅ **Validação do Build**

#### **Checklist Pós-Build:**
- [ ] Pasta `dist/` criada com executáveis
- [ ] `EccoxVision 1.0.0.exe` funcional
- [ ] Interface carrega sem tela branca
- [ ] Navegação entre páginas funciona
- [ ] Banco de dados conecta
- [ ] Relatórios mostram dados
- [ ] Criação de máquinas disponível

#### **Teste Rápido:**
```bash
# Executar o portable
& ".\dist\EccoxVision 1.0.0.exe"

# Debug no console (F12):
ElectronDebug.runFullDiagnostic()
```

### 🐛 **Resolução de Problemas**

#### **Tela Branca:**
- ✅ Verificar `assetPrefix: "."` 
- ✅ Script `fix-paths.js` executado
- ✅ Arquivos em `electron/dist/out/`

#### **Routing Issues:**
- ✅ Usar `useElectronHashRouter` 
- ✅ Não usar `useRouter` do Next.js
- ✅ Hash routing (#/machines/create)

#### **Database Issues:**
- ✅ Verificar `electronAPI` disponível
- ✅ Handlers IPC configurados
- ✅ Permissões de arquivo

### 🎯 **Resultado Final**

Após `yarn build:app`, você terá:
- 📱 **EccoxVision 1.0.0.exe** - Aplicação portable
- 💿 **EccoxVision Setup 1.0.0.exe** - Instalador completo
- ✅ **Aplicação 100% funcional** sem telas brancas

---

## 🚀 Para gerar o executável (.exe)

```bash
yarn build:app
```

---

## 🗄 Estrutura do Banco de Dados (SQLite)

```sql
-- Tabela principal de projetos/serviços monitorados
CREATE TABLE projetos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    responsavel TEXT,
    status TEXT CHECK(status IN ('Planejado', 'Em Progresso', 'Concluído', 'Futuro')) NOT NULL DEFAULT 'Planejado',
    data_prevista DATE,
    data_conclusao DATE,
    criticidade TEXT CHECK(criticidade IN ('Baixa', 'Média', 'Alta')) DEFAULT 'Média',
    impacto TEXT,
    versao TEXT,
    observacoes TEXT
);

-- Histórico de mudanças
CREATE TABLE historico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projeto_id INTEGER NOT NULL,
    descricao TEXT NOT NULL,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- Comentários locais
CREATE TABLE comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projeto_id INTEGER NOT NULL,
    autor TEXT DEFAULT 'Usuário Local',
    comentario TEXT NOT NULL,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- Responsáveis adicionais
CREATE TABLE responsaveis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projeto_id INTEGER NOT NULL,
    nome TEXT NOT NULL,
    papel TEXT,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);
```

---

## 🌱 Inserts iniciais de exemplo

```sql
-- Projetos/Serviços
INSERT INTO projetos (nome, responsavel, status, data_prevista, criticidade, impacto, versao, observacoes)
VALUES
('APT Change Alert', 'Equipe Mainframe', 'Em Progresso', '2025-09-30', 'Alta', 'Controle de alterações críticas no sistema', 'v1.0', 'Dependência de homologação'),
('APT Datamover', 'Equipe Storage', 'Planejado', '2025-10-15', 'Média', 'Movimentação de dados entre ambientes', 'v2.1', NULL),
('APT/Bulkload', 'Equipe DB2', 'Futuro', '2025-11-01', 'Alta', 'Carga massiva de dados', 'v1.5', 'Aguardando liberação do DBA'),
('APT/Report', 'Equipe Relatórios', 'Em Progresso', '2025-09-20', 'Média', 'Geração de relatórios executivos', 'v3.2', NULL),
('APT/Batchcopy', 'Equipe Operações', 'Concluído', '2025-08-15', 'Baixa', 'Cópia em lote de pacotes', 'v1.1', 'Finalizado e entregue'),
('APT/Saverestore', 'Equipe Backup', 'Planejado', '2025-09-25', 'Alta', 'Rotinas de backup e restore', 'v2.0', NULL);

-- Responsáveis extras
INSERT INTO responsaveis (projeto_id, nome, papel)
VALUES
(1, 'Maurício', 'Gestor'),
(2, 'Carol', 'Analista'),
(3, 'Diogo', 'Desenvolvedor'),
(4, 'Equipe Relatórios', 'Squad'),
(5, 'Equipe Operações', 'Suporte'),
(6, 'Equipe Backup', 'Infraestrutura');

-- Histórico de mudanças
INSERT INTO historico (projeto_id, descricao)
VALUES
(1, 'Instalação inicial validada'),
(1, 'Aguardando homologação'),
(2, 'Dependência de configuração de storage'),
(3, 'Pacote enviado para aprovação DBA'),
(5, 'Entrega confirmada em 15/08/2025');

-- Comentários locais
INSERT INTO comentarios (projeto_id, autor, comentario)
VALUES
(1, 'Carol', 'Maurício pediu foco para concluir até o fim do ano'),
(3, 'Diogo', 'Será integrado ao BI após estabilização'),
(6, 'Usuário Local', 'Testar restore em ambiente de homologação antes de liberar em produção');
```

---

## 📊 Diagrama ER Simplificado

```mermaid
erDiagram
    projetos ||--o{ historico : possui
    projetos ||--o{ comentarios : recebe
    projetos ||--o{ responsaveis : tem

    projetos {
        int id PK
        text nome
        text responsavel
        text status
        date data_prevista
        date data_conclusao
        text criticidade
        text impacto
        text versao
        text observacoes
    }

    historico {
        int id PK
        int projeto_id FK
        text descricao
        datetime data_registro
    }

    comentarios {
        int id PK
        int projeto_id FK
        text autor
        text comentario
        datetime data_registro
    }

    responsaveis {
        int id PK
        int projeto_id FK
        text nome
        text papel
    }
```