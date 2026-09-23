// data/empresas.ts

export type Empresa = {
  slug: string;
  nome: string;
  sobre: string;
  site: string;
};

export const empresas: Empresa[] = [
  {
    slug: "tech-solutions",
    nome: "Tech Solutions",
    sobre: "Uma empresa focada em soluções tecnológicas inovadoras para o mercado global.",
    site: "https://developer.mozilla.org/pt-BR/"
  },
  {
    slug: "data-insights",
    nome: "Data Insights",
    sobre: "Especialistas em transformar grandes volumes de dados em informações valiosas.",
    site: "https://pt.wikipedia.org/wiki/Ci%C3%AAncia_de_dados"
  },
  {
    slug: "innovatech",
    nome: "Innovatech",
    sobre: "Desenvolvemos software escalável e soluções modernas para empresas.",
    site: "https://nextjs.org/docs"
  },
  {
    slug: "creative-minds",
    nome: "Creative Minds",
    sobre: "Agência criativa focada em proporcionar a melhor experiência de utilização (UX/UI).",
    site: "https://pt.wikipedia.org/wiki/Design_de_interface_de_utilizador"
  },
  {
    slug: "global-tech",
    nome: "Global Tech",
    sobre: "Líderes na gestão e entrega de projetos tecnológicos de grande escala.",
    site: "https://github.com"
  },
  {
    slug: "marketpro",
    nome: "MarketPro",
    sobre: "Impulsionamos negócios através de estratégias avançadas de marketing digital.",
    site: "https://pt.wikipedia.org/wiki/Marketing_digital"
  },
  {
    slug: "datalab",
    nome: "DataLab",
    sobre: "Laboratório de inovação em inteligência artificial e modelos preditivos.",
    site: "https://pt.wikipedia.org/wiki/Aprendizado_de_m%C3%A1quina"
  },
  {
    slug: "sysadmin-corp",
    nome: "SysAdmin Corp",
    sobre: "Garantimos a segurança e o funcionamento de infraestruturas de TI complexas.",
    site: "https://pt.wikipedia.org/wiki/Administrador_de_sistemas"
  },
  {
    slug: "securetech",
    nome: "SecureTech",
    sobre: "Protegemos os dados e os sistemas das empresas contra ameaças digitais.",
    site: "https://pt.wikipedia.org/wiki/Seguran%C3%A7a_da_informa%C3%A7%C3%A3o"
  },
  {
    slug: "appmasters",
    nome: "AppMasters",
    sobre: "Criamos as melhores aplicações móveis para iOS e Android do mercado.",
    site: "https://reactnative.dev/"
  },
  {
    slug: "cloudtech",
    nome: "CloudTech",
    sobre: "Arquitetura na nuvem e soluções escaláveis para o futuro.",
    site: "https://aws.amazon.com/pt/what-is-cloud-computing/"
  },
  {
    slug: "ai-innovations",
    nome: "AI Innovations",
    sobre: "Pioneiros no desenvolvimento de modelos de aprendizagem automática (Machine Learning).",
    site: "https://pt.wikipedia.org/wiki/Intelig%C3%AAncia_artificial"
  }
];