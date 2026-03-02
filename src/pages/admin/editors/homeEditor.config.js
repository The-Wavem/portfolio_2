import {
    getHomeContactContent,
    getHomeFaqContent,
    getHomeHeroContent,
    getHomeHeroContentRemote,
    getHomePortfolioContent,
    getHomeProcessContent,
    setHomeHeroContentRemote
} from '@/service/content';

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
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true },
            { path: 'primaryCta.label', label: 'CTA primário - texto' },
            { path: 'primaryCta.href', label: 'CTA primário - link' },
            { path: 'secondaryCta.label', label: 'CTA secundário - texto' },
            { path: 'secondaryCta.to', label: 'CTA secundário - rota' },
            { path: 'trustPills', label: 'Pílulas de confiança (separadas por ;)', arraySeparator: ';', multiline: true, rows: 3, fullWidth: true },

            { type: 'heading', label: 'Contexto de Execução' },
            { path: 'executionContext.eyebrow', label: 'Contexto - eyebrow' },
            { path: 'executionContext.title', label: 'Contexto - título', fullWidth: true },
            { path: 'executionContext.steps.0.id', label: 'Passo 01 - id' },
            { path: 'executionContext.steps.0.text', label: 'Passo 01 - texto', fullWidth: true },
            { path: 'executionContext.steps.1.id', label: 'Passo 02 - id' },
            { path: 'executionContext.steps.1.text', label: 'Passo 02 - texto', fullWidth: true },
            { path: 'executionContext.steps.2.id', label: 'Passo 03 - id' },
            { path: 'executionContext.steps.2.text', label: 'Passo 03 - texto', fullWidth: true }
        ]
    },
    processo: {
        title: 'Processo da Home',
        navLabel: 'Filosofia / Processo',
        description: 'Edite a proposta de método e narrativa da seção de processo.',
        getContent: getHomeProcessContent,
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
        previewType: 'homePortfolio',
        fields: [
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true },
            { path: 'cta.label', label: 'CTA - texto' },
            { path: 'cta.to', label: 'CTA - rota' },
            { path: 'topTags', label: 'Tags do topo (separadas por ;)', arraySeparator: ';', multiline: true, rows: 3, fullWidth: true }
        ]
    },
    contato: {
        title: 'Contato da Home',
        navLabel: 'Contato',
        description: 'Ajuste a copy de contato rápido e canais exibidos para o visitante.',
        getContent: getHomeContactContent,
        previewType: 'homeContact',
        fields: [
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true },
            { path: 'quickMessage', label: 'Mensagem rápida', multiline: true, rows: 3, fullWidth: true },
            { path: 'email', label: 'E-mail de contato' },
            { path: 'copiedFeedback', label: 'Feedback ao copiar e-mail' }
        ]
    },
    faq: {
        title: 'FAQ da Home',
        navLabel: 'FAQ / Dúvidas',
        description: 'Edite o cabeçalho e explicação da seção de dúvidas frequentes.',
        getContent: getHomeFaqContent,
        previewType: 'homeFaq',
        fields: [
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'titleStart', label: 'Título (início)' },
            { path: 'titleHighlight', label: 'Título (destaque)' },
            { path: 'description', label: 'Descrição', multiline: true, rows: 3, fullWidth: true }
        ]
    }
};
