import type { Metadata } from "next";
import "./globals.css";
import Cabecalho from "@/components/Cabecalho";

export const metadata: Metadata = {
  title: "Leque de Vagas",
  description: "Portal de oportunidades da equipe",
};

export default function RootLayout({  children,}: Readonly<{  children: React.ReactNode;}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[#0a0a0a] text-gray-200 min-h-screen">
        <Cabecalho />
        <main className="p-8">
          {children}
        </main> 
      </body>
    </html>
  );
}
