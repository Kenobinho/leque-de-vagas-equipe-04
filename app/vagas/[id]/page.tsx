import { notFound } from "next/navigation";
import Link from "next/link";
import { vagas } from "@/data/vagas";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";

export default async function PaginaDaVaga({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vaga = vagas.find((v) => v.id === id);

  if (!vaga) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <Link 
        href="/vagas" 
        className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        ← Voltar para listagem
      </Link>

      <article className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full font-medium">
            {vaga.area}
          </span>
          <span className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full font-medium">
            {vaga.senioridade}
          </span>
          <span className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full font-medium">
            {vaga.modalidade}
          </span>
        </div>  

        <h1 className="text-3xl font-extrabold text-white mb-2">{vaga.titulo}</h1>
        
        <p className="text-base text-zinc-300 mb-6 flex items-center gap-2">
          <strong className="text-white">{vaga.empresa}</strong> · {vaga.local} 
          · <Link href={`/empresas/${vaga.empresaSlug}`} className="text-blue-400 hover:underline text-sm">
            Ver perfil corporativo →
          </Link>
        </p>

        <div className="grid grid-cols-2 gap-4 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 mb-8">
          <div>
            <span className="block text-xs text-zinc-500 uppercase font-semibold">Faixa Salarial</span>
            <span className="text-sm font-semibold text-zinc-200">{vaga.faixaSalarial}</span>
          </div>
          <div>
            <span className="block text-xs text-zinc-500 uppercase font-semibold">Contratação</span>
            <span className="text-sm font-semibold text-zinc-200">{vaga.urgencia ? "Urgente" : "Padrão"}</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Benefícios Oferecidos</h3>
          <ul className="flex flex-wrap gap-2">
            {vaga.beneficios.map((beneficio, index) => (
              <li key={index} className="bg-zinc-800/70 border border-zinc-700/50 text-zinc-300 text-xs px-3 py-1.5 rounded-lg">
                {beneficio}
              </li> 
            ))}
          </ul>
        </div>

        <div className="mb-8 border-t border-zinc-800 pt-6">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Sobre a Vaga</h3>
          <div className="text-zinc-300 leading-relaxed text-sm">
            <DescricaoDaVaga texto={vaga.descricao} />
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 flex justify-between items-center">
          <span className="text-xs text-zinc-500">
            {vaga.aceitaIniciante ? "✨ Vaga aberta para iniciantes" : "Requer experiência prévia"}
          </span>
          <BotaoCopiarLink />
        </div>
      </article>
    </main>
  );
}