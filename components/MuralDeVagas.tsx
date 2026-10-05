"use client";

import { useState } from "react";
import Link from "next/link";
import { Vaga } from "@/lib/tipos";
import Filtros from "./Filtros";

interface MuralDeVagasProps {
  vagas: Vaga[];
}

export default function MuralDeVagas({ vagas }: MuralDeVagasProps) {
  // 1. Estados controlados:
  const [buscaTexto, setBuscaTexto] = useState<string>("");
  const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>([]);
  const [valorDesejado, setValorDesejado] = useState<number>(0);
  const [regimes, setRegimes] = useState<string[]>([]);
  const [distanciaKm, setDistanciaKm] = useState<number>(100);
  const [beneficiosSelecionados, setBeneficiosSelecionados] = useState<string[]>([]);
  const [nivelSelecionado, setNivelSelecionado] = useState<string>("");
  const [modalidadesSelecionadas, setModalidadesSelecionadas] = useState<string[]>([]);
  const [apenasUrgencia, setApenasUrgencia] = useState<boolean>(false);
  const [apenasIniciantes, setApenasIniciantes] = useState<boolean>(false);

  const limparFiltros = () => {
    setBuscaTexto("");
    setAreasSelecionadas([]);
    setValorDesejado(0);
    setRegimes([]);
    setDistanciaKm(100);
    setBeneficiosSelecionados([]);
    setNivelSelecionado("");
    setModalidadesSelecionadas([]);
    setApenasUrgencia(false);
    setApenasIniciantes(false);
  };

  // 2. Estado Derivado: Filtragem das vagas
  const visiveis = vagas.filter((vaga) => {
    if (buscaTexto && !vaga.titulo.toLowerCase().includes(buscaTexto.toLowerCase())) {
      return false;
    }
    if (areasSelecionadas.length > 0 && !areasSelecionadas.includes(vaga.area)) {
      return false;
    }
    if (nivelSelecionado && vaga.senioridade.toLowerCase() !== nivelSelecionado.toLowerCase()) {
      return false;
    }
    if (modalidadesSelecionadas.length > 0 && !modalidadesSelecionadas.includes(vaga.modalidade)) {
      return false;
    }
    if (apenasUrgencia && !vaga.urgencia) {
      return false;
    }
    if (apenasIniciantes && !vaga.aceitaIniciante) {
      return false;
    }
    if (beneficiosSelecionados.length > 0) {
      const temBeneficios = beneficiosSelecionados.every((beneficioBuscado) =>
        vaga.beneficios?.some((b) =>
          b.toLowerCase().includes(beneficioBuscado.toLowerCase())
        )
      );
      if (!temBeneficios) {
        return false;
      }
    }
    if (regimes.length > 0) {
      const eRemoto = vaga.local.toLowerCase().includes("remoto");
      const matchRemoto = regimes.includes("Remoto") && eRemoto;
      const matchPresencial = regimes.includes("Presencial") && !eRemoto;
      if (!matchRemoto && !matchPresencial) {
        return false;
      }
    }    
    return true;
  });

  return (
    <div className="mural-grid">
      
      {/* Coluna 1 (ocupa 1fr): Os Filtros */}
      <Filtros
        buscaTexto={buscaTexto}
        setBuscaTexto={setBuscaTexto}
        areasSelecionadas={areasSelecionadas}
        setAreasSelecionadas={setAreasSelecionadas}
        valorDesejado={valorDesejado}
        setValorDesejado={setValorDesejado}
        regimes={regimes}
        setRegimes={setRegimes}
        distanciaKm={distanciaKm}
        setDistanciaKm={setDistanciaKm}
        beneficiosSelecionados={beneficiosSelecionados}
        setBeneficiosSelecionados={setBeneficiosSelecionados}
        nivelSelecionado={nivelSelecionado}
        setNivelSelecionado={setNivelSelecionado}
        modalidadesSelecionadas={modalidadesSelecionadas}
        setModalidadesSelecionadas={setModalidadesSelecionadas}
        apenasUrgencia={apenasUrgencia}
        setApenasUrgencia={setApenasUrgencia}
        apenasIniciantes={apenasIniciantes}
        setApenasIniciantes={setApenasIniciantes}
        onLimparFiltros={limparFiltros}
      />

      {/* Coluna 2 (ocupa 2fr): Contagem + Lista de Vagas */}
      <div className="mural-conteudo">
        
        {/* Contagem em tempo real */}
        <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa", fontSize: "0.875rem" }}>
          <p>
            <strong style={{ color: "#000000" }}>{visiveis.length}</strong> de {vagas.length} vagas encontradas
          </p>
        </div>

        {/* Lista de Vagas */}
        <div style={{ display: "grid", gap: "16px" }}>
          {visiveis.map((vaga) => (
              <Link 
                key={vaga.id} 
                href={`/vagas/${vaga.id}`}
                className="block bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all shadow-md group"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {vaga.titulo}
                  </h2>
                  {vaga.urgencia && (
                    <span className="bg-red-950/50 border border-red-800 text-red-400 text-xs px-2.5 py-1 rounded-full font-medium">
                      Urgente
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-2 flex flex-wrap gap-2 items-center">
                  <span className="text-gray-200 font-medium">{vaga.empresa}</span> 
                  · {vaga.area} 
                  · {vaga.senioridade} 
                  · {vaga.local}
                </p>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-800/60">
                  <span className="text-xs text-zinc-400 font-mono">
                    {vaga.modalidade} · {vaga.faixaSalarial}
                  </span>
                  {vaga.aceitaIniciante && (
                    <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                      Aceita iniciante
                    </span>
                  )}
                </div>
            </Link>
          ))}
        </div>

      </div>

    </div>
  );
}