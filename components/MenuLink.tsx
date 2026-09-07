"use client"; // a PRIMEIRA linha do arquivo, antes dos imports

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  // usePathname devolve o endereço atual: "/", "/vagas", "/vagas/1"...
  const caminho = usePathname();
  const ativo = caminho === href;

  return (
    <Link
      href={href}
      className={ativo ? "menu-link ativo" : "menu-link"}
      // aria-current avisa o leitor de tela qual é a página atual
      aria-current={ativo ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
