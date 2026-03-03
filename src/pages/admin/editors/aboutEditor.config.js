import {
    getAboutHeroContent,
    getAboutHeroContentRemote,
    getAboutMembers,
    getAboutMembersRemote,
    getAboutStoryContent,
    getAboutStoryContentRemote,
    getAboutTeamContent,
    getAboutTeamContentRemote,
    setAboutHeroContentRemote,
    setAboutMembersRemote,
    setAboutStoryContentRemote,
    setAboutTeamContentRemote
} from '@/service/content';

function getAboutTeamEditorContent() {
    return {
        ...getAboutTeamContent(),
        members: structuredClone(getAboutMembers())
    };
}

async function loadAboutTeamEditorContentRemote() {
    const [teamContent, members] = await Promise.all([
        getAboutTeamContentRemote(),
        getAboutMembersRemote()
    ]);

    return {
        ...teamContent,
        members: structuredClone(members || [])
    };
}

async function saveAboutTeamEditorContentRemote(data) {
    const { members = [], ...teamContent } = data || {};

    const [teamResult, membersResult] = await Promise.all([
        setAboutTeamContentRemote(teamContent),
        setAboutMembersRemote(members)
    ]);

    return {
        ok: Boolean(teamResult?.ok && membersResult?.ok)
    };
}

export const aboutEditorConfig = {
    hero: {
        title: 'Hero de Sobre',
        navLabel: 'Hero',
        description: 'Conteúdo principal de abertura da página Sobre.',
        getContent: getAboutHeroContent,
        loadRemote: getAboutHeroContentRemote,
        saveRemote: setAboutHeroContentRemote,
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
        loadRemote: getAboutStoryContentRemote,
        saveRemote: setAboutStoryContentRemote,
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
        loadRemote: loadAboutTeamEditorContentRemote,
        saveRemote: saveAboutTeamEditorContentRemote,
        previewType: 'aboutTeam',
        dynamicMembersPath: 'members',
        fields: [
            { path: 'accent', label: 'Accent (hex)' },
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true }
        ]
    }
};
