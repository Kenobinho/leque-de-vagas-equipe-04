import { notFound } from "next/navigation";
import { empresas } from "@/data/empresas";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function PaginaDaEmpresa({ params }: Props) {
    const { slug } = await params;
    const empresa = empresas.find((e) => e.slug === slug);
    if (!empresa) {
        notFound();
    }

return (
    <main style={{ padding: "20px" }}>
        <h1>{empresa.nome}</h1>
        <p><strong>Sobre a empresa:</strong> {empresa.sobre}</p>
        <a href={empresa.site} target="_blank" rel="noreferrer">
            Acessar site da empresa
        </a>

    </main>
);
}