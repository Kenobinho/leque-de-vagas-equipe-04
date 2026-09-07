import Link from "next/link";

// Aparece quando o notFound() é chamado nesta pasta. O cabeçalho e o layout
// de vagas continuam na tela — é a diferença entre este e o 404 da raiz.
export default function VagaNaoEncontrada() {
  return (
    <div className="aviso">
      <h2>Vaga não encontrada</h2>
      <p>Ela pode ter sido preenchida ou removida.</p>
      <Link href="/vagas">Ver todas as vagas</Link>
    </div>
  );
}
