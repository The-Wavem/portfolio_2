import { Box, Container, Typography, useTheme } from '@mui/material';

export default function AboutHeroSection() {
    const theme = useTheme();

    return (
        <Box component="section" sx={{ pt: { xs: 12, md: 16 } }}>
            <Container maxWidth="lg">
                <Box mb={{ xs: 5, md: 7 }} textAlign="left">
                    <Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}>
                        QUEM FAZ A WAVEM
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
                        Um time de especialistas com <span style={{ color: theme.palette.primary.main }}>foco em resultado real.</span>
                    </Typography>
                    <Typography sx={{ maxWidth: 700, color: 'rgba(228,228,231,0.72)', lineHeight: 1.75, fontSize: { xs: '0.95rem', md: '1rem' }, letterSpacing: '0.01em' }}>
                        Clique em cada perfil para conhecer habilidades, áreas de foco, projetos pessoais e canais individuais de contato.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
