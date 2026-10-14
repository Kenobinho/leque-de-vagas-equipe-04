interface FiltrosProps {
  
    buscaTexto: string;  
    setBuscaTexto: (val: string) => void;
    // 2. Área
    areasSelecionadas: string[];
    setAreasSelecionadas: (val: string[]) => void;
    // 3. Valor (R$)
    valorDesejado: number;
    setValorDesejado: (val: number) => void;
    // 4. Regime
    regimes: string[];
    setRegimes: (val: string[]) => void;
    // 5. Distância (km)
    distanciaKm: number;
    setDistanciaKm: (val: number) => void;
    // 6. Benefícios
    beneficiosSelecionados: string[];
    setBeneficiosSelecionados: (val: string[]) => void;
    // 7. Nível (Senioridade)
    nivelSelecionado: string;
    setNivelSelecionado: (val: string) => void;
    // 8. Modalidade
    modalidadesSelecionadas: string[];
    setModalidadesSelecionadas: (val: string[]) => void;
    // 9. Urgência e Iniciantes
    apenasUrgencia: boolean;
    setApenasUrgencia: (val: boolean) => void;
    apenasIniciantes: boolean;
    setApenasIniciantes: (val: boolean) => void;
    // 10. Limpar todos
    onLimparFiltros: () => void;    
        // 1. Busca textual (string)
    
}

