import { useEffect, useState, useRef } from 'react';
import { Box, Container } from '@mui/material';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { TbArrowRight, TbAdjustmentsHorizontal } from 'react-icons/tb';

import SectionTitle from '@/components/ui/SectionTitle';
import GlowButton from '@/components/ui/GlowButton';
import InteractiveMetricChart from '@/components/organism/InteractiveMetricChart';
import {
    getHomeWhyWavemContent,
    getHomeWhyWavemContentRemote,
} from '@/service/content';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WhyWavem.module.css';

const pillarItems = [
    {
        id: 0,
        tag: 'Stanford Web Credibility',
        title: 'Credibilidade & Autoridade pelo Design',
        stat: '> 75%',
        statColor: '#38BDF8',
        description:
            'Mais de 75% dos consumidores admitem julgar a credibilidade e a autoridade de uma empresa com base exclusivamente no design e na fluidez do site oficial.',
        insight:
            'A primeira impressão digital é formada em menos de 0.05 segundos. Templates genéricos comunicam amadorismo antes de qualquer proposta comercial.',
    },
    {
        id: 1,
        tag: 'Google & Ads Performance',
        title: 'Performance de Conversão & Tráfego Pago',
        stat: '-300%',
        statColor: '#FF3366',
        description:
            'Páginas lentas (>3s) derrubam até 300% a conversão de anúncios do Google e Meta. Mais de 53% dos visitantes abandonam a navegação no mobile.',
        insight:
            'Cada segundo adicional reduz até 20% do faturamento de tráfego pago. Um site veloz captura os leads que concorrentes lentos estão perdendo.',
    },
    {
        id: 2,
        tag: 'Autonomia Total CMS',
        title: 'Autonomia Real & CMS Sob Medida',
        stat: 'R$ 0 taxas',
        statColor: '#34D399',
        description:
            'Elimine mensalidades técnicas ocultas de agências e plugins vulneráveis. Controle total do seu conteúdo em 1 clique com código blindado.',
        insight:
            'Independência técnica absoluta para alterar textos, fotos e produtos sem ficar refém de chamados de suporte ou taxas recorrentes.',
    },
];

export default function WhyWavem({ content }) {
    const [data, setData] = useState(() => content || getHomeWhyWavemContent());
    const [activeStep, setActiveStep] = useState(0);
    const trackRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        if (content) {
            setData(content);
            return;
        }

        async function loadRemoteContent() {
            try {
                const remote = await getHomeWhyWavemContentRemote();
                if (isMounted && remote) {
                    setData(remote);
                }
            } catch {
                return;
            }
        }

        loadRemoteContent();

        return () => {
            isMounted = false;
        };
    }, [content]);

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

    const cta = data?.cta;
    const currentStory = pillarItems[activeStep] || pillarItems[0];

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
        <Box component="section" className={styles.section}>
            <div className={styles.bgGlow} aria-hidden />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <SectionTitle
                    eyebrow={data?.eyebrow || 'DIFERENCIAIS TÉCNICOS'}
                    titlePrefix={data?.titlePrefix || 'Por que a'}
                    titleHighlight={data?.titleHighlight || 'Wavem?'}
                    subtitle={
                        data?.subtitle ||
                        'A combinação de engenharia de software proprietária, performance implacável e autonomia real para o seu negócio.'
                    }
                    align="center"
                />

                {data?.cmsIntro && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
                    >
                        <div className={styles.cmsBanner}>
                            <div className={styles.cmsBadge}>
                                <TbAdjustmentsHorizontal size={15} color="#A78BFA" />
                                <span>{data.cmsIntro.badge}</span>
                            </div>
                            <h3 className={styles.cmsTitle}>{data.cmsIntro.title}</h3>
                            <p className={styles.cmsDescription}>{data.cmsIntro.description}</p>
                        </div>
                    </motion.div>
                )}
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
                                        {pillarItems.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className={`${styles.stepBarItem} ${
                                                    activeStep === item.id
                                                        ? styles.stepBarItemActive
                                                        : ''
                                                }`}
                                                onClick={() => handleJumpToStep(item.id)}
                                                aria-label={`Ir para etapa 0${item.id + 1}`}
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

            {/* Bottom CTA container */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 } }}>
                {cta && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                    >
                        <div className={styles.ctaContainer}>
                            <p className={styles.ctaText}>
                                {cta.title || cta.text || 'Quer entender em detalhes como transformamos seu site em uma máquina de vendas?'}
                            </p>
                            <GlowButton
                                to={cta.buttonLink || '/porque-wavem'}
                                variant="primary"
                                size="large"
                                endIcon={<TbArrowRight size={18} />}
                                onClick={() =>
                                    trackAction({
                                        page: 'home',
                                        section: 'why_wavem',
                                        action: 'click_why_wavem_cta',
                                        label: cta.buttonText || 'Conheça o Efeito Wavem',
                                    })
                                }
                            >
                                {cta.buttonText || 'Conheça o Efeito Wavem'}
                            </GlowButton>
                        </div>
                    </motion.div>
                )}
            </Container>
        </Box>
    );
}
