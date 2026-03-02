import { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Stack,
    Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { TbChevronDown } from 'react-icons/tb';
import { Link as RouterLink } from 'react-router-dom';
import { getServicesContent } from '@/service/content';

function HeroImpactStats({ items, accent }) {
    return (
        <Box
            sx={{
                mt: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(3, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
                gap: 0.8,
                maxWidth: { xs: '100%', md: 430 }
            }}
        >
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.34, delay: index * 0.06, ease: 'easeOut' }}
                >
                    <Box
                        sx={{
                            p: { xs: 1, md: 1.1 },
                            borderRadius: '12px',
                            border: `1px solid ${accent}50`,
                            background: `linear-gradient(145deg, ${accent}22, rgba(10,10,10,0.72))`,
                            textAlign: 'center'
                        }}
                    >
                        <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '1.4rem', md: '1.6rem' }, lineHeight: 1 }}>
                            {item.value}
                        </Typography>
                        <Typography sx={{ mt: 0.25, color: 'rgba(228,228,231,0.82)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            {item.label}
                        </Typography>
                    </Box>
                </motion.div>
            ))}
        </Box>
    );
}

function VisualListContent({ items, accent, title }) {
    const [activeItem, setActiveItem] = useState(0);

    return (
        <Box
            sx={{
                p: { xs: 1.4, md: 1.6 },
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(8,8,8,0.58)',
                height: '100%'
            }}
        >
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.05rem', md: '1.2rem' } }}>
                {title}
            </Typography>

            <Stack spacing={1.05} sx={{ mt: 1.4 }}>
                {items.map((item, index) => (
                    <motion.div
                        key={item}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <Box
                            onMouseEnter={() => setActiveItem(index)}
                            onFocus={() => setActiveItem(index)}
                            sx={{
                                p: 1.15,
                                borderRadius: '12px',
                                border: activeItem === index ? `1px solid ${accent}82` : '1px solid rgba(255,255,255,0.11)',
                                background: activeItem === index ? `${accent}14` : 'rgba(255,255,255,0.02)',
                                display: 'grid',
                                gridTemplateColumns: '30px 1fr',
                                gap: 0.9,
                                alignItems: 'start',
                                transition: 'border-color 0.2s ease, background 0.2s ease'
                            }}
                        >
                            <motion.div
                                animate={{ scale: activeItem === index ? 1.06 : 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        border: `1px solid ${accent}80`,
                                        color: accent,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.74rem',
                                        fontWeight: 800
                                    }}
                                >
                                    {index + 1}
                                </Box>
                            </motion.div>
                            <Typography sx={{ color: 'rgba(228,228,231,0.8)', fontSize: '0.92rem', lineHeight: 1.62 }}>
                                {item}
                            </Typography>
                        </Box>
                    </motion.div>
                ))}
            </Stack>
        </Box>
    );
}

function ProcessAccordion({ steps, accent, expanded, onChange }) {
    return (
        <Stack spacing={1.1}>
            {steps.map((step, index) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.36, delay: index * 0.05, ease: 'easeOut' }}
                >
                    <Accordion
                        disableGutters
                        expanded={expanded === step.id}
                        onChange={(_, isExpanded) => onChange(isExpanded ? step.id : null)}
                        sx={{
                            borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(8,8,8,0.48)',
                            overflow: 'hidden',
                            '&:before': { display: 'none' }
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<TbChevronDown color="#ffffff" size={18} />}
                            sx={{
                                px: 2,
                                py: 0.8,
                                '& .MuiAccordionSummary-content': {
                                    margin: '8px 0',
                                    alignItems: 'center',
                                    gap: 1.2
                                }
                            }}
                        >
                            <Typography sx={{ color: accent, fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.08em' }}>
                                ETAPA {step.stage}
                            </Typography>
                            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>
                                {step.title}
                            </Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontWeight: 600, fontSize: '0.82rem' }}>
                                {step.subtitle}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{ px: 0, pt: 0, pb: 0 }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    minHeight: { xs: 260, md: 610 },
                                    overflow: 'hidden'
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0
                                    }}
                                >
                                    <video
                                        src={step.videoUrl}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.9) contrast(1.02)' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            pointerEvents: 'none',
                                            background: 'linear-gradient(100deg, rgba(6,6,6,0.9) 0%, rgba(6,6,6,0.62) 45%, rgba(6,6,6,0.78) 100%)'
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        position: 'relative',
                                        zIndex: 2,
                                        p: { xs: 1.5, md: 2.1 },
                                        maxWidth: { xs: '100%', md: '58%' }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'rgba(245,245,247,0.88)',
                                            lineHeight: 1.66,
                                            fontSize: { xs: '0.92rem', md: '0.98rem' }
                                        }}
                                    >
                                        {step.description}
                                    </Typography>
                                    <Typography sx={{ mt: 1, color: '#fff', fontWeight: 700, fontSize: '0.86rem', lineHeight: 1.5 }}>
                                        {step.outcome}
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </motion.div>
            ))}
        </Stack>
    );
}

