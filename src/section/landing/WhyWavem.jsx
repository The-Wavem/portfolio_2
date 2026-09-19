import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbShieldCheck, TbBolt, TbCoins, TbArrowRight, TbAdjustmentsHorizontal } from 'react-icons/tb';

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
        title: 'Credibilidade & Autoridade',
        stat: '> 75%',
        statColor: '#A78BFA',
        description: 'Julgam a confiança da empresa com base exclusivamente no design e na fluidez do site.',
        icon: TbShieldCheck,
    },
    {
        id: 1,
        title: 'Performance de Conversão & Ads',
        stat: '-300%',
        statColor: '#FF3366',
        description: 'Páginas lentas (>3s) derrubam até 300% a conversão de anúncios do Google e Meta.',
        icon: TbBolt,
    },
    {
        id: 2,
        title: 'Autonomia Real & CMS Próprio',
        stat: 'R$ 0 taxas',
        statColor: '#34D399',
        description: 'Elimine mensalidades técnicas e tenha controle instantâneo sem depender de agências.',
        icon: TbCoins,
    },
];

export default function WhyWavem({ content }) {
    const [data, setData] = useState(() => content || getHomeWhyWavemContent());
    const [activeStep, setActiveStep] = useState(1); // Default to conversion drop graph for high shock value

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

    const cta = data?.cta;

    return (
        <Box
            component="section"
            className={styles.section}
            sx={{ py: { xs: 10, md: 15 } }}
        >
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

                {/* 2-Column Dynamic Interactive Showcase */}
                <div className={styles.interactiveShowcase}>
                    {/* Left: Pillar triggers */}
                    <div className={styles.interactiveList}>
                        {pillarItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeStep === item.id;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`${styles.interactiveItem} ${
                                        isActive ? styles.interactiveItemActive : ''
                                    }`}
                                    onClick={() => {
                                        setActiveStep(item.id);
                                        trackAction({
                                            page: 'home',
                                            section: 'why_wavem',
                                            action: 'select_metric_tab',
                                            label: item.title,
                                        });
                                    }}
                                >
                                    <div className={styles.itemIconWrapper}>
                                        <Icon size={20} />
                                    </div>

                                    <div className={styles.itemContent}>
                                        <div className={styles.itemHeader}>
                                            <h4 className={styles.itemTitle}>{item.title}</h4>
                                            <span
                                                className={styles.itemStat}
                                                style={{ color: item.statColor }}
                                            >
                                                {item.stat}
                                            </span>
                                        </div>
                                        <p className={styles.itemDesc}>{item.description}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Live Interactive SVG Chart */}
                    <div className={styles.chartWrapper}>
                        <InteractiveMetricChart activeStep={activeStep} />
                    </div>
                </div>

                {/* Bottom CTA container */}
                {cta && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
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
