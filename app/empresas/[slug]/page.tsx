// SEM "use client". É uma página de servidor, e continua sendo.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listarEmpresas, buscarEmpresa, listarVagas } from "@/lib/api";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";

type Props = { params: Promise<{ slug: string }> };

// A pasta é [slug], então a chave é `slug`. Mesma regra da página da vaga.
export async function generateStaticParams() {
  const empresas = await listarEmpresas();
  return empresas.map((empresa) => ({ slug: empresa.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) return { title: "Empresa não encontrada · Leque de Vagas" };

  return {
    title: `${empresa.nome} · Leque de Vagas`,
    description: empresa.sobre.slice(0, 150),
  };
}

export default async function PaginaDaEmpresa({ params }: Props) {
  // await params: igualzinho à aula 02. A fronteira não mudou isso.
  const { slug } = await params;

  /* As duas buscas não dependem uma da outra, então podem acontecer AO MESMO
     TEMPO. Dois `await` em linhas separadas seriam uma espera atrás da outra
     — o dobro do tempo, de graça. */
  const [empresa, vagas] = await Promise.all([
    buscarEmpresa(slug),
    listarVagas(),
  ]);

  if (!empresa) notFound();

  /* O filtro acontece no SERVIDOR. O componente de cliente recebe só o que
     vai mostrar — mandar as doze vagas para o navegador filtrar três é pagar
     banda por dado que ninguém vai ver. */
  const vagasDaEmpresa = vagas.filter(
    (vaga) => vaga.empresaSlug === empresa.slug,
  );

  return (
    <section>
      <h1>{empresa.nome}</h1>

      {/* AbasDaEmpresa continua cliente e continua com useState("sobre"). A
          aula 03 fica inteira de pé: só a origem dos dados mudou. */}
      <AbasDaEmpresa empresa={empresa} vagas={vagasDaEmpresa} />
    </section>
  );
}
