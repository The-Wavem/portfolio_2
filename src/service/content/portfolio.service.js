export const portfolioProjects = [
    {
        id: 1,
        tag: 'Website Institucional',
        title: 'Portal para clínica odontológica com agendamento online',
        summary: 'Experiência premium com foco em conversão, performance e WhatsApp como canal de entrada.',
        details: 'Reestruturamos arquitetura, copy e fluxo de agendamento para reduzir fricção. O resultado foi um site mais rápido, com melhor leitura em mobile e maior taxa de contato qualificado.',
        stack: ['React', 'MUI', 'Firebase'],
        href: 'https://example.com',
        accent: '#7C3AED',
        cover: 'linear-gradient(145deg, rgba(124,58,237,0.35) 0%, rgba(8,8,8,0.35) 45%, rgba(8,8,8,0.9) 100%), radial-gradient(circle at 22% 28%, rgba(167,139,250,0.38), transparent 46%), radial-gradient(circle at 80% 75%, rgba(124,58,237,0.25), transparent 55%)',
        grid: { xs: '1 / -1', md: '1 / span 7' },
        minHeight: { xs: 330, md: 420 }
    },
    {
        id: 2,
        tag: 'SaaS Dashboard',
        title: 'Painel operacional para gestão de atendimentos em tempo real',
        summary: 'Visão consolidada de operações com foco em decisão rápida e clareza de métricas.',
        details: 'Modelamos componentes de alto reuso e um sistema de estados previsível para evitar regressões visuais. A interface foi desenhada para ser escalável e simples de operar sob carga.',
        stack: ['React', 'Node.js', 'PostgreSQL'],
        href: 'https://example.com',
        accent: '#34D399',
        cover: 'linear-gradient(155deg, rgba(52,211,153,0.32) 0%, rgba(8,8,8,0.4) 48%, rgba(8,8,8,0.92) 100%), radial-gradient(circle at 78% 22%, rgba(52,211,153,0.3), transparent 48%), radial-gradient(circle at 20% 80%, rgba(16,185,129,0.18), transparent 52%)',
        grid: { xs: '1 / -1', md: '8 / span 5' },
        minHeight: { xs: 320, md: 420 }
    },
    {
        id: 3,
        tag: 'Landing de Produto',
        title: 'Lançamento de infoproduto com funil e checkout integrado',
        summary: 'Página de alta conversão com leitura escaneável e narrativa orientada a ação.',
        details: 'Unimos design editorial, microinterações e estratégia de conteúdo para aumentar retenção nas seções críticas. O projeto nasceu com foco em SEO técnico e carregamento otimizado.',
        stack: ['Next.js', 'Framer Motion', 'Vercel'],
        href: 'https://example.com',
        accent: '#60A5FA',
        cover: 'linear-gradient(160deg, rgba(96,165,250,0.35) 0%, rgba(8,8,8,0.45) 55%, rgba(8,8,8,0.95) 100%), radial-gradient(circle at 30% 24%, rgba(96,165,250,0.33), transparent 44%), radial-gradient(circle at 82% 78%, rgba(59,130,246,0.2), transparent 54%)',
        grid: { xs: '1 / -1', md: '1 / span 6' },
        minHeight: { xs: 300, md: 320 }
    },
    {
        id: 4,
        tag: 'E-commerce',
        title: 'Loja com catálogo customizado e jornada de compra simplificada',
        summary: 'Arquitetura orientada a performance e experiência mobile-first para escalar vendas.',
        details: 'Projetamos componentes de vitrine e checkout com estados claros para reduzir abandono. A base técnica foi preparada para crescimento contínuo sem perder consistência visual.',
        stack: ['React', 'Stripe', 'Cloudflare'],
        href: 'https://example.com',
        accent: '#F87171',
        cover: 'linear-gradient(150deg, rgba(248,113,113,0.34) 0%, rgba(8,8,8,0.42) 48%, rgba(8,8,8,0.94) 100%), radial-gradient(circle at 74% 26%, rgba(248,113,113,0.3), transparent 46%), radial-gradient(circle at 18% 72%, rgba(239,68,68,0.18), transparent 58%)',
        grid: { xs: '1 / -1', md: '7 / span 6' },
        minHeight: { xs: 300, md: 320 }
    }
];

export function getPortfolioProjects() {
    return portfolioProjects;
}
