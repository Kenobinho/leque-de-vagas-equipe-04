"use client";
// ↑ Primeira linha do arquivo, antes de qualquer import.
//   Sem ela não existe useState, e o onClick lá embaixo não tem quem escute.

import { useState } from "react";

// Fora do componente de propósito: é uma constante do arquivo. Não muda, e
// não tem por que nascer de novo a cada renderização.
const LIMITE = 180;

export default function DescricaoDaVaga({ texto }: { texto: string }) {
  // A memória do componente. Um booleano: aberta ou fechada.
  // [o valor, como mudar] = useState(o valor inicial)
  const [aberta, setAberta] = useState(false);

  // Estado derivado: as duas linhas abaixo saem do texto e do estado.
  // Nenhuma vira useState. Se dá para calcular, não guarde.
  const cabeInteira = texto.length <= LIMITE;
  const visivel = aberta || cabeInteira ? texto : texto.slice(0, LIMITE) + "…";

  return (
    <div className="descricao">
      <p>{visivel}</p>
      {!cabeInteira && (
        // setAberta(!aberta) — nunca "aberta = !aberta".
        // Mexer na variável na mão não avisa o React de nada.
        <button type="button" onClick={() => setAberta(!aberta)}>
          {aberta ? "ver menos ▲" : "ver mais ▼"}
        </button>
      )}
    </div>
  );
}
