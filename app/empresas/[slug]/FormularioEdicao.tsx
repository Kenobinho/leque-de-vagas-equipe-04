"use client";

import { useActionState } from "react";
// 3. Puxamos a função E o molde de dentro das ações
import { guardarEmpresa, EstadoFormulario } from "./acoes";

// 4. Avisamos ao TypeScript que isso segue o formato do EstadoFormulario
const INICIO: EstadoFormulario = { ok: false, erros: {} };

export default function FormularioEdicao({ sobreAtual }: { sobreAtual: string }) {
    const [estado, acaoDoForm, pendente] = useActionState(guardarEmpresa, INICIO);

    return (
        <div style={{ marginTop: "32px", marginBottom: "32px", padding: "24px", backgroundColor: "#1f2937", borderRadius: "12px", border: "1px solid #374151" }}>
            <h2 style={{ color: "white", marginBottom: "16px", fontSize: "1.2rem" }}>Editar descrição da empresa</h2>

            <form action={acaoDoForm} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <textarea aria-label="Descrição da empresa"
                    name="sobre"
                    defaultValue={sobreAtual}
                    rows={4}
                    style={{ padding: "12px", borderRadius: "6px", backgroundColor: "#374151", color: "white", border: "1px solid #4b5563", width: "100%", fontFamily: "inherit" }}
                />

                {estado?.erros?.sobre && (
                    <p style={{ color: "#ef4444", fontSize: "0.9rem", margin: 0, fontWeight: "500" }}>
                        {estado.erros.sobre[0]}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={pendente}
                    style={{
                        padding: "10px 16px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: pendente ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                        alignSelf: "flex-start",
                        opacity: pendente ? 0.7 : 1
                    }}
                >
                    {pendente ? "A guardar..." : "Guardar edição"}
                </button>
            </form>

            {estado?.ok && (
                <p style={{ color: "#10b981", marginTop: "16px", fontWeight: "bold", margin: "16px 0 0 0" }}>
                    Guardado com sucesso!
                </p>
            )}
        </div>
    );
}