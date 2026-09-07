"use client"; // obrigatório: este arquivo tem onClick, e o React precisa dele
              // no navegador para conseguir se recuperar do erro.

/**
 * A prop de recomeçar chama `retry` no Next 16.
 *
 * Era `reset` até o Next 15, e o nome antigo não existe mais — se você viu
 * `reset` em algum tutorial (ou no material de aula), era de uma versão que
 * não é a nossa. Conferido em `node_modules/next/dist/docs`, que é a
 * documentação da versão que este projeto tem instalada.
 *
 * E a diferença que cai na prova: `notFound()` é para o que NÃO EXISTE — o
 * endereço está errado e recarregar não vai ajudar. Este arquivo é para o que
 * FALHOU — a rede caiu, o GitHub estava fora, e tentar de novo pode funcionar.
 */
export default function ErroDaVaga({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="aviso">
      <h2>Não conseguimos carregar esta vaga</h2>

      {/* Português de gente. NÃO mostre error.message para quem usa o site:
          "fetch failed" não ajuda ninguém e ainda assusta. O digest é um
          identificador que você cruza com o log do servidor. */}
      <p>
        A conexão com a nossa fonte de dados falhou. Isso costuma ser
        momentâneo.
      </p>
      {error.digest && <p className="tecnico">id do erro: {error.digest}</p>}

      <button type="button" onClick={() => retry()}>
        Tentar de novo
      </button>
    </div>
  );
}
