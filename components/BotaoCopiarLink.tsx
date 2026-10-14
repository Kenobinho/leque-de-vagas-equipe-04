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
      style={{
        backgroundColor: "#27272a",
        color: "#e4e4e7",
        fontSize: "12px",
        padding: "8px 16px",
        borderRadius: "8px",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer"
      }}
    >
      {copiado ? "✓ Link copiado" : "Copiar link"}
    </button>
  );
}