import { useState, useRef } from 'react';
import { Box, Container } from '@mui/material';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

import styles from './WhyWavemMetricsSection.module.css';

const storySteps = [
    {
        id: 0,
        tag: 'STANFORD WEB CREDIBILITY RESEARCH',
        stat: '> 75%',
        directLabel: 'dos consumidores julgam a autoridade de uma marca pelo design',
        title: 'Credibilidade Imediata pelo Design',
        description:
            'Mais de 75% dos consumidores admitem julgar a autoridade, a solidez e a confiabilidade de uma empresa com base exclusivamente no design, acabamento e fluidez do seu site oficial.',
        insight:
            'A primeira impressão digital é formada em menos de 0.05 segundos. Um layout genérico de template comunica amadorismo antes mesmo de você apresentar sua proposta comercial.',
    },
    {
        id: 1,
        tag: 'GOOGLE RESEARCH & ADS PERFORMANCE',
        stat: '-300%',
        directLabel: 'queda drástica no retorno de investimento em tráfego pago',
        title: 'O Abismo da Lentidão: Rasgando Dinheiro em Tráfego',
        description:
            'Enviar tráfego pago para páginas lentas ou redes sociais despenca a conversão em até 300%. Mais de 53% dos acessos mobile são abandonados sumariamente se a página demorar mais de 3 segundos.',
        insight:
            'Cada segundo a mais derruba até 20% das suas conversões reais. Concorrentes rápidos estão capturando os leads que você pagou para atrair.',
    },
    {
        id: 2,
        tag: 'AUTONOMIA TÉCNICA & CUSTO OPERACIONAL',
        stat: 'R$ 0',
        directLabel: 'de mensalidades técnicas para trocas de texto, banners e conteúdo',
        title: 'O Fim da Dependência de Agências e Plugins Lentos',
        description:
            'Esqueça a armadilha do WordPress e agências que cobram de R$ 800 a R$ 2.500/ano apenas para alterar pequenos textos, fotos e banners, mantendo sua empresa refém de plugins vulneráveis.',
        insight:
            'Com o CMS sob medida da Wavem, você tem controle instantâneo com 1 clique, zero mensalidades técnicas ocultas e código blindado contra invasões.',
    },
];

