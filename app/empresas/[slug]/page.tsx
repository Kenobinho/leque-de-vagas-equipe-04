import { notFound } from "next/navigation";
import { empresas } from "@/data/empresas";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;

    const empresa = empresas.find((e) => e.slug === slug);
    if (!empresa) {
        return {
            title: "Empresa não encontrada!",
        };
    }

    return {
        title: `Empresa: ${empresa.nome} | Leque de Vagas`,
        description: `${empresa.sobre}`,
    };
}



export default async function PaginaDaEmpresa({ params }: Props) {
    const { slug } = await params;
    const empresa = empresas.find((e) => e.slug === slug);
    if (!empresa) {
        notFound();
    }

    return (
        <main style={{ padding: "20px" }}>
            <h1>{empresa.nome}</h1>
            <AbasDaEmpresa sobre={empresa.sobre} />
            <a href={empresa.site} target="_blank" rel="noreferrer">
                Acessar site da empresa
            </a>

        </main>
    );
}
