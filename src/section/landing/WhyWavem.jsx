import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbArrowRight, TbShieldCheck, TbBolt, TbCoins } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import {
    getHomeWhyWavemContent,
    getHomeWhyWavemContentRemote,
} from '@/service/content';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WhyWavem.module.css';

export default function WhyWavem({ content }) {
    const [data, setData] = useState(() => content || getHomeWhyWavemContent());

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

    return (
        <Box component="section" id="por-que-wavem" className={styles.section}>
            <div className={styles.bgGlow} aria-hidden />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className={styles.teaserCard}>
                        {/* Top Badge */}
                        <div className={styles.topBadge}>
                            <span className={styles.badgeDot} />
                            <span className={styles.badgeText}>
                                {data?.eyebrow ? `POR QUE A ${data.eyebrow}?` : 'POR QUE A WAVEM?'}
                            </span>
                        </div>

                        {/* Headline */}
                        <h2 className={styles.headline}>
                            Seu site está perdendo clientes para concorrentes com soluções piores?
                        </h2>

                        {/* Supporting text */}
                        <p className={styles.supportingText}>
                            O amadorismo digital drena o lucro da sua empresa silenciosamente. Unimos arquitetura sob medida, performance implacável e autonomia real com o nosso CMS próprio — sem plugins lentos ou agências intermediárias.
                        </p>

                        {/* 3 Micro-indicators pills */}
                        <div className={styles.pillsContainer}>
                            <div className={styles.indicatorPill}>
                                <TbShieldCheck size={16} className={styles.pillIconCyan} />
                                <span><strong>&gt; 75%</strong> julgam credibilidade no design</span>
                            </div>
                            <div className={styles.indicatorPill}>
                                <TbBolt size={16} className={styles.pillIconViolet} />
                                <span><strong>0 segundos</strong> perdidos com código inchado</span>
                            </div>
                            <div className={styles.indicatorPill}>
                                <TbCoins size={16} className={styles.pillIconEmerald} />
                                <span><strong>R$ 0</strong> em taxas de manutenção de conteúdo</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className={styles.ctaWrapper}>
                            <GlowButton
                                to="/porque-wavem"
                                variant="primary"
                                size="large"
                                endIcon={<TbArrowRight size={18} />}
                                onClick={() =>
                                    trackAction({
                                        page: 'home',
                                        section: 'why_wavem_teaser',
                                        action: 'click_discover_effect',
                                        label: 'Descubra o Efeito Wavem',
                                    })
                                }
                            >
                                Descubra o Efeito Wavem
                            </GlowButton>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Box>
    );
}
