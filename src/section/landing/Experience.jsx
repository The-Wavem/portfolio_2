import { useRef } from 'react';
import { Box, Container, Typography, Stack, Chip, useTheme, useMediaQuery } from '@mui/material';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SiReact, SiFigma, SiTailwindcss, SiFirebase, SiNodedotjs, SiGooglecloud, SiFlutter, SiSwift, SiDocker } from 'react-icons/si';
import { VscJson, VscCode, VscSymbolRuler } from 'react-icons/vsc';

// Ajustar para as ferramentas reais
const experiences = [
    {
        id: 1,
        title: "Engenharia de Interface",
        role: "Frontend & Design System",
        description: "Não entregamos apenas telas, entregamos sistemas de design componentizados. Interfaces reativas que garantem consistência visual e manutenibilidade a longo prazo.",
        techs: [
            { name: "React / Next.js", icon: SiReact },
            { name: "Figma", icon: SiFigma },
            { name: "Tailwind", icon: SiTailwindcss }
        ],
        color: "#A78BFA",
        bgType: "code"
    },
    {
        id: 2,
        title: "Arquitetura Cloud & Dados",
        role: "Backend & Serverless",
        description: "Escalabilidade nativa. Construímos APIs que aguentam picos de tráfego usando arquitetura serverless, reduzindo custos de infraestrutura ociosa.",
        techs: [
            { name: "Firebase", icon: SiFirebase },
            { name: "Node.js", icon: SiNodedotjs },
            { name: "GCP", icon: SiGooglecloud }
        ],
        color: "#34D399",
        bgType: "json"
    },
    {
        id: 3,
        title: "Ecossistema Mobile",
        role: "iOS & Android",
        description: "Apps nativos e híbridos com performance de 60fps. Unificamos a lógica de negócios enquanto respeitamos as diretrizes de design da Apple e Google.",
        techs: [
            { name: "React Native", icon: SiReact },
            { name: "Swift", icon: SiSwift },
            { name: "Flutter", icon: SiFlutter }
        ],
        color: "#60A5FA", // Azul
        bgType: "grid"
    }
];

// Componente para desenhar "Artefatos Técnicos" no fundo
const BackgroundArtifact = ({ type, color }) => {
    const codeSnippet = (
        <Box sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.6rem', color: color, opacity: 0.15, lineHeight: 1.4 }}>
            <div>{`const WavemInterface = () => {`}</div>
            <div style={{ paddingLeft: 10 }}>{`const [state, setState] = useState(null);`}</div>
            <div style={{ paddingLeft: 10 }}>{`return (`}</div>
            <div style={{ paddingLeft: 20 }}>{`<motion.div animate={{ opacity: 1 }}>`}</div>
            <div style={{ paddingLeft: 30 }}>{`<Header sticky={true} />`}</div>
            <div style={{ paddingLeft: 30 }}>{`<HeroSection data={data} />`}</div>
            <div style={{ paddingLeft: 20 }}>{`</motion.div>`}</div>
            <div style={{ paddingLeft: 10 }}>{`);`}</div>
            <div>{`};`}</div>
        </Box>
    );

    const jsonSnippet = (
        <Box sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.6rem', color: color, opacity: 0.15, lineHeight: 1.4 }}>
            <div>{`{`}</div>
            <div style={{ paddingLeft: 10 }}>{`"status": 200,`}</div>
            <div style={{ paddingLeft: 10 }}>{`"server": "Wavem-Core-V2",`}</div>
            <div style={{ paddingLeft: 10 }}>{`"data": {`}</div>
            <div style={{ paddingLeft: 20 }}>{`"users_active": 1402,`}</div>
            <div style={{ paddingLeft: 20 }}>{`"region": "us-east-1",`}</div>
            <div style={{ paddingLeft: 20 }}>{`"latency": "24ms"`}</div>
            <div style={{ paddingLeft: 10 }}>{`}`}</div>
            <div>{`}`}</div>
        </Box>
    );

    const gridPattern = (
        <Box sx={{
            width: '100%', height: '100%',
            backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
            backgroundSize: '15px 15px',
            opacity: 0.1
        }} />
    );

    return (
        <Box sx={{ position: 'absolute', top: 20, right: 20, width: '60%', height: '80%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
            {type === 'code' && codeSnippet}
            {type === 'json' && jsonSnippet}
            {type === 'grid' && gridPattern}
        </Box>
    );
};

const NeuralCard = ({ item, isMobile }) => {

    return (
        <motion.div
            whileHover={{ scale: 1.01, translateY: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Box
                sx={{
                    background: 'rgba(10, 10, 10, 0.6)', // Mais escuro para contraste do código
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px', // Borda um pouco mais técnica (menos redonda)
                    p: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        borderColor: item.color,
                        boxShadow: `0 4px 30px ${item.color}15`, // Glow suave
                    }
                }}
            >
                {/* Artefato de Fundo (Código, JSON, Grid) */}
                <BackgroundArtifact type={item.bgType} color={item.color} />

                {/* Cabeçalho */}
                <Stack direction="row" spacing={2} alignItems="center" mb={2} position="relative" zIndex={1}>
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: '8px',
                            background: `rgba(255,255,255,0.05)`,
                            border: `1px solid rgba(255,255,255,0.1)`,
                        }}
                    >
                        {/* Ícone contextual (Code, JSON, Ruler) */}
                        {item.bgType === 'code' && <VscCode size={24} color={item.color} />}
                        {item.bgType === 'json' && <VscJson size={24} color={item.color} />}
                        {item.bgType === 'grid' && <VscSymbolRuler size={24} color={item.color} />}
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ color: item.color, letterSpacing: 1.5, fontWeight: 'bold', fontFamily: 'monospace' }}>
                            {`// ${item.role.toUpperCase()}`}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff', lineHeight: 1.2 }}>
                            {item.title}
                        </Typography>
                    </Box>
                </Stack>

                <Typography variant="body2" sx={{ color: '#A1A1AA', mb: 3, lineHeight: 1.7, position: 'relative', zIndex: 1, maxWidth: '90%' }}>
                    {item.description}
                </Typography>

                {/* Tech Stack com Logos Reais */}
                <Stack direction="row" gap={1.5} flexWrap="wrap" position="relative" zIndex={1}>
                    {item.techs.map((tech) => {
                        const Icon = tech.icon;
                        return (
                            <Box
                                key={tech.name}
                                sx={{
                                    display: 'flex', alignItems: 'center', gap: 1,
                                    px: 1.5, py: 0.8,
                                    borderRadius: '6px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.2s',
                                    '&:hover': { background: 'rgba(255,255,255,0.08)', borderColor: item.color }
                                }}
                            >
                                <Icon size={16} color={item.color} />
                                <Typography variant="caption" sx={{ color: '#E4E4E7', fontWeight: 500 }}>
                                    {tech.name}
                                </Typography>
                            </Box>
                        )
                    })}
                </Stack>
            </Box>
        </motion.div>
    );
};

