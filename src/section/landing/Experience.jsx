import { useRef } from 'react';
import { Box, Container, Typography, Stack, Chip, useTheme, useMediaQuery } from '@mui/material';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Dados dos "Nós" da Rede Neural
const experiences = [
    {
        id: 1,
        title: "Arquitetura de Experiência (UX/UI)",
        description: "Onde o design encontra a lógica. Criamos interfaces imersivas que não apenas impressionam visualmente, mas guiam o usuário intuitivamente.",
        techs: ["React.js", "Figma", "Motion", "Tailwind"],
        side: "left",
    },
    {
        id: 2,
        title: "Infraestrutura Serverless & Cloud",
        description: "Performance invisível. Arquiteturas escaláveis com Firebase e Node.js para garantir que seu sistema cresça com segurança e custo otimizado.",
        techs: ["Firebase", "Node.js", "GCP", "NoSQL"],
        side: "right",
    },
    {
        id: 3,
        title: "Ecossistemas Multiplataforma",
        description: "Sua marca em qualquer dispositivo. Unificamos a experiência web e mobile criando sistemas fluidos e de fácil manutenção.",
        techs: ["React Native", "PWA", "API REST"],
        side: "left",
    }
];

// Componente do Card de Vidro (Holographic Card)
const NeuralCard = ({ item, isMobile }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                p: 4,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 30px ${theme.palette.primary.main}40`, // Glow roxo no hover
                    transform: 'translateY(-5px)',
                }
            }}
        >
            {/* Decoração de "Código" no fundo */}
            <Typography
                variant="caption"
                sx={{
                    position: 'absolute', top: 10, right: 15,
                    fontFamily: 'monospace', opacity: 0.2, color: theme.palette.primary.light
                }}
            >
                {`{ id: 0${item.id} }`}
            </Typography>

            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#fff' }}>
                {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
                {item.description}
            </Typography>

            <Stack direction="row" gap={1} flexWrap="wrap">
                {item.techs.map((tech) => (
                    <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                            borderColor: 'rgba(124, 58, 237, 0.3)',
                            color: '#A78BFA',
                            background: 'rgba(124, 58, 237, 0.1)',
                            fontFamily: 'monospace'
                        }}
                        variant="outlined"
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default function Experience() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const containerRef = useRef(null);

    // Hook para controlar o desenho da linha central baseado no Scroll
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
        <Box
            component="section"
            ref={containerRef}
            sx={{ py: 15, position: 'relative', overflow: 'hidden' }}
        >
            <Container maxWidth="lg">
                {/* Título da Seção */}
                <Box mb={10} textAlign="center">
                    <Typography variant="overline" color="primary" sx={{ letterSpacing: 3 }}>
                        NOSSA EXPERTISE
                    </Typography>
                    <Typography variant="h3" fontWeight={800} sx={{ mt: 1 }}>
                        Conectando pontos, <br />
                        <span style={{ color: theme.palette.primary.main }}>criando soluções.</span>
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {/* A Linha Central (Espinha Dorsal da Rede) */}
                    {!isMobile && (
                        <Box
                            sx={{
                                position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
                                background: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)'
                            }}
                        >
                            <motion.div
                                style={{
                                    scaleY,
                                    transformOrigin: 'top',
                                    background: 'linear-gradient(180deg, #7C3AED 0%, #A78BFA 100%)', // Gradiente Roxo
                                    width: '100%', height: '100%',
                                    boxShadow: '0 0 20px #7C3AED'
                                }}
                            />
                        </Box>
                    )}

                    {/* Renderização dos Nós */}
                    <Stack spacing={isMobile ? 8 : 15}>
                        {experiences.map((item, index) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: isMobile ? 'flex-start' : (index % 2 === 0 ? 'flex-end' : 'flex-start'), // Zig-Zag
                                    position: 'relative',
                                    flexDirection: isMobile ? 'column' : (index % 2 === 0 ? 'row-reverse' : 'row'),
                                    alignItems: 'center'
                                }}
                            >
                                {/* O Ponto Central (Node) */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: isMobile ? '0px' : '50%',
                                        transform: 'translateX(-50%)',
                                        zIndex: 10
                                    }}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <Box
                                            sx={{
                                                width: 20, height: 20, borderRadius: '50%',
                                                background: theme.palette.primary.main,
                                                boxShadow: `0 0 20px ${theme.palette.primary.main}`,
                                                border: '4px solid #050505'
                                            }}
                                        />
                                    </motion.div>
                                </Box>

                                {/* Linha de Conexão Horizontal (Do centro até o card) */}
                                {!isMobile && (
                                    <Box sx={{ width: '50%', height: '1px', background: 'transparent', position: 'relative' }}>
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            transition={{ duration: 0.8, delay: 0.3 }}
                                            style={{
                                                width: '100%', height: '1px',
                                                background: 'linear-gradient(90deg, rgba(124,58,237,0.5), transparent)',
                                                transformOrigin: index % 2 === 0 ? 'left' : 'right' // Cresce do centro para fora
                                            }}
                                        />
                                    </Box>
                                )}

                                {/* O Card de Conteúdo */}
                                <Box sx={{ width: isMobile ? '100%' : '45%', pl: isMobile ? 4 : 0 }}>
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -50 : 50) }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                    >
                                        <NeuralCard item={item} isMobile={isMobile} />
                                    </motion.div>
                                </Box>

                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}