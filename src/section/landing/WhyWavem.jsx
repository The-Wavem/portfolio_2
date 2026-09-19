import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbArrowRight } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WhyWavem.module.css';

export default function WhyWavem() {
    return (
        <Box component="section" id="por-que-wavem" className={styles.section}>
            <div className={styles.bgGlow} aria-hidden />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <div className={styles.splitGrid}>
                    {/* Left Column: Narrative & CTA (55%) */}
                    <motion.div
                        className={styles.textColumn}
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        {/* Top Badge */}
                        <div className={styles.topBadge}>
                            <span className={styles.badgeDot} />
                            <span className={styles.badgeText}>POR QUE A WAVEM?</span>
                        </div>

                        {/* Impact Headline */}
                        <h2 className={styles.headline}>
                            Seu site está perdendo clientes para concorrentes com soluções piores?
                        </h2>

                        {/* Concise Paragraph */}
                        <p className={styles.description}>
                            O amadorismo digital drena o lucro da sua empresa silenciosamente. Desenvolvemos ecossistemas sob medida com CMS próprio e performance extrema, garantindo que nenhum cliente escape por lentidão ou falta de credibilidade.
                        </p>

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
                                        section: 'why_wavem_split',
                                        action: 'click_discover_effect',
                                        label: 'Conheça o Efeito Wavem',
                                    })
                                }
                            >
                                Conheça o Efeito Wavem
                            </GlowButton>
                        </div>
                    </motion.div>

                    {/* Right Column: Mini Vector Chart SVG (45%) */}
                    <motion.div
                        className={styles.chartColumn}
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                    >
                        <div className={styles.chartFrame}>
                            <MiniConversionSpeedChart />
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Box>
    );
}

// -------------------------------------------------------------
// Mini Gráfico Vetorial SVG: Curva de Conversão vs Tempo
// -------------------------------------------------------------
function MiniConversionSpeedChart() {
    return (
        <svg
            viewBox="0 0 420 260"
            className={styles.chartSvg}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="miniCurveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="35%" stopColor="#38BDF8" />
                    <stop offset="65%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#FF3366" />
                </linearGradient>

                <linearGradient id="miniAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF3366" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#FF3366" stopOpacity="0.0" />
                </linearGradient>

                <filter id="miniCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00F0FF" floodOpacity="0.6" />
                </filter>

                <filter id="miniRedGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF3366" floodOpacity="0.6" />
                </filter>
            </defs>

            {/* Background Grid Lines */}
            <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1">
                <line x1="45" y1="72" x2="385" y2="72" strokeDasharray="3 3" />
                <line x1="45" y1="128" x2="385" y2="128" strokeDasharray="3 3" />
                <line x1="45" y1="185" x2="385" y2="185" stroke="rgba(255, 255, 255, 0.12)" />
            </g>

            {/* X-Axis Labels */}
            <g fill="rgba(228, 228, 231, 0.45)" fontSize="10" fontWeight="600" textAnchor="middle">
                <text x="80" y="206" fill="#00F0FF">1s</text>
                <text x="160" y="206">2s</text>
                <text x="250" y="206" fill="#FF3366" fontWeight="700">3s</text>
                <text x="340" y="206">4s+</text>
            </g>

            {/* Area Fill */}
            <motion.path
                d="M 80 72 C 130 72, 170 88, 215 132 C 245 162, 280 182, 340 185 L 340 185 L 80 185 Z"
                fill="url(#miniAreaGrad)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* The Drop Curve */}
            <motion.path
                d="M 80 72 C 130 72, 170 88, 215 132 C 245 162, 280 182, 340 185"
                stroke="url(#miniCurveGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Highlight 1: Wavem Peak Conversion (1.2s) */}
            <g>
                <circle cx="80" cy="72" r="5" fill="#00F0FF" filter="url(#miniCyanGlow)" />
                <circle cx="80" cy="72" r="9" stroke="#00F0FF" strokeWidth="1.2" opacity="0.6" />

                {/* Badge Wavem */}
                <g transform="translate(16, 26)">
                    <rect
                        x="0"
                        y="0"
                        width="186"
                        height="26"
                        rx="6"
                        fill="rgba(0, 240, 255, 0.12)"
                        stroke="rgba(0, 240, 255, 0.35)"
                        strokeWidth="1"
                    />
                    <text
                        x="93"
                        y="17"
                        fill="#00F0FF"
                        fontSize="8.5"
                        fontWeight="800"
                        textAnchor="middle"
                        letterSpacing="0.03em"
                    >
                        Wavem (1.2s) • Pico de Conversão
                    </text>
                </g>
                <line x1="80" y1="52" x2="80" y2="67" stroke="#00F0FF" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            </g>

            {/* Highlight 2: Market Drop (>3s) */}
            <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <circle cx="280" cy="174" r="5" fill="#FF3366" filter="url(#miniRedGlow)" />

                {/* Badge Market */}
                <g transform="translate(230, 115)">
                    <rect
                        x="0"
                        y="0"
                        width="164"
                        height="26"
                        rx="6"
                        fill="rgba(255, 51, 102, 0.12)"
                        stroke="rgba(255, 51, 102, 0.35)"
                        strokeWidth="1"
                    />
                    <text
                        x="82"
                        y="17"
                        fill="#FF3366"
                        fontSize="8.5"
                        fontWeight="800"
                        textAnchor="middle"
                        letterSpacing="0.03em"
                    >
                        &gt; 3s • 53% de abandono
                    </text>
                </g>
                <line x1="280" y1="141" x2="280" y2="169" stroke="#FF3366" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            </motion.g>

            {/* Bottom Caption */}
            <text
                x="210"
                y="238"
                fill="rgba(228, 228, 231, 0.4)"
                fontSize="9"
                fontWeight="500"
                textAnchor="middle"
            >
                Tempo de resposta vs taxa de retenção de leads (Google Research)
            </text>
        </svg>
    );
}
