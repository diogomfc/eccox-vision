// src/app/reports/page.tsx
"use client";

import { Wrench } from "lucide-react";

export default function ReportsPage() {
  return (
    <main className="h-screen  text-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 pb-60 text-center">
        <Wrench size={80} className="text-gray-500 animate-pulse" />
        <h1 className="text-4xl font-bold text-gray-200">Em Construção</h1>
        <p className="text-lg text-gray-400 max-w-md">
            Esta seção está em construção. Por favor, volte mais tarde para ver os relatórios.
        </p>
      </div>
    </main>
  );
}