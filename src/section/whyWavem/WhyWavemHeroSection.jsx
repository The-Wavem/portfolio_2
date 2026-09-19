import { Box, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { TbSparkles, TbArrowRight, TbCheck, TbArrowDown } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WhyWavemHeroSection.module.css';

export default function WhyWavemHeroSection({ content }) {
    const hero = content?.hero;
    const badges = [
        '100% Sob Medida',
        'CMS Próprio & Rápido',
        'Performance Implacável',
        'Contato Direto com Devs'
    ];

    const scrollToContent = () => {
        const target = document.getElementById('abordagem-consultiva');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box component="section" className={styles.heroSection}>
            <div className={styles.bgGlowPurple} aria-hidden />
            <div className={styles.bgGlowCyan} aria-hidden />

            <Container maxWidth="lg">
                <div className={styles.contentWrapper}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                        <div className={styles.eyebrowBadge}>
                            <span>{hero?.tag || 'Estratégia de Conversão'}</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                    >
                        O Poder de um{' '}
                        <span className={styles.titleGradient}>Site Sob Medida</span>
                    </motion.h1>

                    {hero?.question && (
                        <motion.div
                            className={styles.questionCard}
                            initial={{ opacity: 0, scale: 0.98, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
                        >
                            <p className={styles.questionText}>
                                "{hero.question}"
                            </p>
                        </motion.div>
                    )}

                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
                    >
                        {hero?.description ||
                            'No digital, a sua vitrine é a primeira e muitas vezes a única impressão. Transforme cliques em receita com um ecossistema digital feito sob medida para escalar o seu faturamento.'}
                    </motion.p>

                    <motion.div
                        className={styles.actionsRow}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.28, ease: 'easeOut' }}
                    >
                        <GlowButton
                            to={hero?.ctaLink || '/contato'}
                            variant="primary"
                            size="large"
                            endIcon={<TbArrowRight size={18} />}
                            onClick={() =>
                                trackAction({
                                    page: 'why_wavem',
                                    section: 'hero',
                                    action: 'click_hero_primary_cta',
                                    label: hero?.ctaText || 'Quero um Site que Vende'
                                })
                            }
                        >
                            {hero?.ctaText || 'Quero um Site que Vende'}
                        </GlowButton>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={scrollToContent}
                            endIcon={<TbArrowDown size={18} />}
                            sx={{
                                borderRadius: '999px',
                                px: { xs: 3, md: 3.5 },
                                py: { xs: 1.4, md: 1.6 },
                                color: '#FFFFFF',
                                borderColor: 'rgba(255, 255, 255, 0.22)',
                                fontWeight: 700,
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    background: 'rgba(124, 58, 237, 0.08)'
                                }
                            }}
                        >
                            Conhecer os diferenciais
                        </Button>
                    </motion.div>
                </div>
            </Container>
        </Box>
    );
}
