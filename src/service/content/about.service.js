import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const aboutMembers = [
  {
    id: 1,
    name: "Weslley Kampa",
    role: "Líder Front-end",
    headline:
      "Foco em React.js, Material UI e UI/UX para experiências web envolventes.",
    bio: "Olá! Sou estudante de Análise e Desenvolvimento de Sistemas, apaixonado por criar soluções web envolventes e funcionais. Tenho foco em React.js, Material UI e UI/UX, sempre buscando unir design intuitivo, performance e boas práticas de código.",
    accent: "#7C3AED",
    photo: "https://avatars.githubusercontent.com/u/91283681?v=4",
    specialties: ["React", "JavaScript", "Material UI"],
    workTools: [
      { key: "react", name: "React" },
      { key: "javascript", name: "JavaScript" },
      { key: "material ui", name: "Material UI" },
      { key: "java", name: "Java" },
      { key: "figma", name: "Figma" },
      { key: "node.js", name: "Node.js" },
      { key: "git", name: "Git" },
    ],
    softSkills: ["Comunicação", "Colaboração", "Aprendizado contínuo"],
    hobbies: [
      "RPG de mesa (D&D, Cyberpunk RED)",
      "HQs e Mangás",
      "Vídeo games",
    ],
    focuses: [
      "React para interfaces escaláveis",
      "UI/UX orientado à experiência",
      "Performance e boas práticas",
    ],
    education: [
      {
        institution: "UNIFACEAR",
        degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas - Cursando",
        year: 2027,
      },
    ],
    personalProjects: [
      {
        name: "RPG Organizer",
        description:
          "Plataforma para organização de conteúdos de RPG (D&D), centralizando livros, anotações, músicas, mapas e fichas em um único lugar.",
        tools: [
          { key: "react", label: "React" },
          { key: "material ui", label: "Material UI" },
          { key: "firebase", label: "Firebase" },
        ],
        cover: "https://p1.imghit.xyz/2026/02/19/rpg-organizer.jpg",
        href: "https://test-b6bc2.web.app/",
      },
      {
        name: "Neon Genesis",
        description:
          "Aplicação web que simula uma plataforma de venda para autoatendimento, com foco em otimização de atendimento e redução de filas.",
        tools: [
          { key: "react", label: "React" },
          { key: "node.js", label: "Node.js" },
          { key: "express", label: "Express" },
          { key: "axios", label: "Axios" },
          { key: "mysql", label: "MySQL" },
          { key: "material ui", label: "Material UI" },
        ],
        cover: "https://p1.imghit.xyz/2026/02/19/NeonGenesis.jpg",
        href: "https://neongenesistotens.netlify.app/",
      },
      {
        name: "ExplorOcean",
        description:
          "Plataforma web educacional e interativa para exploração visual e informativa do oceano, com animações fluidas e experiência imersiva.",
        tools: [
          { key: "react", label: "React" },
          { key: "material ui", label: "Material UI" },
          { key: "figma", label: "Figma" },
          { key: "prisma", label: "Prisma" },
        ],
        cover: "https://p1.imghit.xyz/2026/02/19/explorocean.jpg",
        href: "https://explorocean.netlify.app/",
      },
    ],
    links: [
      {
        key: "linkedin",
        label: "LinkedIn",
        href: "https://linkedin.com/in/weslley-kampa",
      },
      {
        key: "portfolio",
        label: "Portfólio",
        href: "https://weslleykampa.netlify.app/",
      },
    ],
  },
  {
    id: 2,
    name: "Eduardo Ian",
    role: "Líder do back-end",
    headline:
      "Entusiasta de banco de dados e estruturas por trás de grandes softwares.",
    bio: "Olá, tenho 21 anos e sou estudante de análise e desenvolvimento de sistemas. Me encontrei na área de banco de dados e toda a estrutura que está por trás dos grandes softwares.",
    accent: "#34D399",
    photo: "https://avatars.githubusercontent.com/u/175339971?v=4",
    specialties: ["SQL", "Python", "JavaScript"],
    workTools: [
      { key: "react", name: "React" },
      { key: "javascript", name: "JavaScript" },
      { key: "sql", name: "SQL" },
      { key: "python", name: "Python" },
      { key: "figma", name: "Figma" },
    ],
    softSkills: [
      "Pensamento analítico",
      "Disciplina",
      "Resolução de problemas",
    ],
    hobbies: ["Instrumentos", "Leitura", "Café", "Fotografia"],
    focuses: [
      "Modelagem de dados",
      "Estrutura de software",
      "Back-end robusto",
    ],
    education: [
      {
        institution: "Unicesumar",
        degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas - Cursando",
        year: 2026,
      },
    ],
    personalProjects: [],
    links: [],
  },
  {
    id: 3,
    name: "Murilo Lima",
    role: "Líder UX/UI",
    headline:
      "Interfaces modernas, acessíveis e orientadas à experiência digital.",
    bio: "Olá! Sou apaixonado por interfaces modernas e acessíveis. Trabalho com React e adoro transformar ideias em experiências digitais.",
    accent: "#60A5FA",
    photo: "https://avatars.githubusercontent.com/u/160680071?v=4",
    specialties: ["React", "Figma", "Acessibilidade"],
    workTools: [
      { key: "react", name: "React" },
      { key: "javascript", name: "JavaScript" },
      { key: "css", name: "CSS" },
      { key: "acessibilidade", name: "Acessibilidade" },
      { key: "figma", name: "Figma" },
    ],
    softSkills: ["Empatia", "Comunicação visual", "Criatividade"],
    hobbies: ["Música", "Leitura", "Desenhar"],
    focuses: [
      "Design de interfaces",
      "Acessibilidade digital",
      "Experiência do usuário",
    ],
    education: [
      {
        institution: "Universidade Cesumar",
        degree: "Bacharel em Engenharia de Software",
        year: 2024,
      },
    ],
    personalProjects: [],
    links: [
      {
        key: "linkedin",
        label: "LinkedIn",
        href: "https://linkedin.com/in/murilo-lima-bb39b022b",
      },
    ],
  },
  {
    id: 4,
    name: "Marlon Willian",
    role: "Desenvolvedor Front-End",
    headline: "Estudante de engenharia de software com atuação em front-end.",
    bio: "Olá! Eu sou Marlon, tenho 21 anos, e estou cursando engenharia de software.",
    accent: "#F59E0B",
    photo: "https://avatars.githubusercontent.com/u/127453272?v=4",
    specialties: ["React", "JavaScript", "NodeJS"],
    workTools: [
      { key: "react", name: "React" },
      { key: "javascript", name: "JavaScript" },
      { key: "sql", name: "SQL" },
      { key: "nodejs", name: "NodeJS" },
      { key: "figma", name: "Figma" },
      { key: "html", name: "HTML" },
      { key: "css", name: "CSS" },
    ],
    softSkills: ["Organização", "Comprometimento", "Trabalho em equipe"],
    hobbies: ["Futebol", "Jogos"],
    focuses: [
      "Desenvolvimento front-end",
      "Interfaces web",
      "Evolução técnica contínua",
    ],
    education: [
      {
        institution: "Unicesumar",
        degree: "Bacharel em Engenharia de Software",
        year: 2025,
      },
    ],
    personalProjects: [],
    links: [],
  },
  {
    id: 5,
    name: "Arthur Alves",
    role: "Desenvolvedor back-end",
    headline: "Back-end em formação com foco em evolução constante.",
    bio: "Olá, me chamo Arthur, tenho 18 anos e curso Engenharia de Software na Unicesumar. Me dedico ao desenvolvimento back-end e estou sempre buscando aprender novas tecnologias.",
    accent: "#EC4899",
    photo: "https://avatars.githubusercontent.com/u/161658611?v=4",
    specialties: ["SQL", "JavaScript", "C"],
    workTools: [
      { key: "react", name: "React" },
      { key: "javascript", name: "JavaScript" },
      { key: "sql", name: "SQL" },
      { key: "c", name: "C" },
      { key: "figma", name: "Figma" },
      { key: "html", name: "HTML" },
      { key: "css", name: "CSS" },
    ],
    softSkills: ["Curiosidade técnica", "Dedicação", "Responsabilidade"],
    hobbies: ["Futebol", "Jogos", "Série", "Natação"],
    focuses: [
      "Desenvolvimento back-end",
      "Aprendizado de novas tecnologias",
      "Base sólida em engenharia",
    ],
    education: [
      {
        institution: "Unicesumar",
        degree: "Bacharel em Engenharia de Software - Cursando",
        year: 2027,
      },
    ],
    personalProjects: [],
    links: [
      {
        key: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/arthur-de-souza-alves-449812306/",
      },
    ],
  },
  {
    id: 6,
    name: "Vinícius Kawasugui Santiago",
    role: "Desenvolvedor Front-end",
    headline:
      "Trajetória prática em desenvolvimento web com foco atual em Python.",
    bio: "Iniciei minha trajetória em programação na faculdade, explorando linguagens e ferramentas como C++, SQL (XAMPP), NetBeans, VSCode, HTML, CSS e JavaScript. Tenho enfrentado desafios e resolvido problemas técnicos, adquirindo experiência prática. Atualmente, foco em Python e desenvolvimento web, com projetos em andamento, aprofundando meus conhecimentos na área.",
    accent: "#F87171",
    photo: "https://avatars.githubusercontent.com/u/102892179?v=4",
    specialties: ["HTML", "JavaScript", "Python"],
    workTools: [
      { key: "html", name: "HTML" },
      { key: "javascript", name: "JavaScript" },
      { key: "css", name: "CSS" },
      { key: "python", name: "Python" },
      { key: "java", name: "Java" },
    ],
    softSkills: [
      "Resolução de problemas",
      "Persistência",
      "Aprendizado constante",
    ],
    hobbies: ["Jogos", "Esporte"],
    focuses: [
      "Desenvolvimento web",
      "Python aplicado",
      "Crescimento técnico contínuo",
    ],
    education: [
      {
        institution: "Unicesumar",
        degree: "Bacharel Engenharia de Software",
        year: 2025,
      },
    ],
    personalProjects: [],
    links: [
      {
        key: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/vin%C3%ADcius-kawasugui-santiago-4171a424a/",
      },
    ],
  },
];

export function getAboutMembers() {
  return aboutMembers;
}

export async function getAboutMembersRemote() {
  const response = await getFirebaseContent({
    page: 'about',
    section: 'members',
    fallbackData: aboutMembers,
  });

  return response.data;
}

export async function setAboutMembersRemote(data) {
  return setFirebaseContent({
    page: 'about',
    section: 'members',
    data,
  });
}
