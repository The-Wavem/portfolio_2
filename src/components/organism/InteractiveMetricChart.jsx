import { motion, AnimatePresence } from 'framer-motion';
import styles from './InteractiveMetricChart.module.css';

export default function InteractiveMetricChart({
    activeStep = 0,
    stepIndex,
    className = '',
}) {
    const currentStep =
        stepIndex !== undefined
            ? stepIndex
            : Math.min(Math.max(activeStep, 0), 2);

    return (
        <div className={`${styles.visualStage} ${className}`}>
            <div className={styles.stageInner}>
                {stepIndex !== undefined ? (
                    // Direct render for mobile inline display
                    <>
                        {currentStep === 0 && <StanfordMinimalRing />}
                        {currentStep === 1 && <SpeedDropLine />}
                        {currentStep === 2 && <CmsAutonomyComparison />}
                    </>
                ) : (
                    // Smooth animated transition for desktop sticky stage
                    <AnimatePresence mode="wait">
                        {currentStep === 0 && <StanfordMinimalRing key="step-0" />}
                        {currentStep === 1 && <SpeedDropLine key="step-1" />}
                        {currentStep === 2 && <CmsAutonomyComparison key="step-2" />}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

// -------------------------------------------------------------
// Estado 0: Stanford - Credibilidade (> 75%)
// -------------------------------------------------------------
function StanfordMinimalRing() {
    const radius = 70;
    const circumference = 2 * Math.PI * radius; // ~439.82
    const targetOffset = circumference * (1 - 0.75); // ~109.95

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={styles.chartWrapper}
        >
            <svg
                viewBox="0 0 380 280"
                className={styles.svgResponsive}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="cyanRingGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00F0FF" floodOpacity="0.4" />
                    </filter>
                </defs>

                {/* Micro-tag Top */}
                <text
                    x="190"
                    y="32"
                    fill="rgba(228, 228, 231, 0.4)"
                    fontSize="9.5"
                    fontWeight="600"
                    letterSpacing="0.12em"
                    textAnchor="middle"
                >
                    STANFORD RESEARCH
                </text>

                {/* Circular Ring Gauge */}
                <g transform="translate(190, 145)">
                    {/* Background Ring */}
                    <circle
                        cx="0"
                        cy="0"
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.06)"
                        strokeWidth="6"
                    />

                    {/* Animated Progress Ring */}
                    <motion.circle
                        cx="0"
                        cy="0"
                        r={radius}
                        stroke="url(#cyanRingGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: targetOffset }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        transform="rotate(-90)"
                        filter="url(#cyanGlow)"
                    />

                    {/* Display Number */}
                    <text
                        x="0"
                        y="2"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="36"
                        fontWeight="800"
                        letterSpacing="-0.03em"
                        fontFamily="Inter, sans-serif"
                    >
                        &gt; 75%
                    </text>

                    {/* Subtitle */}
                    <text
                        x="0"
                        y="26"
                        textAnchor="middle"
                        fill="rgba(228, 228, 231, 0.65)"
                        fontSize="11"
                        fontWeight="500"
                        fontFamily="Inter, sans-serif"
                    >
                        julgam a credibilidade pelo design
                    </text>
                </g>
            </svg>
        </motion.div>
    );
}

// -------------------------------------------------------------
// Estado 1: Google - Queda de Conversão (-300%)
// -------------------------------------------------------------
function SpeedDropLine() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={styles.chartWrapper}
        >
            <svg
                viewBox="0 0 380 280"
                className={styles.svgResponsive}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="curveDropGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="45%" stopColor="#38BDF8" />
                        <stop offset="75%" stopColor="#FB7185" />
                        <stop offset="100%" stopColor="#FF3366" />
                    </linearGradient>
                    <filter id="redNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF3366" floodOpacity="0.6" />
                    </filter>
                </defs>

                {/* Micro-tag Top */}
                <text
                    x="190"
                    y="32"
                    fill="rgba(228, 228, 231, 0.4)"
                    fontSize="9.5"
                    fontWeight="600"
                    letterSpacing="0.12em"
                    textAnchor="middle"
                >
                    GOOGLE RESEARCH
                </text>

                {/* Minimalist Axis Marks: 1s • 2s • 3s • 4s */}
                <g fill="rgba(228, 228, 231, 0.45)" fontSize="10.5" fontWeight="600" textAnchor="middle">
                    <text x="70" y="226" fill="#34D399">1s</text>
                    <text x="110" y="226">•</text>
                    <text x="150" y="226">2s</text>
                    <text x="190" y="226">•</text>
                    <text x="230" y="226" fill="#FF3366">3s</text>
                    <text x="270" y="226">•</text>
                    <text x="310" y="226">4s</text>
                </g>

                {/* Subtle base guideline */}
                <line x1="50" y1="205" x2="330" y2="205" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1" />

                {/* Fine single curve path */}
                <motion.path
                    d="M 70 85 C 120 85, 150 100, 190 140 C 215 168, 250 200, 310 203"
                    stroke="url(#curveDropGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Wavem Start Point */}
                <circle cx="70" cy="85" r="4" fill="#34D399" />

                {/* Neon Drop Point at end */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                >
                    <circle cx="310" cy="203" r="5" fill="#FF3366" filter="url(#redNeonGlow)" />

                    {/* Floating Callout Indicator */}
                    <g transform="translate(170, 72)">
                        <rect
                            x="0"
                            y="0"
                            width="160"
                            height="26"
                            rx="6"
                            fill="rgba(255, 51, 102, 0.12)"
                            stroke="rgba(255, 51, 102, 0.35)"
                            strokeWidth="1"
                        />
                        <text
                            x="80"
                            y="17"
                            fill="#FF3366"
                            fontSize="9"
                            fontWeight="800"
                            textAnchor="middle"
                            letterSpacing="0.04em"
                        >
                            -300% EM CONVERSÃO
                        </text>
                    </g>
                </motion.g>
            </svg>
        </motion.div>
    );
}

// -------------------------------------------------------------
// Estado 2: CMS Wavem - Autonomia & Custo
// -------------------------------------------------------------
function CmsAutonomyComparison() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={styles.comparisonWrapper}
        >
            <div className={styles.microTagTop}>AUTONOMIA TÉCNICA</div>

            <div className={styles.comparisonList}>
                {/* Linha 1: Mercado Tradicional */}
                <div className={styles.comparisonRowTraditional}>
                    <div className={styles.comparisonHeader}>
                        <span className={styles.comparisonLabel}>Mercado Tradicional</span>
                        <span className={styles.comparisonSub}>WordPress &amp; Agências</span>
                    </div>
                    <div className={styles.comparisonValueTrad}>
                        R$ 800 a R$ 2.500/ano
                    </div>
                    <div className={styles.comparisonNoteTrad}>
                        gasto contínuo com plugins e horas técnicas
                    </div>
                </div>

                {/* Divider Line */}
                <div className={styles.comparisonDivider} />

                {/* Linha 2: CMS Wavem */}
                <div className={styles.comparisonRowWavem}>
                    <div className={styles.comparisonHeader}>
                        <span className={styles.comparisonLabelWavem}>CMS Sob Medida Wavem</span>
                        <span className={styles.comparisonBadgeWavem}>Independência Total</span>
                    </div>
                    <div className={styles.comparisonValueWavem}>
                        R$ 0 taxas recorrentes
                    </div>
                    <div className={styles.comparisonNoteWavem}>
                        zero dependência e autonomia instantânea em 1 clique
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
