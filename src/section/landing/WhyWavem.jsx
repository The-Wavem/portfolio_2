import { useRef } from 'react';
import { Box, Container } from '@mui/material';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TbArrowRight } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WhyWavem.module.css';

// Variantes de Entrada com Stagger Técnico e Curva Bezier Moderna
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function WhyWavem() {
    const sectionRef = useRef(null);

    // Traço vetorial SVG animado com useScroll e física de mola conforme a rolagem pela seção
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 85%', 'end 25%'],
    });

    const smoothPathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001,
    });

    return (
        <Box
            ref={sectionRef}
            component="section"
            id="por-que-wavem"
            className={styles.section}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <div className={styles.splitGrid}>
                    {/* Coluna 1: Narrativa Editorial com Linha Vetorial Conectora */}
                    <div className={styles.textColumnWrapper}>
                        {/* Linha de Traço Vetorial SVG que conecta o início ao botão de ação */}
                        <svg
                            className={styles.connectorLineSvg}
                            viewBox="0 0 16 380"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                        >
                            <defs>
                                <linearGradient id="neonConnectorGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                                    <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="1" />
                                </linearGradient>
                            </defs>

                            {/* Linha guia de fundo translúcida */}
                            <line
                                x1="8"
                                y1="4"
                                x2="8"
                                y2="376"
                                stroke="rgba(255, 255, 255, 0.08)"
                                strokeWidth="1.5"
                                strokeDasharray="3 3"
                            />

                            {/* Ponto inicial */}
                            <circle cx="8" cy="4" r="3" fill="#00F0FF" />

                            {/* Linha com traço de luz neon percorrendo suavemente via física de mola */}
                            <motion.line
                                x1="8"
                                y1="4"
                                x2="8"
                                y2="376"
                                stroke="url(#neonConnectorGrad)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{ pathLength: smoothPathLength }}
                            />

                            {/* Ponto final sutil no botão */}
                            <motion.circle
                                cx="8"
                                cy="376"
                                r="3.5"
                                fill="#00F0FF"
                                style={{ opacity: smoothPathLength }}
                            />
                        </svg>

                        {/* Conteúdo com Staggering Técnico */}
                        <motion.div
                            className={styles.textColumn}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            {/* Overtitle sutil */}
                            <motion.span variants={itemVariants} className={styles.overtitle}>
                                DIAGNÓSTICO &amp; PERFORMANCE
                            </motion.span>

                            {/* Headline de Impacto */}
                            <motion.h2 variants={itemVariants} className={styles.headline}>
                                Seu site está perdendo vendas para concorrentes com soluções piores?
                            </motion.h2>

                            {/* Descrição */}
                            <motion.p variants={itemVariants} className={styles.description}>
                                Páginas lentas e designs amadores drenam a margem de lucro da sua empresa silenciosamente. Na Wavem, projetamos ecossistemas sob medida com CMS proprietário e velocidade instantânea — sem plugins inchados ou dependência de agências.
                            </motion.p>

                            {/* CTA com Leve Onda de Pulso Convidativa ao Entrar na Tela */}
                            <motion.div
                                variants={itemVariants}
                                className={styles.ctaWrapper}
                                whileInView={{
                                    scale: [1, 1.025, 1],
                                }}
                                viewport={{ once: false }}
                                transition={{
                                    duration: 2.8,
                                    repeat: Infinity,
                                    repeatDelay: 2.5,
                                    ease: 'easeInOut',
                                }}
                            >
                                <GlowButton
                                    to="/porque-wavem"
                                    variant="primary"
                                    size="large"
                                    endIcon={<TbArrowRight size={18} strokeWidth={1.5} />}
                                    onClick={() =>
                                        trackAction({
                                            page: 'home',
                                            section: 'why_wavem_split',
                                            action: 'click_discover_effect',
                                            label: 'Entenda como blindamos o seu site',
                                        })
                                    }
                                >
                                    Entenda como blindamos o seu site →
                                </GlowButton>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Coluna 2: Gráfico Vetorial de Retenção vs Tempo (1.2fr) */}
                    <motion.div
                        className={styles.chartColumn}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.chartWrapper}>
                            <ConversionSpeedChart />
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Box>
    );
}

