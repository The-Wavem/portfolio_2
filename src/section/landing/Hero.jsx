import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';

// Criando componentes animados baseados no MUI
const MotionTypography = motion.create(Typography);
const MotionBox = motion.create(Box);

export default function Hero() {
    return (
        <Box
            sx={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                background: 'radial-gradient(circle at 50% 10%, rgba(124, 58, 237, 0.15) 0%, rgba(5, 5, 5, 0) 50%)', // Glow roxo sutil no topo
                pt: 10
            }}
        >
            <Container maxWidth="lg">
                <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    textAlign="center"
                >
                    <Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 'bold' }}>
                        EST. 2024 • ARQUITETOS DIGITAIS
                    </Typography>

                    <MotionTypography
                        variant="h2"
                        component="h1"
                        sx={{
                            mt: 2,
                            mb: 3,
                            background: 'linear-gradient(90deg, #FFF 0%, #A1A1AA 100%)', // Texto gradiente
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Transformamos ideias complexas <br />
                        em <span style={{ color: '#7C3AED', WebkitTextFillColor: '#7C3AED' }}>sistemas inteligentes.</span>
                    </MotionTypography>

                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', mb: 5, lineHeight: 1.6 }}>
                        A The Wavem é um coletivo de engenheiros especialistas entregando soluções web e mobile de nível empresarial.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            boxShadow: '0px 0px 20px rgba(124, 58, 237, 0.4)' // Glow no botão
                        }}
                    >
                        Começar Agora
                    </Button>
                </MotionBox>
            </Container>
        </Box>
    );
}