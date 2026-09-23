"use client";
import { useState } from "react";
export default function AbasDaEmpresa({ sobre }: { sobre: string }) {
    const [abaAtiva, setAbaAtiva] = useState("sobre");

    return (
        <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <button
                    onClick={() => setAbaAtiva("sobre")}
                    style={{ fontWeight: abaAtiva === "sobre" ? "bold" : "normal" }}
                >
                    Sobre a empresa
                </button>

                <button
                    onClick={() => setAbaAtiva("vagas")}
                    style={{ fontWeight: abaAtiva === "vagas" ? "bold" : "normal" }}></button>
                Vagas publicadas
            </div>

            <div style={{ marginTop: "20px" }}>
                {abaAtiva === "sobre" ? (
                    <p>{sobre}</p>
                ) : (
                    <p>As vagas desta empresa irão aparecer aqui em breve!</p>
                )}
            </div>
        </div>
    );
}