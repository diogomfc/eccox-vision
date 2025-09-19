"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    HardDrive,
    PackagePlus,
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
import { motion } from "motion/react";
import "./footer-nav.css";

const navItems = [
    { name: "Visão geral", href: "/", icon: LayoutDashboard },
    // { name: "Máquinas", href: "/machines", icon: HardDrive },
    // { name: "Softwares", href: "/softwares", icon: Package },
    { name: "Nova Máquina", href: "/machines/create", icon: PackagePlus },
    { name: "Relatórios", href: "/reports", icon: FileText },
];

export function FooterNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.nav
            initial={{ y: 96 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 w-full flex justify-center p-0 m-0"
        >
            <div className="dock-container">
                <div
                    className={`dock-notch ${isOpen ? 'open' : 'closed'} cursor-pointer`}
                    onClick={toggleMenu}
                >
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
                        >
                            <ChevronUp className="w-6 h-6  text-gray-400 hover:text-white transition-all duration-200 relative top-2" />
                            <span className="text-xs font-normal text-gray-400 pb-3">Menu</span>
                        </motion.div>
                    )}
                </div>
            </div>
            
            <motion.div
                initial={{ y: 96, opacity: 0 }}
                animate={{
                    y: isOpen ? 0 : 96,
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute flex justify-center items-center h-24 bottom-0 w-full"
            >
                <TooltipProvider>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link 
                            key={item.href}
                            href={item.href} 
                            passHref
                            >
                                <div
                                    className={`flex flex-col items-center justify-center  mx-4 py-2 transition-colors duration-200
                                        ${isActive ? "text-[#20A6B9]" : "text-gray-400 hover:text-gray-200"}`}
                                >
                                    <Icon
                                        size={24}
                                        className={`mb-1 ${isActive ? "stroke-2" : "stroke-1"}`}
                                    />
                                    <span
                                        className={`text-xs font-medium whitespace-nowrap
                                            ${isActive ? "text-[#20A6B9] font-semibold" : "text-gray-400 font-normal"}`}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </TooltipProvider>
            </motion.div>
            
            {isOpen && (
                <motion.button
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    onClick={toggleMenu}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 p-1 cursor-pointer transition-colors duration-200"
                    title="Ocultar menu"
                    aria-label="Ocultar menu"
                >
                    <ChevronDown className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-200" />
                </motion.button>
            )}
        </motion.nav>
    );
}