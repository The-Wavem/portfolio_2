import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Box, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { TbCoffee, TbPencil, TbFileText, TbCode, TbRocket } from 'react-icons/tb';
import styles from './ElasticTimeline.module.css';

const processIconMap = {
    coffee: TbCoffee,
    pencil: TbPencil,
    file: TbFileText,
    code: TbCode,
    rocket: TbRocket
};

// Componente para o conteúdo do Card (Evita repetição no Grid ZigZag)
function CardContent({ step, Icon }) {
    return (
        <>
            <Stack direction="row" alignItems="center" spacing={2} mb={2.2}>
                <Box
                    sx={{
                        p: 1,
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        color: step.color,
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <Icon size={28} />
                </Box>
                <Box>
                    <Typography
                        variant="caption"
                        sx={{
                            color: step.color,
                            letterSpacing: 1.8,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            opacity: 0.95,
                            fontSize: '0.68rem'
                        }}
                    >
                        {step.subtitle}
                    </Typography>
                    <Typography
                        variant="h5"
                        fontWeight={800}
                        color="white"
                        sx={{ lineHeight: 1.12, letterSpacing: '-0.018em' }}
                    >
                        {step.title}
                    </Typography>
                </Box>
            </Stack>
            <Typography
                variant="body1"
                sx={{
                    color: 'rgba(228,228,231,0.74)',
                    lineHeight: 1.75,
                    fontSize: { xs: '0.94rem', md: '0.98rem' },
                    letterSpacing: '0.01em'
                }}
            >
                {step.description}
            </Typography>
        </>
    );
}

export default function ElasticTimeline({ steps = [] }) {
    const containerRef = useRef(null);
    const svgContainerRef = useRef(null);
    const [svgHeight, setSvgHeight] = useState(800);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Scroll tracking do container inteiro (Grid)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Mola para suavizar o preenchimento Neon
    const scaleY = useSpring(scrollYProgress, { 
        stiffness: 100, 
        damping: 30, 
        restDelta: 0.001 
    });

    // Física da Corda de Violão
    const ctrlX = useSpring(50, { stiffness: 300, damping: 10, mass: 0.8 });
    const ctrlY = useSpring(svgHeight / 2, { stiffness: 400, damping: 20 });

    useEffect(() => {
        if (!svgContainerRef.current) return;
        
        // Pega a altura exata que o CSS Grid gerou para a trilha
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setSvgHeight(entry.contentRect.height);
                // Restaura o Y base pro meio da nova altura
                ctrlY.set(entry.contentRect.height / 2);
            }
        });
        
        observer.observe(svgContainerRef.current);
        return () => observer.disconnect();
    }, [ctrlY]);

    const handleMouseMove = (e) => {
        if (!svgContainerRef.current) return;
        const rect = svgContainerRef.current.getBoundingClientRect();
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // A trilha no SVG (viewBox largura 100) está em X=50. 
        // Limitamos a força para a corda não quebrar visualmente
        const tensionX = Math.max(-50, Math.min(150, mouseX));
        
        ctrlX.set(tensionX);
        ctrlY.set(mouseY);
    };

    const handleMouseLeave = () => {
        // Solta a corda, disparando a mola de volta pro centro (50px)
        ctrlX.set(50);
        ctrlY.set(svgHeight / 2);
    };

    // Monta o SVG Path dinamicamente observando os motion values em 60fps sem renderizar React.
    const pathD = useTransform(
        [ctrlX, ctrlY],
        ([x, y]) => `M 50 0 Q ${x} ${y} 50 ${svgHeight}`
    );

    return (
        <div className={styles.timelineWrapper} ref={containerRef}>
            <div className={styles.timelineGrid}>
                
                {/* 1. Coluna Central (SVG e Interação) */}
                <div 
                    className={styles.svgContainer} 
                    ref={svgContainerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={styles.hitbox} />
                    
                    <svg width="100px" height="100%" viewBox={`0 0 100 ${svgHeight}`} className={styles.svgLine}>
                        <defs>
                            <linearGradient id="neonTimelineGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F59E0B" />
                                <stop offset="50%" stopColor="#EC4899" />
                                <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                        </defs>
                        
                        {/* Trilha de Fundo (Base apagada) */}
                        <motion.path
                            d={pathD}
                            vectorEffect="non-scaling-stroke"
                            fill="none"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="2"
                        />
                        
                        {/* Progresso Animado Neon */}
                        <motion.path
                            d={pathD}
                            vectorEffect="non-scaling-stroke"
                            fill="none"
                            stroke="url(#neonTimelineGrad)"
                            strokeWidth="4"
                            style={{ pathLength: scaleY }}
                        />
                        
                        {/* Glow Neon (Sombra vibrante ao redor da linha) */}
                        <motion.path
                            d={pathD}
                            vectorEffect="non-scaling-stroke"
                            fill="none"
                            stroke="#A78BFA"
                            strokeWidth="8"
                            style={{ pathLength: scaleY, filter: 'blur(8px)', opacity: 0.6 }}
                        />
                    </svg>
                </div>

                {/* 2. Conteúdo Grid (Nós e Cards) */}
                {steps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    const Icon = processIconMap[step.iconKey] ?? TbCode;
                    
                    return (
                        <div key={step.id} style={{ display: 'contents' }}>
                            
                            {/* Esquerda: Cards nos Índices Pares (0, 2, 4...) */}
                            {(!isMobile && isEven) ? (
                                <div className={styles.contentLeft}>
                                    <motion.div 
                                        initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className={styles.card}
                                        whileHover={{
                                            borderColor: step.color,
                                            boxShadow: `0 8px 34px ${step.color}16`
                                        }}
                                    >
                                        <CardContent step={step} Icon={Icon} />
                                    </motion.div>
                                </div>
                            ) : (!isMobile && <div className={styles.contentLeft} />)}

                            {/* Centro: Nó numérico */}
                            <div className={styles.nodeWrapper}>
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                    className={styles.node}
                                    style={{ 
                                        borderColor: step.color,
                                        boxShadow: `0 0 20px ${step.color}40`,
                                        color: step.color
                                    }}
                                >
                                    {step.id}
                                </motion.div>
                            </div>

                            {/* Direita: Cards nos Índices Ímpares (1, 3...) E no Mobile */}
                            {(isMobile || !isEven) ? (
                                <div className={styles.contentRight}>
                                    <motion.div 
                                        initial={{ opacity: 0, x: isMobile ? 40 : 40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className={styles.card}
                                        whileHover={{
                                            borderColor: step.color,
                                            boxShadow: `0 8px 34px ${step.color}16`
                                        }}
                                    >
                                        <CardContent step={step} Icon={Icon} />
                                    </motion.div>
                                </div>
                            ) : (!isMobile && <div className={styles.contentRight} />)}
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
