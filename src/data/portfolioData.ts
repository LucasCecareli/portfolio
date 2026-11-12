export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  technologies: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  inDevelopment?: boolean;
  image?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  skills: string[];
  icon: string;
  badgeColor: string;
}

export interface ExperienceOrEducation {
  period: string;
  role: string;
  institution: string;
  description: string;
  highlights: string[];
}

export const portfolioData = {
  personal: {
    name: "Lucas Cecareli Ribeiro",
    shortName: "Lucas C. Ribeiro",
    monogram: "LCR",
    role: "Estudante de Ciência da Computação",
    shortBio:
      "Estudante de Ciência da Computação no Instituto Mauá de Tecnologia (2025–2029). Desenvolvo projetos práticos de software, aplicações web e soluções tecnológicas.",
    institution: "Instituto Mauá de Tecnologia",
    degree: "Bacharelado em Ciência da Computação",
    startDate: "Fevereiro de 2025",
    graduationYear: "2029",
    period: "2025 — 2029",
    location: "São Paulo, Brasil",
    // Pendentes de confirmação pelo usuário (não exibir placeholders públicos fictícios)
    email: "",
    github: "https://github.com/LucasCecareli",
    linkedin: "",
    availableForHire: true,
    // Quando selecionar sua fotografia pessoal, basta informar o caminho aqui (ex: "/foto-lucas.jpg")
    photoUrl: "",
  },

  about: {
    overview:
      "Sou estudante de Ciência da Computação no Instituto Mauá de Tecnologia, tendo ingressado em fevereiro de 2025 com previsão de conclusão em 2029. Escolhi a área de tecnologia pelo interesse genuíno em compreender como sistemas funcionam e pela possibilidade de transformar ideias em software útil. Meu foco atual está no aprendizado sólido de desenvolvimento de software, aplicações web e inteligência artificial por meio de projetos práticos.",
    csFundamentals: [
      "Lógica de Programação, Algoritmos & Estruturas de Dados",
      "Desenvolvimento de Software & Aplicações Web",
      "Modelagem de Sistemas & Resolução de Problemas Reais",
      "Estudos e Aplicações Práticas em Inteligência Artificial",
    ],
  },

  skills: {
    linguagens: [
      { name: "Python", level: "Em evolução prática" },
      { name: "TypeScript / JavaScript", level: "Em evolução prática" },
      { name: "HTML5 & CSS3", level: "Desenvolvimento Web" },
      { name: "SQL", level: "Modelagem & Consultas" },
    ],
    frameworks: [
      { name: "React", category: "Frontend" },
      { name: "Tailwind CSS", category: "Interface" },
      { name: "Node.js", category: "Backend & Scripts" },
    ],
    ferramentas: [
      { name: "Git & GitHub", category: "Versionamento" },
      { name: "VS Code", category: "Ambiente" },
      { name: "Modelagem de Projetos", category: "Engenharia" },
    ],
  },

  // Sem certificações fictícias; pronto para receber certificações reais verificadas
  certifications: [] as Certification[],

  projects: [
    {
      id: "proj-1",
      title: "ELO",
      description:
        "Plataforma desenvolvida durante hackathon de saúde e tecnologia em novembro de 2026, voltada à construção de uma solução digital aplicada a desafios reais da área da saúde.",
      longDescription:
        "Desenvolvido de forma colaborativa em novembro de 2026 durante um hackathon com foco na interseção entre saúde e tecnologia. O projeto exercitou concepção rápida de produto, estruturação de fluxo de uso e validação da proposta.",
      category: "Saúde & Tecnologia",
      technologies: ["Saúde & Tecnologia", "Hackathon", "Prototipação", "Aplicação Web"],
      metrics: "Hackathon de Saúde & Tecnologia · Novembro de 2026",
      githubUrl: "",
      liveUrl: "",
      featured: true,
      inDevelopment: false,
      image: "",
    },
    {
      id: "proj-2",
      title: "Sistema de Agendamento de Laboratórios",
      description:
        "Aplicação prática desenvolvida para organizar e gerenciar reservas, horários e disponibilidade de uso de laboratórios.",
      longDescription:
        "Projeto focado em resolver o controle de ocupação e reserva de espaços laboratoriais, estruturando regras de horários, visualização de disponibilidade e organização do fluxo de agendamento.",
      category: "Aplicações & Sistemas",
      technologies: [
        "Gestão de Reservas",
        "Lógica de Agendamento",
        "Interface Web",
        "Modelagem de Dados",
      ],
      metrics: "Aplicação prática de gestão e reservas",
      githubUrl: "",
      liveUrl: "",
      featured: true,
      inDevelopment: false,
      image: "",
    },
    {
      id: "proj-3",
      title: "Jogo Educacional — Show do Milhão",
      description:
        "Jogo interativo de perguntas e respostas inspirado no formato do Show do Milhão, desenvolvido com foco em lógica de programação e aprendizado dinâmico.",
      longDescription:
        "Aplicação interativa que combina mecânicas de quiz progressivo, controle de rodadas, sistema de pontuação e feedback visual para tornar o processo de estudo mais envolvente.",
      category: "Jogos & Educação",
      technologies: [
        "Lógica de Programação",
        "Aplicação Interativa",
        "Educação",
        "Controle de Estado",
      ],
      metrics: "Aprendizado interativo por rodadas",
      githubUrl: "",
      liveUrl: "",
      featured: true,
      inDevelopment: false,
      image: "",
    },
    {
      id: "proj-4",
      title: "Velore",
      description:
        "Projeto autoral de assistente pessoal financeiro atualmente em desenvolvimento, voltado à organização financeira e apoio inteligente ao usuário.",
      longDescription:
        "Em fase ativa de desenvolvimento, a Velore nasce com o objetivo de unir engenharia de software e recursos de inteligência artificial para tornar o acompanhamento financeiro pessoal mais claro, organizado e acessível.",
      category: "Em Desenvolvimento",
      technologies: [
        "Em Desenvolvimento",
        "Assistente Financeiro",
        "Desenvolvimento de Software",
        "Inteligência Artificial",
      ],
      metrics: "Projeto autoral em desenvolvimento ativo",
      githubUrl: "",
      liveUrl: "",
      featured: true,
      inDevelopment: true,
      image: "",
    },
  ] as Project[],

  education: [
    {
      period: "Fevereiro de 2025 — 2029 (Previsão)",
      role: "Bacharelado em Ciência da Computação",
      institution: "Instituto Mauá de Tecnologia (IMT)",
      description:
        "Graduação em Ciência da Computação com foco em lógica de programação, engenharia de software, projetos práticos e fundamentos de computação.",
      highlights: [
        "Ingresso em fevereiro de 2025 com conclusão prevista para 2029",
        "Desenvolvimento de projetos práticos de software e aplicações interativas",
        "Participação em hackathon de saúde e tecnologia (Projeto ELO)",
      ],
    },
  ] as ExperienceOrEducation[],
};
