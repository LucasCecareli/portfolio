export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Full-Stack' | 'Backend' | 'IA / Dados' | 'Sistemas / C++';
  technologies: string[];
  metrics?: string; // ex: "Latência reduzida em 40%" ou "10k+ requisições"
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  image: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  skills: string[];
  icon: string; // nome do ícone ou categoria
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
    name: "Lucas Ribeiro",
    role: "Estudante de Ciência da Computação & Software Engineer",
    shortBio: "Desenvolvendo soluções eficientes, escaláveis e com design moderno. Focado em arquitetura de software, sistemas distribuídos e tecnologias web modernas.",
    institution: "Instituto Mauá de Tecnologia",
    degree: "Bacharelado em Ciência da Computação",
    graduationYear: "Previsão: 2027",
    location: "São Paulo, Brasil",
    email: "lucasribeiro.dev@exemplo.com", // Usuário pode alterar
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    availableForHire: true,
    // Para exibir sua foto no Crachá Editorial da Hero Section, basta colocar o caminho aqui (ex: "/foto-lucas.jpg")
    photoUrl: "",
  },

  about: {
    overview: "Sou apaixonado por resolver problemas complexos com código limpo e algoritmos eficientes. Minha jornada na Ciência da Computação combina forte base teórica (estruturas de dados, complexidade algorítmica, sistemas operacionais e redes) com o desenvolvimento prático de aplicações full-stack de alto desempenho.",
    csFundamentals: [
      "Estruturas de Dados & Algoritmos (Graos, Árvores, Busca Dinâmica)",
      "Sistemas Operacionais, Concorrência & Threads",
      "Redes de Computadores, Protocolos HTTP/WebSockets & REST/gRPC",
      "Modelagem e Otimização de Bancos Relacionais & NoSQL",
    ],
  },

  skills: {
    linguagens: [
      { name: "TypeScript / JavaScript", level: "Avançado" },
      { name: "Python", level: "Avançado" },
      { name: "C / C++", level: "Intermediário (Acadêmico)" },
      { name: "Java", level: "Intermediário" },
      { name: "SQL", level: "Avançado" },
    ],
    frameworks: [
      { name: "React / Next.js", category: "Frontend" },
      { name: "Node.js / Express", category: "Backend" },
      { name: "FastAPI / Flask", category: "Backend" },
      { name: "Tailwind CSS", category: "Frontend" },
    ],
    ferramentas: [
      { name: "Git & GitHub", category: "Versionamento" },
      { name: "Docker", category: "Containers" },
      { name: "Linux / Bash", category: "Ambiente" },
      { name: "MongoDB & PostgreSQL", category: "Databases" },
      { name: "Vercel & Cloudflare", category: "Deploy & Cloud" },
    ],
  },

  certifications: [
    {
      id: "cert-1",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: "2025",
      credentialUrl: "https://aws.amazon.com/verification",
      credentialId: "AWS-CLF-00129",
      skills: ["Cloud Computing", "AWS Architecture", "Segurança", "Storage & S3"],
      icon: "Cloud",
      badgeColor: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300",
    },
    {
      id: "cert-2",
      title: "CS50's Introduction to Computer Science",
      issuer: "Harvard University (edX)",
      issueDate: "2024",
      credentialUrl: "https://cs50.harvard.edu/certificates",
      credentialId: "CS50X-HC-98214",
      skills: ["C", "Python", "Algoritmos", "Gerenciamento de Memória", "SQL"],
      icon: "Code",
      badgeColor: "from-red-500/20 to-rose-500/20 border-red-500/40 text-red-300",
    },
    {
      id: "cert-3",
      title: "Meta Front-End Developer Professional",
      issuer: "Meta / Coursera",
      issueDate: "2024",
      credentialUrl: "https://coursera.org/verify/professional-cert",
      credentialId: "META-FED-83741",
      skills: ["React.js", "JavaScript ES6+", "UI/UX Design", "Testes Unitários"],
      icon: "Layout",
      badgeColor: "from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300",
    },
    {
      id: "cert-4",
      title: "Python for Data Science & Machine Learning",
      issuer: "DeepLearning.AI / Coursera",
      issueDate: "2025",
      credentialUrl: "https://coursera.org/verify",
      credentialId: "DL-PY-49120",
      skills: ["Pandas", "NumPy", "Scikit-Learn", "Visualização de Dados"],
      icon: "Cpu",
      badgeColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300",
    },
  ] as Certification[],

  projects: [
    {
      id: "proj-1",
      title: "Algorithmic Visualizer 3D",
      description: "Plataforma interativa para visualização em tempo real de algoritmos de ordenação, grafos (Dijkstra, A*) e árvores de busca.",
      longDescription: "Projeto desenvolvido para consolidar os estudos de Ciência da Computação. Demonstra passos de execução, compara complexidades Big-O de tempo e espaço e permite ao usuário testar dados customizados.",
      category: "Sistemas / C++",
      technologies: ["TypeScript", "Canvas API", "Algoritmos", "Web Workers"],
      metrics: "Complexidade visualizada passo a passo",
      githubUrl: "https://github.com/exemplo/algo-visualizer",
      liveUrl: "https://algo-visualizer-demo.vercel.app",
      featured: true,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "proj-2",
      title: "DevNexus - Plataforma Colaborativa de Código",
      description: "Aplicação full-stack com autenticação segura, editor de código em tempo real e compartilhamento de snippets entre desenvolvedores.",
      longDescription: "Sistema distribuído com WebSockets para sincronização de edições colaborativas, persistência em MongoDB e cache em memória para otimização de consultas frequentes.",
      category: "Full-Stack",
      technologies: ["React", "Node.js", "WebSockets", "MongoDB", "Tailwind CSS"],
      metrics: "Sincronização em tempo real < 50ms",
      githubUrl: "https://github.com/exemplo/dev-nexus",
      liveUrl: "https://devnexus-demo.vercel.app",
      featured: true,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "proj-3",
      title: "API Gateway & Task Manager Distribuído",
      description: "Microsserviço de alto desempenho em FastAPI com filas assíncronas, rate limiting inteligente e monitoramento de saúde do sistema.",
      longDescription: "Focado em conceitos de engenharia de software e backend: processamento concorrente com Celery, autenticação JWT, documentação Swagger automática e containerização Docker.",
      category: "Backend",
      technologies: ["Python", "FastAPI", "Docker", "Redis", "PostgreSQL"],
      metrics: "Throughput de 1.200 req/s em testes de carga",
      githubUrl: "https://github.com/exemplo/distributed-task-api",
      liveUrl: "https://task-api.onrender.com/docs",
      featured: true,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "proj-4",
      title: "Classificador de Sentimentos & NLP",
      description: "Pipeline de Processamento de Linguagem Natural com fine-tuning de modelo para análise de sentimentos e feedback de usuários.",
      longDescription: "Implementação de pré-processamento de texto, tokenização, extração de embeddings e deployment com endpoint de inferência em alta disponibilidade.",
      category: "IA / Dados",
      technologies: ["Python", "PyTorch", "Hugging Face", "FastAPI", "Docker"],
      metrics: "Acurácia de 93.4% no dataset de validação",
      githubUrl: "https://github.com/exemplo/nlp-sentiment-ai",
      liveUrl: "https://nlp-demo.streamlit.app",
      featured: false,
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    },
  ] as Project[],

  education: [
    {
      period: "2023 — Presente",
      role: "Bacharelado em Ciência da Computação",
      institution: "Instituto Mauá de Tecnologia (IMT)",
      description: "Formação integral focada em fundamentos de computação, engenharia de software e sistemas complexos.",
      highlights: [
        "Média de rendimento acadêmico destacada",
        "Participação em maratonas de programação e hackathons",
        "Projetos práticos integrados com empresas parceiras",
      ],
    },
  ] as ExperienceOrEducation[],
};
