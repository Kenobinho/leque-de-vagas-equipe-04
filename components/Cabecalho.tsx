import Link from "next/link";
import MenuLink from "./MenuLink";

export default function Cabecalho() {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
      <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
        Leque de Vagas
      </Link>
      
      <nav className="flex gap-6">
        <MenuLink href="/">Início</MenuLink>
        <MenuLink href="/vagas">Vagas</MenuLink>
      </nav>
    </header>
  );
}