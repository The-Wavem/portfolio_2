import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const aboutHeroContent = {
    accent: '#38BDF8',
    eyebrow: 'QUEM FAZ A THE WAVEM',
    titleStart: 'Um time de especialistas com',
    titleHighlight: 'foco em resultado real.',
    description:
        'Clique em cada perfil para conhecer habilidades, áreas de foco, projetos pessoais e canais individuais de contato.'
};

export function getAboutHeroContent() {
    return aboutHeroContent;
}

export async function getAboutHeroContentRemote() {
    const response = await getFirebaseContent({
        page: 'about',
        section: 'hero',
        fallbackData: aboutHeroContent
    });

    return response.data;
}

export async function setAboutHeroContentRemote(data) {
    return setFirebaseContent({
        page: 'about',
        section: 'hero',
        data
    });
}
