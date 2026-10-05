import { notFound } from "next/navigation";
import { Empresa } from "@/lib/tipos";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";
import FormularioEdicao from "./FormularioEdicao";

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
        <main>
            <h1>{empresa.nome}</h1>
            <p>{empresa.sobre}</p>
            <a href={empresa.site} target="_blank" rel="noreferrer">
                Visitar site da empresa
            </a>

            <FormularioEdicao sobreAtual={empresa.sobre} />
            <AbasDaEmpresa sobre={empresa.sobre} />
        </main>
    );
}