"use client";
import { useState } from "react";
export default function AbasDaEmpresa({ sobre }: { sobre: string }) {
    const [abaAtiva, setAbaAtiva] = useState("sobre");

    // Dentro do seu return no componente de abas:
    return (
        <div className="container-abas">
            <div className="botoes-aba">
                <button
                    onClick={() => setAbaAtiva("sobre")}
                    className={`btn-aba ${abaAtiva === "sobre" ? "btn-aba-ativo" : "btn-aba-inativo"}`}
                >
                    Sobre a empresa
                </button>

                <button
                    onClick={() => setAbaAtiva("vagas")}
                    className={`btn-aba ${abaAtiva === "vagas" ? "btn-aba-ativo" : "btn-aba-inativo"}`}
                >
                    Vagas publicadas
                </button>
            </div>

            {/* O conteúdo da aba vem aqui embaixo */}
            <div>
                {abaAtiva === "sobre" ? (
                    <p>{sobre}</p>
                ) : (
                    <p>Lista de vagas aparecerá aqui.</p>
                )}
            </div>
        </div>
    )
};