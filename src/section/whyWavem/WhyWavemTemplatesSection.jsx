import { useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform
} from 'framer-motion';
import { TbArrowRight } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import { trackAction } from '@/service/analytics/tracking.service';
import {
    getCurrentPathname,
    getRouteBrandTheme
} from '@/theme/routeBrandTheme';
import styles from './WhyWavemTemplatesSection.module.css';

const defaultHotspots = [
    {
        id: 'checkout',
        x: '22%',
        y: '46%',
        label: 'Checkout Transparente'
    },
    {
        id: 'painel',
        x: '62%',
        y: '28%',
        label: 'Painel em Tempo Real'
    },
    {
        id: 'catalogo',
        x: '58%',
        y: '72%',
        label: 'Catálogo Dinâmico'
    }
];

function splitHeadline(templates) {
    if (templates?.titlePrefix && templates?.titleHighlight) {
        return {
            prefix: templates.titlePrefix,
            highlight: templates.titleHighlight
        };
    }

    const rawTitle =
        templates?.title ||
        'Sistemas prontos para escalar. Moldados para a sua operação.';

    const dotIndex = rawTitle.indexOf('.');
    if (dotIndex !== -1 && dotIndex < rawTitle.length - 1) {
        return {
            prefix: rawTitle.slice(0, dotIndex + 1).trim(),
            highlight: rawTitle.slice(dotIndex + 1).trim()
        };
    }

    return {
        prefix: 'Sistemas prontos para escalar.',
        highlight: rawTitle
    };
}

