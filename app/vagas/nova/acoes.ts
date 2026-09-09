"use server";
import { z } from "zod";


export async function criarvaga(formData: FormData) { 
    const titulo = formData.get("titulo");
    console.log("chegou", titulo);
}

const EsquemaDaVaga = z.object({
  titulo:      z.string().min(5, "O título precisa de pelo menos 5 letras."),
  empresaSlug: z.string().min(1, "Escolha a empresa."),
  local:       z.string().min(1, "Diga onde é."),
});