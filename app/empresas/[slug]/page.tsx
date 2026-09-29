import { notFound } from "next/navigation";
import { Empresa } from "@/lib/tipos";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

async function buscarEmpresa(slug: string) {

    const resposta = await fetch("https://raw.githubusercontent.com/Kenobinho/leque-de-vagas-equipe-04/refs/heads/empresas-fetch/dados/empresas.json", {
        next: { revalidate: 60, tags: ["empresas"] }
    });

    if (!resposta.ok) return null;

    const empresas = await resposta.json();
    return empresas.find((e: Empresa) => e.slug === slug);
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;

    const empresa = await buscarEmpresa(slug);

    if (!empresa) {
        return {
            title: "Empresa não encontrada",
            description: "A empresa que você está procurando não foi encontrada."
        };
    }

    return {
        title: `${empresa.nome} - Leque de Vagas`,
        description: empresa.sobre
    };
}
export default async function PerfilDaEmpresa({ params }: Props) {
    const { slug } = await params;
    const empresa = await buscarEmpresa(slug);

    if (!empresa) {
        notFound();
    }

    return (
        <main className="container-empresa">
            <h1 className="titulo-empresa">{empresa.nome}</h1>
            <p>{empresa.sobre}</p>
            <a className="link-site" href={empresa.site} target="_blank" rel="noreferrer">
                Visitar site da empresa
            </a>
            <AbasDaEmpresa sobre={empresa.sobre} />
        </main>
    );
}