import { vagas } from "@/data/vagas";
import MuralDeVagas from "@/components/MuralDeVagas";

export default function ListaDeVagas() {

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
          Oportunidades Abertas
        </p>
        <h1 className="text-3xl font-extrabold text-white">Vagas Disponíveis</h1>
      </div>

      {/* O MuralDeVagas desenha os filtros e as vagas filtradas */}
      <MuralDeVagas vagas={vagas} />
    </div>
  );
}