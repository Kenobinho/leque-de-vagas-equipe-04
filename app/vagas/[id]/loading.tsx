/* Este arquivo existe desde a aula 02 no nível de cima e quase nunca aparecia
   — não havia o que esperar. Agora há uma rede no caminho, e ele tem trabalho.

   A REGRA: o esqueleto tem MAIS OU MENOS a altura do conteúdo real. Um
   "Carregando..." de uma linha no lugar de um bloco de 300px faz a página
   inteira pular quando o dado chega — e o dedo de quem já ia clicar acerta
   outra coisa. */
export default function Carregando() {
  return (
    <div className="esqueleto" aria-busy="true">
      <div className="barra titulo" />
      <div className="barra" />
      <div className="barra" />
      <div className="barra curta" />
    </div>
  );
}
