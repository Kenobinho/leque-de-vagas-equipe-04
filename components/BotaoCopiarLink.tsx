"use client";

import { useState } from "react";

export default function BotaoCopiarLink({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        // location e navigator só existem no navegador.
        // É a segunda razão de este arquivo ser de cliente.
        navigator.clipboard.writeText(location.href);
        setCopiado(true);
      }}
    >
      {copiado ? `✓ Link de “${titulo}” copiado` : "🔗 Copiar link"}
    </button>
  );
}