export default function Filtros({
  buscaTexto,
  setBuscaTexto,
  areasSelecionadas,
  setAreasSelecionadas,
  valorDesejado,
  setValorDesejado,
  regimes,
  setRegimes,
  distanciaKm,
  setDistanciaKm,
  beneficiosSelecionados,
  setBeneficiosSelecionados,
  nivelSelecionado,
  setNivelSelecionado,
  modalidadesSelecionadas,
  setModalidadesSelecionadas,
  apenasUrgencia,
  setApenasUrgencia,
  apenasIniciantes,
  setApenasIniciantes,
  onLimparFiltros,
}: FiltrosProps) {
  // Lista de opções
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

  // Função auxiliar de toggle para listas
  const toggleItem = (item: string, lista: string[], setLista: (val: string[]) => void) => {
    if (lista.includes(item)) {
      setLista(lista.filter((i) => i !== item));
    } else {
      setLista([...lista, item]);
    }
  };

  return (
    <aside className="filtros-card">
      <div className="filtros-cabecalho">
        <h2 className="filtros-titulo-principal">Filtros de Vagas</h2>
        <button type="button" onClick={onLimparFiltros} className="filtros-btn-limpar">
          Limpar Filtros
        </button>
      </div>

      {/* 1. Busca por Palavra-chave */}
      <section className="filtros-grupo">
        <label htmlFor="busca-input" className="filtros-rotulo-campo">
          Buscar por cargo ou tecnologia
        </label>
        <input
          id="busca-input"
          type="text"
          value={buscaTexto}
          onChange={(e) => setBuscaTexto(e.target.value)}
          placeholder="Ex: React, Python, Pleno..."
          className="filtros-input-texto"
        />
      </section>

      <hr className="filtros-divisor" />

      {/* 2. Área */}
      <section className="filtros-grupo">
        <h3 className="filtros-titulo-secao">Área</h3>
        <div className="filtros-lista-opcoes">
          {listaAreas.map((area) => (
            <label key={area.id} className="filtros-checkbox-item">
              <input
                type="checkbox"
                checked={areasSelecionadas.includes(area.id)}
                onChange={() => toggleItem(area.id, areasSelecionadas, setAreasSelecionadas)}
                className="filtros-checkbox"
              />
              <span className="filtros-texto-opcao">{area.rotulo}</span>
            </label>
          ))}
        </div>
      </section>

      <hr className="filtros-divisor" />

      {/* 3. Valor (R$) */}
      <section className="filtros-grupo">
        <div className="filtros-linha-titulo">
          <h3 className="filtros-titulo-secao">Valor (R$)</h3>
          {valorDesejado > 0 && (
            <span className="filtros-badge-valor">
              A partir de R$ {valorDesejado.toLocaleString("pt-BR")}
            </span>
          )}
        </div>
        <input
          type="range"
          min="0"
          max="18000"
          step="500"
          value={valorDesejado}
          onChange={(e) => setValorDesejado(Number(e.target.value))}
          className="filtros-slider"
        />
        <div className="filtros-slider-legendas">
          <span>R$ 0</span>
          <span>R$ 9.000</span>
          <span>R$ 18.000+</span>
        </div>
        <div className="filtros-input-moeda">
          <span className="filtros-cifrao">R$</span>
          <input
            type="number"
            placeholder="Digite o valor desejado..."
            value={valorDesejado > 0 ? valorDesejado : ""}
            onChange={(e) => setValorDesejado(Number(e.target.value))}
            className="filtros-input-numero"
          />
        </div>
      </section>

      <hr className="filtros-divisor" />

      {/* 4. Regime */}
      <section className="filtros-grupo">
        <h3 className="filtros-titulo-secao">Regime</h3>
        <div className="filtros-lista-opcoes">
          {listaRegimes.map((regime) => (
            <label key={regime.id} className="filtros-checkbox-item">
              <input
                type="checkbox"
                checked={regimes.includes(regime.id)}
                onChange={() => toggleItem(regime.id, regimes, setRegimes)}
                className="filtros-checkbox"
              />
              <span className="filtros-texto-opcao">{regime.rotulo}</span>
            </label>
          ))}
        </div>
      </section>

      <hr className="filtros-divisor" />

      {/* 5. Distância (km) */}
      <section className="filtros-grupo">
        <div className="filtros-linha-titulo">
          <h3 className="filtros-titulo-secao">Distância (km)</h3>
          <span className="filtros-badge-valor">
            {distanciaKm >= 100 ? "Qualquer distância" : `Até ${distanciaKm} km`}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={distanciaKm}
          onChange={(e) => setDistanciaKm(Number(e.target.value))}
          className="filtros-slider"
        />
        <div className="filtros-slider-legendas">
          <span>10 km</span>
          <span>50 km</span>
          <span>100+ km</span>
        </div>
      </section>

      <hr className="filtros-divisor" />

      {/* 6. Benefícios */}
      <section className="filtros-grupo">
        <h3 className="filtros-titulo-secao">Benefícios</h3>
        <div className="filtros-lista-opcoes">
          {listaBeneficios.map((beneficio) => (
            <label key={beneficio.id} className="filtros-checkbox-item">
              <input
                type="checkbox"
                checked={beneficiosSelecionados.includes(beneficio.id)}
                onChange={() =>
                  toggleItem(beneficio.id, beneficiosSelecionados, setBeneficiosSelecionados)
                }
                className="filtros-checkbox"
              />
              <span className="filtros-texto-opcao">{beneficio.rotulo}</span>
            </label>
          ))}
        </div>
      </section>

      <hr className="filtros-divisor" />

      {/* 7. Nível */}
      <section className="filtros-grupo">
        <div className="filtros-linha-titulo">
          <h3 className="filtros-titulo-secao">Nível</h3>
          {nivelSelecionado && (
            <button
              type="button"
              onClick={() => setNivelSelecionado("")}
              className="filtros-btn-limpar-pequeno"
            >
              Limpar
            </button>
          )}
        </div>
        <div className="filtros-linha-radios">
          {listaNiveis.map((nivel) => (
            <label key={nivel} className="filtros-radio-item">
              <input
                type="radio"
                name="nivel"
                value={nivel}
                checked={nivelSelecionado === nivel}
                onChange={() => setNivelSelecionado(nivel)}
                className="filtros-radio"
              />
              <span className="filtros-texto-opcao">{nivel}</span>
            </label>
          ))}
        </div>
      </section>

      <hr className="filtros-divisor" />

      {/* 8. Modalidade */}
      <section className="filtros-grupo">
        <h3 className="filtros-titulo-secao">Modalidade</h3>
        <div className="filtros-linha-radios">
          {listaModalidades.map((mod) => (
            <label key={mod} className="filtros-radio-item">
              <input
                type="checkbox"
                checked={modalidadesSelecionadas.includes(mod)}
                onChange={() =>
                  toggleItem(mod, modalidadesSelecionadas, setModalidadesSelecionadas)
                }
                className="filtros-checkbox"
              />
              <span className="filtros-texto-opcao">{mod}</span>
            </label>
          ))}
        </div>
      </section>

      <hr className="filtros-divisor" />

      {/* 9. Opções Especiais: Urgência e Iniciantes */}
      <section className="filtros-grupo filtros-opcoes-especiais">
        <label className="filtros-checkbox-item">
          <input
            type="checkbox"
            checked={apenasUrgencia}
            onChange={(e) => setApenasUrgencia(e.target.checked)}
            className="filtros-checkbox"
          />
          <span className="filtros-texto-opcao">Contratação Urgente</span>
        </label>

        <label className="filtros-checkbox-item">
          <input
            type="checkbox"
            checked={apenasIniciantes}
            onChange={(e) => setApenasIniciantes(e.target.checked)}
            className="filtros-checkbox"
          />
          <span className="filtros-texto-opcao">Aceita iniciantes</span>
        </label>
      </section>
    </aside>
  );
}