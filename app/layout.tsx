import type { Metadata } from "next";
import Cabecalho from "@/components/Cabecalho";
import "./globals.css";

// Vira <title> e <meta name="description"> sozinho.
export const metadata: Metadata = {
  title: "Leque de Vagas",
  description: "Vagas de tecnologia para quem está migrando de carreira",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang="pt-BR" importa: o leitor de tela usa para escolher a voz
    <html lang="pt-BR">
      <body>
        <Cabecalho />
        <main className="conteudo">{children}</main>
        <footer className="rodape">Leque de Vagas · 2026</footer>
      </body>
    </html>
  );
}