export default function WhyWavemMetricsSection() {
    const [activeStep, setActiveStep] = useState(0);
    const containerRef = useRef(null);
    const currentStory = storySteps[activeStep] || storySteps[0];

    // Sincronização de Scroll com useScroll: Trilho de rolagem de 300vh
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (latest <= 0.33) {
            setActiveStep(0);
        } else if (latest <= 0.66) {
            setActiveStep(1);
        } else {
            setActiveStep(2);
        }
    });

    const handleJumpToStep = (index) => {
        setActiveStep(index);
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY + rect.top;
            const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
            const targetRatio = index === 0 ? 0.08 : index === 1 ? 0.5 : 0.92;
            window.scrollTo({
                top: scrollTop + totalDistance * targetRatio,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section
            ref={containerRef}
            id="metricas-pesquisas"
            className={styles.section}
            aria-label="Pesquisas de mercado e performance técnica"
        >
            {/* Elemento Sticky de 100vh que trava na tela durante a rolagem dos 300vh */}
            <div className={styles.stickyFrame}>
                <Container maxWidth="lg" className={styles.frameContainer}>
                    {/* Barra Técnica de Controle e Progresso */}
                    <div className={styles.stageControlBar}>
                        <div className={styles.stepCounter}>
                            <span className={styles.stepIndex}>
                                0{activeStep + 1}
                            </span>
                            <span className={styles.stepTotal}> // 03</span>
                        </div>

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
                                    aria-label={`Ir para etapa 0${story.id + 1}: ${story.title}`}
                                />
                            ))}
                        </div>

                        <div className={styles.scrollHint}>
                            <span>Role para navegar pelos dados</span>
                            <span className={styles.scrollArrow}>↓</span>
                        </div>
                    </div>

                    {/* Palco Aberto em Grid de 2 Colunas com Animações Sincronizadas */}
                    <div className={styles.stageGrid}>
                        {/* Coluna 1: Narrativa Editorial com Transição Cinematográfica */}
                        <div className={styles.narrativeColumn}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`narrative-${currentStory.id}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    className={styles.storyContent}
                                >
                                    <span className={styles.blockOvertitle}>
                                        {currentStory.tag}
                                    </span>

                                    <div className={styles.displayRow}>
                                        <span className={styles.displayNumber}>
                                            {currentStory.stat}
                                        </span>
                                        <span className={styles.directLabel}>
                                            {currentStory.directLabel}
                                        </span>
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

                        {/* Coluna 2: Visual Técnico com Animação Sincronizada */}
                        <div className={styles.visualColumn}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`visual-${currentStory.id}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    className={styles.visualWrapper}
                                >
                                    {currentStory.id === 0 && <StanfordVisual />}
                                    {currentStory.id === 1 && <SpeedDropVisual />}
                                    {currentStory.id === 2 && <AutonomyVisual />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// Visual 1: Stanford Research Minimal Ring (Identidade Rose/Crimson)
// -------------------------------------------------------------
function StanfordVisual() {
    const radius = 68;
    const circumference = 2 * Math.PI * radius; // ~427.25
    const targetOffset = circumference * (1 - 0.75); // ~106.81

    return (
        <svg
            viewBox="0 0 360 260"
            className={styles.minimalSvg}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Indicador visual da pesquisa Stanford de credibilidade por design"
        >
            <defs>
                <linearGradient id="roseRingGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>
                <filter id="roseGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#E11D48" floodOpacity="0.5" />
                </filter>
            </defs>

            {/* Linha Técnica de Base */}
            <line x1="30" y1="230" x2="330" y2="230" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" />
            <text x="30" y="246" fill="rgba(228, 228, 231, 0.35)" fontSize="9" fontFamily="'Fira Code', monospace">0%</text>
            <text x="330" y="246" fill="rgba(228, 228, 231, 0.35)" fontSize="9" fontFamily="'Fira Code', monospace" textAnchor="end">100%</text>

            <g transform="translate(180, 125)">
                {/* Anel de Fundo */}
                <circle
                    cx="0"
                    cy="0"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeWidth="5"
                />

                {/* Arco Ativo Animado */}
                <motion.circle
                    cx="0"
                    cy="0"
                    r={radius}
                    stroke="url(#roseRingGrad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: targetOffset }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    transform="rotate(-90)"
                    filter="url(#roseGlow)"
                />

                {/* Número Display */}
                <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="34"
                    fontWeight="800"
                    letterSpacing="-0.03em"
                    fontFamily="'Inter', sans-serif"
                >
                    75%
                </text>

                {/* Subtítulo */}
                <text
                    x="0"
                    y="28"
                    textAnchor="middle"
                    fill="rgba(228, 228, 231, 0.6)"
                    fontSize="10"
                    fontWeight="500"
                    fontFamily="'Inter', sans-serif"
                >
                    Autoridade pelo Design
                </text>
            </g>
        </svg>
    );
}

// -------------------------------------------------------------
// Visual 2: Queda de Conversão de Tráfego (Identidade Rose/Crimson)
// -------------------------------------------------------------
function SpeedDropVisual() {
    return (
        <svg
            viewBox="0 0 360 260"
            className={styles.minimalSvg}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Gráfico vetorial de perda de conversão com tempo de resposta"
        >
            <defs>
                <linearGradient id="roseDropGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="60%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
                <filter id="rosePointGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#E11D48" floodOpacity="0.7" />
                </filter>
            </defs>

            {/* Marcadores de Eixo X */}
            <g fill="rgba(228, 228, 231, 0.45)" fontSize="9.5" fontFamily="'Fira Code', monospace" fontWeight="500" textAnchor="middle">
                <text x="50" y="230" fill="#FB7185">1s</text>
                <text x="130" y="230">2s</text>
                <text x="210" y="230" fill="#E11D48">3s</text>
                <text x="300" y="230">4s+</text>
            </g>

            <line x1="40" y1="210" x2="320" y2="210" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <line x1="40" y1="80" x2="320" y2="80" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />

            {/* Curva de Queda */}
            <motion.path
                d="M 50 82 C 110 82, 140 100, 180 148 C 210 180, 245 206, 300 208"
                stroke="url(#roseDropGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Ponto Rápido Wavem */}
            <circle cx="50" cy="82" r="4.5" fill="#FB7185" />
            <text x="50" y="62" fill="#FB7185" fontSize="9.5" fontFamily="'Inter', sans-serif" fontWeight="700" textAnchor="middle">
                Pico de Conversão
            </text>

            {/* Ponto Queda Crítica */}
            <circle cx="300" cy="208" r="4.5" fill="#E11D48" filter="url(#rosePointGlow)" />
            <text x="310" y="176" fill="#FB7185" fontSize="9.5" fontFamily="'Inter', sans-serif" fontWeight="700" textAnchor="end">
                -300% em Conversão
            </text>
            <text x="310" y="190" fill="rgba(251, 113, 133, 0.75)" fontSize="8.5" fontFamily="'Inter', sans-serif" textAnchor="end">
                53% de abandono imediato
            </text>
        </svg>
    );
}

// -------------------------------------------------------------
// Visual 3: Comparativo Técnico de Custo Operacional CMS
// -------------------------------------------------------------
function AutonomyVisual() {
    return (
        <div className={styles.comparisonTable}>
            {/* Linha 1: Mercado Tradicional */}
            <div className={styles.comparisonRow}>
                <div className={styles.compHeader}>
                    <span className={styles.compLabelTrad}>Mercado Tradicional</span>
                    <span className={styles.compSubTrad}>WordPress &amp; Agências</span>
                </div>
                <div className={styles.compValueTrad}>
                    R$ 800 a R$ 2.500<span className={styles.perYear}>/ano</span>
                </div>
                <div className={styles.compDetailTrad}>
                    Mensalidades recorrentes, horas técnicas e licenças de plugins
                </div>
            </div>

            <div className={styles.compDivider} />

            {/* Linha 2: CMS Sob Medida Wavem */}
            <div className={styles.comparisonRow}>
                <div className={styles.compHeader}>
                    <span className={styles.compLabelWavem}>CMS Sob Medida Wavem</span>
                    <span className={styles.compSubWavem}>Independência Permanente</span>
                </div>
                <div className={styles.compValueWavem}>
                    R$ 0<span className={styles.zeroUnit}> taxas recorrentes</span>
                </div>
                <div className={styles.compDetailWavem}>
                    Controle total em 1 clique sem amarras ou mensalidades com agências
                </div>
            </div>
        </div>
    );
}
