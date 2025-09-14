// src/components/layout/TopNav.tsx

"use client";

import Image from "next/image";
import topDock from "@/assets/images/img-top-dock.png";

export function TopNav() {
    return (
        <nav className="fixed top-0 z-50 h-24 w-full flex justify-center items-center ">
            {/* Imagem de fundo da dock superior */}
            <div className="relative w-fit h-24">
                <Image
                    src={topDock}
                    alt="Top Dock Background"
                    className="object-cover object-top"
                    priority
                    sizes="100vw"
                />
            </div>

            {/* Conteúdo do topo sobre a imagem */}
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2">
                 {/* Aqui está o título posicionado acima da imagem */}
                 <h1 className="text-sm font-normal text-gray-400">Monitoramento e Observabilidade</h1>
            </div>
        </nav>
    );
}