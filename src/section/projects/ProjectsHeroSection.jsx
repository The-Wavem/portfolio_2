import { Box, Container, Typography } from '@mui/material';

export default function ProjectsHeroSection() {
    return (
        <Box component="section" sx={{ pt: { xs: 12, md: 16 } }}>
            <Container maxWidth="lg">
                <Box sx={{ maxWidth: 920 }}>
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
                </Box>
            </Container>
        </Box>
    );
}
