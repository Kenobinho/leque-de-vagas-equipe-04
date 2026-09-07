import type { Metadata } from "next";

// A metadata da página sobrescreve a do layout.
export const metadata: Metadata = {
  title: "Sobre · Leque de Vagas",
};

export default function Sobre() {
  return (
    <section>
      <h1>Sobre o projeto</h1>
      <p>
        Este é o projeto de referência do curso Introdução ao Next.js. Ele
        cresce junto com as aulas: a cada semana entra o recurso que foi
        ensinado, e nada além dele.
      </p>
      <p>
        Os dados saíram de dentro do código na aula 04: hoje eles são{" "}
        <code>dados/vagas.json</code> e <code>dados/empresas.json</code>,
        buscados por rede. Um único arquivo conhece esse endereço,{" "}
        <code>lib/api.ts</code> — nenhuma página escreve <code>fetch</code>.
      </p>
      <p>
        Foi essa troca que trouxe a <strong>espera</strong> para o projeto, e
        com ela os esqueletos de carregamento, o <code>Suspense</code> em volta
        dos blocos que buscam, e a diferença entre uma vaga que não existe e
        uma rede que caiu.
      </p>
    </section>
  );
}
