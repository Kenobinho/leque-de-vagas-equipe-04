/**
 * Só os tipos. Nenhum dado.
 *
 * Este arquivo não sabe de onde a vaga vem — e é por isso que ele continua
 * valendo quando a fonte trocar de endereço. Foi o que os arrays de
 * `data/vagas.ts` e `data/empresas.ts` viraram na aula 04: os dados saíram
 * para `dados/*.json`, os tipos ficaram aqui, e nenhum array sobrou em `app/`.
 */

export type Vaga = {
  /** Texto, não número: o que vem da URL é sempre texto. */
  id: string;
  titulo: string;
  empresa: string;
  /** Tem que existir como `slug` em `dados/empresas.json`, escrito igualzinho. */
  empresaSlug: string;
  /** Front-end · Back-end · Dados · Mobile · QA · Design */
  area: string;
  /** Estágio · Júnior · Pleno */
  senioridade: string;
  /** Remoto · Híbrido · Presencial, com a cidade quando não é remoto. */
  local: string;
  aceitaIniciante: boolean;
  /** No mínimo 300 caracteres: o "ver mais" precisa ter o que esconder. */
  descricao: string;
};

export type Empresa = {
  /** É o que vai na URL: `/empresas/aurora-tech`. */
  slug: string;
  nome: string;
  /** O texto da aba "Sobre" — um parágrafo de verdade, não uma linha. */
  sobre: string;
  site: string;
};
