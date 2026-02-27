import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function ProjectsHeroSection() {
    const theme = useTheme();

    return (
        <Box component="section" sx={{ pt: { xs: 12, md: 16 }, position: 'relative', overflow: 'hidden' }}>
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    top: { xs: 20, md: 0 },
                    right: { xs: -120, md: -180 },
                    width: { xs: 260, md: 380 },
                    height: { xs: 260, md: 380 },
                    borderRadius: '50%',
                    background: 'rgba(74,222,128,0.2)',
                    filter: 'blur(86px)',
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <Box sx={{ maxWidth: 920, position: 'relative', zIndex: 2 }}>
                        <Typography
                            variant="overline"
                            color="primary"
                            sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}
                        >
                            PROJETOS COMPLETOS
                        </Typography>

                        <Typography
                            variant="h2"
                            sx={{
                                mt: 1.2,
                                fontWeight: 800,
                                lineHeight: 1.04,
                                letterSpacing: '-0.03em',
                                fontSize: { xs: '2rem', sm: '2.6rem', md: '3.4rem' }
                            }}
                        >
                            Tudo que falamos, aqui vira visão de <span style={{ color: '#4ADE80' }}>execução real</span>.
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2.2,
                                maxWidth: 760,
                                color: 'rgba(228,228,231,0.76)',
                                lineHeight: 1.78,
                                fontSize: { xs: '0.96rem', md: '1.02rem' }
                            }}
                        >
                            Esta página detalha os projetos que já entregamos: contexto, decisões de produto, stack e direcionamento de resultado.
                            A ideia é simples: te ajudar a entender como pensamos, como construímos e qual nível de qualidade você pode esperar.
                        </Typography>

                        <Box
                            aria-hidden
                            sx={{
                                mt: 2.2,
                                width: { xs: 120, md: 160 },
                                height: '2px',
                                borderRadius: '999px',
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, rgba(74,222,128,0.9))`
                            }}
                        />
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
}
