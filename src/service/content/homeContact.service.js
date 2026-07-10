import { getFirebaseContent, setFirebaseContent } from "@/service/firebase";

export const homeContactContent = {
  eyebrow: "CONTATO SEM FRICÇÃO",
  titlePrefix: "Fale com a The Wavem com",
  titleHighlight: "clareza desde o primeiro clique.",
  description:
    "Entre em contato com a The Wavem para discutir seu projeto, esclarecer dúvidas ou solicitar informações. Estamos prontos para ouvir suas ideias e ajudá-lo a alcançar seus objetivos.",
  ctaLabel: "Iniciar Conversa",
  ctaLink: "",
  whatsappNumber: "5541995424186",
  emailAddress: "contato.thewavem@gmail.com",
  emailFeedbackMessage: "E-mail copiado com sucesso.",
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
