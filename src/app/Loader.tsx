"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
    const [dots, setDots] = useState("");

    // Animação dos pontinhos
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => {
                if (prev === "...") return "";
                return prev + ".";
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black z-[100] overflow-hidden"
        >
            {/* Fundo com efeito de partículas/estrelas */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Container principal do loader */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Spinner com efeitos avançados */}
                <div className="relative">
                    {/* Anel externo */}
                    <motion.div
                        className="w-20 h-20 border-4 border-transparent border-t-[#298BFE] rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    
                    {/* Anel interno */}
                    <motion.div
                        className="absolute top-2 left-2 w-16 h-16 border-3 border-transparent border-b-[#20A6B9] rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    
                    {/* Ponto central pulsante */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#298BFE] rounded-full -translate-x-1/2 -translate-y-1/2"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Texto com animações */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 flex flex-col items-center gap-2"
                >
                    <motion.h2 
                        className="text-2xl font-semibold bg-gradient-to-r from-[#298BFE] via-[#20A6B9] to-[#298BFE] bg-clip-text text-transparent bg-size-200 animate-gradient"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        Carregando{dots}
                    </motion.h2>
                    
                    <motion.p 
                        className="text-gray-400 text-sm"
                        animate={{
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        Preparando sua experiência
                    </motion.p>
                </motion.div>

                {/* Barra de progresso animada (decorativa) */}
                <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "200px", opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-6 h-1 bg-gray-800 rounded-full overflow-hidden"
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#298BFE] to-[#20A6B9] rounded-full"
                        animate={{
                            x: ["-100%", "100%"],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ width: "50%" }}
                    />
                </motion.div>
            </motion.div>

            {/* Efeito de brilho no fundo */}
            <motion.div
                className="absolute inset-0 bg-gradient-radial from-[#298BFE]/5 via-transparent to-transparent"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <style jsx>{`
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
                .bg-size-200 {
                    background-size: 200% 200%;
                }
                .animate-gradient {
                    animation: gradient 3s ease-in-out infinite;
                }
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </motion.div>
    );
}