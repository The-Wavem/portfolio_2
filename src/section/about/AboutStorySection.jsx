import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { getAboutStoryContent } from '@/service/content';

export default function AboutStorySection() {
    const theme = useTheme();
    const content = getAboutStoryContent();

    return (
        <Box component="section" sx={{ pb: { xs: 4, md: 6 }, position: 'relative' }}>
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                <Box
                    sx={{
                        p: { xs: 2.4, md: 3 },
                        borderRadius: '18px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(10,10,10,0.58)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        aria-hidden
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `radial-gradient(circle at 14% 20%, ${theme.palette.primary.main}24 0%, transparent 32%), radial-gradient(circle at 82% 78%, rgba(255,255,255,0.1) 0%, transparent 22%)`,
                            pointerEvents: 'none'
                        }}
                    />

                    <Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.7rem', opacity: 0.95 }}>
                        {content.eyebrow}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1.2,
                            color: '#fff',
                            fontWeight: 800,
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            fontSize: { xs: '1.4rem', md: '2rem' },
                            maxWidth: 920
                        }}
                    >
                        <span style={{ color: theme.palette.primary.main }}>{content.title}</span>
                    </Typography>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                            hidden: {}
                        }}
                    >
                        <Box sx={{ mt: 1.5, display: 'grid', gap: 1.1, maxWidth: 980 }}>
                            {content.paragraphs.map((paragraph) => (
                                <motion.div
                                    key={paragraph}
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.38, ease: 'easeOut' }}
                                >
                                    <Typography sx={{ color: 'rgba(228,228,231,0.76)', lineHeight: 1.8, fontSize: { xs: '0.92rem', md: '0.98rem' } }}>
                                        {paragraph}
                                    </Typography>
                                </motion.div>
                            ))}
                        </Box>
                    </motion.div>

                    <Box
                        sx={{
                            mt: 2.3,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                            gap: 1.2
                        }}
                    >
                        {content.pillars.map((pillar, index) => (
                            <motion.div
                                key={pillar.id}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.36, delay: index * 0.08, ease: 'easeOut' }}
                            >
                                <Box
                                    sx={{
                                        p: 1.6,
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(255,255,255,0.02)',
                                        transition: 'transform 0.25s ease, border-color 0.25s ease',
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            borderColor: `${theme.palette.primary.main}66`
                                        }
                                    }}
                                >
                                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem', letterSpacing: '-0.01em' }}>
                                        {pillar.title}
                                    </Typography>
                                    <Typography sx={{ mt: 0.55, color: 'rgba(228,228,231,0.72)', fontSize: '0.86rem', lineHeight: 1.65 }}>
                                        {pillar.description}
                                    </Typography>
                                </Box>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
                </motion.div>
            </Container>
        </Box>
    );
}