export default function Services() {
    const content = getServicesContent();
    const accent = content.accent?.end ?? '#8C2438';
    const [expandedStep, setExpandedStep] = useState(content.processTimeline?.[0]?.id ?? null);
    const heroVideo = content.heroVideoUrl ?? content.processTimeline?.[0]?.videoUrl;

    return (
        <Box component="main" sx={{ pt: { xs: 11, md: 14 }, pb: { xs: 8, md: 12 }, position: 'relative' }}>
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle at 12% 10%, ${accent}24 0%, transparent 32%), radial-gradient(circle at 88% 26%, ${accent}1A 0%, transparent 28%)`,
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    sx={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.12)',
                        position: 'relative',
                        minHeight: { xs: 360, md: 440 },
                        background: '#070707'
                    }}
                >
                    <video
                        src={heroVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(100deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.74) 42%, rgba(5,5,5,0.58) 100%)'
                        }}
                    />

                    <motion.div
                        aria-hidden
                        animate={{ opacity: [0.24, 0.36, 0.24], scale: [1, 1.03, 1] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: `radial-gradient(circle at 18% 24%, ${accent}55 0%, transparent 42%)`,
                            pointerEvents: 'none'
                        }}
                    />

                    <motion.div
                        aria-hidden
                        animate={{ opacity: [0.12, 0.2, 0.12], x: [0, 8, 0], y: [0, -6, 0] }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle at 82% 70%, rgba(255,255,255,0.18) 0%, transparent 36%)',
                            pointerEvents: 'none'
                        }}
                    />

                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            p: { xs: 2.2, md: 3.2 },
                            maxWidth: { xs: '100%', md: '68%' }
                        }}
                    >
                        <Typography variant="overline" sx={{ color: accent, letterSpacing: 3, fontWeight: 700, fontSize: '0.7rem' }}>
                            {content.eyebrow}
                        </Typography>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.42, delay: 0.08, ease: 'easeOut' }}
                        >
                            <Typography
                                sx={{
                                    mt: 0.9,
                                    color: '#fff',
                                    fontWeight: 800,
                                    fontSize: { xs: '1.7rem', md: '2.7rem' },
                                    lineHeight: 1.06,
                                    letterSpacing: '-0.03em'
                                }}
                            >
                                {content.title}
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.14, ease: 'easeOut' }}
                        >
                            <Stack spacing={0.45} sx={{ mt: 1.2 }}>
                                {(content.contextLines ?? []).map((line) => (
                                    <Typography key={line} sx={{ color: 'rgba(228,228,231,0.86)', lineHeight: 1.66, fontSize: { xs: '0.92rem', md: '0.97rem' } }}>
                                        {line}
                                    </Typography>
                                ))}
                            </Stack>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                        >
                            <HeroImpactStats items={content.impactStats ?? []} accent={accent} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.24, ease: 'easeOut' }}
                        >
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.1} sx={{ mt: 2 }}>
                                <Button
                                    component={RouterLink}
                                    to="/projetos"
                                    variant="contained"
                                    sx={{
                                        borderRadius: '999px',
                                        px: 2.1,
                                        py: 0.9,
                                        fontWeight: 800,
                                        background: accent,
                                        '&:hover': { background: accent }
                                    }}
                                >
                                    Iniciar meu projeto
                                </Button>
                                <Button
                                    component="a"
                                    href="#processo-parceria"
                                    variant="outlined"
                                    sx={{
                                        borderRadius: '999px',
                                        px: 2.1,
                                        py: 0.9,
                                        fontWeight: 700,
                                        color: '#fff',
                                        borderColor: 'rgba(255,255,255,0.32)',
                                        '&:hover': { borderColor: accent, background: 'rgba(255,255,255,0.04)' }
                                    }}
                                >
                                    Ver etapas
                                </Button>
                            </Stack>
                        </motion.div>
                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: { xs: 3.1, md: 4 },
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                        gap: 1.2
                    }}
                >
                    <VisualListContent
                        title="O que o cliente pode esperar da primeira semana"
                        items={content.firstWeekExpectations}
                        accent={accent}
                    />
                    <VisualListContent
                        title="Como medimos sucesso do projeto"
                        items={content.successMetrics}
                        accent={accent}
                    />
                </Box>

                <Box id="processo-parceria" sx={{ mt: { xs: 3.3, md: 4.4 } }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.45rem' } }}>
                        Processo com parceria
                    </Typography>

                    <Box sx={{ mt: 1.5 }}>
                        <ProcessAccordion
                            steps={content.processTimeline ?? []}
                            accent={accent}
                            expanded={expandedStep}
                            onChange={setExpandedStep}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
