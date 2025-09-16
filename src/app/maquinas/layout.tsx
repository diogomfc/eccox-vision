import Image from "next/image";
import BgImage from '@/assets/images/bg-detalhes-machine.svg';

export default function MachineDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen text-gray-100 py-16 px-6 overflow-hidden h-screen">
      {/* Imagem de fundo */}
      <Image
        src={BgImage}
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />
      {/* Conteúdo sobreposto */}
      <div className="relative z-10">{children}</div>
    </main>
  );
}
