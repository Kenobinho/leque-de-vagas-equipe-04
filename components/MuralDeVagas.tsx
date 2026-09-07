"use client";

import { useState } from "react";
import Filtros from "./Filtros";
import CardDeVaga from "./CardDeVaga";
import { Vaga } from "@/lib/tipos";

export default function MuralDeVagas({ vagas }: { vagas: Vaga[] }) {
  // O estado mora AQUI, no pai comum dos filtros e da lista. Dois
  // componentes precisam da busca: quem mora sozinho não serve.
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("Todas");

  // Estado derivado: recalculado a cada renderização, nunca guardado.
  // new Set tira os repetidos; o espalhamento devolve array de novo.
  const areas = ["Todas", ...new Set(vagas.map((v) => v.area))];

  const visiveis = vagas.filter((vaga) => {
    const termo = busca.toLowerCase();
    // tudo minúsculo dos dois lados: quem busca "React" acha "react"
    const bateBusca =
      vaga.titulo.toLowerCase().includes(termo) ||
      vaga.empresa.toLowerCase().includes(termo);
    const bateArea = area === "Todas" || vaga.area === area;
    return bateBusca && bateArea;
  });

  // Mais uma conta. Muda sozinha quando visiveis muda.
  const aceitamIniciante = visiveis.filter((v) => v.aceitaIniciante).length;

  return (
    <section>
      {/* O dado desce por prop (busca, area) e o aviso sobe por função. */}
      <Filtros
        busca={busca}
        aoMudarBusca={setBusca}
        area={area}
        aoMudarArea={setArea}
        areas={areas}
      />

      <p className="numeros">
        <strong>{visiveis.length}</strong> de {vagas.length} vagas ·{" "}
        <strong>{aceitamIniciante}</strong> aceitam quem está começando
      </p>

      {/* A lista vazia é um estado da tela, não um esquecimento. */}
      {visiveis.length === 0 ? (
        <p>Nenhuma vaga com esse filtro. Tente outra palavra.</p>
      ) : (
        <ul className="lista">
          {visiveis.map((vaga) => (
            <CardDeVaga key={vaga.id} vaga={vaga} />
          ))}
        </ul>
      )}
    </section>
  );
}
