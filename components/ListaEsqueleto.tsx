// O segundo fallback. Mesma regra do irmão: altura parecida com a da lista
// real, para a página não pular quando os cartões chegarem. Três cartões
// bastam — ninguém olha o esqueleto tempo suficiente para contar.
export default function ListaEsqueleto() {
  return (
    <div className="lista esqueleto" aria-hidden="true">
      <div className="cartao-esqueleto" />
      <div className="cartao-esqueleto" />
      <div className="cartao-esqueleto" />
    </div>
  );
}
