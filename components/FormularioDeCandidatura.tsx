"use client";

import { useState, type SubmitEvent } from "react";


export default function FormularioDeCandidatura({
  tituloDaVaga,
}: {
  tituloDaVaga: string;
}) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [rascunho, setRascunho] = useState("");
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [enviada, setEnviada] = useState(false);

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValido = regexEmail.test(email.trim());
  const podeEnviar = nome !== "" && emailValido && habilidades.length > 0;

  function adicionarHabilidade() {
    if (rascunho !== "") {
      setHabilidades([...habilidades, rascunho]);
      setRascunho("");
    }
  }

  function removerHabilidade(indexParaRemover: number) {
  const listaFiltrada = habilidades.filter((_, index) => index !== indexParaRemover);
  setHabilidades(listaFiltrada);
}

  function enviarFormulario(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviada(true);
  }

  if (enviada === true) {
    return (
        <div className="sucesso">
            <h2>Candidatura enviada!</h2>
            <p>Nome: {nome}</p>
            <p>E-mail: {email}</p>
            <p>Vaga: {tituloDaVaga}</p>
            <p>Total de habilidades: {habilidades.length}</p>

            <button type="button" onClick={() => setEnviada(false)}>
            Corrigir alguma coisa
            </button>
        </div>
    );
  }

  return (
    <form onSubmit={enviarFormulario}>
        <h3>Candidatar-se para: {tituloDaVaga}</h3>

        <div>
            <label>Nome completo:</label>
            <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            />
        </div>

        <div>
            <label>Seu e-mail:</label>
            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div>
            <label>Adicionar habilidades:</label>
            <div>
                <input
                    type="text"
                    value={rascunho}
                    onChange={(e) => setRascunho(e.target.value)}
                />
                <button type="button" onClick={adicionarHabilidade}>
                    Adicionar na lista
                </button>
            </div>

            <ul>
            {habilidades.map((item, index) => (
                <li key={index}>
                {item}{" "}
                <button type="button" onClick={() => removerHabilidade(index)}>
                    X
                </button>
                </li>
            ))}
            </ul>
        </div>

        <button type="submit" disabled={!podeEnviar}>
            Enviar candidatura
        </button>
    </form>
  );
}