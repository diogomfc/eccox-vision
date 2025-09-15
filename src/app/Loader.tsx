"use client";

import Image from "next/image";
import loaderCircle from '../assets/images/loader-circle.svg';
import { motion } from "motion/react";

export default function Loader() {
    return (
  
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 gap-5">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <Image 
                src={loaderCircle}
                width={34}
                height={34}
                alt="loader Circle"
                />
            </motion.div>
            <div className="text-[#3F5D7E] mt-4 text-lg">Carregando...</div>
        </div>
    );
}