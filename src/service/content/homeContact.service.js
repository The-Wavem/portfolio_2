import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const homeContactContent = {
    eyebrow: 'CONTATO SEM FRICÇÃO',
    titleStart: 'Fale com a The Wavem com',
    titleHighlight: 'clareza desde o primeiro clique.',
    description:
        'Nada de formulário longo. Você escolhe o canal, abre a conversa na hora e já sabe exatamente o que foi enviado.',
    quickMessage:
        'Olá, The Wavem! Quero conversar sobre um novo projeto e entender o melhor caminho para começar.',
    whatsappPhone: '5541995424186',
    email: 'contato.thewavem@gmail.com',
    copiedFeedback: 'E-mail copiado com sucesso.'
};

export function getHomeContactContent() {
    return homeContactContent;
}

export async function getHomeContactContentRemote() {
    const response = await getFirebaseContent({
        page: 'home',
        section: 'contact',
        fallbackData: homeContactContent
    });

    return response.data;
}

export async function setHomeContactContentRemote(data) {
    return setFirebaseContent({
        page: 'home',
        section: 'contact',
        data
    });
}