export default function WhyWavemTemplatesSection({ content }) {
    const templates = content?.templatesSection || content?.wemTemplates;
    const stageRef = useRef(null);
    const [activeHotspot, setActiveHotspot] = useState(null);

    const currentPath = getCurrentPathname();
    const routeTheme = getRouteBrandTheme(
        currentPath.startsWith('/porque-wavem') ? currentPath : '/porque-wavem'
    );

    // MotionValues e Springs para 3D Tilt e Backlight reativo sem re-render React
    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const stageScaleRaw = useMotionValue(1);

    const springConfig = { stiffness: 150, damping: 22, mass: 0.6 };
    const smoothX = useSpring(pointerX, springConfig);
    const smoothY = useSpring(pointerY, springConfig);
    const smoothScale = useSpring(stageScaleRaw, { stiffness: 180, damping: 24 });

    const rotateY = useTransform(smoothX, [0, 1], [-8.5, 8.5]);
    const rotateX = useTransform(smoothY, [0, 1], [7.5, -7.5]);
    const glowPercentX = useTransform(smoothX, [0, 1], ['12%', '88%']);
    const glowPercentY = useTransform(smoothY, [0, 1], ['12%', '88%']);

    const dynamicBacklight = useMotionTemplate`radial-gradient(430px circle at ${glowPercentX} ${glowPercentY}, rgba(225, 29, 72, 0.3) 0%, rgba(251, 113, 133, 0.12) 38%, rgba(5, 5, 5, 0) 72%)`;

    const overtitle =
        templates?.overtitle ||
        templates?.tag ||
        'MODELOS DE NEGÓCIO WEM';
    const { prefix, highlight } = splitHeadline(templates);
    const ctaText =
        templates?.ctaText ||
        templates?.buttonText ||
        'Explorar Modelos WEM';
    const ctaLink =
        templates?.ctaLink ||
        templates?.link ||
        '/templates-wem';
    const imageUrl =
        templates?.imageUrl ||
        '/templates-wem-showcase.svg';
    const imageAlt =
        templates?.imageAlt ||
        'Ecossistema de modelos e sistemas de negócio WEM em operação';
    const hotspots =
        Array.isArray(templates?.hotspots) && templates.hotspots.length > 0
            ? templates.hotspots
            : defaultHotspots;

    const handleMouseMove = (event) => {
        const element = stageRef.current;
        if (!element) {
            return;
        }

        const rect = element.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width;
        const relY = (event.clientY - rect.top) / rect.height;

        pointerX.set(Math.max(0, Math.min(1, relX)));
        pointerY.set(Math.max(0, Math.min(1, relY)));
        stageScaleRaw.set(1.016);
    };

    const handleMouseLeave = () => {
        pointerX.set(0.5);
        pointerY.set(0.5);
        stageScaleRaw.set(1);
        setActiveHotspot(null);
    };

    return (
        <Box
            component="section"
            id="modelos-wem"
            className={styles.section}
            style={{
                '--brand-start': routeTheme.start,
                '--brand-end': routeTheme.end
            }}
        >
            {/* Orbes Líquidos em Drift Contínuo sob o Vidro Negro */}
            <div className={styles.liquidOrbsContainer} aria-hidden>
                <motion.div
                    className={styles.liquidOrbWine}
                    animate={{
                        x: [-35, 48, -22, -35],
                        y: [-24, 34, -18, -24],
                        scale: [1, 1.14, 0.94, 1]
                    }}
                    transition={{
                        duration: 18,
                        ease: 'easeInOut',
                        repeat: Infinity
                    }}
                />
                <motion.div
                    className={styles.liquidOrbCoral}
                    animate={{
                        x: [32, -44, 26, 32],
                        y: [28, -32, 20, 28],
                        scale: [1.06, 0.92, 1.12, 1.06]
                    }}
                    transition={{
                        duration: 24,
                        ease: 'easeInOut',
                        repeat: Infinity
                    }}
                />
            </div>

            <Container maxWidth="lg">
                <div className={styles.asymmetricGrid}>
                    {/* Lado Esquerdo: Showcase Visual Interativo Integrado ao Fundo Escuro */}
                    <motion.div
                        className={styles.showcaseColumn}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                    >
                        {/* Respiração Suave Contínua no eixo Y */}
                        <motion.div
                            className={styles.breathingWrapper}
                            animate={{ y: [-6, 6, -6] }}
                            transition={{
                                duration: 6.5,
                                ease: 'easeInOut',
                                repeat: Infinity
                            }}
                        >
                            {/* Palco 3D com Spring MotionValues */}
                            <motion.div
                                ref={stageRef}
                                className={styles.showcaseStage}
                                style={{
                                    rotateX,
                                    rotateY,
                                    scale: smoothScale,
                                    transformPerspective: 1200
                                }}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className={styles.ambientAura} aria-hidden />
                                <motion.div
                                    className={styles.cursorBacklight}
                                    style={{ background: dynamicBacklight }}
                                    aria-hidden
                                />

                                <div className={styles.maskedVisualFrame}>
                                    <img
                                        src={imageUrl}
                                        alt={imageAlt}
                                        className={styles.showcaseImage}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                    <div className={styles.edgeFadeOverlay} aria-hidden />
                                </div>

                                {/* Indicadores Interativos Minimalistas (Hotspots sem texto fixo) */}
                                <div className={styles.hotspotsLayer}>
                                    {hotspots.map((spot) => {
                                        const isSpotActive = activeHotspot === spot.id;
                                        return (
                                            <button
                                                key={spot.id}
                                                type="button"
                                                className={`${styles.hotspotNode} ${
                                                    isSpotActive ? styles.hotspotNodeActive : ''
                                                }`}
                                                style={{ left: spot.x, top: spot.y }}
                                                aria-label={spot.label}
                                                onMouseEnter={() => setActiveHotspot(spot.id)}
                                                onFocus={() => setActiveHotspot(spot.id)}
                                                onBlur={() => setActiveHotspot(null)}
                                                onClick={() => {
                                                    setActiveHotspot(
                                                        isSpotActive ? null : spot.id
                                                    );
                                                    trackAction({
                                                        page: 'why_wavem',
                                                        section: 'templates_wem',
                                                        action: 'interact_template_hotspot',
                                                        label: spot.label
                                                    });
                                                }}
                                            >
                                                <span className={styles.hotspotPulse} aria-hidden />
                                                <span className={styles.hotspotCore} aria-hidden />
                                                <span className={styles.hotspotTag}>
                                                    {spot.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Lado Direito: Copy Minimalista & Ação */}
                    <motion.div
                        className={styles.copyColumn}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
                    >
                        <span className={styles.overtitle}>{overtitle}</span>

                        <h2 className={styles.title}>
                            {prefix}{' '}
                            <span className={styles.titleGradient}>
                                {highlight}
                            </span>
                        </h2>

                        <div className={styles.ctaWrapper}>
                            <GlowButton
                                to={ctaLink}
                                variant="outlined"
                                size="large"
                                className={styles.ctaButton}
                                endIcon={
                                    <span className={styles.arrowIcon} aria-hidden>
                                        <TbArrowRight size={18} strokeWidth={1.7} />
                                    </span>
                                }
                                sx={{
                                    background: 'rgba(225, 29, 72, 0.1)',
                                    color: '#FFFFFF',
                                    border: '1px solid rgba(251, 113, 133, 0.42)',
                                    boxShadow:
                                        '0 0 22px rgba(225, 29, 72, 0.25), inset 0 0 14px rgba(251, 113, 133, 0.08)',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': {
                                        background:
                                            'linear-gradient(135deg, rgba(225, 29, 72, 0.92) 0%, rgba(190, 18, 60, 0.95) 55%, rgba(251, 113, 133, 0.92) 100%)',
                                        borderColor: '#FB7185',
                                        boxShadow:
                                            '0 0 32px rgba(225, 29, 72, 0.55), 0 0 54px rgba(251, 113, 133, 0.22)',
                                        transform: 'translateY(-1px)'
                                    }
                                }}
                                onClick={() =>
                                    trackAction({
                                        page: 'why_wavem',
                                        section: 'templates_wem',
                                        action: 'click_explore_templates_wem',
                                        label: ctaText
                                    })
                                }
                            >
                                {ctaText}
                            </GlowButton>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Box>
    );
}
