import { memo } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { trackAction } from '@/service/analytics/tracking.service';

const HeroImpactStats = memo(function HeroImpactStats({ items, accent }) {
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
});

export default function ServicesHeroSection({ content, accent }) {
    const heroVideo = content.heroVideoUrl ?? content.processTimeline?.[0]?.videoUrl;

    return (
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
                    preload="metadata"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
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

                <Box sx={{ position: 'relative', zIndex: 2, p: { xs: 2.2, md: 3.2 }, maxWidth: { xs: '100%', md: '68%' } }}>
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
                                onClick={() => trackAction({ page: 'services', section: 'hero', action: 'click_primary_cta', label: 'Iniciar meu projeto' })}
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
                                onClick={() => trackAction({ page: 'services', section: 'hero', action: 'click_secondary_cta', label: 'Ver etapas' })}
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
        </Container>
    );
}
