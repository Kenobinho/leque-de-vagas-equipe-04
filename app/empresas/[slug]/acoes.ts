"use server";

import { z } from "zod";

const EsquemaDaEmpresa = z.object({
    sobre: z.string().min(10, "A descrição precisa de pelo menos 10 caracteres.")
});


export type EstadoFormulario = {
    ok: boolean;
    erros?: {
        sobre?: string[];
    };
};

export async function guardarEmpresa(estadoAnterior: EstadoFormulario, dados: FormData) {
    const analise = EsquemaDaEmpresa.safeParse(Object.fromEntries(dados));

    if (!analise.success) {
        return { ok: false, erros: analise.error.flatten().fieldErrors };
    }

    console.log("Salvo:", analise.data.sobre);

    return { ok: true, erros: {} };
}