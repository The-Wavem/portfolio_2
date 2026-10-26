import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const defaultWemTemplates = [
    {
        id: 'wem-ecommerce',
        slug: 'wem-ecommerce',
        title: 'WEM E-COMMERCE',
        badge: 'Varejo & Conversão',
        description:
            'Plataforma de alta conversão com checkout integrado, catálogo dinâmico e arquitetura otimizada para tempo de resposta sub-segundo.',
        tags: ['Checkout em 1 Etapa', 'Catálogo em Tempo Real', 'Zero Plugins'],
        previewImage: '/templates-wem-showcase.svg',
        demoUrl: 'https://demo-ecommerce.wavem.dev',
        accent: '#E11D48',
        kpis: [
            { label: 'Taxa de Conversão', value: '+42.8%', trend: '+12% vs média' },
            { label: 'Tempo de Checkout', value: '0.8s', trend: 'Sub-segundo' },
            { label: 'Pedidos Ativos', value: '1.420', trend: 'Sincronizado' }
        ]
    },
    {
        id: 'wem-erp-gestao',
        slug: 'wem-erp-gestao',
        title: 'WEM GESTÃO ERP',
        badge: 'Operação & Financeiro',
        description:
            'Centralização completa de fluxo de caixa, estoque, faturamento e relatórios executivos com a regra dos 2 cliques para decisões imediatas.',
        tags: ['DRE Automático', 'Controle de Estoque', 'Multi-unidades'],
        previewImage: '/templates-wem-showcase.svg',
        demoUrl: 'https://demo-erp.wavem.dev',
        accent: '#FB7185',
        kpis: [
            { label: 'Fechamento Mensal', value: '-85% tempo', trend: 'Automatizado' },
            { label: 'Margem Líquida', value: '34.2%', trend: '+4.1% no trimestre' },
            { label: 'Conciliação', value: '100%', trend: 'Tempo real' }
        ]
    },
    {
        id: 'wem-agendamento',
        slug: 'wem-agendamento',
        title: 'WEM AGENDAMENTO',
        badge: 'Serviços & Clínicas',
        description:
            'Sistema inteligente de reservas, triagem de clientes e confirmação automatizada que elimina filas no WhatsApp e reduz faltas operacionais.',
        tags: ['Agenda Inteligente', 'Confirmação Automática', 'CRM Integrado'],
        previewImage: '/templates-wem-showcase.svg',
        demoUrl: 'https://demo-agendamento.wavem.dev',
        accent: '#F43F5E',
        kpis: [
            { label: 'Redução de No-Show', value: '-64%', trend: 'Lembretes ativos' },
            { label: 'Auto-Agendamento', value: '91%', trend: 'Sem atendente' },
            { label: 'Ocupação da Agenda', value: '96.4%', trend: 'Otimizada' }
        ]
    }
];

export const wemTemplatesContent = defaultWemTemplates;

export const getWemTemplates = () => defaultWemTemplates;

export async function getWemTemplatesRemote() {
    const response = await getFirebaseContent({
        page: 'wemTemplates',
        section: 'catalog',
        fallbackData: defaultWemTemplates
    });

    return Array.isArray(response?.data) && response.data.length > 0
        ? response.data
        : defaultWemTemplates;
}

export async function setWemTemplatesRemote(templates) {
    return setFirebaseContent({
        page: 'wemTemplates',
        section: 'catalog',
        data: templates
    });
}
