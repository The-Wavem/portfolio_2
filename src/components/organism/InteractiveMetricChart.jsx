import { motion, AnimatePresence } from 'framer-motion';
import styles from './InteractiveMetricChart.module.css';

export default function InteractiveMetricChart({
    activeStep = 0,
    className = '',
}) {
    const currentStep = Math.min(Math.max(activeStep, 0), 2);

    return (
        <div className={`${styles.visualStage} ${className}`}>
            <div className={styles.stageInner}>
                <AnimatePresence mode="wait">
                    {currentStep === 0 && <StanfordMinimalRingChart key="step-0" />}
                    {currentStep === 1 && <SpeedDropLineChart key="step-1" />}
                    {currentStep === 2 && <CmsAutonomyBarChart key="step-2" />}
                </AnimatePresence>
            </div>
        </div>
    );
}

// -------------------------------------------------------------
// Passo 0: Credibilidade (> 75%) - Stanford Minimal Ring
// -------------------------------------------------------------
function StanfordMinimalRingChart() {
    const radius = 78;
    const circumference = 2 * Math.PI * radius; // ~490.09
    const targetOffset = circumference * (1 - 0.75); // 122.52

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={styles.chartWrapper}
        >
            <svg
                viewBox="0 0 440 330"
                className={styles.svgResponsive}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="ringCyanGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="60%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#00F0FF" floodOpacity="0.35" />
                    </filter>
                </defs>

                {/* Micro-tag Top */}
                <text
                    x="220"
                    y="42"
                    fill="rgba(228, 228, 231, 0.42)"
                    fontSize="9.5"
                    fontWeight="600"
                    letterSpacing="0.14em"
                    textAnchor="middle"
                >
                    STANFORD WEB CREDIBILITY RESEARCH
                </text>

                {/* Minimalist Gauge */}
                <g transform="translate(220, 160)">
                    {/* Background Ring */}
                    <circle
                        cx="0"
                        cy="0"
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.06)"
                        strokeWidth="7"
                    />

                    {/* Animated Progress Ring */}
                    <motion.circle
                        cx="0"
                        cy="0"
                        r={radius}
                        stroke="url(#ringCyanGrad)"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: targetOffset }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        transform="rotate(-90)"
                        filter="url(#cyanGlow)"
                    />

                    {/* Center Numbers */}
                    <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="38"
                        fontWeight="800"
                        letterSpacing="-0.03em"
                        fontFamily="Inter, sans-serif"
                    >
                        &gt; 75%
                    </text>
                    <text
                        x="0"
                        y="26"
                        textAnchor="middle"
                        fill="#38BDF8"
                        fontSize="11"
                        fontWeight="600"
                        letterSpacing="0.04em"
                        fontFamily="Inter, sans-serif"
                    >
                        julga credibilidade pelo design
                    </text>
                </g>

                {/* Subtle Footnote */}
                <text
                    x="220"
                    y="282"
                    fill="rgba(228, 228, 231, 0.4)"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                >
                    Primeira impressão formada em 0.05 segundos
                </text>
            </svg>
        </motion.div>
    );
}

// -------------------------------------------------------------
// Passo 1: Ralo da Lentidão (-300%) - Single Line Vector Drop
// -------------------------------------------------------------
function SpeedDropLineChart() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={styles.chartWrapper}
        >
            <svg
                viewBox="0 0 440 330"
                className={styles.svgResponsive}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="speedLineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="40%" stopColor="#38BDF8" />
                        <stop offset="70%" stopColor="#FB7185" />
                        <stop offset="100%" stopColor="#FF3366" />
                    </linearGradient>

                    <linearGradient id="speedAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF3366" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#FF3366" stopOpacity="0.0" />
                    </linearGradient>
                </defs>

                {/* Micro-tag Top */}
                <text
                    x="220"
                    y="42"
                    fill="rgba(228, 228, 231, 0.42)"
                    fontSize="9.5"
                    fontWeight="600"
                    letterSpacing="0.14em"
                    textAnchor="middle"
                >
                    GOOGLE &amp; META ADS PERFORMANCE
                </text>

                {/* Grid Lines */}
                <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1">
                    <line x1="60" y1="95" x2="380" y2="95" strokeDasharray="3 3" />
                    <line x1="60" y1="155" x2="380" y2="155" strokeDasharray="3 3" />
                    <line x1="60" y1="215" x2="380" y2="215" stroke="rgba(255, 255, 255, 0.12)" />
                </g>

                {/* Time Axis Labels */}
                <g fontSize="10" fontWeight="600" textAnchor="middle">
                    <text x="85" y="238" fill="#34D399">&lt; 1s (Wavem)</text>
                    <text x="170" y="238" fill="rgba(228, 228, 231, 0.5)">2s</text>
                    <text x="260" y="238" fill="#FF3366" fontWeight="800">3s (Crítico)</text>
                    <text x="350" y="238" fill="rgba(228, 228, 231, 0.4)">4s+</text>
                </g>

                {/* Area Fill */}
                <motion.path
                    d="M 85 95 C 135 95, 175 110, 220 150 C 255 182, 295 210, 350 215 L 350 215 L 85 215 Z"
                    fill="url(#speedAreaGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                />

                {/* Vector Curve */}
                <motion.path
                    d="M 85 95 C 135 95, 175 110, 220 150 C 255 182, 295 210, 350 215"
                    stroke="url(#speedLineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Wavem Fast Anchor Point */}
                <circle cx="85" cy="95" r="4.5" fill="#34D399" />
                <circle cx="85" cy="95" r="8" stroke="#34D399" strokeWidth="1.2" opacity="0.5" />

                {/* Critical Drop Alert Badge */}
                <motion.g
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <rect
                        x="195"
                        y="84"
                        width="180"
                        height="28"
                        rx="6"
                        fill="rgba(255, 51, 102, 0.12)"
                        stroke="rgba(255, 51, 102, 0.35)"
                        strokeWidth="1"
                    />
                    <text
                        x="285"
                        y="102"
                        fill="#FF3366"
                        fontSize="9"
                        fontWeight="800"
                        textAnchor="middle"
                        letterSpacing="0.04em"
                    >
                        -300% EM CONVERSÃO DE ANÚNCIOS
                    </text>

                    {/* Indicator line down to 3s point */}
                    <line x1="260" y1="112" x2="260" y2="182" stroke="#FF3366" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                    <circle cx="260" cy="182" r="4.5" fill="#FF3366" />
                </motion.g>

                {/* Minimal Legend */}
                <text
                    x="220"
                    y="282"
                    fill="rgba(228, 228, 231, 0.45)"
                    fontSize="9.5"
                    fontWeight="500"
                    textAnchor="middle"
                >
                    53% dos usuários abandonam após 3 segundos (Google Research)
                </text>
            </svg>
        </motion.div>
    );
}

