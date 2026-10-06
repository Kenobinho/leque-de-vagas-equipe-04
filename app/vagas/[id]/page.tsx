import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { listarVagas, buscarVaga } from "@/lib/api";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
// import FormularioDeCandidatura from "@/components/FormularioDeCandidatura";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const vagas = await listarVagas();
  return vagas.map((vaga) => ({ id: String(vaga.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vaga = await buscarVaga(id);

  if (!vaga) return { title: "Vaga não encontrada · Leque de Vagas" };

  return {
    title: `\({vaga.titulo} ·\){vaga.empresa}`,
    description: vaga.descricao.slice(0, 150),
  };
}

export default async function PaginaDaVaga({ params }: Props) {
  const { id } = await params;
  const vaga = await buscarVaga(id);

  if (!vaga) {
    notFound();
  }

  return (
    <main style={{ maxWidth: "768px", margin: "0 auto", padding: "40px 16px", fontFamily: "sans-serif", color: "#e4e4e7" }}>
      <Link href="/vagas" style={{ display: "inline-block", fontSize: "14px", color: "#a1a1aa", textDecoration: "none", marginBottom: "24px" }}>
        ← Voltar para listagem
      </Link>

      <article style={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "16px", padding: "32px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>  
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
          <span style={{ backgroundColor: "#27272a", color: "#d4d4d8", fontSize: "12px", padding: "4px 12px", borderRadius: "9999px", fontWeight: "bold" }}>{vaga.area}</span>
          <span style={{ backgroundColor: "#27272a", color: "#d4d4d8", fontSize: "12px", padding: "4px 12px", borderRadius: "9999px", fontWeight: "bold" }}>{vaga.senioridade}</span>
          <span style={{ backgroundColor: "#27272a", color: "#d4d4d8", fontSize: "12px", padding: "4px 12px", borderRadius: "9999px", fontWeight: "bold" }}>{vaga.modalidade}</span>
        </div>

        <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#ffffff", margin: "0 0 8px 0" }}>{vaga.titulo}</h1>

        <p style={{ fontSize: "16px", color: "#d4d4d8", margin: "0 0 24px 0" }}>
          <strong style={{ color: "#ffffff" }}>{vaga.empresa}</strong> · {vaga.local}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", backgroundColor: "rgba(9, 9, 11, 0.6)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(39, 39, 42, 0.8)", marginBottom: "32px" }}>
          <div>
            <span style={{ display: "block", fontSize: "12px", color: "#71717a", textTransform: "uppercase", fontWeight: "bold" }}>Faixa Salarial</span>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#e4e4e7" }}>{vaga.faixaSalarial}</span>
          </div>
          <div>
            <span style={{ display: "block", fontSize: "12px", color: "#71717a", textTransform: "uppercase", fontWeight: "bold" }}>Contratação</span>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#e4e4e7" }}>{vaga.urgencia ? "Urgente" : "Padrão"}</span>    
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>Benefícios Oferecidos</h3>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px", listStyle: "none", padding: 0, margin: 0 }}>
            {vaga.beneficios.map((beneficio, index) => (
              <li key={index} style={{ backgroundColor: "rgba(39, 39, 42, 0.7)", border: "1px solid rgba(63, 63, 70, 0.5)", color: "#d4d4d8", fontSize: "12px", padding: "6px 12px", borderRadius: "8px" }}>
                {beneficio}
              </li> 
            ))}
          </ul>
        </div>

        <div style={{ borderTop: "1px solid #27272a", paddingTop: "24px", marginBottom: "32px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>Sobre a Vaga</h3>
          <div style={{ color: "#d4d4d8", lineHeight: "1.6", fontSize: "14px" }}>
            {/* O SEU COMPONENTE CLIENTE ENTRA AQUI! */}
            <DescricaoDaVaga texto={vaga.descricao} />
          </div>
        </div>

        <div style={{ borderTop: "1px solid #27272a", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#71717a" }}>
            {vaga.aceitaIniciante ? "✨ Vaga aberta para iniciantes" : "Requer experiência prévia"}
          </span>
          {/* E O SEU OUTRO COMPONENTE CLIENTE ENTRA AQUI! */}
          <BotaoCopiarLink />
        </div>

        {/* <FormularioDeCandidatura tituloDaVaga={vaga.titulo} /> */}
      </article>
    </main>
  );
}