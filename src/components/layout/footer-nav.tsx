"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PackagePlus,
    FileText,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { TooltipProvider } from "../ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import "./footer-nav.css";

const navItems = [
    { name: "Visão geral", href: "/", icon: LayoutDashboard },
    { name: "Nova Máquina", href: "/machines/create", icon: PackagePlus },
    { name: "Relatórios", href: "/reports", icon: FileText },
];

export function FooterNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [loadingRoute, setLoadingRoute] = useState<string | null>(null);

    // Limpar o loading quando a rota muda ou quando não está mais pending
    useEffect(() => {
        if (!isPending && loadingRoute) {
            const timer = setTimeout(() => {
                setLoadingRoute(null);
            }, 300); // Delay mais curto
            
            return () => clearTimeout(timer);
        }
    }, [isPending, pathname, loadingRoute]);

    // Força limpeza do loading se a transição demorar muito
    useEffect(() => {
        if (loadingRoute) {
            const forceCleanup = setTimeout(() => {
                setLoadingRoute(null);
            }, 5000); // Força limpeza após 5 segundos
            
            return () => clearTimeout(forceCleanup);
        }
    }, [loadingRoute]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (href: string, itemName: string) => {
        if (pathname === href) return; // Não navega se já está na página atual
        
        setLoadingRoute(itemName);
        setIsOpen(false);
        
        startTransition(() => {
            router.push(href);
        });
    };

    const isLoading = isPending || loadingRoute !== null;

    return (
        <>
            {/* Loading Overlay Global */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] backdrop-blur-sm"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-[#20A6B9] border-t-transparent rounded-full animate-spin"></div>
                            <div className="text-center">
                                <p className="text-white font-medium">
                                    {loadingRoute ? `Carregando ${loadingRoute}...` : 'Carregando...'}
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                    Aguarde um momento
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Navigation */}
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
                                <ChevronUp className="w-6 h-6 text-gray-400 hover:text-white transition-all duration-200 relative top-2" />
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
                            const isItemLoading = loadingRoute === item.name;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.href}
                                    onClick={() => handleNavigation(item.href, item.name)}
                                    disabled={isLoading}
                                    className={`flex flex-col items-center justify-center mx-4 py-2 transition-all duration-200 cursor-pointer relative
                                        ${isActive ? "text-[#20A6B9]" : "text-gray-400 hover:text-gray-200"}
                                        ${isLoading && !isActive ? "opacity-50" : ""}
                                        ${isItemLoading ? "scale-95" : ""}
                                    `}
                                >
                                    {/* Loading indicator no botão específico */}
                                    {isItemLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <div className="w-6 h-6 border-2 border-[#20A6B9] border-t-transparent rounded-full animate-spin"></div>
                                        </motion.div>
                                    )}
                                    
                                    <Icon
                                        size={24}
                                        className={`mb-1 transition-opacity duration-200 ${
                                            isActive ? "stroke-2" : "stroke-1"
                                        } ${isItemLoading ? "opacity-0" : "opacity-100"}`}
                                    />
                                    <span
                                        className={`text-xs font-medium whitespace-nowrap transition-opacity duration-200 ${
                                            isActive ? "text-[#20A6B9] font-semibold" : "text-gray-400 font-normal"
                                        } ${isItemLoading ? "opacity-0" : "opacity-100"}`}
                                    >
                                        {item.name}
                                    </span>
                                </button>
                            );
                        })}
                    </TooltipProvider>
                </motion.div>

                {isOpen && !isLoading && (
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
        </>
    );
}