// Repare: este arquivo NÃO tem "use client". Ele só usa o MenuLink, e quem
// precisa rodar no navegador é o MenuLink, não ele. A linha marca a porta,
// não cada móvel da casa.
import MenuLink from "./MenuLink";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <strong>Leque de Vagas</strong>
      <nav>
        <MenuLink href="/">Início</MenuLink>
        <MenuLink href="/vagas">Vagas</MenuLink>
        <MenuLink href="/empresas">Empresas</MenuLink>
        <MenuLink href="/sobre">Sobre</MenuLink>
        <MenuLink href="/termos">Termos</MenuLink>
      </nav>
    </header>
  );
}
