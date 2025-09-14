"use client";

import Image, { StaticImageData } from 'next/image';


// Definimos as propriedades (props) que nosso componente vai receber
interface StatsCardProps {
    title: string;
    value: string | number;
    description: string;
    imageSrc: StaticImageData;
}

export function StatsCard({ title, value, description, imageSrc }: StatsCardProps) {
    return (
        <div className="bg-[#1A1A1E] rounded-lg p-4 flex items-center shadow-lg border border-[#323238]">
            <div className="flex-shrink-0 mr-4">
                <Image src={imageSrc} alt={title} width={82} height={102} />
            </div>
            <div>
                <h3 className="text-base text-white">{title}</h3>
                <p className="text-4xl font-bold text-white mt-1">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
        </div>
    );
}