"use client";

import { useEffect } from "react";

export default function ErroDaVaga({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
    useEffect(() => {
        // Registra o erro no console para depuração
        console.error("Erro ao carregar os dados da vaga:", error);
    }, [error]);

    return (
        <div className="p-6 border border-red-800 bg-red-950/30 rounded-md my-8 text-center">
            <h2 className="text-xl font-bold text-red-400 mb-2">
                Ops! Algo deu errado ao carregar esta vaga.
            </h2>
            <p className="text-zinc-300 mb-4">
                Não foi possível conectar ao servidor ou a conexão caiu.
            </p>

            {/* O botão reset() tenta carregar a página novamente sem recarregar tudo */}
            <button
                onClick={() => reset()}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors">
                Tentar novamente
            </button>
        </div>
    );
}