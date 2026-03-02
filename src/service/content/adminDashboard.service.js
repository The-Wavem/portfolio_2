export const adminOverviewData = {
    kpis: [
        {
            id: 'views',
            label: 'Visualizações',
            value: 75,
            accent: '#00E38C',
            iconKey: 'eye'
        },
        {
            id: 'projectClicks',
            label: 'Cliques em Projetos',
            value: 29,
            accent: '#3B82F6',
            iconKey: 'click'
        },
        {
            id: 'topProject',
            label: 'Projeto em Destaque',
            value: 'ExplorOcean',
            helper: '11 cliques',
            accent: '#FACC15',
            iconKey: 'trophy'
        },
        {
            id: 'interactions',
            label: 'Interações Gerais',
            value: 68,
            accent: '#F59E0B',
            iconKey: 'mouse'
        }
    ],
    chart: {
        title: 'Tráfego vs. Engajamento',
        series: [
            { date: '24/02', visits: 4, actions: 1 },
            { date: '25/02', visits: 2, actions: 0 },
            { date: '26/02', visits: 3, actions: 1 },
            { date: '27/02', visits: 29, actions: 15 },
            { date: '28/02', visits: 5, actions: 1 },
            { date: '01/03', visits: 3, actions: 1 },
            { date: '02/03', visits: 41, actions: 8 }
        ]
    },
    topActions: [
        { id: 'project-filter', label: 'Filtro projeto', value: 23 },
        { id: 'consent', label: 'Consentimento aceito', value: 19 },
        { id: 'hero', label: 'Hero section', value: 11 },
        { id: 'back-top', label: 'Back to top', value: 8 },
        { id: 'email-modal', label: 'Email modal', value: 4 },
        { id: 'github', label: 'GitHub contact', value: 2 }
    ]
};

export function getAdminOverviewData() {
    return adminOverviewData;
}
