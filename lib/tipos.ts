export interface Vaga {
    id: string;
    titulo: string;
    empresa: string;
    empresaSlug: string;
    local: string;
    descricao: string;
    area: string;
    senioridade: "Júnior" | "Pleno" | "Sênior" | "Estágio";
    aceitaIniciante: boolean;
    modalidade: "CLT" | "PJ" | "Estágio" | "Freelancer";
    beneficios: string[];
    faixaSalarial: string;
    urgencia: boolean;
}