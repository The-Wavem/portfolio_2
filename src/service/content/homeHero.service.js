import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const homeHeroContent = {
    badges: ['Design', 'Engenharia', 'Performance'],
    titlePrefix: 'Engenharia Sólida e',
    titleHighlight: 'Design para Problemas Reais.',
    description:
        'Equilibramos estética, clareza de fluxo e arquitetura de ponta para gerar resultados contínuos.',
    primaryCTA: {
        label: 'Iniciar Projeto',
        link: '#contato'
    },
    secondaryCTA: {
        label: 'Ver Portfolio',
        link: '/portfolio'
    }
};

export function getHomeHeroContent() {
    return homeHeroContent;
}

export async function getHomeHeroContentRemote() {
    const response = await getFirebaseContent({
        page: 'home',
        section: 'hero',
        fallbackData: homeHeroContent
    });

    return response.data;
}

export async function setHomeHeroContentRemote(data) {
    return setFirebaseContent({
        page: 'home',
        section: 'hero',
        data
    });
}
