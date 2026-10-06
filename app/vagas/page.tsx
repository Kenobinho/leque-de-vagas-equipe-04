import { listarVagas } from "@/lib/api";
import MuralDeVagas from "@/components/MuralDeVagas";

export default async function ListaDeVagas() {
  // Consumimos da API em vez de importar o JSON localmente
  const vagas = await listarVagas();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
          Oportunidades Abertas
        </p>
        <h1 className="text-3xl font-extrabold text-white">Vagas Disponíveis</h1> 
      </div>

      {/* Passamos as vagas que vieram da API para o componente do seu colega */}
      <MuralDeVagas vagas={vagas} />
    </div>
  );
}