import type { Vaga, Empresa } from "@/lib/tipos";

/**
 * O único arquivo do projeto que conhece a URL.
 *
 * Quando a fonte trocar — a API do Spring Boot, um banco, o que for — é a
 * linha abaixo que muda, e nenhuma página fica sabendo. Também é o único
 * arquivo com `fetch`: página nenhuma escreve um.
 */
const FONTE =
  "https://raw.githubusercontent.com/Um-Leque-de-Tecnologia/lequedevagas-web/main/dados";

/* Sessenta segundos, e o motivo: os dados moram num JSON do próprio
   repositório, então uma vaga nova só existe depois de um push. Um minuto é
   curto o bastante para quem publicou conferir na hora, e longo o bastante
   para o site não bater no GitHub a cada visita. As `tags` existem para que um
   dia dê para invalidar sob demanda, sem esperar o minuto. */
const CACHE_VAGAS = { next: { revalidate: 60, tags: ["vagas"] } };

/* Uma hora para empresa: ela muda muito menos que vaga. Cache mais longo em
   dado mais estável é a troca certa — e é uma decisão, não um descuido. */
const CACHE_EMPRESAS = { next: { revalidate: 3600, tags: ["empresas"] } };

export async function listarVagas(): Promise<Vaga[]> {
  const resposta = await fetch(`${FONTE}/vagas.json`, CACHE_VAGAS);

  /* A LINHA QUE POUPA UMA HORA. Sem ela, um 404 do GitHub vira uma página de
     erro em HTML, e o `.json()` abaixo quebra com "Unexpected token '<'" —
     uma mensagem que não fala nem da URL, nem do arquivo. */
  if (!resposta.ok) {
    throw new Error(`vagas.json respondeu ${resposta.status}`);
  }

  return resposta.json();
}

/**
 * Buscar UMA vaga é buscar todas e achar.
 *
 * Parece desperdício e não é: as duas chamadas são o MESMO `fetch`, com a
 * mesma URL e as mesmas opções, então o Next junta as duas num pedido só
 * dentro do mesmo request.
 */
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
