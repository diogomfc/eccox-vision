// src/components/layout/footer-nav.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    HardDrive,
    Package,
    Settings,
    FileText,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

// Importe a imagem como um módulo (você pode ajustar o caminho se for diferente)
import menuDock from "@/assets/images/img-menu-dock.svg";
import menuDockerClose from "@/assets/images/img-menu-dock-close.svg";

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
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <TooltipProvider>
            <nav className="fixed bottom-0 left-0 right-0 z-50 w-full p-0 m-0">
                {/* Imagem de fundo da dock com transição */}
                <div 
                    className="absolute bottom-0 left-0 right-0 flex justify-center w-full cursor-pointer transition-all duration-300 ease-in-out"
                    onClick={toggleMenu}
                >
                    <Image
                        src={isOpen ? menuDock : menuDockerClose}
                        alt="Menu Dock Background"
                        width={1920}
                        height={96}
                        className="w-full h-24"
                        priority
                    />
                    
                    {/* Ícone central quando menu está fechado */}
                    {!isOpen && (
                        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-white transition-all duration-200 flex flex-col items-center">
                            <ChevronUp className="w-6 h-6 animate-bounce relative top-2" />
                            <span className="text-xs font-medium ">Menu</span>
                        </div>
                    )}
                </div>

                {/* Conteúdo do menu sobre a imagem com animação */}
          
                <div className={`relative z-10 flex justify-center items-center h-24 transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}>
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
                                                        ? "text-[#20A6B9]"
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
                                                            ? "text-[#20A6B9] font-semibold"
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

                      {/* Botão de toggle quando o menu está aberto */}
                {isOpen && (
                    <button 
                        onClick={toggleMenu}
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 p-1 cursor-pointer  transition-colors duration-200"
                        title="Ocultar menu"
                        aria-label="Ocultar menu"
                    >
                        <ChevronDown className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-200" />
                    </button>
                )}

            </nav>
        </TooltipProvider>
    );
}