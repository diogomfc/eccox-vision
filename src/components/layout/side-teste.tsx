"use client";
import Image from 'next/image';
import Logo from '../../assets/logo-eccox-svg.svg';

export default function SideTeste() {
    
    return (
        <div className="text-center flex flex-col justify-center items-center gap-5">
            <Image
                src={Logo}
                width={500}
                height={500}
                alt="Logo"
                priority
            />
            <p className="font-bold text-4xl text-shadow-2xs text-shadow-blue-100 text-blue-100 antialiased">
                File Encrypter/Decrypter
            </p>
           
        </div>
    );
}
