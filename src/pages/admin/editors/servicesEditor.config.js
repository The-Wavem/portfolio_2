import { getServicesContent } from '@/service/content';

export const servicesEditorConfig = {
    hero: {
        title: 'Hero de Serviços',
        navLabel: 'Hero',
        description: 'Campos reais da dobra principal da página de serviços.',
        getContent: getServicesContent,
        previewType: 'servicesHero',
        fields: [
            { path: 'accent.start', label: 'Accent inicial (hex)' },
            { path: 'accent.end', label: 'Accent final (hex)' },
            { path: 'heroVideoUrl', label: 'Vídeo de fundo (URL)', fullWidth: true },
            { path: 'eyebrow', label: 'Eyebrow' },
            { path: 'title', label: 'Título principal', multiline: true, rows: 2, fullWidth: true },
            { path: 'contextLines', label: 'Linhas de contexto (separadas por ;)', arraySeparator: ';', multiline: true, rows: 3, fullWidth: true },
            { path: 'impactStats.0.value', label: 'Stat 1 - valor' },
            { path: 'impactStats.0.label', label: 'Stat 1 - rótulo' },
            { path: 'impactStats.1.value', label: 'Stat 2 - valor' },
            { path: 'impactStats.1.label', label: 'Stat 2 - rótulo' },
            { path: 'impactStats.2.value', label: 'Stat 3 - valor' },
            { path: 'impactStats.2.label', label: 'Stat 3 - rótulo' }
        ]
    },
    destaques: {
        title: 'Destaques de Serviços',
        navLabel: 'Destaques',
        description: 'Listas de expectativa inicial e métricas de sucesso.',
        getContent: getServicesContent,
        previewType: 'servicesHighlights',
        fields: [
            { path: 'firstWeekExpectations', label: 'Primeira semana (separadas por ;)', arraySeparator: ';', multiline: true, rows: 5, fullWidth: true },
            { path: 'successMetrics', label: 'Métricas de sucesso (separadas por ;)', arraySeparator: ';', multiline: true, rows: 5, fullWidth: true }
        ]
    },
    processo: {
        title: 'Processo de Serviços',
        navLabel: 'Processo',
        description: 'Etapas reais do accordion da página de serviços.',
        getContent: getServicesContent,
        previewType: 'servicesProcess',
        fields: [
            { type: 'heading', label: 'Etapa 01' },
            { path: 'processTimeline.0.id', label: 'ID etapa 01' },
            { path: 'processTimeline.0.stage', label: 'Número etapa 01' },
            { path: 'processTimeline.0.title', label: 'Título etapa 01' },
            { path: 'processTimeline.0.subtitle', label: 'Subtítulo etapa 01' },
            { path: 'processTimeline.0.description', label: 'Descrição etapa 01', multiline: true, rows: 3, fullWidth: true },
            { path: 'processTimeline.0.outcome', label: 'Saída etapa 01', multiline: true, rows: 2, fullWidth: true },
            { path: 'processTimeline.0.videoUrl', label: 'Vídeo etapa 01 (URL)', fullWidth: true },

            { type: 'heading', label: 'Etapa 02' },
            { path: 'processTimeline.1.id', label: 'ID etapa 02' },
            { path: 'processTimeline.1.stage', label: 'Número etapa 02' },
            { path: 'processTimeline.1.title', label: 'Título etapa 02' },
            { path: 'processTimeline.1.subtitle', label: 'Subtítulo etapa 02' },
            { path: 'processTimeline.1.description', label: 'Descrição etapa 02', multiline: true, rows: 3, fullWidth: true },
            { path: 'processTimeline.1.outcome', label: 'Saída etapa 02', multiline: true, rows: 2, fullWidth: true },
            { path: 'processTimeline.1.videoUrl', label: 'Vídeo etapa 02 (URL)', fullWidth: true },

            { type: 'heading', label: 'Etapa 03' },
            { path: 'processTimeline.2.id', label: 'ID etapa 03' },
            { path: 'processTimeline.2.stage', label: 'Número etapa 03' },
            { path: 'processTimeline.2.title', label: 'Título etapa 03' },
            { path: 'processTimeline.2.subtitle', label: 'Subtítulo etapa 03' },
            { path: 'processTimeline.2.description', label: 'Descrição etapa 03', multiline: true, rows: 3, fullWidth: true },
            { path: 'processTimeline.2.outcome', label: 'Saída etapa 03', multiline: true, rows: 2, fullWidth: true },
            { path: 'processTimeline.2.videoUrl', label: 'Vídeo etapa 03 (URL)', fullWidth: true },

            { type: 'heading', label: 'Etapa 04' },
            { path: 'processTimeline.3.id', label: 'ID etapa 04' },
            { path: 'processTimeline.3.stage', label: 'Número etapa 04' },
            { path: 'processTimeline.3.title', label: 'Título etapa 04' },
            { path: 'processTimeline.3.subtitle', label: 'Subtítulo etapa 04' },
            { path: 'processTimeline.3.description', label: 'Descrição etapa 04', multiline: true, rows: 3, fullWidth: true },
            { path: 'processTimeline.3.outcome', label: 'Saída etapa 04', multiline: true, rows: 2, fullWidth: true },
            { path: 'processTimeline.3.videoUrl', label: 'Vídeo etapa 04 (URL)', fullWidth: true },

            { type: 'heading', label: 'Etapa 05' },
            { path: 'processTimeline.4.id', label: 'ID etapa 05' },
            { path: 'processTimeline.4.stage', label: 'Número etapa 05' },
            { path: 'processTimeline.4.title', label: 'Título etapa 05' },
            { path: 'processTimeline.4.subtitle', label: 'Subtítulo etapa 05' },
            { path: 'processTimeline.4.description', label: 'Descrição etapa 05', multiline: true, rows: 3, fullWidth: true },
            { path: 'processTimeline.4.outcome', label: 'Saída etapa 05', multiline: true, rows: 2, fullWidth: true },
            { path: 'processTimeline.4.videoUrl', label: 'Vídeo etapa 05 (URL)', fullWidth: true }
        ]
    }
};
