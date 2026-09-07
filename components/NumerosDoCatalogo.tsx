import { listarVagas } from "@/lib/api";

/**
 * A REGRA QUE ECONOMIZA UMA HORA: quem espera é este componente, e o `await`
 * mora AQUI DENTRO. Se a página fizesse o await e passasse o número por prop,
 * ela já teria esperado — e o `<Suspense>` em volta não teria mais nada a
 * fazer, porque não sobrou espera para ele cobrir.
 */
export default async function NumerosDoCatalogo() {
  const vagas = await listarVagas();
  const iniciantes = vagas.filter((vaga) => vaga.aceitaIniciante).length;

  return (
    <p className="numeros">
      <strong>{vagas.length}</strong> vagas ·{" "}
      <strong>{iniciantes}</strong> aceitam quem está começando
    </p>
  );
}
