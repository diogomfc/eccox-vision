# 🚀 Comandos Rápidos - EccoxVision

## ⚡ **COMANDOS ESSENCIAIS**

### 🏗️ **Build Completo**
```bash
yarn build:app
# ↳ Gera executável completo em dist/
```

### 🛠️ **Desenvolvimento**
```bash
yarn dev:electron
# ↳ Next.js + Electron com hot reload
```

### 🧪 **Teste Rápido**
```bash
yarn build:next && yarn dev:electron
# ↳ Build frontend + teste no Electron
```

---

## 📋 **PASSO A PASSO MANUAL**

### 1️⃣ **Frontend**
```bash
yarn build:next
# ↳ Compila Next.js + corrige paths
```

### 2️⃣ **Organizar**
```bash
yarn move:out  
# ↳ Move out/ → electron/dist/out/
```

### 3️⃣ **Backend**
```bash
yarn build:electron
# ↳ Compila TypeScript + move assets
```

### 4️⃣ **Executável**
```bash
electron-builder
# ↳ Gera .exe em dist/
```

---

## 🔍 **DEBUG & TESTES**

### 🚨 **Executar App**
```bash
& ".\dist\EccoxVision 1.0.0.exe"
```

### 🛠️ **Debug Console**
```javascript
// No DevTools (F12):
ElectronDebug.runFullDiagnostic()
```

### 🔧 **Limpar Cache**
```bash
rm -rf out/ electron/dist/ dist/ node_modules/.cache/
```

---

## 📁 **ARQUIVOS IMPORTANTES**

| Arquivo | Função |
|---------|--------|
| `next.config.ts` | Config Next.js p/ Electron |
| `fix-paths.js` | Corrige assets `/_next/` → `./_next/` |
| `move-out.js` | Move frontend p/ Electron |
| `move-assets.js` | Copia recursos visuais |
| `electron/main.ts` | Processo principal Electron |

---

## ✅ **CHECKLIST RÁPIDO**

### Antes do Build:
- [ ] `yarn install` 
- [ ] Código funcionando em dev

### Após Build:
- [ ] Pasta `dist/` criada
- [ ] `.exe` executa sem erro
- [ ] Interface não está branca
- [ ] Navegação funciona

---

## 🆘 **PROBLEMAS COMUNS**

| Problema | Solução |
|----------|---------|
| 🔴 Tela branca | Verificar `fix-paths.js` executado |
| 🔴 Erro TypeScript | `rm -rf electron/dist/ && yarn build:electron` |
| 🔴 App não abre | `yarn rebuild && yarn build:app` |
| 🔴 Dados não carregam | Verificar `window.electronAPI` no console |

---

## 🎯 **RESULTADO ESPERADO**

```
📁 dist/
├── EccoxVision 1.0.0.exe           # 📱 Portable (~200MB)
├── EccoxVision Setup 1.0.0.exe     # 💿 Instalador (~200MB)  
└── win-unpacked/                    # 📂 Versão descompactada
```

**✨ Aplicação 100% funcional após `yarn build:app`!**