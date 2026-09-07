// SEM "use client" — e é a página que usa MAIS componentes de cliente.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listarVagas, buscarVaga } from "@/lib/api";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import FormularioDeCandidatura from "@/components/FormularioDeCandidatura";

// Desde o Next 15, `params` é uma Promise. É por isso que ele leva `await`.
type Props = { params: Promise<{ id: string }> };

/* ─── A LISTA DO QUE PRÉ-GERAR ─────────────────────────────────────────────
   O Next não tem como adivinhar QUAIS ids existem: a pasta [id] atende
   infinitos endereços. Esta função conta, e roda UMA vez, no build.

   A chave tem que se chamar `id`, igual ao nome da pasta. Nome errado não dá
   erro: simplesmente não gera nada, em silêncio. E o valor tem que ser TEXTO,
   porque endereço é texto — daí o String(), mesmo o id já sendo string: se um
   dia o JSON vier com número, aqui não quebra. */
export async function generateStaticParams() {
  const vagas = await listarVagas();
  return vagas.map((vaga) => ({ id: String(vaga.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vaga = await buscarVaga(id);

  /* Aqui NÃO se chama notFound(): quem decide isso é a página. Esta função só
     precisa devolver um título que não minta. */
  if (!vaga) return { title: "Vaga não encontrada · Leque de Vagas" };

  return {
    title: `${vaga.titulo} · ${vaga.empresa}`,
    description: vaga.descricao.slice(0, 150),
  };
}

export default async function PaginaDaVaga({ params }: Props) {
  // await troca o "vale" pelo valor
  const { id } = await params;
  const vaga = await buscarVaga(id);

  /* O id que não existe. notFound() não devolve nada — ele interrompe a
     renderização e entrega o not-found.tsx desta pasta, escrito na aula 02,
     que só agora tem quem o chame. */
  if (!vaga) notFound();

  return (
    <article className="vaga">
      {/* Título e ficha vêm prontos do servidor. Não mudam depois. */}
      <h1>{vaga.titulo}</h1>
      <p>
        <Link href={`/empresas/${vaga.empresaSlug}`}>{vaga.empresa}</Link>
        {" · "}
        {vaga.area} · {vaga.senioridade} · {vaga.local}
      </p>

      {vaga.aceitaIniciante && (
        <p className="selo">Aceita quem está começando</p>
      )}

      {/* Daqui para baixo, componentes de cliente lado a lado. Cada um tem a
          própria memória, nenhum sabe do outro, e todos continuam iguais ao
          que eram na aula 03: só a origem do dado mudou. */}
      <BotaoCopiarLink titulo={vaga.titulo} />
      <DescricaoDaVaga texto={vaga.descricao} />

      <h2>Candidatar-se</h2>
      <FormularioDeCandidatura tituloDaVaga={vaga.titulo} />

      <p>
        <Link href="/vagas">← todas as vagas</Link>
      </p>
    </article>
  );
}
