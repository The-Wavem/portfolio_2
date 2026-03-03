import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const homeProcessContent = {
    topTags: ['Método proprietário', 'Transparência em cada sprint', 'Entrega com acompanhamento'],
    eyebrow: 'COMO TRABALHAMOS',
    titleStart: 'Do cafézinho ao',
    titleHighlight: 'código.',
    description:
        'Você acompanha o projeto de ponta a ponta, com checkpoints claros, decisões registradas e previsibilidade de entrega sem ruído.'
};

export function getHomeProcessContent() {
    return homeProcessContent;
}

export async function getHomeProcessContentRemote() {
    const response = await getFirebaseContent({
        page: 'home',
        section: 'process',
        fallbackData: homeProcessContent
    });

    return response.data;
}

export async function setHomeProcessContentRemote(data) {
    return setFirebaseContent({
        page: 'home',
        section: 'process',
        data
    });
}
