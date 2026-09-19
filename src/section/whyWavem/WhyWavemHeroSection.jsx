import { Box, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { TbSparkles, TbArrowRight, TbCheck, TbArrowDown } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WhyWavemHeroSection.module.css';

export default function WhyWavemHeroSection({ content }) {
    const hero = content?.hero;
    const badges = hero?.badges || [];

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
                            <TbSparkles size={16} color="#A78BFA" />
                            <span>{hero?.tag || 'O Efeito Wavem'}</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                    >
                        Tecnologia de ponta pensada para a{' '}
                        <span className={styles.titleGradient}>realidade do seu negócio.</span>
                    </motion.h1>

                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
                    >
                        {hero?.subtitle ||
                            'Eliminamos a burocracia de agências tradicionais e entregamos plataformas ultrarrápidas, 100% personalizadas e com controle total nas suas mãos.'}
                    </motion.p>

                    <motion.div
                        className={styles.actionsRow}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.26, ease: 'easeOut' }}
                    >
                        <GlowButton
                            href="https://wa.me/5541995424186?text=Ol%C3%A1%2C%20The%20Wavem!%20Quero%20agendar%20um%20diagn%C3%B3stico%20gratuito%20para%20o%20meu%20projeto."
                            variant="primary"
                            size="large"
                            endIcon={<TbArrowRight size={18} />}
                            onClick={() =>
                                trackAction({
                                    page: 'why_wavem',
                                    section: 'hero',
                                    action: 'click_hero_primary_cta',
                                    label: 'Agendar diagnóstico gratuito'
                                })
                            }
                        >
                            Agendar diagnóstico gratuito
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

                    {badges.length > 0 && (
                        <motion.div
                            className={styles.badgesGrid}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.36 }}
                        >
                            {badges.map((badge) => (
                                <div key={badge} className={styles.badgePill}>
                                    <TbCheck size={15} color="#38BDF8" />
                                    <span>{badge}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </Container>
        </Box>
    );
}