// -------------------------------------------------------------
// Passo 2: Autonomia & Custo (R$ 0 taxas) - Clean Bar Comparison
// -------------------------------------------------------------
function CmsAutonomyBarChart() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={styles.chartWrapper}
        >
            <svg
                viewBox="0 0 440 330"
                className={styles.svgResponsive}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="tradBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" />
                        <stop offset="100%" stopColor="#7F1D1D" />
                    </linearGradient>

                    <linearGradient id="wavemBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="60%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                </defs>

                {/* Micro-tag Top */}
                <text
                    x="220"
                    y="42"
                    fill="rgba(228, 228, 231, 0.42)"
                    fontSize="9.5"
                    fontWeight="600"
                    letterSpacing="0.14em"
                    textAnchor="middle"
                >
                    CUSTO OPERACIONAL VS AUTONOMIA
                </text>

                {/* Baseline */}
                <line x1="50" y1="210" x2="390" y2="210" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />

                {/* Column 1: Mercado Tradicional */}
                <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    {/* Value Top */}
                    <text
                        x="140"
                        y="84"
                        fill="#FF5F56"
                        fontSize="16"
                        fontWeight="800"
                        textAnchor="middle"
                    >
                        R$ 2.500/ano
                    </text>
                    <text
                        x="140"
                        y="97"
                        fill="rgba(255, 255, 255, 0.45)"
                        fontSize="8.5"
                        fontWeight="600"
                        textAnchor="middle"
                    >
                        Horas técnicas &amp; plugins
                    </text>

                    {/* Bar */}
                    <rect
                        x="105"
                        y="106"
                        width="70"
                        height="104"
                        rx="6"
                        fill="url(#tradBarGrad)"
                        opacity="0.9"
                    />

                    {/* Label below baseline */}
                    <text
                        x="140"
                        y="234"
                        fill="rgba(228, 228, 231, 0.7)"
                        fontSize="10"
                        fontWeight="600"
                        textAnchor="middle"
                    >
                        Mercado Tradicional
                    </text>
                    <text
                        x="140"
                        y="247"
                        fill="rgba(228, 228, 231, 0.4)"
                        fontSize="8.5"
                        textAnchor="middle"
                    >
                        WordPress &amp; Agências
                    </text>
                </motion.g>

                {/* Column 2: CMS Wavem */}
                <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                >
                    {/* Value Top */}
                    <text
                        x="300"
                        y="156"
                        fill="#34D399"
                        fontSize="18"
                        fontWeight="800"
                        textAnchor="middle"
                    >
                        R$ 0 / ano
                    </text>
                    <text
                        x="300"
                        y="170"
                        fill="#38BDF8"
                        fontSize="8.5"
                        fontWeight="700"
                        letterSpacing="0.06em"
                        textAnchor="middle"
                    >
                        INDEPENDÊNCIA TOTAL
                    </text>

                    {/* Clean Ground Bar */}
                    <rect
                        x="265"
                        y="182"
                        width="70"
                        height="28"
                        rx="6"
                        fill="url(#wavemBarGrad)"
                    />
                    <text
                        x="300"
                        y="200"
                        fill="#FFFFFF"
                        fontSize="8"
                        fontWeight="800"
                        letterSpacing="0.05em"
                        textAnchor="middle"
                    >
                        100% LIVRE
                    </text>

                    {/* Label below baseline */}
                    <text
                        x="300"
                        y="234"
                        fill="#34D399"
                        fontSize="10"
                        fontWeight="700"
                        textAnchor="middle"
                    >
                        Ecossistema Wavem
                    </text>
                    <text
                        x="300"
                        y="247"
                        fill="rgba(52, 211, 153, 0.7)"
                        fontSize="8.5"
                        textAnchor="middle"
                    >
                        CMS Sob Medida
                    </text>
                </motion.g>

                {/* Footnote */}
                <text
                    x="220"
                    y="282"
                    fill="#34D399"
                    fontSize="9.5"
                    fontWeight="600"
                    textAnchor="middle"
                >
                    Economia de R$ 800 a R$ 2.500/ano em mensalidades ocultas
                </text>
            </svg>
        </motion.div>
    );
}
