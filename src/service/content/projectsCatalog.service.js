import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const projectsCatalogContent = {
    accent: '#4ADE80',
    eyebrow: 'ESTUDOS DE PROJETO',
    description:
        'Abra cada card para ver contexto, direção técnica e como estruturamos entregas para resultados consistentes.'
};

export function getProjectsCatalogContent() {
    return projectsCatalogContent;
}

export async function getProjectsCatalogContentRemote() {
    const response = await getFirebaseContent({
        page: 'projects',
        section: 'catalogIntro',
        fallbackData: projectsCatalogContent
    });

    return response.data;
}

export async function setProjectsCatalogContentRemote(data) {
    return setFirebaseContent({
        page: 'projects',
        section: 'catalogIntro',
        data
    });
}
