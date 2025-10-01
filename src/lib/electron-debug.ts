// src/lib/electron-debug.ts
"use client";

export class ElectronDebug {
    static log(message: string, data?: any) {
        if (typeof window !== 'undefined') {
            console.log(`[EccoxVision Debug] ${message}`, data || '');
        }
    }

    static error(message: string, error?: any) {
        if (typeof window !== 'undefined') {
            console.error(`[EccoxVision Error] ${message}`, error || '');
        }
    }

    static testNavigation() {
        this.log('Testando navegação...');
        
        // Testar hash routing
        const currentHash = window.location.hash;
        this.log('Hash atual:', currentHash);
        
        // Testar ElectronAPI
        if (window.electronAPI) {
            this.log('ElectronAPI disponível');
            this.log('Métodos disponíveis:', Object.keys(window.electronAPI));
        } else {
            this.error('ElectronAPI não disponível');
        }
        
        return {
            currentHash,
            electronAPI: !!window.electronAPI,
            methods: window.electronAPI ? Object.keys(window.electronAPI) : []
        };
    }

    static testDatabaseConnection() {
        this.log('Testando conexão com banco de dados...');
        
        if (window.electronAPI && window.electronAPI.getDatabaseStatus) {
            return window.electronAPI.getDatabaseStatus()
                .then(status => {
                    this.log('Status do banco:', status);
                    return status;
                })
                .catch(error => {
                    this.error('Erro ao obter status do banco:', error);
                    return null;
                });
        } else {
            this.error('Método getDatabaseStatus não disponível');
            return Promise.resolve(null);
        }
    }

    static runFullDiagnostic() {
        this.log('=== DIAGNÓSTICO COMPLETO ECCOXVISION ===');
        
        const navigation = this.testNavigation();
        this.testDatabaseConnection();
        
        // Testar componentes principais
        const componentTests = {
            machineView: !!document.querySelector('[data-testid="machine-view"]'),
            footerNav: !!document.querySelector('[data-testid="footer-nav"]'),
            databaseManager: !!document.querySelector('[data-testid="database-manager"]')
        };
        
        this.log('Componentes encontrados:', componentTests);
        
        return {
            navigation,
            components: componentTests,
            timestamp: new Date().toISOString()
        };
    }
}

// Expor globalmente para debug no console
if (typeof window !== 'undefined') {
    (window as any).ElectronDebug = ElectronDebug;
}