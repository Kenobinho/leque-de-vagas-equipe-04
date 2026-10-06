import Link from "next/link";
import { Vaga } from "@/lib/tipos";

export default function CardDeVaga({ vaga }: { vaga: Vaga }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "16px", borderRadius: "8px", fontFamily: "sans-serif" }}>
      <h3 style={{ margin: "0 0 8px 0" }}>
        <Link href={`/vagas/${vaga.id}`} style={{ textDecoration: "none", color: "#0056b3" }}>
          {vaga.titulo}
        </Link>
      </h3>         

      <p style={{ margin: "0 0 8px 0", color: "#333", fontWeight: "bold" }}>
        {vaga.empresa} · {vaga.local}
      </p>

      <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#555" }}>
        {vaga.area} · {vaga.senioridade} · {vaga.modalidade}
      </p>

      <div style={{ display: "flex", gap: "8px" }}> 
        {vaga.aceitaIniciante && (
          <span style={{ backgroundColor: "#d4edda", color: "#155724", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
            Aceita Iniciante
          </span>
        )}
        
        {/* Usando o seu campo extra de urgencia no card! */}
        {vaga.urgencia && (
          <span style={{ backgroundColor: "#f8d7da", color: "#721c24", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
            Urgente
          </span>
        )}
      </div>
    </div>  
  );
}