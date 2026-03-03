import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const projectsHeroContent = {
    accent: '#4ADE80',
    eyebrow: 'PROJETOS COMPLETOS',
    titleStart: 'Tudo que falamos, aqui vira visão de',
    titleHighlight: 'execução real',
    description:
        'Esta página detalha os projetos que já entregamos: contexto, decisões de produto, stack e direcionamento de resultado. A ideia é simples: te ajudar a entender como pensamos, como construímos e qual nível de qualidade você pode esperar.'
};

export function getProjectsHeroContent() {
    return projectsHeroContent;
}

export async function getProjectsHeroContentRemote() {
    const response = await getFirebaseContent({
        page: 'projects',
        section: 'hero',
        fallbackData: projectsHeroContent
    });

    return response.data;
}

export async function setProjectsHeroContentRemote(data) {
    return setFirebaseContent({
        page: 'projects',
        section: 'hero',
        data
    });
}
