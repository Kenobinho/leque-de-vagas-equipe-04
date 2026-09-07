import type { Metadata } from "next";
import Link from "next/link";
import { listarEmpresas, listarVagas } from "@/lib/api";

/* Rota sem [param] não precisa de função para o título: ele não depende de
   dado nenhum. Um objeto exportado basta, e ele substitui o title do layout
   nesta rota. */
export const metadata: Metadata = {
  title: "Empresas · Leque de Vagas",
  description:
    "As empresas que publicam vagas para quem está migrando para tecnologia.",
};

export default async function Empresas() {
  /* As duas buscas não dependem uma da outra: pedir em paralelo custa o tempo
     da mais lenta, e não a soma das duas. */
  const [empresas, vagas] = await Promise.all([listarEmpresas(), listarVagas()]);

  return (
    <section>
      <h1>Empresas</h1>

      <ul className="lista">
        {empresas.map((empresa) => {
          /* A contagem é conta, feita no servidor, e não um campo do JSON:
             número guardado desencontra do array na primeira vaga nova. */
          const quantas = vagas.filter(
            (vaga) => vaga.empresaSlug === empresa.slug,
          ).length;

          return (
            <li key={empresa.slug}>
              <Link href={`/empresas/${empresa.slug}`}>
                {empresa.nome}
                <span>
                  {quantas === 1 ? "1 vaga aberta" : `${quantas} vagas abertas`}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
