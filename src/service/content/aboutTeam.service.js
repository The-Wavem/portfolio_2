import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const aboutTeamContent = {
    titlePrefix: 'Conheça o',
    titleHighlight: 'nosso time',
    description: 'Pessoas reais, com especialidades complementares, unidas para transformar o seu rascunho em produto funcional com padrão profissional.'
};

export function getAboutTeamContent() {
    return aboutTeamContent;
}

export async function getAboutTeamContentRemote() {
    const response = await getFirebaseContent({
        page: 'about',
        section: 'team',
        fallbackData: aboutTeamContent
    });

    return response.data;
}

export async function setAboutTeamContentRemote(data) {
    return setFirebaseContent({
        page: 'about',
        section: 'team',
        data
    });
}
