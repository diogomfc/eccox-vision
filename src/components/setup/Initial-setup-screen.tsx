import React from "react";
import { Database, Settings } from "lucide-react";
import DatabasePanel from "../shared/database-panel";

interface InitialSetupScreenProps {
  onSetupComplete: () => void;
}

const InitialSetupScreen: React.FC<InitialSetupScreenProps> = ({
  onSetupComplete,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 lg:p-3 bg-[#0b0e11]">
      <div className="w-full max-w-md lg:max-w-lg mx-auto rounded-lg lg:rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-[#111113] to-[#0F0F11] border border-blue-500/30">
        {/* Header */}
        <div className="px-3 py-3 lg:px-4 lg:py-4 border-b bg-gradient-to-r from-blue-600/10 to-blue-700/5 border-blue-500/30 text-center">
          <div className="mx-auto w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center mb-1.5 lg:mb-2">
            <Database className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <h1 className="text-sm lg:text-base font-semibold text-white">
            Bem-vindo ao EccoxVision
          </h1>
          <p className="text-xs text-gray-300 mt-0.5 lg:mt-1">
            Configure seu primeiro banco de dados
          </p>
        </div>

        {/* Body */}
        <div className="p-3 lg:p-4">
          <div className="mb-3 lg:mb-4 p-2 lg:p-3 bg-blue-950/30 border border-blue-500/20 rounded-md lg:rounded-lg">
            <p className="text-xs text-blue-200 text-center leading-relaxed">
              Configure seu banco de dados inicial. Após a configuração, você poderá alternar entre bancos usando o <strong>Gerenciador de Banco</strong> no menu da aplicação.
            </p>
          </div>

          {/* Database Panel Reutilizável */}
          <DatabasePanel
            mode="setup"
            onSetupComplete={onSetupComplete}
            autoShowAddWhenEmpty={true}
            className="space-y-4"
          />
        </div>
      </div>
    </div>
  );
};

export default InitialSetupScreen;