import type { Metadata } from "next";
import { Suspense } from "react";

import "./globals.css";
import Loader from "./Loader";
import { FooterNav } from "@/components/layout/footer-nav";
import { TopNav } from "@/components/layout/top-nav";
import AppInitializer from "@/components/layout/app-initializer";

export const metadata: Metadata = {
  title: "EccoxVision - Monitoramento de Serviços Mainframe",
  description:
    "Dashboard para acompanhamento de projetos, serviços e atualizações em ambientes mainframe",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased bg-[#121214]`}
      >
        <Suspense fallback={<Loader />}>
         <AppInitializer>
            <TopNav />
            {children}
            <FooterNav />
          </AppInitializer>
        </Suspense>
      </body>
    </html>
  );
}