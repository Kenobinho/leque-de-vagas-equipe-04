import Link from "next/link";

export default function NotFound() {
    return (
        <section className="not-found-secao">
            <header className="not-found-cabecalho">
                <span className="not-found-badge">Erro 404</span>
                <h1 className="not-found-titulo">Página não encontrada D:</h1>
            </header>

            <p className="not-found-descricao">
                Desculpe, a oportunidade ou página que você tentou acessar não existe, 
        foi movida ou está temporariamente indisponível.
            </p>
            <nav className="not-found-navegacao" aria-label="Ações de recuperação">
                <Link href="/" className="not-found-btn principal">
                Voltar ao Início
                </Link>
                <Link href="/vagas" className="not-found-btn secundario">
                Ver Vagas Abertas
                </Link>
            </nav>            
        </section>
    )
}