import {
    getPortfolioProjects,
    getProjectsCatalogContent,
    getProjectsHeroContent
} from '@/service/content';

function getProjectsCatalogEditorContent() {
    const intro = getProjectsCatalogContent();
    const projects = getPortfolioProjects();

    return {
        ...intro,
        projects: structuredClone(projects)
    };
}

export const projectsEditorConfig = {
    hero: {
        title: 'Hero de Projetos',
        navLabel: 'Hero',
        description: 'Conteúdo principal do topo da página de projetos.',
        getContent: getProjectsHeroContent,
        previewType: 'projectsHero',
        fields: [
            { path: 'accent', label: 'Accent (hex)' },
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 4, fullWidth: true }
        ]
    },
    catalogo: {
        title: 'Catálogo de Projetos',
        navLabel: 'Catálogo',
        description: 'Introdução da seção e lista dinâmica de projetos.',
        getContent: getProjectsCatalogEditorContent,
        previewType: 'projectsCatalog',
        dynamicProjectsPath: 'projects',
        fields: [
            { path: 'accent', label: 'Accent (hex)' },
            { path: 'eyebrow', label: 'Eyebrow do catálogo' },
            { path: 'description', label: 'Descrição do catálogo', multiline: true, rows: 3, fullWidth: true }
        ]
    }
};
