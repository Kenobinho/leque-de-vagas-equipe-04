/* Route group: o nome entre parênteses NÃO entra na URL. Ele existe só para
   dar um layout a um conjunto de páginas — aqui, /termos e /privacidade. */
export default function LayoutInstitucional({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article className="texto-legal">{children}</article>;
}
