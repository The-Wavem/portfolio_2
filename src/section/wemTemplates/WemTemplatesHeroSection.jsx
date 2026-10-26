import { Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TbArrowLeft } from 'react-icons/tb';

import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WemTemplatesHeroSection.module.css';

export default function WemTemplatesHeroSection({ totalCount = 3 }) {
    return (
        <Box component="section" className={styles.heroSection}>
            <div className={styles.ambientGlowCenter} aria-hidden />

            {/* Linha Orgânica Ondulada Contínua (SVG Ribbon Wave Animada) */}
            <div className={styles.ribbonWaveBackdrop} aria-hidden>
                <svg
                    viewBox="0 0 1440 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.ribbonSvg}
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="wemRibbonBase" x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="0%" stopColor="#E11D48" stopOpacity="0" />
                            <stop offset="22%" stopColor="#E11D48" stopOpacity="0.24" />
                            <stop offset="50%" stopColor="#FB7185" stopOpacity="0.52" />
                            <stop offset="78%" stopColor="#E11D48" stopOpacity="0.24" />
                            <stop offset="100%" stopColor="#E11D48" stopOpacity="0" />
                        </linearGradient>

                        <linearGradient id="wemRibbonPulse" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                            <stop offset="45%" stopColor="#FB7185" stopOpacity="0.85" />
                            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.95" />
                            <stop offset="100%" stopColor="#E11D48" stopOpacity="0" />
                        </linearGradient>

                        <filter id="ribbonGlowFilter" x="-20%" y="-40%" width="140%" height="180%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Trilha Secundária Difusa */}
                    <motion.path
                        d="M -60 210 C 240 90, 480 280, 760 165 C 1040 50, 1240 230, 1500 120"
                        stroke="url(#wemRibbonBase)"
                        strokeWidth="1.5"
                        strokeOpacity="0.55"
                        initial={{ opacity: 0.35 }}
                        animate={{
                            opacity: [0.35, 0.7, 0.35],
                            y: [-4, 4, -4]
                        }}
                        transition={{
                            duration: 9,
                            ease: 'easeInOut',
                            repeat: Infinity
                        }}
                    />

                    {/* Curva Orgânica Principal */}
                    <path
                        d="M -60 165 C 220 265, 510 55, 780 172 C 1050 288, 1250 82, 1500 178"
                        stroke="url(#wemRibbonBase)"
                        strokeWidth="2.2"
                        filter="url(#ribbonGlowFilter)"
                    />

                    {/* Fluxo de Luz Contínuo via strokeDashoffset */}
                    <motion.path
                        d="M -60 165 C 220 265, 510 55, 780 172 C 1050 288, 1250 82, 1500 178"
                        stroke="url(#wemRibbonPulse)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="220 980"
                        filter="url(#ribbonGlowFilter)"
                        animate={{
                            strokeDashoffset: [1200, 0]
                        }}
                        transition={{
                            duration: 8.5,
                            ease: 'linear',
                            repeat: Infinity
                        }}
                    />
                </svg>
            </div>

            <Container maxWidth="lg">
                <div className={styles.containerInner}>
                    {/* Topo: Botão Voltar p/ Portfólio */}
                    <div className={styles.topNavRow}>
                        <motion.div
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        >
                            <RouterLink
                                to="/porque-wavem"
                                className={styles.backPillLink}
                                onClick={() =>
                                    trackAction({
                                        page: 'templates_wem',
                                        section: 'hero',
                                        action: 'click_back_to_portfolio',
                                        label: 'Voltar p/ Portfólio'
                                    })
                                }
                            >
                                <span className={styles.backArrowIcon} aria-hidden>
                                    <TbArrowLeft size={16} strokeWidth={1.8} />
                                </span>
                                <span>Voltar p/ Portfólio</span>
                            </RouterLink>
                        </motion.div>
                    </div>

                    {/* Cabeçalho Central Imponente */}
                    <motion.div
                        className={styles.heroHeaderCenter}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
                    >
                        <span className={styles.eyebrow}>ECOSSISTEMA DE ENGENHARIA APLICADA</span>
                        <h1 className={styles.mainTitle}>TEMPLATES WEM</h1>
                        <p className={styles.subtitle}>
                            Estruturas operacionais prontas para escalar, blindadas e adaptadas sob medida para a rotina do seu negócio. Interaja ao vivo com cada arquitetura abaixo.
                        </p>
                    </motion.div>
                </div>
            </Container>
        </Box>
    );
}
