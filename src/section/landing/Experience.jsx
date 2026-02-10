import { useRef } from 'react';
import { Box, Container, Typography, Stack, Chip, useTheme, useMediaQuery } from '@mui/material';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Importando ícones que representam as áreas
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'; // UX/UI
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined'; // Backend
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined'; // Mobile

// Dados dos "Nós" da Rede Neural com os Ícones
const experiences = [
    {
        id: 1,
        title: "Arquitetura de Experiência",
        role: "UX/UI & Frontend",
        description: "Onde o design encontra a lógica. Criamos interfaces imersivas que não apenas impressionam visualmente, mas guiam o usuário intuitivamente.",
        techs: ["React.js", "Figma", "Motion", "Tailwind"],
        icon: BrushOutlinedIcon,
        color: "#A78BFA" // Roxo claro
    },
    {
        id: 2,
        title: "Infraestrutura Serverless",
        role: "Backend & Cloud",
        description: "Performance invisível. Arquiteturas escaláveis com Firebase e Node.js para garantir que seu sistema cresça com segurança e custo otimizado.",
        techs: ["Firebase", "Node.js", "GCP", "NoSQL"],
        icon: CloudQueueOutlinedIcon,
        color: "#34D399" // Um verde menta tecnológico para diferenciar
    },
    {
        id: 3,
        title: "Ecossistemas Multiplataforma",
        role: "Mobile & Web",
        description: "Sua marca em qualquer dispositivo. Unificamos a experiência web e mobile criando sistemas fluidos e de fácil manutenção.",
        techs: ["React Native", "PWA", "API REST"],
        icon: DevicesOutlinedIcon,
        color: "#60A5FA" // Azul tech
    }
];

// Componente do Card de Vidro (Holographic Card)
const NeuralCard = ({ item, isMobile }) => {
    const theme = useTheme();
    const Icon = item.icon;

    return (
        <motion.div
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }} // Efeito 3D sutil no hover
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Box
                sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '24px',
                    p: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        borderColor: item.color,
                        boxShadow: `0 0 40px ${item.color}20`, // Glow colorido baseado na tecnologia
                    }
                }}
            >
                {/* Ícone de Fundo Gigante (Marca d'água) */}
                <Box sx={{ position: 'absolute', right: -20, top: -20, opacity: 0.05, transform: 'rotate(15deg)' }}>
                    <Icon sx={{ fontSize: 180, color: item.color }} />
                </Box>

                {/* Cabeçalho do Card com Ícone Animado */}
                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: '16px',
                            background: `linear-gradient(135deg, ${item.color}20 0%, transparent 100%)`,
                            border: `1px solid ${item.color}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        {/* Ícone pulsando suavemente */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Icon sx={{ color: item.color, fontSize: 32 }} />
                        </motion.div>
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ color: item.color, letterSpacing: 1, fontWeight: 'bold' }}>
                            {item.role.toUpperCase()}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff', lineHeight: 1.2 }}>
                            {item.title}
                        </Typography>
                    </Box>
                </Stack>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7, minHeight: '60px' }}>
                    {item.description}
                </Typography>

                {/* Tech Chips */}
                <Stack direction="row" gap={1} flexWrap="wrap">
                    {item.techs.map((tech) => (
                        <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{
                                borderColor: `${item.color}40`,
                                color: item.color,
                                background: `${item.color}10`,
                                fontWeight: 600,
                                fontSize: '0.75rem'
                            }}
                            variant="outlined"
                        />
                    ))}
                </Stack>
            </Box>
        </motion.div>
    );
};

export default function Experience() {
    const theme = useTheme();
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
        <Box
            component="section"
            ref={containerRef}
            sx={{ py: 15, position: 'relative' }}
        >
            <Container maxWidth="lg">
                {/* Título da Seção */}
                <Box mb={12} textAlign="center" position="relative" zIndex={2}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="overline" color="primary" sx={{ letterSpacing: 3, fontWeight: 'bold' }}>
                            NOSSA EXPERTISE
                        </Typography>
                        <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
                            Conectando pontos, <br />
                            <span style={{
                                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #A78BFA 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                criando ecossistemas.
                            </span>
                        </Typography>
                    </motion.div>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {/* A Linha Central (Espinha Dorsal) - Só aparece no Desktop */}
                    {!isMobile && (
                        <Box
                            sx={{
                                position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
                                background: 'rgba(255,255,255,0.05)', transform: 'translateX(-50%)',
                                zIndex: 0
                            }}
                        >
                            <motion.div
                                style={{
                                    scaleY,
                                    transformOrigin: 'top',
                                    background: 'linear-gradient(180deg, #7C3AED 0%, #34D399 50%, #60A5FA 100%)', // Gradiente Multicor
                                    width: '100%', height: '100%',
                                    boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)'
                                }}
                            />
                        </Box>
                    )}

                    {/* Renderização dos Nós */}
                    <Stack spacing={isMobile ? 6 : 10}>
                        {experiences.map((item, index) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: isMobile ? 'flex-start' : (index % 2 === 0 ? 'flex-end' : 'flex-start'),
                                    position: 'relative',
                                    flexDirection: isMobile ? 'column' : (index % 2 === 0 ? 'row-reverse' : 'row'),
                                    alignItems: 'center',
                                    zIndex: 1
                                }}
                            >
                                {/* O Ponto Central (Node) Pulsante */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: isMobile ? '0px' : '50%',
                                        transform: 'translateX(-50%)',
                                        zIndex: 10,
                                        display: isMobile ? 'none' : 'block'
                                    }}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Box
                                            sx={{
                                                width: 16, height: 16, borderRadius: '50%',
                                                background: '#050505',
                                                border: `3px solid ${item.color}`,
                                                boxShadow: `0 0 15px ${item.color}`
                                            }}
                                        />
                                    </motion.div>
                                </Box>

                                {/* Linha Horizontal Animada */}
                                {!isMobile && (
                                    <Box sx={{ width: index % 2 === 0 ? '50%' : '55%', height: '1px', position: 'relative', display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                                        <motion.div
                                            initial={{ width: 0, opacity: 0 }}
                                            whileInView={{ width: '100%', opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            style={{
                                                height: '1px',
                                                background: `linear-gradient(${index % 2 === 0 ? '90deg' : '-90deg'}, ${item.color} 50%, transparent)`,
                                            }}
                                        />
                                    </Box>
                                )}

                                {/* O Card */}
                                <Box sx={{ width: isMobile ? '100%' : '45%', pl: isMobile ? 0 : 0 }}>
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -50 : 50) }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                                        viewport={{ once: true, margin: "-50px" }}
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