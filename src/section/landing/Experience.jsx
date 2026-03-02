import { Box, Container, Typography, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { VscJson, VscCode, VscSymbolRuler } from 'react-icons/vsc';
import { getExperienceItems } from '@/service/content';
import { getStackIcon, getToolMeta } from '@/components/organism/aboutTeam.utils';

function hexToRgba(hex, alpha) {
    if (typeof hex !== 'string') {
        return hex;
    }

    const value = hex.replace('#', '');
    const isShort = value.length === 3;
    const isLong = value.length === 6;

    if (!isShort && !isLong) {
        return hex;
    }

    const normalized = isShort
        ? value.split('').map((char) => `${char}${char}`).join('')
        : value;

    const red = Number.parseInt(normalized.slice(0, 2), 16);
    const green = Number.parseInt(normalized.slice(2, 4), 16);
    const blue = Number.parseInt(normalized.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

// Componente para desenhar "Artefatos Técnicos" no fundo
const BackgroundArtifact = ({ type, color, intensity = 0.05 }) => {
    const baseOpacity = Math.min(Math.max(intensity, 0.028), 0.078);
    const artifactTuning = {
        code: {
            width: '57%',
            height: '74%',
            top: 18,
            right: 18,
            blur: 'blur(0.22px)',
            mask: 'linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.2) 58%, transparent 82%)',
            snippetOpacity: baseOpacity + 0.008,
            lineHeight: 1.34
        },
        json: {
            width: '54%',
            height: '70%',
            top: 20,
            right: 20,
            blur: 'blur(0.28px)',
            mask: 'linear-gradient(180deg, rgba(0,0,0,0.86), rgba(0,0,0,0.25) 52%, transparent 78%)',
            snippetOpacity: Math.max(baseOpacity - 0.004, 0.03),
            lineHeight: 1.31
        },
        grid: {
            width: '62%',
            height: '76%',
            top: 14,
            right: 14,
            blur: 'blur(0.44px)',
            mask: 'linear-gradient(180deg, rgba(0,0,0,0.82), rgba(0,0,0,0.2) 56%, transparent 80%)',
            snippetOpacity: Math.min(baseOpacity + 0.016, 0.082),
            lineHeight: 1.35
        }
    };

    const resolved = artifactTuning[type] ?? artifactTuning.code;

    const codeSnippet = (
        <Box sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.52rem', color: color, opacity: resolved.snippetOpacity, lineHeight: resolved.lineHeight }}>
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
        <Box sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.52rem', color: color, opacity: resolved.snippetOpacity, lineHeight: resolved.lineHeight }}>
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
            backgroundSize: '16px 16px',
            opacity: resolved.snippetOpacity
        }} />
    );

    return (
        <Box
            sx={{
                position: 'absolute',
                top: resolved.top,
                right: resolved.right,
                width: resolved.width,
                height: resolved.height,
                overflow: 'hidden',
                zIndex: 0,
                pointerEvents: 'none',
                filter: resolved.blur,
                maskImage: resolved.mask
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
    const itemGlowSoft = hexToRgba(item.color, isHero ? 0.12 : 0.08);
    const itemGlowEdge = hexToRgba(item.color, 0.24);
    const itemChipBg = hexToRgba(item.color, 0.06);
    const itemChipBorder = hexToRgba(item.color, 0.2);

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
                    background: isHero
                        ? `linear-gradient(140deg, ${itemGlowSoft} 0%, rgba(10,10,10,0.72) 32%, rgba(10,10,10,0.72) 100%)`
                        : `linear-gradient(140deg, ${hexToRgba(item.color, 0.08)} 0%, rgba(10,10,10,0.62) 30%, rgba(10,10,10,0.62) 100%)`,
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${hexToRgba(item.color, 0.18)}`,
                    borderRadius: '18px',
                    p: { xs: 2.6, sm: 2.9, md: isHero ? 4.1 : 3.2 },
                    minHeight: { xs: 280, md: isHero ? 318 : 298 },
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        borderColor: item.color,
                        boxShadow: `0 8px 34px ${item.color}16`,
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '18px',
                        pointerEvents: 'none',
                        background: `radial-gradient(circle at 88% 12%, ${itemGlowEdge} 0%, transparent 48%)`,
                        opacity: isHero ? 0.95 : 0.78,
                        zIndex: 0
                    }
                }}
            >
                <BackgroundArtifact type={item.bgType} color={item.color} intensity={isHero ? 0.06 : 0.04} />

                <Stack direction="row" spacing={1.6} alignItems="center" mb={2.2} position="relative" zIndex={1}>
                    <Box
                        sx={{
                            p: isHero ? 1.05 : 0.92,
                            borderRadius: '8px',
                            background: itemChipBg,
                            border: `1px solid ${itemChipBorder}`,
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
                                fontSize: { xs: '0.62rem', md: '0.68rem' }
                            }}
                        >
                            {`// ${item.role.toUpperCase()}`}
                        </Typography>
                        <Typography
                            variant={isHero ? 'h5' : 'h6'}
                            fontWeight={isHero ? 800 : 700}
                            sx={{
                                color: '#fff',
                                lineHeight: 1.12,
                                letterSpacing: '-0.015em',
                                fontSize: isHero
                                    ? { xs: '1.56rem', md: '1.82rem' }
                                    : { xs: '1.42rem', md: '1.58rem' },
                                textWrap: 'balance'
                            }}
                        >
                            {item.title}
                        </Typography>
                    </Box>
                </Stack>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'rgba(228,228,231,0.74)',
                        mb: isHero ? 3.5 : 2.8,
                        lineHeight: 1.7,
                        fontSize: isHero ? { xs: '0.94rem', md: '0.98rem' } : { xs: '0.86rem', md: '0.9rem' },
                        letterSpacing: '0.01em',
                        position: 'relative',
                        zIndex: 1,
                        maxWidth: isHero ? '88%' : '96%',
                        display: '-webkit-box',
                        WebkitLineClamp: isHero ? 4 : 5,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: isHero ? { xs: '6.6em', md: '6.2em' } : { xs: '7.7em', md: '7.2em' }
                    }}
                >
                    {item.description}
                </Typography>

                <Stack direction="row" gap={{ xs: 1, md: 1.2 }} flexWrap="wrap" position="relative" zIndex={1}>
                    {item.techs.map((tech) => {
                        const techMeta = getToolMeta(tech);
                        const Icon = getStackIcon(techMeta) ?? VscCode;
                        return (
                            <motion.div
                                key={tech.name}
                                whileHover={{ scale: 1.04, y: -2 }}
                                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex', alignItems: 'center', gap: 1,
                                        px: { xs: 1.25, md: 1.45 }, py: { xs: 0.62, md: 0.74 },
                                        borderRadius: '999px',
                                        minWidth: { xs: 104, md: 112 },
                                        minHeight: { xs: 32, md: 34 },
                                        justifyContent: 'center',
                                        background: itemChipBg,
                                        border: `1px solid ${hexToRgba(item.color, 0.16)}`,
                                        transition: 'all 0.24s ease',
                                        '&:hover': {
                                            background: hexToRgba(item.color, 0.12),
                                            borderColor: item.color,
                                            boxShadow: `0 0 0 1px ${item.color}22 inset`
                                        }
                                    }}
                                >
                                    <Icon size={15} color={item.color} />
                                    <Typography variant="caption" sx={{ color: '#E4E4E7', fontWeight: 600, fontSize: { xs: '0.68rem', md: '0.72rem' }, letterSpacing: '0.01em' }}>
                                        {techMeta.name}
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

    return (
        <Box component="section" sx={{ py: { xs: 10, md: 15 }, position: 'relative', overflow: 'hidden' }}>
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    top: -10,
                    left: -180,
                    width: 360,
                    height: 360,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.primary.main}30 0%, rgba(0,0,0,0) 72%)`,
                    filter: 'blur(16px)',
                    pointerEvents: 'none'
                }}
            />

            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    bottom: -10,
                    right: -180,
                    width: 320,
                    height: 320,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 74%)',
                    filter: 'blur(22px)',
                    pointerEvents: 'none'
                }}
            />

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
                    {experiences.map((item, index) => (
                        <Box
                            key={item.id}
                            sx={{
                                gridColumn: { xs: '1 / -1', md: 'span 6' }
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true, amount: 0.35 }}
                                style={{ height: '100%' }}
                            >
                                <NeuralCard item={item} variant={index === 0 ? 'hero' : 'small'} />
                            </motion.div>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}