export default function Experience() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <Box component="section" ref={containerRef} sx={{ py: 15, position: 'relative' }}>
            <Container maxWidth="lg">
                <Box mb={12} textAlign="center" position="relative" zIndex={2}>
                    <Typography variant="overline" color="primary" sx={{ letterSpacing: 3, fontWeight: 'bold' }}>
                        NOSSO DNA TÉCNICO
                    </Typography>
                    <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
                        Mais que ferramentas, <br />
                        <span style={{ color: theme.palette.primary.main }}>domínio tecnológico.</span>
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {!isMobile && (
                        <Box sx={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)', transform: 'translateX(-50%)' }}>
                            <motion.div style={{ scaleY, transformOrigin: 'top', background: `linear-gradient(180deg, #A78BFA 0%, #34D399 50%, #60A5FA 100%)`, width: '100%', height: '100%' }} />
                        </Box>
                    )}

                    <Stack spacing={isMobile ? 6 : 10}>
                        {experiences.map((item, index) => (
                            <Box key={item.id} sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : (index % 2 === 0 ? 'flex-end' : 'flex-start'), position: 'relative', flexDirection: isMobile ? 'column' : (index % 2 === 0 ? 'row-reverse' : 'row'), alignItems: 'center' }}>

                                {/* O Ponto Central */}
                                <Box sx={{ position: 'absolute', left: isMobile ? '0px' : '50%', transform: 'translateX(-50%)', zIndex: 10, display: isMobile ? 'none' : 'block' }}>
                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#050505', border: `2px solid ${item.color}`, boxShadow: `0 0 10px ${item.color}` }} />
                                </Box>

                                {/* Linha Horizontal Animada */}
                                {!isMobile && (
                                    <Box sx={{ width: index % 2 === 0 ? '50%' : '55%', height: '1px', position: 'relative', display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                                        <motion.div
                                            initial={{ width: 0, opacity: 0 }}
                                            whileInView={{ width: '100%', opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            style={{ height: '1px', background: `linear-gradient(${index % 2 === 0 ? '90deg' : '-90deg'}, ${item.color}40, transparent)` }}
                                        />
                                    </Box>
                                )}

                                {/* O Card */}
                                <Box sx={{ width: isMobile ? '100%' : '45%', pl: isMobile ? 0 : 0 }}>
                                    <motion.div initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -30 : 30) }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
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