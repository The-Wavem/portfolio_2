import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function AboutHeroSection() {
    const aboutAccent = '#38BDF8';

    return (
        <Box component="section" sx={{ pt: { xs: 12, md: 16 }, position: 'relative', overflow: 'hidden' }}>
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    width: { xs: 220, md: 340 },
                    height: { xs: 220, md: 340 },
                    borderRadius: '50%',
                    filter: 'blur(78px)',
                    background: `${aboutAccent}2A`,
                    top: { xs: 12, md: 0 },
                    right: { xs: -120, md: -140 },
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                <Box mb={{ xs: 5, md: 7 }} textAlign="left" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="overline" sx={{ color: aboutAccent, letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}>
                        QUEM FAZ A THE WAVEM
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{
                            mt: 1.4,
                            mb: 2.4,
                            maxWidth: 860,
                            fontSize: { xs: '2rem', sm: '2.35rem', md: '3.1rem' },
                            lineHeight: 1.06,
                            letterSpacing: '-0.03em'
                        }}
                    >
                        Um time de especialistas com <span style={{ color: aboutAccent }}>foco em resultado real.</span>
                    </Typography>
                    <Typography sx={{ maxWidth: 700, color: 'rgba(228,228,231,0.72)', lineHeight: 1.75, fontSize: { xs: '0.95rem', md: '1rem' }, letterSpacing: '0.01em' }}>
                        Clique em cada perfil para conhecer habilidades, áreas de foco, projetos pessoais e canais individuais de contato.
                    </Typography>

                    <Box
                        sx={{
                            mt: 2,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.9,
                            px: 1.4,
                            py: 0.7,
                            borderRadius: '999px',
                            border: '1px solid rgba(255,255,255,0.14)',
                            background: 'rgba(255,255,255,0.03)'
                        }}
                    >
                        <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: aboutAccent, boxShadow: `0 0 0 6px ${aboutAccent}22` }} />
                        <Typography sx={{ color: 'rgba(228,228,231,0.84)', fontSize: '0.82rem', fontWeight: 600 }}>
                            Web • Mobile • Manutenção • Evolução contínua
                        </Typography>
                    </Box>
                </Box>
                </motion.div>
            </Container>
        </Box>
    );
}
