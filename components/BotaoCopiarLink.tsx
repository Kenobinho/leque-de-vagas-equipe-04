"use client";

import { useState } from "react";

export default function BotaoCopiarLink() {
  const [copiado, setCopiado] = useState(false);

  const copiarLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <button 
      onClick={copiarLink} 
      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
    >
      {copiado ? "✓ Link copiado" : "Copiar link"}
    </button>
  );
}