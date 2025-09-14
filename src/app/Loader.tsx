import Image from "next/image"
import Logo from '../assets/logo/logo-eccox.svg';

export default function Loader() {
    return (
        <div className="">
            <Image 
            src={Logo}
            width={400}
            height={400}
            alt="Logo"
            />
            <div className="text-zinc-100">Carregando...</div>
        </div>
    )
}