import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Leque de Vagas",
  description: "Conheça como coletamos, utilizamos e protegemos seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <article className="institucional-artigo">
      <header className="institucional-cabecalho">
        <h1 className="institucional-titulo">Política de Privacidade</h1>
        <p className="institucional-atualizacao">
          Última atualização: <time dateTime="2026-09-30">30 de Setembro de 2026</time>
        </p>
      </header>

      <section className="institucional-secao">
        <h2 className="institucional-subtitulo">1. Coleta de Informações</h2>
        <p className="institucional-paragrafo">
          Respeitamos a sua privacidade. Coletamos apenas as informações estritamente necessárias 
          para a navegação e o uso eficiente dos filtros de pesquisa de oportunidades em nosso site.
        </p>
      </section>

      <section className="institucional-secao">
        <h2 className="institucional-subtitulo">2. Uso dos Dados</h2>
        <p className="institucional-paragrafo">
          Os dados de navegação e filtros selecionados são utilizados exclusivamente para 
          aprimorar a experiência de busca e exibir as oportunidades mais aderentes ao seu perfil.
        </p>
      </section>

      <section className="institucional-secao">
        <h2 className="institucional-subtitulo">3. Seus Direitos (LGPD)</h2>
        <p className="institucional-paragrafo">
          Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de solicitar 
          a qualquer momento a confirmação da existência de tratamento e a correção de dados incompletos ou inexatos.
        </p>
      </section>
    </article>
  );
}