"use client";

import { useState } from "react";

export default function DescricaoDaVaga({ texto }: { texto: string }) {
  const [aberta, setAberta] = useState(false);
  const precisaCortar = texto.length > 180;
  
  const textoVisivel = !precisaCortar || aberta 
    ? texto 
    : texto.substring(0, 180) + "...";

  return (
    <div>
      <p>{textoVisivel}</p>
      {precisaCortar && (
        <button 
          onClick={() => setAberta(!aberta)} 
          style={{ color: "blue", fontWeight: "bold", marginTop: "8px", cursor: "pointer" }}
        >
          {aberta ? "ver menos" : "ver mais"}
        </button>
      )}
    </div>
  );
}