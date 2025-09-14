// "use client";
// import Image from 'next/image';
// //import SideTeste from "@/components/layout/side-teste";
// //import Side from "./(components)/Side";
// import Logo from '../assets/logo-eccox-svg.svg';

// export default function Home() {

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
//       <div className="w-full md:w-1/2 border-r p-4 min-h-screen flex items-center justify-center bg-gradient-to-t from-blue-900 to-blue-950">
//         <Image
//           src={Logo}
//           width={500}
//           height={500}
//           alt="Logo"
//           priority
//         />
//       </div>
//       <div className="w-full md:w-1/2 p-4 min-h-screen flex items-center justify-center">
//         Teste
//       </div>
//     </div>
//   );
// }

"use client";

import Image from 'next/image';
import { StatsCard } from '@/components/overview/stats-card';
import ImgServerStatus from '../assets/images/img-server-status.svg';
import ImgServerStatusWarning from '../assets/images/img-server-status-warning.svg';
import AppStatusOk from '../assets/images/img-app-status-ok.svg';
import AppStatusWarning from '../assets/images/img-app-status-warning.svg';


import BgImage from '../assets/images/bg-overview.png';

export default function OverviewPage() {
  const statsData = [
    { title: 'Total de Máquinas', value: 7, description: 'Mainframe monitorados', imageSrc: ImgServerStatus },
    { title: 'Aplicação instaladas', value: 79, description: 'Configuração concluída', imageSrc: AppStatusOk },
    { title: 'Aplicação pendentes', value: 65, description: 'Aguardando instalação', imageSrc: AppStatusWarning },
    { title: 'Máquinas críticas', value: 4, description: 'Menos de 50% completas', imageSrc: ImgServerStatusWarning },
  ];

  return (
    <main className="relative min-h-screen text-gray-100 py-16 px-6 overflow-hidden">
      {/* Imagem de fundo */}
      <Image
        src={BgImage}
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Conteúdo sobreposto */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {statsData.map((data, index) => (
          <StatsCard key={index} {...data} />
        ))}
      </section>
    </main>
  );
}