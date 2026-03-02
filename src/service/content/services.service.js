import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const servicesContent = {
  accent: {
    start: "#5E1624",
    end: "#8C2438",
  },
  heroVideoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
  eyebrow: "NOSSOS SERVIÇOS",
  title:
    "Estratégia, design e engenharia para transformar ideia em produto com resultado.",
  contextLines: [
    "A The Wavem atua como time parceiro para tirar projetos do papel com clareza.",
    "Você acompanha decisões-chave e evolui o produto com segurança, sem surpresas.",
  ],
  impactStats: [
    {
      id: "etapas",
      value: "5",
      label: "etapas claras"
    },
    {
      id: "especialistas",
      value: "6",
      label: "especialistas"
    },
    {
      id: "contato",
      value: "1:1",
      label: "contato direto"
    }
  ],
  quickGuide: [
    {
      id: "ritmo",
      label: "Ritmo do projeto",
      value: "Validações semanais com entregas claras",
    },
    {
      id: "comunicacao",
      label: "Comunicação",
      value: "Contato direto, sem ruído e sem surpresas",
    },
    {
      id: "participacao",
      label: "Seu papel",
      value: "Você participa das decisões importantes",
    },
  ],
  firstWeekExpectations: [
    "Alinhamento de objetivo, público e prioridade de negócio.",
    "Mapeamento dos principais fluxos do usuário e pontos de risco.",
    "Definição de escopo inicial com entregas claras por etapa.",
    "Plano técnico e de interface validado com você antes de construir.",
  ],
  successMetrics: [
    "Velocidade de carregamento e estabilidade da aplicação.",
    "Facilidade de uso medida por clareza de fluxo e menos fricção.",
    "Evolução de conversão e qualidade dos contatos gerados.",
    "Manutenibilidade do código para crescimento sem retrabalho.",
  ],
  processTimeline: [
    {
      id: "cafe-virtual",
      stage: "01",
      title: "Café Virtual",
      subtitle: "Descoberta & Conexão",
      description:
        "Conversa inicial para entender contexto, objetivos, perfil do público e resultado esperado. Aqui nasce a direção do projeto.",
      outcome: "Saída da etapa: direção estratégica validada.",
      videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    },
    {
      id: "rascunho-escopo",
      stage: "02",
      title: "Rascunho & Escopo",
      subtitle: "A visão toma forma",
      description:
        "Traduzimos as ideias em estrutura real, priorizamos funcionalidades e definimos um escopo claro para execução com segurança.",
      outcome: "Saída da etapa: escopo priorizado e plano de execução.",
      videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    },
    {
      id: "design-contrato",
      stage: "03",
      title: "Design & Contrato",
      subtitle: "Formalização",
      description:
        "Refinamos o visual e experiência no detalhe, validamos direção final e documentamos o combinado para ambos os lados.",
      outcome: "Saída da etapa: interface aprovada e alinhamento formal.",
      videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    },
    {
      id: "desenvolvimento",
      stage: "04",
      title: "Desenvolvimento Puro",
      subtitle: "Construção da estrutura",
      description:
        "Implementação com foco em qualidade técnica, performance e base escalável para suportar evolução contínua do produto.",
      outcome: "Saída da etapa: produto funcional e testado para publicação.",
      videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    },
    {
      id: "deploy-evolucao",
      stage: "05",
      title: "Deploy & Evolução",
      subtitle: "O grande lançamento",
      description:
        "Publicação, ajustes finos em produção e acompanhamento para o sistema seguir saudável, rápido e confiável.",
      outcome: "Saída da etapa: sistema no ar com plano de evolução contínua.",
      videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    },
  ],
};

export function getServicesContent() {
  return servicesContent;
}

export async function getServicesContentRemote() {
  const response = await getFirebaseContent({
    page: 'services',
    section: 'main',
    fallbackData: servicesContent,
  });

  return response.data;
}

export async function setServicesContentRemote(data) {
  return setFirebaseContent({
    page: 'services',
    section: 'main',
    data,
  });
}
