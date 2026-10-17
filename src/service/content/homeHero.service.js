import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const homeHeroContent = {
    version: 2,
    badges: [],
    titlePrefix: 'WAVEM:',
    titleHighlight: 'sistemas simples que organizam o seu negócio.',
    description:
        'Organize sua rotina, venda seus produtos ou mostre sua arte em poucos cliques — com a nossa equipe ao seu lado do cafezinho ao código.',
    primaryCTA: {
        label: 'Conversar com a equipe',
        link: '#contato'
    },
    secondaryCTA: {
        label: 'Ver projetos reais',
        link: '/projetos'
    }
};

const LEGACY_TITLE_PREFIXES = [
    'A tecnologia que',
    'Engenharia Sólida e'
];

export function isLegacyHeroContent(data) {
    if (!data) return true;
    if (data.version && data.version >= 2) return false;
    return LEGACY_TITLE_PREFIXES.includes((data.titlePrefix || '').trim());
}

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
        data: {
            ...data,
            version: 2
        }
    });
}
