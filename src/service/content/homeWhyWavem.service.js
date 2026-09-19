import { getFirebaseContent, setFirebaseContent } from '@/service/firebase';

export const homeWhyWavemContent = {
    eyebrow: 'DIFERENCIAIS',
    titlePrefix: 'Por que a',
    titleHighlight: 'Wavem?',
    subtitle: 'A combinação de tecnologia moderna, performance implacável e autonomia real para o seu negócio.',
    cmsIntro: {
        badge: 'CMS EXCLUSIVO WAVEM',
        title: 'Chega de depender de desenvolvedores para mudar um simples texto.',
        description: 'Desenvolvemos nosso próprio CMS para entregar autonomia técnica total ao seu negócio. Você atualiza conteúdos, fotos e seções em segundos, sem chamados demorados nem mensalidades extras de manutenção — potencializando os diferenciais a seguir:'
    },
    pillars: [
        {
            id: 'credibility',
            stat: '75%',
            statLabel: 'dos consumidores',
            highlight: '75% dos consumidores',
            title: 'Credibilidade Imediata',
            description: 'Julgam a credibilidade e confiança de uma empresa exclusivamente pelo design do site (Stanford Web Credibility Research).',
            tag: 'Design Sob Medida',
            iconKey: 'shield',
            accentColor: '#A78BFA'
        },
        {
            id: 'performance',
            stat: '-7%',
            statLabel: 'a cada 1s de espera',
            highlight: 'Cada 1s = -7% de conversão',
            title: 'Performance & Conversão',
            description: 'Mais de 53% dos acessos mobile são perdidos se o site demorar mais de 3 segundos para abrir (Google Research). Criamos páginas ultrarrápidas sem plugins pesados.',
            tag: 'Velocidade Extrema',
            iconKey: 'bolt',
            accentColor: '#38BDF8'
        },
        {
            id: 'autonomy',
            stat: 'Economia financeira',
            statLabel: 'Média de R$ 800 a R$ 2.500/ano',
            highlight: 'Economia de R$ 800 a R$ 2.500/ano',
            title: 'Autonomia Financeira (CMS Wavem)',
            description: 'Elimine a taxa cobrada por agências para trocas simples de textos, imagens e banners. Tenha controle total da sua plataforma com nosso CMS exclusivo.',
            tag: 'Independência Total',
            iconKey: 'code',
            accentColor: '#34D399'
        }
    ],
    cta: {
        title: 'Quer entender em detalhes como transformamos seu site em uma máquina de vendas?',
        buttonText: 'Conheça o Efeito Wavem',
        buttonLink: '/porque-wavem'
    }
};

export function getHomeWhyWavemContent() {
    return homeWhyWavemContent;
}

export async function getHomeWhyWavemContentRemote() {
    const response = await getFirebaseContent({
        page: 'home',
        section: 'whyWavem',
        fallbackData: homeWhyWavemContent
    });

    return response.data;
}

export async function setHomeWhyWavemContentRemote(data) {
    return setFirebaseContent({
        page: 'home',
        section: 'whyWavem',
        data
    });
}
