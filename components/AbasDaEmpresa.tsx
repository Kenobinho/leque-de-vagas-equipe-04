"use client";

import { useState } from "react";
import Link from "next/link";
import type { Empresa, Vaga } from "@/lib/tipos";

export default function AbasDaEmpresa({
  empresa,
  vagas,
}: {
  /* A empresa inteira, e não só o texto do "sobre": a aba mostra o site
     também, e passar o objeto evita uma prop nova a cada campo que ela ganhar. */
  empresa: Empresa;
  vagas: Vaga[];
}) {
  // O estado aqui é TEXTO, não booleano: "sobre" ou "vagas".
  // Com booleano, a terceira aba (que um dia vem) não caberia.
  const [aba, setAba] = useState("sobre");

  return (
    <div>
      <div className="abas">
        <button
          type="button"
          // A classe é calculada do estado. Isto é estado derivado também:
          // nada de um useState só para guardar "qual botão está aceso".
          className={aba === "sobre" ? "aba ativa" : "aba"}
          onClick={() => setAba("sobre")}
        >
          Sobre
        </button>
        <button
          type="button"
          className={aba === "vagas" ? "aba ativa" : "aba"}
          onClick={() => setAba("vagas")}
        >
          Vagas ({vagas.length})
        </button>
      </div>

      {aba === "sobre" ? (
        <>
          <p>{empresa.sobre}</p>
          <p>
            <a href={empresa.site} target="_blank" rel="noopener noreferrer">
              {empresa.site}
            </a>
          </p>
        </>
      ) : vagas.length === 0 ? (
        // Lista vazia é um estado da tela, não um esquecimento.
        <p>Esta empresa não tem vaga aberta agora.</p>
      ) : (
        <ul className="lista">
          {vagas.map((vaga) => (
            <li key={vaga.id}>
              <Link href={`/vagas/${vaga.id}`}>{vaga.titulo}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
