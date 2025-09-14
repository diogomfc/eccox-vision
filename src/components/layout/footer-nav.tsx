// src/components/layout/footer-nav.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    HardDrive,
    Package,
    Settings,
    FileText,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

// Importe a imagem como um módulo (você pode ajustar o caminho se for diferente)
import menuDock from "@/assets/images/img-menu-dock.png";

const navItems = [
    {
        name: "Visão geral",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Máquinas",
        href: "/maquinas",
        icon: HardDrive,
    },
    {
        name: "Softwares",
        href: "/softwares",
        icon: Package,
    },
    {
        name: "Serviços",
        href: "/servicos",
        icon: Settings,
    },
    {
        name: "Relatórios",
        href: "/relatorios",
        icon: FileText,
    },
];

export function FooterNav() {
    const pathname = usePathname();

    return (
        <TooltipProvider>
            <nav className="fixed bottom-0 left-0 right-0 z-50 h-24 w-full overflow-hidden p-0 m-0">
                {/* Imagem de fundo da dock */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full">
                    <Image
                        src={menuDock}
                        alt="Menu Dock Background"
                        width={1920}
                        height={96}
                        className="w-full h-24"
                        priority
                    />
                </div>

                {/* Conteúdo do menu sobre a imagem */}
                <div className="relative z-10 flex justify-center items-center h-full">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Tooltip key={item.name}>
                                <TooltipTrigger asChild>
                                    <Link href={item.href} passHref>
                                        <div
                                            className={`flex flex-col items-center justify-center mx-4 py-2 transition-colors duration-200
                                                ${
                                                    isActive
                                                        ? "text-[#4fd1c5]"
                                                        : "text-gray-400 hover:text-gray-200"
                                                }`}
                                        >
                                            <Icon
                                                size={24}
                                                className={`mb-1 ${
                                                    isActive ? "stroke-2" : "stroke-1"
                                                }`}
                                            />
                                            <span
                                                className={`text-xs font-medium whitespace-nowrap
                                                    ${
                                                        isActive
                                                            ? "text-[#4fd1c5] font-semibold"
                                                            : "text-gray-400"
                                                    }`}
                                            >
                                                {item.name}
                                            </span>
                                        </div>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{item.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </nav>
        </TooltipProvider>
    );
}