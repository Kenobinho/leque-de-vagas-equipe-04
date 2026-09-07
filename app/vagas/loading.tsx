/* Aparece enquanto a rota de vagas está sendo preparada.
   Versão esqueleto: caixinhas no formato do conteúdo que vem depois. Fica
   melhor que "Carregando…" porque a tela não pula quando o dado chega. */
export default function Loading() {
  return (
    <ul className="lista">
      {[1, 2, 3, 4].map((n) => (
        <li key={n} className="skeleton" />
      ))}
    </ul>
  );
}
