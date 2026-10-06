import type { Vaga, Empresa } from "@/lib/tipos";

const FONTE =
  "https://raw.githubusercontent.com/Kenobinho/leque-de-vagas-equipe-04/refs/heads/vagas/dados";


const CACHE_VAGAS = { next: { revalidate: 60, tags: ["vagas"] } };


const CACHE_EMPRESAS = { next: { revalidate: 3600, tags: ["empresas"] } };

export async function listarVagas(): Promise<Vaga[]> {
  const resposta = await fetch(`${FONTE}/vagas.json`, CACHE_VAGAS);

  
  if (!resposta.ok) {
    throw new Error(`vagas.json respondeu ${resposta.status}`);
  }

  return resposta.json();
}


export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => vaga.id === id);
}

export async function listarEmpresas(): Promise<Empresa[]> {
  const resposta = await fetch(`${FONTE}/empresas.json`, CACHE_EMPRESAS);
  if (!resposta.ok) {
    throw new Error(`empresas.json respondeu ${resposta.status}`);
  }
  return resposta.json();
}

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}