import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const defaultWhyWavemContent = {
    hero: {
        overtitle: 'ENGENHARIA SOB MEDIDA',
        title: 'Sua empresa não precisa de mais um site. Precisa de um sistema que devolva o seu tempo.',
        description:
            'Projetamos plataformas rápidas, centralizadas e com segurança jurídica. Você ganha autonomia total para gerenciar seu conteúdo pelo CMS próprio, com infraestrutura estável na nuvem e suporte técnico transparente.',
        ctaText: 'Construir meu Sistema Wavem',
        ctaLink: '/contato'
    },
    corePillars: {
        overtitle: 'A FILOSOFIA WAVEM',
        title: 'Por que empresários sérios investem em sistemas proprietários?',
        pillars: [
            {
                title: 'A Regra dos 2 Cliques',
                description:
                    'Se uma tarefa exige mais de dois cliques ou um manual de instruções, o software falhou. Nosso CMS é enxuto: você entra, resolve em segundos e volta a cuidar do seu negócio.'
            },
            {
                title: 'Fim da Fragmentação Operacional',
                description:
                    'Chega de perder horas copiando dados entre WhatsApp, planilhas pesadas do Excel e abas travadas. Unificamos o contato com o cliente, formulários e banco de dados em um único lugar.'
            },
            {
                title: 'Velocidade Real (Sem Rodas Girando)',
                description:
                    'Sem temas pesados de WordPress, sem dezenas de plugins que quebram na atualização. Código nativo e limpo com resposta instantânea no computador da empresa ou no celular.'
            }
        ]
    },
    costOfInaction: {
        tag: 'Realidade Operacional',
        title: 'O custo real de manter sistemas engessados',
        intro:
            'Empresas perdem dias de trabalho tentando operar ferramentas desconectadas e dependendo de chamados caros para qualquer ajuste básico:',
        metrics: [
            {
                stat: '> 75%',
                source: 'Stanford Web Credibility',
                description:
                    'Mais de 75% dos consumidores julgam a credibilidade da empresa pela fluidez e acabamento da sua presença oficial.'
            },
            {
                stat: '3s = Abandono',
                source: 'Google Research',
                description:
                    '53% dos acessos abandonam páginas lentas. Sistemas mal otimizados geram lentidão e perda silenciosa de clientes.'
            },
            {
                stat: '100% Autônomo',
                source: 'CMS Sob Medida',
                description:
                    'Altere dados, fotos e cadastros pelo seu painel sem pagar chamados extras. Você no controle do dia a dia do seu negócio.'
            }
        ]
    },
    caseStudy: {
        overtitle: 'CASO REAL EM OPERAÇÃO',
        title: 'Como a Imobiliária Valdinei transformou horas de trabalho manual em 2 cliques',
        youtubeVideoId: 'dQw4w9WgXcQ',
        metrics: [
            { value: 'Integração Total', label: 'Sincronização em tempo real' },
            { value: '-80% de esforço', label: 'Fim do cadastro manual' },
            { value: 'Regra dos 2 Cliques', label: 'Agilidade na publicação' }
        ],
        contractCommitment:
            'Contrato claro de 12 meses, suporte corretivo garantido, autonomia de conteúdo e manutenção transparente de infraestrutura.',
        ctaText: 'Quero automatizar minha operação',
        ctaLink: '/contato'
    },
    cmsSection: {
        tag: 'IMPACTO OPERACIONAL & FINANCEIRO',
        title: 'O Fim dos Sistemas Travados e dos Pedágios Técnicos',
        subtitle:
            'Compare a realidade de quem terceiriza em plataformas genéricas versus quem possui um ecossistema próprio que trabalha a favor do faturamento.',
        comparison: {
            traditional: {
                title: 'O Mercado Tradicional (WordPress & Plataformas de Aluguel)',
                items: [
                    'Plataformas de terceiros inchadas e instáveis após qualquer atualização',
                    'Dezenas de plugins vulneráveis que quebram e expõem dados da empresa',
                    'Suporte técnico que demora dias ou semanas para responder chamados simples',
                    'Dependência contínua de horas técnicas pagas para alterar um texto ou foto'
                ]
            },
            wavem: {
                title: 'O Sistema Wavem (Engenharia Sob Medida)',
                items: [
                    'Painel exclusivo e blindado, construído para a rotina daquela empresa específica',
                    'Regra dos 2 cliques: sua equipe resolve demandas operacionais em segundos',
                    'Autonomia total para atualização de conteúdo pelo CMS próprio sem pedágio por chamado',
                    'Código proprietário veloz, sem plugins de terceiros e com resposta instantânea'
                ]
            }
        }
    },
    cta: {
        title: 'Pronto para ter um sistema que trabalha com a sua empresa?',
        description:
            'Vamos desenhar a ferramenta exata que seu negócio precisa, com escopo fechado, contrato transparente e sem surpresas.',
        buttonText: 'Falar com os Desenvolvedores',
        link: '/contato'
    }
};

export const whyWavemContent = defaultWhyWavemContent;

export function getWhyWavemContent() {
    return defaultWhyWavemContent;
}

export async function getWhyWavemContentRemote() {
    const response = await getFirebaseContent({
        page: 'whyWavem',
        section: 'main',
        fallbackData: defaultWhyWavemContent
    });

    return response.data;
}

export async function setWhyWavemContentRemote(data) {
    return setFirebaseContent({
        page: 'whyWavem',
        section: 'main',
        data
    });
}
