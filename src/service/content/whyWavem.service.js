import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const whyWavemContent = {
    hero: {
        tag: 'O Efeito Wavem',
        title: 'Tecnologia de ponta pensada para a realidade do seu negócio.',
        subtitle: 'Eliminamos a burocracia de agências tradicionais e entregamos plataformas ultrarrápidas, 100% personalizadas e com controle total nas suas mãos.',
        badges: [
            '100% Sob Medida',
            'CMS Próprio & Rápido',
            'Performance Implacável',
            'Contato Direto com Devs'
        ]
    },
    consultiveApproach: {
        badge: 'MÉTODO CONSULTIVO',
        title: 'Antes do código, uma conversa de verdade.',
        description: 'Não acreditamos em soluções de prateleira ou pacotes engessados. Mapeamos as necessidades reais do seu modelo de negócio para construir uma ferramenta feita sob medida para a sua operação.',
        pillars: [
            {
                id: 'diagnostico',
                title: 'Diagnóstico estratégico e transparente',
                description: 'Entendemos a fundo seu mercado, seus clientes e seus desafios antes de sugerir qualquer linha de código ou tecnologia.',
                iconKey: 'target'
            },
            {
                id: 'design',
                title: 'Design e fluxo pensados para o seu cliente',
                description: 'Interfaces limpas e objetivas focadas em credibilidade imediata, navegação intuitiva e alta taxa de conversão.',
                iconKey: 'layout'
            },
            {
                id: 'nativos',
                title: 'Contato direto com quem desenvolve',
                description: 'Sem intermediários, sem gerentes de conta comerciais e sem ruídos de comunicação. Nativos digitais na linha de frente.',
                iconKey: 'users'
            }
        ]
    },
    customCms: {
        badge: 'AUTONOMIA REAL',
        title: 'O CMS Wavem: seu site livre de mensalidades ocultas.',
        description: 'Chega de pagar de R$ 100 a R$ 200 por hora técnica para agências trocarem uma foto ou um texto no seu site. Construímos um painel administrativo exclusivo, veloz e sob medida para a sua rotina.',
        wavemFeatures: {
            label: 'Wavem CMS Sob Medida',
            items: [
                'Interface limpa, moderna e feita exatamente para a sua rotina',
                'Carregamento instantâneo sem lentidão ou peso desnecessário',
                'Zero plugins vulneráveis ou risco de invasões de segurança',
                'Autonomia total para editar textos, fotos e banners em 1 clique',
                'Economia financeira real: zero taxas de agência para pequenas alterações'
            ]
        },
        traditionalFeatures: {
            label: 'Agências Tradicionais / WordPress',
            items: [
                'Dezenas de plugins pesados, obsoletos e propensos a falhas',
                'Lentidão extrema no carregamento (prejudica SEO e derruba conversão)',
                'Quebras frequentes de layout após atualizações de sistema',
                'Cobrança anual de R$ 800 a R$ 2.500 para simples manutenções',
                'Dependência técnica crônica e burocracia para alterar uma frase'
            ]
        }
    },
    marketData: {
        badge: 'DADOS & CIÊNCIA',
        title: 'Números reais que se convertem em faturamento.',
        subtitle: 'Decisões de engenharia e design fundamentadas nas maiores pesquisas do mercado global.',
        metrics: [
            {
                id: 'credibility',
                stat: '75%',
                statLabel: 'dos consumidores',
                title: 'Credibilidade Imediata',
                description: 'Julgam a confiança e credibilidade da empresa exclusivamente pelo design do site (Stanford Web Credibility Research).',
                tag: 'Stanford Research',
                accentColor: '#A78BFA',
                iconKey: 'shield'
            },
            {
                id: 'performance',
                stat: '< 2s',
                statLabel: 'tempo médio de carregamento',
                title: 'Performance & Conversão',
                description: 'Mais de 53% dos usuários abandonam páginas com mais de 3s de espera. Cada 1s extra derruba 7% das conversões (Google Research).',
                tag: 'Google Research',
                accentColor: '#38BDF8',
                iconKey: 'bolt'
            },
            {
                id: 'savings',
                stat: 'R$ 0',
                statLabel: 'de taxa por edição de texto',
                title: 'Autonomia Financeira',
                description: 'Elimine os custos anuais de agências com nosso CMS exclusivo. Você tem independência completa da sua plataforma.',
                tag: 'Economia Anual',
                accentColor: '#34D399',
                iconKey: 'coins'
            }
        ]
    },
    cta: {
        title: 'Pronto para ter um site que realmente trabalha pelo seu crescimento?',
        subtitle: 'Vamos bater um papo franco, entender seu negócio e desenhar uma presença digital sob medida com autonomia total.',
        buttonText: 'Agendar diagnóstico gratuito',
        link: 'https://wa.me/5541995424186?text=Ol%C3%A1%2C%20The%20Wavem!%20Quero%20agendar%20um%20diagn%C3%B3stico%20gratuito%20para%20o%20meu%20projeto.'
    }
};

export function getWhyWavemContent() {
    return whyWavemContent;
}

export async function getWhyWavemContentRemote() {
    const response = await getFirebaseContent({
        page: 'whyWavem',
        section: 'main',
        fallbackData: whyWavemContent
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
