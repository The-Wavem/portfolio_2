import { Box, Container, Typography, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { SiReact, SiFigma, SiTailwindcss, SiFirebase, SiNodedotjs, SiGooglecloud, SiFlutter, SiSwift } from 'react-icons/si';
import { VscJson, VscCode, VscSymbolRuler } from 'react-icons/vsc';
import { getExperienceItems } from '@/service/content';

const techIconMap = {
    react: SiReact,
    figma: SiFigma,
    tailwind: SiTailwindcss,
    firebase: SiFirebase,
    node: SiNodedotjs,
    gcp: SiGooglecloud,
    swift: SiSwift,
    flutter: SiFlutter,
    ruler: VscSymbolRuler,
    code: VscCode,
    json: VscJson
};

// Componente para desenhar "Artefatos Técnicos" no fundo
const BackgroundArtifact = ({ type, color, intensity = 0.05 }) => {
    const codeSnippet = (
        <Box sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.52rem', color: color, opacity: intensity, lineHeight: 1.35 }}>
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
        <Box sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.52rem', color: color, opacity: intensity, lineHeight: 1.35 }}>
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
            opacity: Math.min(intensity + 0.01, 0.1)
        }} />
    );

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 18,
                right: 18,
                width: '56%',
                height: '74%',
                overflow: 'hidden',
                zIndex: 0,
                pointerEvents: 'none',
                filter: 'blur(0.35px)',
                maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.8), transparent 80%)'
            }}
        >
            {type === 'code' && codeSnippet}
            {type === 'json' && jsonSnippet}
            {type === 'grid' && gridPattern}
        </Box>
    );
};

const NeuralCard = ({ item, variant = 'small' }) => {
    const isHero = variant === 'hero';

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
            <Box
                sx={{
                    background: isHero ? 'rgba(10, 10, 10, 0.72)' : 'rgba(10, 10, 10, 0.62)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '18px',
                    p: { xs: 3, md: isHero ? 4.2 : 3.4 },
                    minHeight: { xs: 288, md: isHero ? 372 : 308 },
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        borderColor: item.color,
                        boxShadow: `0 8px 34px ${item.color}16`,
                    }
                }}
            >
                <BackgroundArtifact type={item.bgType} color={item.color} intensity={isHero ? 0.06 : 0.04} />

                <Stack direction="row" spacing={2} alignItems="center" mb={2.4} position="relative" zIndex={1}>
                    <Box
                        sx={{
                            p: isHero ? 1.15 : 1,
                            borderRadius: '8px',
                            background: `rgba(255,255,255,0.05)`,
                            border: `1px solid rgba(255,255,255,0.1)`,
                        }}
                    >
                        {item.bgType === 'code' && <VscCode size={24} color={item.color} />}
                        {item.bgType === 'json' && <VscJson size={24} color={item.color} />}
                        {item.bgType === 'grid' && <VscSymbolRuler size={24} color={item.color} />}
                    </Box>
                    <Box>
                        <Typography
                            variant="caption"
                            sx={{
                                color: item.color,
                                letterSpacing: 1.8,
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                textTransform: 'uppercase',
                                opacity: 0.95,
                                fontSize: '0.68rem'
                            }}
                        >
                            {`// ${item.role.toUpperCase()}`}
                        </Typography>
                        <Typography
                            variant={isHero ? 'h5' : 'h6'}
                            fontWeight={isHero ? 800 : 700}
                            sx={{ color: '#fff', lineHeight: 1.15, letterSpacing: '-0.015em' }}
                        >
                            {item.title}
                        </Typography>
                    </Box>
                </Stack>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'rgba(228,228,231,0.74)',
                        mb: isHero ? 3.9 : 3.2,
                        lineHeight: 1.75,
                        fontSize: isHero ? '0.98rem' : '0.9rem',
                        letterSpacing: '0.01em',
                        position: 'relative',
                        zIndex: 1,
                        maxWidth: isHero ? '86%' : '94%'
                    }}
                >
                    {item.description}
                </Typography>

                <Stack direction="row" gap={1.5} flexWrap="wrap" position="relative" zIndex={1}>
                    {item.techs.map((tech) => {
                        const Icon = techIconMap[tech.iconKey] ?? VscCode;
                        return (
                            <motion.div
                                key={tech.name}
                                whileHover={{ scale: 1.04, y: -2 }}
                                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex', alignItems: 'center', gap: 1,
                                        px: 1.55, py: 0.78,
                                        borderRadius: '999px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        transition: 'all 0.24s ease',
                                        '&:hover': {
                                            background: 'rgba(255,255,255,0.085)',
                                            borderColor: item.color,
                                            boxShadow: `0 0 0 1px ${item.color}22 inset`
                                        }
                                    }}
                                >
                                    <Icon size={16} color={item.color} />
                                    <Typography variant="caption" sx={{ color: '#E4E4E7', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.01em' }}>
                                        {tech.name}
                                    </Typography>
                                </Box>
                            </motion.div>
                        )
                    })}
                </Stack>
            </Box>
        </motion.div>
    );
};

export default function Experience() {
    const theme = useTheme();
    const experiences = getExperienceItems();
    const heroCard = experiences[0];
    const secondaryCards = experiences.slice(1);

    return (
        <Box component="section" sx={{ py: { xs: 10, md: 15 }, position: 'relative' }}>
            <Container maxWidth="lg">
                <Box mb={{ xs: 7, md: 10 }} textAlign="left" position="relative" zIndex={2}>
                    <Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}>
                        NOSSO DNA TÉCNICO
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
                        Mais que ferramentas, <br />
                        <span style={{ color: theme.palette.primary.main }}>domínio tecnológico.</span>
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        gap: { xs: 2.4, sm: 2.8, md: 3.2 },
                        alignItems: 'stretch'
                    }}
                >
                    <Box
                        sx={{
                            gridColumn: { xs: '1 / -1', sm: '1 / -1', md: '1 / span 7' },
                            gridRow: { xs: 'auto', md: '1 / span 2' }
                        }}
                    >
                        <NeuralCard item={heroCard} variant="hero" />
                    </Box>

                    {secondaryCards.map((item, index) => (
                        <Box
                            key={item.id}
                            sx={{
                                gridColumn: { xs: '1 / -1', sm: 'span 6', md: '8 / span 5' },
                                gridRow: { md: `${index + 1}` }
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                                viewport={{ once: true, amount: 0.35 }}
                            >
                                <NeuralCard item={item} />
                            </motion.div>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}