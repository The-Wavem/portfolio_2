import { useState, useRef } from 'react';
import { Box, Container } from '@mui/material';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

import SectionTitle from '@/components/ui/SectionTitle';
import InteractiveMetricChart from '@/components/organism/InteractiveMetricChart';
import styles from './WhyWavemMetricsSection.module.css';

const storySteps = [
    {
        id: 0,
        tag: 'Stanford Web Credibility',
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
        tag: 'Google & Ads Performance',
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
        tag: 'Autonomia Total CMS',
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
    const trackRef = useRef(null);
    const data = content?.costOfInaction || content?.marketData;
    const currentStory = storySteps[activeStep] || storySteps[0];

    // Pinned scroll controller using Framer Motion useScroll
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (latest < 0.33) {
            setActiveStep(0);
        } else if (latest < 0.67) {
            setActiveStep(1);
        } else {
            setActiveStep(2);
        }
    });

    const handleJumpToStep = (index) => {
        setActiveStep(index);
        if (trackRef.current) {
            const rect = trackRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY + rect.top;
            const stepOffset = (trackRef.current.offsetHeight / 3) * index;
            window.scrollTo({
                top: scrollTop + stepOffset + 20,
                behavior: 'smooth',
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
            </Container>

            {/* Pinned Scrollytelling Stage: Viewport locks, scrolls through 3 steps, then releases */}
            <div ref={trackRef} className={styles.scrollTrack}>
                <div className={styles.stickyViewport}>
                    <Container maxWidth="lg">
                        <div className={styles.stageGrid}>
                            {/* Left Column: Morphing Editorial Story */}
                            <div className={styles.narrativeColumn}>
                                {/* Step Tracker Bar */}
                                <div className={styles.stepCounterBar}>
                                    <span className={styles.stepIndex}>
                                        0{activeStep + 1} // 03
                                    </span>
                                    <div className={styles.stepBars}>
                                        {storySteps.map((story) => (
                                            <button
                                                key={story.id}
                                                type="button"
                                                className={`${styles.stepBarItem} ${
                                                    activeStep === story.id
                                                        ? styles.stepBarItemActive
                                                        : ''
                                                }`}
                                                onClick={() => handleJumpToStep(story.id)}
                                                aria-label={`Ir para etapa 0${story.id + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Text content morphs smoothly in place */}
                                <div className={styles.textMorphWrapper}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentStory.id}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -16 }}
                                            transition={{ duration: 0.35, ease: 'easeOut' }}
                                        >
                                            <div className={styles.blockTag}>
                                                {currentStory.tag}
                                            </div>

                                            <div
                                                className={styles.statLarge}
                                                style={{ color: currentStory.statColor }}
                                            >
                                                {currentStory.stat}
                                            </div>

                                            <h3 className={styles.storyTitle}>
                                                {currentStory.title}
                                            </h3>

                                            <p className={styles.storyDescription}>
                                                {currentStory.description}
                                            </p>

                                            <div className={styles.storyInsight}>
                                                <strong>Impacto Real:</strong> {currentStory.insight}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Right Column: Sticky Minimalist Visual Stage */}
                            <div className={styles.chartColumn}>
                                <InteractiveMetricChart activeStep={activeStep} />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </Box>
    );
}
