import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const defaultWhyWavemContent = {
    hero: {
        tag: 'Estratégia de Conversão',
        title: 'O Poder de um Site Sob Medida',
        question: 'O seu negócio está perdendo clientes neste exato momento para concorrentes com sites piores que o seu? Ou pior: porque você não tem um?',
        description: 'No digital, a sua vitrine é a primeira e muitas vezes a única impressão. Transforme cliques em receita com um ecossistema digital feito sob medida para escalar o seu faturamento.',
        ctaText: 'Quero um Site que Vende',
        ctaLink: '/contato'
    },
    consultiveApproach: {
        tag: 'Abordagem Consultiva',
        title: 'Desenvolvimento 100% customizado, focado na sua dor real',
        description: 'Antes de escrever uma única linha de código, nós conversamos de verdade com você. Entendemos o seu modelo de negócio, o perfil dos seus clientes e as suas metas para desenhar a arquitetura perfeita — sem soluções genéricas de prateleira.',
        features: [
            {
                title: 'Diagnóstico Estratégico',
                description: 'Mapeamento aprofundado dos gargalos da sua presença online atual.',
                iconKey: 'target'
            },
            {
                title: 'Projetado para Conversão',
                description: 'Cada botão, texto e transição pensado para guiar o visitante até a compra.',
                iconKey: 'layout'
            },
            {
                title: 'Contato Direto com Devs',
                description: 'Sem intermediários ou gerentes de conta burocráticos. Você fala direto com quem constrói.',
                iconKey: 'users'
            }
        ]
    },
    costOfInaction: {
        tag: 'Realidade de Mercado',
        title: 'Quanto custa ser invisível na internet?',
        intro: 'O mercado mudou. O amadorismo digital drena o seu lucro silenciosamente todos os dias. Veja o que os dados revelam sobre o comportamento do consumidor moderno:',
        metrics: [
            {
                stat: '> 75%',
                source: 'Stanford Web Credibility',
                description: 'Mais de 75% dos consumidores julgam a credibilidade de uma empresa com base no design e na fluidez do seu site oficial.',
                accentColor: '#A78BFA',
                iconKey: 'shield'
            },
            {
                stat: '-300%',
                source: 'Meta & Google Ads',
                description: 'Enviar tráfego pago para redes sociais ou sites lentos é rasgar dinheiro: a conversão despenca em até 300% comparada a uma página profissional.',
                accentColor: '#F87171',
                iconKey: 'trendingDown'
            },
            {
                stat: '53%',
                source: 'Google Research',
                description: 'Abandonam páginas que demoram mais de 3 segundos. Cada segundo extra reduz conversões em até 20%, entregando margem para a concorrência.',
                accentColor: '#38BDF8',
                iconKey: 'bolt'
            }
        ]
    },
    cmsSection: {
        tag: 'Autonomia & Segurança',
        title: 'Esqueça a dependência de agências e plugins lentos',
        subtitle: 'Liberdade total para gerenciar o seu conteúdo com a segurança e a velocidade que o seu negócio exige através do CMS Próprio da Wavem.',
        comparison: {
            traditional: {
                title: 'Mercado Tradicional (WordPress & Construtores)',
                items: [
                    'Dezenas de plugins de terceiros sujeitos a falhas e invasões',
                    'Lentidão extrema provocada por código inchado e templates pesados',
                    'Painéis complexos que geram dependência de agências para trocas simples',
                    'Custos recorrentes com licenças pagas de temas e plugins'
                ]
            },
            wavem: {
                title: 'O Ecossistema Wavem',
                items: [
                    'Arquitetura limpa, segura e blindada contra invasões',
                    'Performance máxima com carregamento instantâneo focado em SEO',
                    'CMS próprio e intuitivo, feito sob medida para a sua rotina',
                    'Autonomia total no dia a dia, sem amarras técnicas ou taxas ocultas'
                ]
            }
        }
    },
    cta: {
        title: 'Não deixe sua margem de lucro na mesa',
        description: 'Vamos desenhar a presença digital definitiva da sua marca e colocar seu site para vender todos os dias.',
        buttonText: 'Quero um Site que Vende',
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
