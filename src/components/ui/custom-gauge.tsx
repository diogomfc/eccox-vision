// src/components/machines/custom-gauge.tsx

"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";

interface CustomGaugeProps {
    value: number | string;
    total: number | string;
    description: string;
    percentage: number;
    colorProgresso: string;
    colorBackground?: string;
    showPercentSymbol?: boolean;
}

export function CustomGauge({ value, total, description, percentage, colorProgresso, colorBackground, showPercentSymbol = false }: CustomGaugeProps) {

    const isNumber = typeof value === "number";
    const [displayValue, setDisplayValue] = useState(isNumber ? 0 : value);

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const [animatedOffset, setAnimatedOffset] = useState(circumference);

    // Animação do valor central
    useEffect(() => {
        if (isNumber) {
            const controls = animate(0, Number(value), {
                duration: 0.7,
                onUpdate: (v) => setDisplayValue(Math.round(v)),
            });
            return () => controls.stop();
        } else {
            setDisplayValue(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        const targetOffset = circumference - (percentage / 100) * circumference;
        let raf: number;
        let start: number | null = null;
        const duration = 700; // ms
        const initial = animatedOffset;
        const delta = targetOffset - initial;

        function animate(ts: number) {
            if (start === null) start = ts;
            const elapsed = ts - start;
            const progress = Math.min(elapsed / duration, 1);
            setAnimatedOffset(initial + delta * progress);
            if (progress < 1) {
                raf = requestAnimationFrame(animate);
            }
        }
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [percentage, circumference]);

    return (
        <div className="flex flex-col items-center justify-center p-4 text-white">
            <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Círculo de fundo */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke={colorBackground || "#1A202C"}
                        strokeWidth="5"
                    />

                    {/* Barra de progresso animada */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke={colorProgresso}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={animatedOffset}
                        transform="rotate(-90 50 50)"
                        style={{ transition: 'stroke 0.2s' }}
                    />
                </svg>

                {/* Conteúdo central (valor e descrição) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span className="text-4xl font-bold">
                        {displayValue}
                        {isNumber && showPercentSymbol ? "%" : null}
                    </motion.span>
                    <span className="text-xs text-gray-400 mt-1">{description}</span>
                </div>
            </div>
        </div>
    );
}