"use client";

import Image, { StaticImageData } from 'next/image';
import { motion, useMotionValue, useTransform } from "motion/react";
import { animate } from 'motion';
import { useEffect } from 'react';


interface StatsCardProps {
    title: string;
    value: string | number;
    description: string;
    imageSrc: StaticImageData;
}

export function StatsCard({ title, value, description, imageSrc }: StatsCardProps) {
  
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const numericValue = typeof value === 'number' ? value : parseInt(String(value)) || 0;
        const animation = animate(count, numericValue, {
            duration: 1,
            ease: "easeOut"
        });
        return animation.stop;
    }, [value, count]);

    return (
        <div className="bg-[#1A1A1E] rounded-lg p-4 flex items-center shadow-lg border h-36 border-[#323238]">
            <div className="flex-shrink-0 mr-4">
                <Image src={imageSrc} alt={title} width={82} height={102} />
            </div>
            <div>
                <h3 className="text-base text-white">{title}</h3>
                <p className="text-4xl font-bold text-white mt-1">
                    {typeof value === 'string' && isNaN(parseInt(value)) ? (
                        value
                    ) : (
                        <motion.span>{rounded}</motion.span>
                    )}
                </p>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
        </div>
    );
}