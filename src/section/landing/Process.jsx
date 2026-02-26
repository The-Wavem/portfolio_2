import { useRef } from 'react';
import { Box, Container, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TbCoffee, TbPencil, TbFileText, TbCode, TbRocket } from 'react-icons/tb';
import { getProcessSteps } from '@/service/content';

const processIconMap = {
    coffee: TbCoffee,
    pencil: TbPencil,
    file: TbFileText,
    code: TbCode,
    rocket: TbRocket
};

const ProcessStep = ({ step, index, isMobile }) => {
    const Icon = processIconMap[step.iconKey] ?? TbCode;
    const isEven = index % 2 === 0;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : (isEven ? 'row' : 'row-reverse'), // ZigZag
                alignItems: 'center',
                justifyContent: isMobile ? 'flex-start' : 'space-between',
                position: 'relative',
                mb: isMobile ? 8 : 13,
                width: '100%'
            }}
        >
            {/* Marcador Central (Bola com Número) */}
            <Box
                sx={{
                    position: 'absolute',
                    left: isMobile ? '20px' : '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
            >
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                    <Box sx={{
                        width: 50, height: 50, borderRadius: '50%',
                        background: '#050505',
                        border: `2px solid ${step.color}`,
                        boxShadow: `0 0 20px ${step.color}32`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: step.color, fontWeight: 700, fontSize: '1.08rem', letterSpacing: '-0.01em'
                    }}>
                        {step.id}
                    </Box>
                </motion.div>
            </Box>

            {/* Lado Vazio (para dar equilibrio no Desktop) */}
            {!isMobile && <Box sx={{ width: '45%' }} />}

            {/* O Card de Conteúdo */}
            <motion.div
                initial={{ opacity: 0, x: isMobile ? 50 : (isEven ? -50 : 50) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ width: isMobile ? 'calc(100% - 60px)' : '45%', marginLeft: isMobile ? '60px' : 0 }}
            >
                <Box
                    sx={{
                        background: 'rgba(10,10,10,0.62)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '18px',
                        p: { xs: 3, md: 3.6 },
                        position: 'relative',
                        backdropFilter: 'blur(16px)',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                            borderColor: step.color,
                            boxShadow: `0 8px 34px ${step.color}16`,
                            transform: 'translateY(-5px)'
                        }
                    }}
                >
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
                </Box>
            </motion.div>
        </Box>
    );
};

export default function Process() {
    const theme = useTheme();
    const steps = getProcessSteps();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <Box component="section" ref={containerRef} sx={{ py: { xs: 10, md: 15 }, position: 'relative', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                {/* Header da Seção */}
                <Box mb={{ xs: 7, md: 10 }} textAlign="left" position="relative" zIndex={2}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}>
                            COMO TRABALHAMOS
                        </Typography>
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                                mt: 1.4,
                                mb: 2.4,
                                maxWidth: 760,
                                fontSize: { xs: '2rem', sm: '2.35rem', md: '3.1rem' },
                                lineHeight: 1.06,
                                letterSpacing: '-0.03em'
                            }}
                        >
                            Do cafézinho ao <span style={{ color: theme.palette.primary.main }}>código.</span>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                maxWidth: 620,
                                color: 'rgba(228,228,231,0.7)',
                                lineHeight: 1.75,
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                letterSpacing: '0.01em'
                            }}
                        >
                            Nosso processo é transparente e sem surpresas. Você acompanha cada etapa, sabendo exatamente o que está acontecendo.
                        </Typography>
                    </motion.div>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {/* Linha do Tempo Conectora */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: isMobile ? '45px' : '50%', // Ajuste da linha no mobile
                            top: 0, bottom: 0, width: '2px',
                            background: 'rgba(255,255,255,0.05)',
                            transform: 'translateX(-50%)',
                            zIndex: 0
                        }}
                    >
                        <motion.div
                            style={{
                                scaleY,
                                transformOrigin: 'top',
                                background: 'linear-gradient(180deg, #F59E0B 0%, #8B5CF6 50%, #10B981 100%)', // Gradiente acompanhando as cores dos passos
                                width: '100%', height: '100%',
                                boxShadow: '0 0 12px rgba(139, 92, 246, 0.25)'
                            }}
                        />
                    </Box>

                    {/* Render dos Passos */}
                    <Box sx={{ position: 'relative', zIndex: 1, mt: 5 }}>
                        {steps.map((step, index) => (
                            <ProcessStep key={step.id} step={step} index={index} isMobile={isMobile} />
                        ))}
                    </Box>
                </Box>

            </Container>
        </Box>
    );
}

