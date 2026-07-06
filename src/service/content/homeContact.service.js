import { getFirebaseContent, setFirebaseContent } from "@/service/firebase";

export const homeContactContent = {
  eyebrow: "CONTATO SEM FRICÇÃO",
  titleStart: "Fale com a The Wavem com",
  titleHighlight: "clareza desde o primeiro clique.",
  description:
    "Entre em contato com a The Wavem para discutir seu projeto, esclarecer dúvidas ou solicitar informações. Estamos prontos para ouvir suas ideias e ajudá-lo a alcançar seus objetivos.",
  quickMessage:
    "Olá, The Wavem! Quero conversar sobre um novo projeto e entender o melhor caminho para começar.",
  whatsappPhone: "5541995424186",
  email: "contato.thewavem@gmail.com",
  copiedFeedback: "E-mail copiado com sucesso.",
  buttonText: "Iniciar Conversa",
  socials: [
    {
      id: "instagram",
      icon: "instagram",
      href: "https://instagram.com/thewavem",
      label: "Instagram",
    },
    {
      id: "linkedin",
      icon: "linkedin",
      href: "https://linkedin.com/company/thewavem",
      label: "LinkedIn",
    },
    {
      id: "github",
      icon: "github",
      href: "https://github.com/thewavem",
      label: "GitHub",
    },
  ],
};

export function getHomeContactContent() {
  return homeContactContent;
}

export async function getHomeContactContentRemote() {
  const response = await getFirebaseContent({
    page: "home",
    section: "contact",
    fallbackData: homeContactContent,
  });

  return response.data;
}

export async function setHomeContactContentRemote(data) {
  return setFirebaseContent({
    page: "home",
    section: "contact",
    data,
  });
}
