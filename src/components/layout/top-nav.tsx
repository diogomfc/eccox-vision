// src/components/layout/TopNav.tsx

"use client";

import Image from "next/image";
import topDock from "@/assets/images/img-top-dock.svg";

export function TopNav() {
    return (
        <nav className="fixed top-0 z-10 h-24 w-full flex justify-center items-center ">
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
        </nav>
    );
}