export const homeHeroContent = {
    eyebrow: 'PRODUTOS DIGITAIS',
    titleStart: 'Tiramos seu rascunho do papel e entregamos',
    titleHighlight: 'produto real em produção.',
    description:
        'Construímos aplicações web e mobile, com manutenção contínua e evolução técnica para o negócio crescer com segurança.',
    primaryCta: {
        label: 'Quero começar meu projeto',
        href: '#contato'
    },
    secondaryCta: {
        label: 'Ver projetos publicados',
        to: '/projetos'
    },
    trustPills: [
        'Entrega com contexto de negócio',
        'Qualidade técnica e manutenção',
        'Comunicação direta com especialistas'
    ],
    executionContext: {
        eyebrow: 'Contexto de execução',
        title: 'Da estratégia ao deploy com acompanhamento contínuo.',
        steps: [
            { id: '01', text: 'Descoberta e escopo realista' },
            { id: '02', text: 'Design + arquitetura técnica' },
            { id: '03', text: 'Build, publicação e evolução' }
        ]
    }
};

export function getHomeHeroContent() {
    return homeHeroContent;
}
