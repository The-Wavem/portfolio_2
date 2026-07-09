import {
    getHomeContactContent,
    getHomeContactContentRemote,
    getHomeFaqContent,
    getHomeFaqContentRemote,
    getFaqItems,
    getFaqItemsRemote,
    getHomeHeroContent,
    getHomeHeroContentRemote,
    getHomePortfolioContent,
    getHomePortfolioContentRemote,
    getPortfolioProjects,
    getPortfolioProjectsRemote,
    getHomeProcessContent,
    getHomeProcessContentRemote,
    setHomeContactContentRemote,
    setHomeFaqContentRemote,
    setFaqItemsRemote,
    setHomeHeroContentRemote,
    setHomePortfolioContentRemote,
    setHomeProcessContentRemote
} from '@/service/content';

function getHomeFaqEditorContent() {
    return {
        ...getHomeFaqContent(),
        faqs: structuredClone(getFaqItems())
    };
}

async function loadHomeFaqEditorContentRemote() {
    const [faqHeader, faqItems] = await Promise.all([
        getHomeFaqContentRemote(),
        getFaqItemsRemote()
    ]);

    return {
        ...faqHeader,
        faqs: structuredClone(Array.isArray(faqItems) ? faqItems : [])
    };
}

async function saveHomeFaqEditorContentRemote(data) {
    const { faqs = [], ...faqHeader } = data || {};

    const [faqHeaderResult, faqItemsResult] = await Promise.all([
        setHomeFaqContentRemote(faqHeader),
        setFaqItemsRemote(faqs)
    ]);

    return {
        ok: Boolean(faqHeaderResult?.ok && faqItemsResult?.ok)
    };
}

export const homeEditorConfig = {
    hero: {
        title: 'Hero da Home',
        navLabel: 'Hero & Perfil',
        description: 'Ajuste os textos principais da primeira dobra e chamadas de ação.',
        getContent: getHomeHeroContent,
        loadRemote: getHomeHeroContentRemote,
        saveRemote: setHomeHeroContentRemote,
        previewType: 'homeHero',
        fields: [
            { path: 'badges', label: 'Badges (separados por vírgula)', arraySeparator: ',', fullWidth: true },
            { path: 'titlePrefix', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true },
            { path: 'primaryCTA.label', label: 'CTA primário - texto' },
            { path: 'primaryCTA.link', label: 'CTA primário - link' },
            { path: 'secondaryCTA.label', label: 'CTA secundário - texto' },
            { path: 'secondaryCTA.link', label: 'CTA secundário - rota' }
        ]
    },
    processo: {
        title: 'Processo da Home',
        navLabel: 'Filosofia / Processo',
        description: 'Edite a proposta de método e narrativa da seção de processo.',
        getContent: getHomeProcessContent,
        loadRemote: getHomeProcessContentRemote,
        saveRemote: setHomeProcessContentRemote,
        previewType: 'homeProcess',
        fields: [
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true },
            { path: 'topTags', label: 'Tags do topo (separadas por ;)', arraySeparator: ';', multiline: true, rows: 3, fullWidth: true }
        ]
    },
    portfolio: {
        title: 'Portfólio da Home',
        navLabel: 'Portfólio',
        description: 'Controle o bloco de destaque que aponta para a página de projetos.',
        getContent: getHomePortfolioContent,
        loadRemote: getHomePortfolioContentRemote,
        saveRemote: setHomePortfolioContentRemote,
        previewType: 'homePortfolio',
        selectableProjectsPath: 'selectedProjectIds',
        selectableProjectsSource: getPortfolioProjectsRemote,
        fields: [
            { path: 'topTitle', label: 'Título Superior' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'buttonText', label: 'Texto do Botão', fullWidth: true }
        ]
    },
    contato: {
        title: 'Contato da Home',
        navLabel: 'Contato',
        description: 'Ajuste a copy de contato rápido e canais exibidos para o visitante.',
        getContent: getHomeContactContent,
        loadRemote: getHomeContactContentRemote,
        saveRemote: setHomeContactContentRemote,
        previewType: 'homeContact',
        fields: [
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true },
            { path: 'quickMessage', label: 'Mensagem rápida', multiline: true, rows: 3, fullWidth: true },
            { path: 'whatsappPhone', label: 'WhatsApp (somente números com DDI)' },
            { path: 'email', label: 'E-mail de contato' },
            { path: 'copiedFeedback', label: 'Feedback ao copiar e-mail' }
        ]
    },
    faq: {
        title: 'FAQ da Home',
        navLabel: 'FAQ / Dúvidas',
        description: 'Edite cabeçalho, perguntas e respostas que aparecem para os clientes.',
        getContent: getHomeFaqEditorContent,
        loadRemote: loadHomeFaqEditorContentRemote,
        saveRemote: saveHomeFaqEditorContentRemote,
        previewType: 'homeFaq',
        dynamicFaqPath: 'faqs',
        fields: [
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true }
        ]
    }
};
