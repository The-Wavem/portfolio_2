import {
    getPortfolioProjects,
    getPortfolioProjectsRemote,
    getProjectsCatalogContent,
    getProjectsCatalogContentRemote,
    getProjectsHeroContent,
    getProjectsHeroContentRemote,
    setPortfolioProjectsRemote,
    setProjectsCatalogContentRemote,
    setProjectsHeroContentRemote
} from '@/service/content';

function getProjectsCatalogEditorContent() {
    const intro = getProjectsCatalogContent();
    const projects = getPortfolioProjects();

    return {
        ...intro,
        projects: structuredClone(projects)
    };
}

async function getProjectsCatalogEditorContentRemote() {
    const [intro, projects] = await Promise.all([
        getProjectsCatalogContentRemote(),
        getPortfolioProjectsRemote()
    ]);

    return {
        ...intro,
        projects: structuredClone(Array.isArray(projects) ? projects : [])
    };
}

async function saveProjectsCatalogEditorContentRemote(data) {
    const { projects = [], ...intro } = data || {};

    const [introResult, projectsResult] = await Promise.all([
        setProjectsCatalogContentRemote(intro),
        setPortfolioProjectsRemote(projects)
    ]);

    return {
        ok: Boolean(introResult?.ok && projectsResult?.ok)
    };
}

export const projectsEditorConfig = {
    hero: {
        title: 'Hero de Projetos',
        navLabel: 'Hero',
        description: 'Conteúdo principal do topo da página de projetos.',
        getContent: getProjectsHeroContent,
        loadRemote: getProjectsHeroContentRemote,
        saveRemote: setProjectsHeroContentRemote,
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
        loadRemote: getProjectsCatalogEditorContentRemote,
        saveRemote: saveProjectsCatalogEditorContentRemote,
        previewType: 'projectsCatalog',
        dynamicProjectsPath: 'projects',
        fields: [
            { path: 'accent', label: 'Accent (hex)' },
            { path: 'eyebrow', label: 'Eyebrow do catálogo' },
            { path: 'description', label: 'Descrição do catálogo', multiline: true, rows: 3, fullWidth: true }
        ]
    }
};
