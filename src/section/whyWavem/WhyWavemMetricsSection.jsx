import { useState, useEffect, useRef } from 'react';
import { Box, Container } from '@mui/material';

import SectionTitle from '@/components/ui/SectionTitle';
import InteractiveMetricChart from '@/components/organism/InteractiveMetricChart';
import styles from './WhyWavemMetricsSection.module.css';

const storySteps = [
    {
        id: 0,
        stat: '> 75%',
        statColor: '#38BDF8',
        title: 'Credibilidade Imediata pelo Design',
        description:
            'Mais de 75% dos consumidores admitem julgar a credibilidade e a autoridade de uma empresa com base exclusivamente no design e na fluidez do seu site oficial.',
        insight:
            'A primeira impressão digital é formada em menos de 0.05 segundos. Um layout de template comunica amadorismo antes mesmo de você apresentar sua proposta comercial.',
    },
    {
        id: 1,
        stat: '-300%',
        statColor: '#FF3366',
        title: 'O Abismo da Lentidão: Rasgando Dinheiro em Tráfego',
        description:
            'Enviar tráfego pago para redes sociais ou sites lentos despenca a conversão em até 300%. Mais de 53% dos acessos mobile são abandonados se a página levar mais de 3 segundos.',
        insight:
            'Cada segundo a mais derruba até 20% das suas conversões reais. Concorrentes rápidos estão capturando os leads que você pagou para atrair.',
    },
    {
        id: 2,
        stat: 'R$ 0 taxas',
        statColor: '#34D399',
        title: 'O Fim da Dependência de Agências e Plugins Lentos',
        description:
            'Esqueça a armadilha do WordPress e agências que cobram de R$ 800 a R$ 2.500/ano apenas para alterar pequenos textos, fotos e banners, cheios de plugins vulneráveis.',
        insight:
            'Com o CMS sob medida da Wavem, você tem controle instantâneo com 1 clique, zero mensalidades técnicas ocultas e código blindado contra invasões.',
    },
];

export default function WhyWavemMetricsSection({ content }) {
    const [activeStep, setActiveStep] = useState(0);
    const stepRefs = useRef([]);
    const data = content?.costOfInaction || content?.marketData;

    useEffect(() => {
        const observers = [];

        stepRefs.current.forEach((el, index) => {
            if (!el) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveStep(index);
                        }
                    });
                },
                {
                    rootMargin: '-35% 0px -35% 0px',
                    threshold: 0.15,
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, []);

    const handleStepClick = (index) => {
        setActiveStep(index);
        if (stepRefs.current[index]) {
            stepRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Box component="section" id="metricas-pesquisas" className={styles.section}>
            <Container maxWidth="lg">
                <div className={styles.introWrapper}>
                    <SectionTitle
                        eyebrow={data?.tag || data?.badge || 'Realidade de Mercado'}
                        title={data?.title || 'Quanto custa ser invisível na internet?'}
                        subtitle={
                            data?.intro ||
                            data?.subtitle ||
                            'O mercado mudou. O amadorismo digital drena o seu lucro silenciosamente todos os dias. Veja o que os dados revelam sobre o comportamento do consumidor moderno:'
                        }
                        align="center"
                        maxWidth={860}
                    />
                </div>

                {/* Sticky Scroll Container */}
                <div className={styles.stickyContainer}>
                    {/* Left Column: Narrative with cinematographic focus */}
                    <div className={styles.narrativeColumn}>
                        {storySteps.map((story, index) => {
                            const isActive = activeStep === index;

                            return (
                                <div
                                    key={story.id}
                                    ref={(el) => (stepRefs.current[index] = el)}
                                    className={`${styles.narrativeStep} ${
                                        isActive
                                            ? styles.narrativeStepActive
                                            : styles.narrativeStepInactive
                                    }`}
                                    onClick={() => handleStepClick(index)}
                                >
                                    <div className={styles.stepHeader}>
                                        <span className={styles.stepIndex}>
                                            0{index + 1} // 03
                                        </span>
                                    </div>

                                    <div
                                        className={styles.statLarge}
                                        style={{ color: story.statColor }}
                                    >
                                        {story.stat}
                                    </div>

                                    <h3 className={styles.storyTitle}>{story.title}</h3>

                                    <p className={styles.storyDescription}>
                                        {story.description}
                                    </p>

                                    <div className={styles.storyInsight}>
                                        <strong>Impacto Real:</strong> {story.insight}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Sticky Visual Stage */}
                    <div className={styles.stickyStageColumn}>
                        <div className={styles.stickyWrapper}>
                            <InteractiveMetricChart activeStep={activeStep} />
                        </div>
                    </div>
                </div>
            </Container>
        </Box>
    );
}