// -------------------------------------------------------------
// Gráfico Vetorial SVG: Benchmark de Conversão (Retenção vs Tempo)
// Renderizado diretamente no canvas com aceleração por GPU
// -------------------------------------------------------------
function ConversionSpeedChart() {
    return (
        <svg
            viewBox="0 0 500 220"
            className={styles.chartSvg}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Gráfico de retenção de visitantes em relação ao tempo de carregamento da página"
        >
            <defs>
                <linearGradient id="retentionCurveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="30%" stopColor="#00F0FF" />
                    <stop offset="50%" stopColor="#38BDF8" />
                    <stop offset="75%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#FF3366" />
                </linearGradient>

                <linearGradient id="retentionAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.12" />
                    <stop offset="60%" stopColor="#FF3366" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#FF3366" stopOpacity="0.0" />
                </linearGradient>

                <filter id="cyanPointGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00F0FF" floodOpacity="0.7" />
                </filter>
                <filter id="redPointGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FF3366" floodOpacity="0.7" />
                </filter>
            </defs>

            {/* Linhas de Grade Técnica Sutis */}
            <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1">
                <line x1="45" y1="58" x2="475" y2="58" strokeDasharray="3 3" />
                <line x1="45" y1="116" x2="475" y2="116" strokeDasharray="3 3" />
                <line x1="45" y1="175" x2="475" y2="175" stroke="rgba(255, 255, 255, 0.12)" />
                <line x1="45" y1="58" x2="45" y2="175" strokeDasharray="2 4" stroke="rgba(255, 255, 255, 0.04)" />
                <line x1="135" y1="58" x2="135" y2="175" strokeDasharray="2 4" stroke="rgba(255, 255, 255, 0.04)" />
                <line x1="235" y1="58" x2="235" y2="175" strokeDasharray="2 4" stroke="rgba(255, 255, 255, 0.04)" />
                <line x1="335" y1="58" x2="335" y2="175" strokeDasharray="2 4" stroke="rgba(255, 255, 255, 0.04)" />
                <line x1="450" y1="58" x2="450" y2="175" strokeDasharray="2 4" stroke="rgba(255, 255, 255, 0.04)" />
            </g>

            {/* Marcadores Técnicos do Eixo X */}
            <g fill="rgba(228, 228, 231, 0.45)" fontSize="10" fontFamily="'Fira Code', monospace, sans-serif" fontWeight="500" textAnchor="middle">
                <text x="45" y="194">0s</text>
                <text x="135" y="194">1s</text>
                <text x="235" y="194">2s</text>
                <text x="335" y="194">3s</text>
                <text x="450" y="194">4s+</text>
            </g>

            {/* Rótulos Técnicos */}
            <text x="45" y="212" fill="rgba(228, 228, 231, 0.35)" fontSize="8.5" fontFamily="'Inter', sans-serif">
                Tempo de carregamento (segundos)
            </text>
            <text x="475" y="212" fill="rgba(228, 228, 231, 0.35)" fontSize="8.5" fontFamily="'Inter', sans-serif" textAnchor="end">
                Taxa de retenção
            </text>

            {/* Área sob a Curva */}
            <motion.path
                d="M 45 58 L 153 58 C 185 58, 220 64, 260 84 C 300 104, 335 126, 385 154 C 415 163, 435 167, 455 168 L 455 175 L 45 175 Z"
                fill="url(#retentionAreaGrad)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Curva Vetorial com Animação Fluida */}
            <motion.path
                d="M 45 58 L 153 58 C 185 58, 220 64, 260 84 C 300 104, 335 126, 385 154 C 415 163, 435 167, 455 168"
                stroke="url(#retentionCurveGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* PONTO WAVEM: 1.2s • Carregamento Instantâneo Wavem */}
            <g>
                <line
                    x1="153"
                    y1="54"
                    x2="153"
                    y2="28"
                    stroke="#00F0FF"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.7"
                />
                <circle cx="153" cy="58" r="4.5" fill="#00F0FF" filter="url(#cyanPointGlow)" />
                <circle cx="153" cy="58" r="8" stroke="#00F0FF" strokeWidth="1" opacity="0.45" />
                <text
                    x="153"
                    y="22"
                    fill="#00F0FF"
                    fontSize="10"
                    fontFamily="'Inter', sans-serif"
                    fontWeight="700"
                    textAnchor="middle"
                    letterSpacing="0.03em"
                >
                    1.2s • Carregamento Instantâneo Wavem
                </text>
            </g>

            {/* PONTO CRÍTICO: > 3s • 53% de abandono de visitantes */}
            <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
            >
                <line
                    x1="385"
                    y1="148"
                    x2="385"
                    y2="92"
                    stroke="#FF3366"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.6"
                />
                <circle cx="385" cy="154" r="4.5" fill="#FF3366" filter="url(#redPointGlow)" />
                <circle cx="385" cy="154" r="8" stroke="#FF3366" strokeWidth="1" opacity="0.4" />
                <text
                    x="475"
                    y="80"
                    fill="#FF3366"
                    fontSize="9.5"
                    fontFamily="'Inter', sans-serif"
                    fontWeight="700"
                    textAnchor="end"
                    letterSpacing="0.02em"
                >
                    &gt; 3s • 53% de abandono de visitantes
                </text>
                <text
                    x="475"
                    y="93"
                    fill="rgba(255, 51, 102, 0.75)"
                    fontSize="8.5"
                    fontFamily="'Inter', sans-serif"
                    fontWeight="500"
                    textAnchor="end"
                >
                    (Google Research)
                </text>
            </motion.g>
        </svg>
    );
}
