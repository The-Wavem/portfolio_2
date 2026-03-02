import { getAboutHeroContent, getAboutMembers, getAboutStoryContent, getAboutTeamContent } from '@/service/content';

function getAboutTeamEditorContent() {
    return {
        ...getAboutTeamContent(),
        members: structuredClone(getAboutMembers())
    };
}

export const aboutEditorConfig = {
    hero: {
        title: 'Hero de Sobre',
        navLabel: 'Hero',
        description: 'Conteúdo principal de abertura da página Sobre.',
        getContent: getAboutHeroContent,
        previewType: 'aboutHero',
        fields: [
            { path: 'accent', label: 'Accent (hex)' },
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true }
        ]
    },
    historia: {
        title: 'História',
        navLabel: 'História',
        description: 'Narrativa da história da empresa.',
        getContent: getAboutStoryContent,
        previewType: 'aboutStory',
        fields: [
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'title', label: 'Título', multiline: true, rows: 2, fullWidth: true },
            { path: 'paragraphs', label: 'Parágrafos (separados por ;)', arraySeparator: ';', multiline: true, rows: 6, fullWidth: true },
            { type: 'heading', label: 'Pilares' },
        ]
    },
    time: {
        title: 'Time',
        navLabel: 'Time',
        description: 'Apresentação da seção de equipe e cards dos colaboradores.',
        getContent: getAboutTeamEditorContent,
        previewType: 'aboutTeam',
        dynamicMembersPath: 'members',
        fields: [
            { path: 'accent', label: 'Accent (hex)' },
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true }
        ]
    }
};
