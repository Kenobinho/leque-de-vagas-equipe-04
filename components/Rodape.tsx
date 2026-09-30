import Link from "next/link";

export default function Rodape() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="rodape">
      <section className="rodape-container">
        <section className="rodape-superior">
            <section>
                <Link href="/" className="rodape-marca">
                    Leque de Vagas
                </Link>
                <p className="rodape-descricao">
                    Como assim tá sem vaga?! Tem todo aí ó... Um Leque de Vagas pra vc escolher!
                </p>
            </section>

            <nav>
                <ul className="rodape-nav">
                    <li>
                        <Link href="/" className="rodape-link">Início</Link>
                    </li>
                    <li>
                        <Link href="/vagas" className="rodape-link">Vagas</Link>
                    </li>
                    <li>
                        <Link href="/busca" className="rodape-link">Buscar</Link>
                    </li>
                </ul>
            </nav>
        </section>

        <hr className="rodape-divisor" />
        <div className="rodape-inferior">
          <p>© {anoAtual} Leque de Vagas. Todos os direitos reservados.</p>
          <p>Desenvolvido pela Equipe 04</p>
        </div>
      </section>
    </footer>
  );
}