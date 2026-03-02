export const homeLandingContent = {
    hero: {
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
    },
    process: {
        topTags: ['Método proprietário', 'Transparência em cada sprint', 'Entrega com acompanhamento'],
        eyebrow: 'COMO TRABALHAMOS',
        titleStart: 'Do cafézinho ao',
        titleHighlight: 'código.',
        description:
            'Você acompanha o projeto de ponta a ponta, com checkpoints claros, decisões registradas e previsibilidade de entrega sem ruído.'
    },
    portfolio: {
        topTags: ['Cases publicados', 'Escopo orientado a negócio', 'Pós-lançamento ativo'],
        eyebrow: 'PORTFÓLIO SELECIONADO',
        titleStart: 'Projetos reais com foco em',
        titleHighlight: 'resultado e confiança.',
        description:
            'Uma vitrine de produtos que nasceram de problemas reais. Em cada entrega, equilibramos estética, clareza de fluxo e engenharia sólida para gerar resultado contínuo.',
        cta: {
            label: 'Ver página completa de projetos',
            to: '/projetos'
        }
    },
    contact: {
        eyebrow: 'CONTATO SEM FRICÇÃO',
        titleStart: 'Fale com a The Wavem com',
        titleHighlight: 'clareza desde o primeiro clique.',
        description:
            'Nada de formulário longo. Você escolhe o canal, abre a conversa na hora e já sabe exatamente o que foi enviado.',
        quickMessage:
            'Olá, The Wavem! Quero conversar sobre um novo projeto e entender o melhor caminho para começar.',
        email: 'contato.thewavem@gmail.com',
        copiedFeedback: 'E-mail copiado com sucesso.'
    },
    faq: {
        eyebrow: 'FAQ',
        titleStart: 'Dúvidas que todo cliente tem antes de',
        titleHighlight: 'tirar o projeto do papel.',
        description:
            'Transparência total sobre investimento, escopo, prazo e manutenção para você decidir com segurança.'
    }
};

export function getHomeLandingContent() {
    return homeLandingContent;
}
