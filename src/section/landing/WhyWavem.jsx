import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbArrowRight } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WhyWavem.module.css';

export default function WhyWavem() {
    return (
        <Box component="section" id="por-que-wavem" className={styles.section}>
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <div className={styles.splitGrid}>
                    {/* Coluna 1: Narrativa e CTA (1fr) */}
                    <motion.div
                        className={styles.textColumn}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        {/* Overtitle sutil: apenas texto cinza claro com tracking largo, sem pill */}
                        <span className={styles.overtitle}>DIAGNÓSTICO & PERFORMANCE</span>

                        {/* Headline de Impacto */}
                        <h2 className={styles.headline}>
                            Seu site está perdendo vendas para concorrentes com soluções piores?
                        </h2>

                        {/* Descrição */}
                        <p className={styles.description}>
                            Páginas lentas e designs amadores drenam a margem de lucro da sua empresa silenciosamente. Na Wavem, projetamos ecossistemas sob medida com CMS proprietário e velocidade instantânea — sem plugins inchados ou dependência de agências.
                        </p>

                        {/* CTA */}
                        <div className={styles.ctaWrapper}>
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
                        </div>
                    </motion.div>

                    {/* Coluna 2: Gráfico Vetorial de Retenção vs Tempo (1.2fr) - Direto no Canvas */}
                    <motion.div
                        className={styles.chartColumn}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
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
// Renderizado diretamente no canvas, sem caixas de janela ou bordas pesadas
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
                {/* Gradiente da Curva: Ciano -> Azul -> Coral -> Vermelho de Alerta */}
                <linearGradient id="retentionCurveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="30%" stopColor="#00F0FF" />
                    <stop offset="50%" stopColor="#38BDF8" />
                    <stop offset="75%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#FF3366" />
                </linearGradient>

                {/* Área sob a curva */}
                <linearGradient id="retentionAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.12" />
                    <stop offset="60%" stopColor="#FF3366" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#FF3366" stopOpacity="0.0" />
                </linearGradient>

                {/* Glow sutil pontual */}
                <filter id="cyanPointGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00F0FF" floodOpacity="0.7" />
                </filter>
                <filter id="redPointGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FF3366" floodOpacity="0.7" />
                </filter>
            </defs>

            {/* Linhas de Grade Técnica Sutis */}
            <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1">
                {/* Linha de Pico (98% retenção) */}
                <line x1="45" y1="58" x2="475" y2="58" strokeDasharray="3 3" />
                {/* Linha Intermediária */}
                <line x1="45" y1="116" x2="475" y2="116" strokeDasharray="3 3" />
                {/* Linha do Eixo X */}
                <line x1="45" y1="175" x2="475" y2="175" stroke="rgba(255, 255, 255, 0.12)" />
                {/* Guias verticais pontilhadas nos marcadores de tempo */}
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

            {/* Rótulo de Eixo Técnico */}
            <text x="45" y="212" fill="rgba(228, 228, 231, 0.35)" fontSize="8.5" fontFamily="'Inter', sans-serif">
                Tempo de carregamento (segundos)
            </text>
            <text x="475" y="212" fill="rgba(228, 228, 231, 0.35)" fontSize="8.5" fontFamily="'Inter', sans-serif" textAnchor="end">
                Taxa de retenção
            </text>

            {/* Área Sombreada sob a Curva */}
            <motion.path
                d="M 45 58 L 153 58 C 185 58, 220 64, 260 84 C 300 104, 335 126, 385 154 C 415 163, 435 167, 455 168 L 455 175 L 45 175 Z"
                fill="url(#retentionAreaGrad)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Curva Vetorial: Mantém pico (98%) até 1.5s e entra em queda acentuada a partir dos 3s */}
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
                {/* Linha guia técnica vertical */}
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

                {/* Marcador pontual sutil com traço ciano */}
                <circle cx="153" cy="58" r="4.5" fill="#00F0FF" filter="url(#cyanPointGlow)" />
                <circle cx="153" cy="58" r="8" stroke="#00F0FF" strokeWidth="1" opacity="0.45" />

                {/* Texto display: 1.2s • Carregamento Instantâneo Wavem (sem pill/badge) */}
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

            {/* PONTO CRÍTICO: > 3s • 53% de abandono de visitantes (Google Research) */}
            <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
            >
                {/* Linha guia técnica vertical */}
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

                {/* Marcador pontual sutil */}
                <circle cx="385" cy="154" r="4.5" fill="#FF3366" filter="url(#redPointGlow)" />
                <circle cx="385" cy="154" r="8" stroke="#FF3366" strokeWidth="1" opacity="0.4" />

                {/* Texto display limpo e contido (sem pill/badge) */}
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
