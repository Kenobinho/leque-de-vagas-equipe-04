import { ReactNode } from "react";

export default function InstitucionalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="institucional-fundo">
      <div className="institucional-largura">
        {children}
      </div>
    </div>
  );
}