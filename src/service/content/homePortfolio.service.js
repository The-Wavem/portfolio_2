import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const homePortfolioContent = {
    topTags: ['Cases publicados', 'Escopo orientado a negócio', 'Pós-lançamento ativo'],
    eyebrow: 'PORTFÓLIO SELECIONADO',
    titleStart: 'Projetos reais com foco em',
    titleHighlight: 'resultado e confiança.',
    description:
        'Uma vitrine de produtos que nasceram de problemas reais. Em cada entrega, equilibramos estética, clareza de fluxo e engenharia sólida para gerar resultado contínuo.',
    cta: {
        label: 'Ver página completa de projetos',
        to: '/projetos'
    },
    selectedProjectIds: [1, 2, 3, 4]
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
