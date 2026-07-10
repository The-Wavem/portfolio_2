import { getFirebaseContent, setFirebaseContent } from "@/service/firebase";

export const aboutMembers = [
  {
    id: "uuid-1",
    name: "Weslley Kampa",
    role: "Líder Front-end",
    image: "https://avatars.githubusercontent.com/u/91283681?v=4",
    bio: "Olá! Sou estudante de Análise e Desenvolvimento de Sistemas, apaixonado por criar soluções web envolventes e funcionais. Tenho foco em React.js, Material UI e UI/UX, sempre buscando unir design intuitivo, performance e boas práticas de código.",
    stacks: ["React", "JavaScript", "Material UI", "Figma", "Node.js", "Git"],
    hobbies: ["RPG de mesa", "HQs e Mangás", "Vídeo games"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/weslley-kampa",
      github: "",
      email: "",
    },
    projects: [
      {
        id: "proj-1",
        title: "RPG Organizer",
        description:
          "Plataforma para organização de conteúdos de RPG (D&D), centralizando livros, anotações, músicas, mapas e fichas em um único lugar.",
        link: "https://test-b6bc2.web.app/",
      },
      {
        id: "proj-2",
        title: "Neon Genesis",
        description:
          "Aplicação web que simula uma plataforma de venda para autoatendimento, com foco em otimização de atendimento e redução de filas.",
        link: "https://neongenesistotens.netlify.app/",
      },
    ],
  },
  {
    id: "uuid-2",
    name: "Eduardo Ian",
    role: "Líder do back-end",
    image: "https://avatars.githubusercontent.com/u/175339971?v=4",
    bio: "Olá, tenho 21 anos e sou estudante de análise e desenvolvimento de sistemas. Me encontrei na área de banco de dados e toda a estrutura que está por trás dos grandes softwares.",
    stacks: ["SQL", "Python", "JavaScript", "React", "Figma"],
    hobbies: ["Instrumentos", "Leitura", "Café", "Fotografia"],
    socialLinks: {
      linkedin: "",
      github: "",
      email: "",
    },
    projects: [],
  },
  {
    id: "uuid-3",
    name: "Murilo Lima",
    role: "Líder UX/UI",
    image: "https://avatars.githubusercontent.com/u/160680071?v=4",
    bio: "Olá! Sou apaixonado por interfaces modernas e acessíveis. Trabalho com React e adoro transformar ideias em experiências digitais.",
    stacks: ["React", "Figma", "Acessibilidade", "JavaScript", "CSS"],
    hobbies: ["Música", "Leitura", "Desenhar"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/murilo-lima-bb39b022b",
      github: "",
      email: "",
    },
    projects: [],
  },
  {
    id: "uuid-4",
    name: "Marlon Willian",
    role: "Desenvolvedor Front-End",
    image: "https://avatars.githubusercontent.com/u/127453272?v=4",
    bio: "Olá! Eu sou Marlon, tenho 21 anos, e estou cursando engenharia de software.",
    stacks: ["React", "JavaScript", "NodeJS", "SQL", "Figma", "HTML", "CSS"],
    hobbies: ["Futebol", "Jogos"],
    socialLinks: {
      linkedin: "",
      github: "",
      email: "",
    },
    projects: [],
  },
  {
    id: "uuid-5",
    name: "Arthur Alves",
    role: "Desenvolvedor back-end",
    image: "https://avatars.githubusercontent.com/u/161658611?v=4",
    bio: "Olá, me chamo Arthur, tenho 18 anos e curso Engenharia de Software na Unicesumar. Me dedico ao desenvolvimento back-end e estou sempre buscando aprender novas tecnologias.",
    stacks: ["SQL", "JavaScript", "C", "React", "Figma", "HTML", "CSS"],
    hobbies: ["Futebol", "Jogos", "Série", "Natação"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/arthur-de-souza-alves-449812306/",
      github: "",
      email: "",
    },
    projects: [],
  },
  {
    id: "uuid-6",
    name: "Vinícius Kawasugui Santiago",
    role: "Desenvolvedor Front-end",
    image: "https://avatars.githubusercontent.com/u/102892179?v=4",
    bio: "Iniciei minha trajetória em programação na faculdade, explorando linguagens e ferramentas como C++, SQL (XAMPP), NetBeans, VSCode, HTML, CSS e JavaScript. Tenho enfrentado desafios e resolvido problemas técnicos, adquirindo experiência prática. Atualmente, foco em Python e desenvolvimento web, com projetos em andamento, aprofundando meus conhecimentos na área.",
    stacks: ["HTML", "JavaScript", "Python", "CSS", "Java"],
    hobbies: ["Jogos", "Esporte"],
    socialLinks: {
      linkedin:
        "https://www.linkedin.com/in/vin%C3%ADcius-kawasugui-santiago-4171a424a/",
      github: "",
      email: "",
    },
    projects: [],
  },
];

export function getAboutMembers() {
  return aboutMembers;
}

export async function getAboutMembersRemote() {
  const response = await getFirebaseContent({
    page: "about",
    section: "members",
    fallbackData: aboutMembers,
  });

  return response.data;
}

export async function setAboutMembersRemote(data) {
  return setFirebaseContent({
    page: "about",
    section: "members",
    data,
  });
}
