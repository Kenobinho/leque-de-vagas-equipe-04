import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | Leque de Vagas",
  description: "Termos e condições gerais de uso da plataforma Leque de Vagas.",
};

export default function TermosPage() {
  return (
    <article className="institucional-artigo">
      <header className="institucional-cabecalho">
        <h1 className="institucional-titulo">Termos de Uso</h1>
        <p className="institucional-atualizacao">
          Última atualização: <time dateTime="2026-09-30">30 de Setembro de 2026</time>
        </p>
      </header>

      <section className="institucional-secao">
        <h2 className="institucional-subtitulo">1. Aceitação dos Termos</h2>
        <p className="institucional-paragrafo">
          Ao acessar e utilizar a plataforma Leque de Vagas, você concorda em cumprir e ficar 
          vinculado a estes Termos de Uso e a todas as leis e regulamentos aplicáveis.
        </p>
      </section>

      <section className="institucional-secao">
        <h2 className="institucional-subtitulo">2. Uso da Plataforma</h2>
        <p className="institucional-paragrafo">
          Nossa plataforma atua como facilitadora na divulgação de vagas no setor de tecnologia. 
          Não garantimos a contratação nem nos responsabilizamos pelo processo seletivo conduzido 
          diretamente pelas empresas anunciantes.
        </p>
      </section>

      <section className="institucional-secao">
        <h2 className="institucional-subtitulo">3. Responsabilidades do Usuário</h2>
        <p className="institucional-paragrafo">
          O usuário compromete-se a fornecer informações verídicas e atualizadas e a não utilizar 
          a plataforma para finalidades ilícitas que violem direitos de terceiros.
        </p>
      </section>
    </article>
  );
}