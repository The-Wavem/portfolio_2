import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const homeHeroContent = {
    titleStart: 'Engenharia Sólida e',
    titleHighlight: 'Design para Problemas Reais.',
    description:
        'Equilibramos estética, clareza de fluxo e arquitetura de ponta para gerar resultados contínuos.',
    primaryCta: {
        label: 'Iniciar Projeto',
        href: '#contato'
    },
    secondaryCta: {
        label: 'Ver Portfolio',
        to: '/portfolio'
    },
    trustPills: [
        'Comunicação direta',
        'Arquitetura escalável',
        'Pós-lançamento ativo'
    ]
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
