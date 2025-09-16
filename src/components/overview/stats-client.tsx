// src/components/overview/stats-client.tsx
"use client";

import { motion } from "framer-motion";
import { StatsCard } from '@/components/overview/stats-card';


interface StatsClientProps {
    statsData: {
        title: string;
        value: number;
        description: string;
        imageSrc: any;
    }[];
}

export function StatsClient({ statsData }: StatsClientProps) {
    return (
        <section className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 mt-0">
            {statsData.map((data, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                    }}
                >
                    <StatsCard {...data} />
                </motion.div>
            ))}
        </section>
    );
}