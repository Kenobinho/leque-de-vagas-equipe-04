import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avisa duas vezes sobre efeitos colaterais em desenvolvimento —
  // ajuda a pegar bugs que só apareceriam em produção.
  reactStrictMode: true,

  turbopack: {
    // Diz ao Turbopack que a raiz do projeto é ESTA pasta. Sem isso, se você
    // tiver um package.json solto na pasta do usuário, ele reclama.
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
