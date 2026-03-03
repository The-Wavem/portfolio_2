import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const homeFaqContent = {
    eyebrow: 'FAQ',
    titleStart: 'Dúvidas que todo cliente tem antes de',
    titleHighlight: 'tirar o projeto do papel.',
    description:
        'Transparência total sobre investimento, escopo, prazo e manutenção para você decidir com segurança.'
};

export function getHomeFaqContent() {
    return homeFaqContent;
}

export async function getHomeFaqContentRemote() {
    const response = await getFirebaseContent({
        page: 'home',
        section: 'faq',
        fallbackData: homeFaqContent
    });

    return response.data;
}

export async function setHomeFaqContentRemote(data) {
    return setFirebaseContent({
        page: 'home',
        section: 'faq',
        data
    });
}
