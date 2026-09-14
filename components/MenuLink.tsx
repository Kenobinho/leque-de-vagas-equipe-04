"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface MenuLinkProps {
  href: string;
  children: ReactNode;
}

export default function MenuLink({ href, children }: MenuLinkProps) {
  const caminho = usePathname();
  const ativo = caminho === href;

  return (
    <Link
      href={href}
      className={ativo ? "font-bold text-blue-600 underline" : "text-gray-600 hover:text-gray-900"}
    >
      {children}
    </Link>
  );
}