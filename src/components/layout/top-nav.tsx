"use client";

import Image from "next/image";
import topDock from "@/assets/images/img-top-dock.svg";
import ReloadButton from "./reload-button";
import DatabaseManager from "../database/database-manager";


export function TopNav() {
    return (
        <>
            {/* Nav principal com a dock */}
            <nav className="fixed top-3 z-10 h-24 w-full flex justify-center items-center">
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

            {/* Botão de Reload no canto superior esquerdo */}
            <div className="fixed top-4 left-4 z-20">
                <ReloadButton />
            </div>

            {/* DatabaseManager no canto superior direito */}
            <div className="fixed top-4 right-4 z-20">
                <DatabaseManager />
            </div>
        </>
    );
}