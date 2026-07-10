import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const homePortfolioContent = {
    topTitle: 'PORTFÓLIO SELECIONADO',
    titleStart: 'Projetos reais com foco em',
    titleHighlight: 'resultado e confiança.',
    buttonText: 'Ver página completa de projetos',
    selectedProjectIds: ['1', '2', '3', '4']
};

export function getHomePortfolioContent() {
    return homePortfolioContent;
}

export async function getHomePortfolioContentRemote() {
    const response = await getFirebaseContent({
        page: 'home',
        section: 'portfolio',
        fallbackData: homePortfolioContent
    });

    return response.data;
}

export async function setHomePortfolioContentRemote(data) {
    return setFirebaseContent({
        page: 'home',
        section: 'portfolio',
        data
    });
}
