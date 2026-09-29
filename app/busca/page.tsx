"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { vagas } from "@/data/vagas";
import { Vaga } from "@/lib/tipos";

// Função auxiliar para extrair o maior valor numérico de salários (ex: "R$ 4.000 - R$ 6.000" -> 6000)
function extrairSalarioMax(faixa: string): number {
  const numeros = faixa
    .replace(/R\$/g, "")
    .replace(/\./g, "")
    .split("-")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));

  if (numeros.length === 0) return 0;
  return Math.max(...numeros);
}

function extrairSalarioMin(faixa: string): number {
  const numeros = faixa
    .replace(/R\$/g, "")
    .replace(/\./g, "")
    .split("-")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));

  if (numeros.length === 0) return 0;
  return Math.min(...numeros);
}

export default function PaginaDeBusca() {
  // Filtro de texto geral
  const [buscaTexto, setBuscaTexto] = useState("");

  // Filtros conforme o mockup
  const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>([]);
  const [valorDesejado, setValorDesejado] = useState<number>(0);
  const [valorInput, setValorInput] = useState<string>("");
  const [regimes, setRegimes] = useState<string[]>([]);
  const [distanciaKm, setDistanciaKm] = useState<number>(100);
  const [beneficiosSelecionados, setBeneficiosSelecionados] = useState<string[]>([]);
  const [nivelSelecionado, setNivelSelecionado] = useState<string>("");
  const [modalidadesSelecionadas, setModalidadesSelecionadas] = useState<string[]>([]);
  const [apenasUrgencia, setApenasUrgencia] = useState(false);
  const [apenasIniciantes, setApenasIniciantes] = useState(false);

  // Lista de opções baseadas no layout da imagem e nos dados reais
  const listaAreas = [
    { id: "Back-End", rotulo: "Back-End" },
    { id: "Dados", rotulo: "Dados" },
    { id: "Devops", rotulo: "Devops / Infra" },
    { id: "Front-end", rotulo: "Front-End" },
    { id: "Mobile", rotulo: "Mobile" },
    { id: "Design", rotulo: "Design" },
    { id: "Gestão", rotulo: "Gestão" },
    { id: "Marketing", rotulo: "Marketing" },
    { id: "IA", rotulo: "Inteligência Artificial" },
  ];

  const listaRegimes = [
    { id: "Presencial", rotulo: "Presencial" },
    { id: "Remoto", rotulo: "Remoto" },
    { id: "Híbrido", rotulo: "Híbrido" },
  ];

  const listaBeneficios = [
    { id: "Gympass", rotulo: "Gympass" },
    { id: "Plano de Saúde", rotulo: "Plano de Saúde" },
    { id: "Vale Refeição", rotulo: "Vale Refeição" },
    { id: "Vale Transporte", rotulo: "Vale Transporte" },
    { id: "Vale Alimentação", rotulo: "Vale Alimentação" },
    { id: "Flexibilidade de Horário", rotulo: "Flexibilidade de Horário" },
  ];

  const listaNiveis = ["Junior", "Pleno", "Senior"];
  const listaModalidades = ["CLT", "PJ"];

  // Toggle de seleção em arrays
  const toggleItem = (item: string, lista: string[], setLista: (val: string[]) => void) => {
    if (lista.includes(item)) {
      setLista(lista.filter((i) => i !== item));
    } else {
      setLista([...lista, item]);
    }
  };

  // Sincronização do slider com o input de texto do valor
  const handleValorSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setValorDesejado(val);
    setValorInput(val > 0 ? String(val) : "");
  };

  const handleValorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setValorInput(rawVal);
    const parsed = parseInt(rawVal.replace(/\D/g, ""), 10);
    setValorDesejado(isNaN(parsed) ? 0 : parsed);
  };

  // Resetar todos os filtros
  const limparFiltros = () => {
    setBuscaTexto("");
    setAreasSelecionadas([]);
    setValorDesejado(0);
    setValorInput("");
    setRegimes([]);
    setDistanciaKm(100);
    setBeneficiosSelecionados([]);
    setNivelSelecionado("");
    setModalidadesSelecionadas([]);
    setApenasUrgencia(false);
    setApenasIniciantes(false);
  };

  // Filtragem reativa das vagas
  const vagasFiltradas = useMemo(() => {
    return vagas.filter((vaga: Vaga) => {
      // 1. Busca por texto
      if (buscaTexto.trim() !== "") {
        const query = buscaTexto.toLowerCase();
        const coincideTitulo = vaga.titulo.toLowerCase().includes(query);
        const coincideEmpresa = vaga.empresa.toLowerCase().includes(query);
        const coincideDescricao = vaga.descricao.toLowerCase().includes(query);
        const coincideArea = vaga.area.toLowerCase().includes(query);
        const coincideLocal = vaga.local.toLowerCase().includes(query);
        if (!coincideTitulo && !coincideEmpresa && !coincideDescricao && !coincideArea && !coincideLocal) {
          return false;
        }
      }

      // 2. Área
      if (areasSelecionadas.length > 0) {
        const areaVaga = vaga.area.toLowerCase();
        const coincideArea = areasSelecionadas.some((area) => {
          const a = area.toLowerCase();
          if (a === "devops") return areaVaga.includes("infra") || vaga.descricao.toLowerCase().includes("devops");
          if (a === "back-end") return areaVaga.includes("back");
          if (a === "front-end") return areaVaga.includes("front");
          return areaVaga.includes(a);
        });
        if (!coincideArea) return false;
      }

      // 3. Valor salarial (vagas que alcancem ou superem o valor desejado)
      if (valorDesejado > 0) {
        const salarioMax = extrairSalarioMax(vaga.faixaSalarial);
        if (salarioMax < valorDesejado) {
          return false;
        }
      }

      // 4. Regime
      if (regimes.length > 0) {
        const eRemoto = vaga.local.toLowerCase().includes("remoto");
        const matchRemoto = regimes.includes("Remoto") && eRemoto;
        const matchPresencial = regimes.includes("Presencial") && !eRemoto;
        const matchHibrido = regimes.includes("Híbrido") && (vaga.descricao.toLowerCase().includes("híbrido") || !eRemoto);

        if (!matchRemoto && !matchPresencial && !matchHibrido) {
          return false;
        }
      }

      // 5. Distância (km)
      if (distanciaKm < 100) {
        // Se a vaga for Remota, a distância não restringe
        const eRemoto = vaga.local.toLowerCase().includes("remoto");
        if (!eRemoto && distanciaKm < 30) {
          // Exemplo didático de limitação para cidades fora do raio restrito
          return false;
        }
      }

      // 6. Benefícios
      if (beneficiosSelecionados.length > 0) {
        const temTodosBeneficios = beneficiosSelecionados.every((b) =>
          vaga.beneficios.some((beneficioVaga) =>
            beneficioVaga.toLowerCase().includes(b.toLowerCase())
          )
        );
        if (!temTodosBeneficios) return false;
      }

      // 7. Nível (Senioridade)
      if (nivelSelecionado !== "") {
        const senioridade = vaga.senioridade.toLowerCase();
        const nivel = nivelSelecionado.toLowerCase();
        if (nivel === "junior" && !senioridade.includes("júnior") && !senioridade.includes("junior")) return false;
        if (nivel === "pleno" && !senioridade.includes("pleno")) return false;
        if (nivel === "senior" && !senioridade.includes("sênior") && !senioridade.includes("senior")) return false;
      }

      // 8. Modalidade
      if (modalidadesSelecionadas.length > 0) {
        if (!modalidadesSelecionadas.includes(vaga.modalidade.toUpperCase())) {
          return false;
        }
      }

      // 9. Urgência
      if (apenasUrgencia && !vaga.urgencia) {
        return false;
      }

      // 10. Aceita iniciantes
      if (apenasIniciantes && !vaga.aceitaIniciante) {
        return false;
      }

      return true;
    });
  }, [
    buscaTexto,
    areasSelecionadas,
    valorDesejado,
    regimes,
    distanciaKm,
    beneficiosSelecionados,
    nivelSelecionado,
    modalidadesSelecionadas,
    apenasUrgencia,
    apenasIniciantes,
  ]);

  const temFiltroAtivo =
    buscaTexto.trim() !== "" ||
    areasSelecionadas.length > 0 ||
    valorDesejado > 0 ||
    regimes.length > 0 ||
    distanciaKm < 100 ||
    beneficiosSelecionados.length > 0 ||
    nivelSelecionado !== "" ||
    modalidadesSelecionadas.length > 0 ||
    apenasUrgencia ||
    apenasIniciantes;

  return (
    <div className="-m-8 p-6 md:p-10 bg-white min-h-[calc(100vh-80px)] text-zinc-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da Página de Busca */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            Buscar Oportunidades
          </h1>
          <p className="text-base text-zinc-600 mt-2">
            Pesquise por cargos, tecnologias e filtre de acordo com suas preferências salariais, regime e benefícios.
          </p>

          {/* Barra de Pesquisa Textual */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={buscaTexto}
                onChange={(e) => setBuscaTexto(e.target.value)}
                placeholder="Buscar por cargo, empresa, tecnologia ou palavras-chave..."
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 placeholder:text-zinc-500 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all shadow-sm text-sm sm:text-base"
              />
            </div>
            {temFiltroAtivo && (
              <button
                onClick={limparFiltros}
                className="px-5 py-3 rounded-xl border border-zinc-300 text-zinc-700 bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 font-semibold text-sm transition-all whitespace-nowrap shadow-sm"
              >
                Limpar todos os filtros
              </button>
            )}
          </div>
        </div>

        {/* Layout Principal: Filtros à esquerda, Resultados à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* PAINEL DE FILTROS (Baseado fielmente na imagem, com tipografia nítida e fundo branco) */}
          <aside className="lg:col-span-4 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-7">
            
            {/* 1. Área */}
            <div>
              <h2 className="text-base font-bold text-zinc-900 mb-3 tracking-wide">
                Área
              </h2>
              <div className="space-y-2.5">
                {listaAreas.map((area) => (
                  <label
                    key={area.id}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={areasSelecionadas.includes(area.id)}
                      onChange={() => toggleItem(area.id, areasSelecionadas, setAreasSelecionadas)}
                      className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 focus:ring-offset-0 cursor-pointer accent-zinc-900"
                    />
                    <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-950 transition-colors">
                      {area.rotulo}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-zinc-200" />

            {/* 2. Valor (R$) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-bold text-zinc-900 tracking-wide">
                  Valor (R$)
                </h2>
                {valorDesejado > 0 && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200">
                    A partir de R$ {valorDesejado.toLocaleString("pt-BR")}
                  </span>
                )}
              </div>

              {/* Slider com indicador limpo sem sobreposição */}
              <div className="my-3">
                <input
                  type="range"
                  min="0"
                  max="18000"
                  step="500"
                  value={valorDesejado}
                  onChange={handleValorSliderChange}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                />
                <div className="flex justify-between text-[11px] font-semibold text-zinc-400 mt-1">
                  <span>R$ 0</span>
                  <span>R$ 9.000</span>
                  <span>R$ 18.000+</span>
                </div>
              </div>

              {/* Input de digitação de valor */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm font-bold text-zinc-700">R$</span>
                <input
                  type="text"
                  placeholder="Digite o valor desejado..."
                  value={valorInput}
                  onChange={handleValorInputChange}
                  className="flex-1 px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all"
                />
              </div>
            </div>

            <hr className="border-zinc-200" />

            {/* 3. Regime */}
            <div>
              <h2 className="text-base font-bold text-zinc-900 mb-3 tracking-wide">
                Regime
              </h2>
              <div className="space-y-2.5">
                {listaRegimes.map((regime) => (
                  <label
                    key={regime.id}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={regimes.includes(regime.id)}
                      onChange={() => toggleItem(regime.id, regimes, setRegimes)}
                      className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 focus:ring-offset-0 cursor-pointer accent-zinc-900"
                    />
                    <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-950 transition-colors">
                      {regime.rotulo}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-zinc-200" />

            {/* 4. Distância (km) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-bold text-zinc-900 tracking-wide">
                  Distância (km)
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200">
                  {distanciaKm >= 100 ? "Qualquer distância" : `Até ${distanciaKm} km`}
                </span>
              </div>
              <div className="my-3">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={distanciaKm}
                  onChange={(e) => setDistanciaKm(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                />
                <div className="flex justify-between text-[11px] font-semibold text-zinc-400 mt-1">
                  <span>10 km</span>
                  <span>50 km</span>
                  <span>100+ km</span>
                </div>
              </div>
            </div>

            <hr className="border-zinc-200" />

            {/* 5. Benefícios */}
            <div>
              <h2 className="text-base font-bold text-zinc-900 mb-3 tracking-wide">
                Benefícios
              </h2>
              <div className="space-y-2.5">
                {listaBeneficios.map((beneficio) => (
                  <label
                    key={beneficio.id}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={beneficiosSelecionados.includes(beneficio.id)}
                      onChange={() =>
                        toggleItem(beneficio.id, beneficiosSelecionados, setBeneficiosSelecionados)
                      }
                      className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 focus:ring-offset-0 cursor-pointer accent-zinc-900"
                    />
                    <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-950 transition-colors">
                      {beneficio.rotulo}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-zinc-200" />

            {/* 6. Nível */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-bold text-zinc-900 tracking-wide">
                  Nível
                </h2>
                {nivelSelecionado && (
                  <button
                    onClick={() => setNivelSelecionado("")}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Limpar
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                {listaNiveis.map((nivel) => (
                  <label
                    key={nivel}
                    className="flex items-center gap-2 cursor-pointer group select-none"
                  >
                    <input
                      type="radio"
                      name="nivel"
                      value={nivel}
                      checked={nivelSelecionado === nivel}
                      onChange={() => setNivelSelecionado(nivel)}
                      className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-900 cursor-pointer accent-zinc-900"
                    />
                    <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-950 transition-colors">
                      {nivel}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-zinc-200" />

            {/* 7. Modalidade */}
            <div>
              <h2 className="text-base font-bold text-zinc-900 mb-3 tracking-wide">
                Modalidade
              </h2>
              <div className="flex flex-wrap gap-4">
                {listaModalidades.map((mod) => (
                  <label
                    key={mod}
                    className="flex items-center gap-2 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={modalidadesSelecionadas.includes(mod)}
                      onChange={() =>
                        toggleItem(mod, modalidadesSelecionadas, setModalidadesSelecionadas)
                      }
                      className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer accent-zinc-900"
                    />
                    <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-950 transition-colors">
                      {mod}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-zinc-200" />

            {/* 8. Toggles extras: Urgência e Aceita iniciantes */}
            <div className="space-y-3 pt-1">
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={apenasUrgencia}
                  onChange={(e) => setApenasUrgencia(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer accent-zinc-900"
                />
                <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-950 transition-colors">
                  Contratação Urgente
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={apenasIniciantes}
                  onChange={(e) => setApenasIniciantes(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer accent-zinc-900"
                />
                <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-950 transition-colors">
                  Aceita iniciantes
                </span>
              </label>
            </div>
          </aside>

          {/* LISTA DE RESULTADOS DE VAGAS */}
          <main className="lg:col-span-8 space-y-4">
            
            {/* Barra de status dos resultados */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3.5 gap-2">
              <div className="text-sm font-bold text-zinc-900">
                {vagasFiltradas.length === 1 ? (
                  <span>1 vaga encontrada</span>
                ) : (
                  <span>{vagasFiltradas.length} vagas encontradas</span>
                )}
              </div>
              {temFiltroAtivo && (
                <div className="text-xs text-zinc-500">
                  Filtros ativos aplicados
                </div>
              )}
            </div>

            {/* Listagem de Cards de Vagas */}
            {vagasFiltradas.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-1">
                  Nenhuma vaga encontrada
                </h3>
                <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
                  Nenhuma vaga corresponde exatamente a todos os critérios e filtros selecionados. Tente remover alguns filtros para ver mais opções.
                </p>
                <button
                  onClick={limparFiltros}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
                >
                  Limpar todos os filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {vagasFiltradas.map((vaga) => (
                  <article
                    key={vaga.id}
                    className="bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Topo do Card: Tags e Destaques */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="bg-zinc-100 text-zinc-800 text-xs px-2.5 py-1 rounded-md font-semibold">
                            {vaga.area}
                          </span>
                          <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-semibold">
                            {vaga.senioridade}
                          </span>
                          <span className="bg-zinc-100 text-zinc-700 text-xs px-2.5 py-1 rounded-md font-medium">
                            {vaga.modalidade}
                          </span>
                          {vaga.aceitaIniciante && (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2 py-0.5 rounded-md font-semibold">
                              ✨ Aceita iniciantes
                            </span>
                          )}
                        </div>

                        {vaga.urgencia && (
                          <span className="bg-red-50 text-red-700 border border-red-200 text-xs px-2.5 py-1 rounded-md font-bold tracking-wide">
                            🔥 Urgente
                          </span>
                        )}
                      </div>

                      {/* Título e Empresa */}
                      <Link href={`/vagas/${vaga.id}`}>
                        <h2 className="text-xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                          {vaga.titulo}
                        </h2>
                      </Link>

                      <p className="text-sm font-semibold text-zinc-600 mt-1 flex items-center gap-2">
                        <span className="text-zinc-900">{vaga.empresa}</span>
                        <span>·</span>
                        <span className="text-zinc-500 font-medium">{vaga.local}</span>
                      </p>

                      {/* Descrição resumida */}
                      <p className="text-sm text-zinc-600 mt-3 line-clamp-2 leading-relaxed">
                        {vaga.descricao}
                      </p>

                      {/* Benefícios em destaque */}
                      {vaga.beneficios && vaga.beneficios.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {vaga.beneficios.map((beneficio, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-medium bg-zinc-50 text-zinc-600 border border-zinc-200 px-2 py-0.5 rounded"
                            >
                              {beneficio}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Rodapé do Card com Faixa Salarial e Botão */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-zinc-100">
                      <div>
                        <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                          Faixa Salarial
                        </span>
                        <span className="text-base font-extrabold text-zinc-900">
                          {vaga.faixaSalarial}
                        </span>
                      </div>

                      <Link
                        href={`/vagas/${vaga.id}`}
                        className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-xl transition-all shadow-sm"
                      >
                        Ver Detalhes da Vaga
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
