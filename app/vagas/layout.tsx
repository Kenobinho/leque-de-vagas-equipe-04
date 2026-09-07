// Sem <html> e sem <body>: só o layout da RAIZ tem essas duas tags.
// Layout aninhado devolve só um pedaço de tela.
export default function LayoutVagas({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="area-vagas">
      <p className="secao">Vagas abertas</p>
      {children}
    </section>
  );
}
