import { memo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const VisualListContent = memo(function VisualListContent({ items, accent, title }) {
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
                    <motion.div key={item} whileHover={{ x: 4 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
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
                            <motion.div animate={{ scale: activeItem === index ? 1.06 : 1 }} transition={{ duration: 0.2 }}>
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
});

export default function ServicesHighlightsSection({ content, accent }) {
    return (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
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
        </Container>
    );
}
