import Link from "next/link";
import { vagas } from "@/data/vagas";

export default function ListaDeVagas() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
          Oportunidades Abertas
        </p>
        <h1 className="text-3xl font-extrabold text-white">Vagas Disponíveis</h1>
        <p className="text-sm text-gray-400 mt-2">
          {vagas.length} vagas encontradas no total.
        </p>
      </div>

      <div className="grid gap-4">
        {vagas.map((vaga) => (
          <Link 
            key={vaga.id} 
            href={`/vagas/${vaga.id}`}
            className="block bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all shadow-md group"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {vaga.titulo}
              </h2>
              {vaga.urgencia && (
                <span className="bg-red-950/50 border border-red-800 text-red-400 text-xs px-2.5 py-1 rounded-full font-medium">
                  Urgente
                </span>
              )}
            </div>

            <p className="text-sm text-gray-400 mt-2 flex flex-wrap gap-2 items-center">
              <span className="text-gray-200 font-medium">{vaga.empresa}</span> 
              · {vaga.area} 
              · {vaga.senioridade} 
              · {vaga.local}
            </p>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-800/60">
              <span className="text-xs text-zinc-400 font-mono">{vaga.modalidade} · {vaga.faixaSalarial}</span>
              {vaga.aceitaIniciante && (
                <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                  Aceita iniciante
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}