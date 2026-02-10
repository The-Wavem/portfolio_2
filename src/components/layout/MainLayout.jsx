import { Outlet } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import Footer from './Footer'; // Assumindo que você já tem ou vai criar o Footer.jsx

// Um Navbar simplificado para começar (podemos mover para um arquivo próprio depois)
const Navbar = () => (
    <AppBar
        position="fixed"
        sx={{
            background: 'rgba(5, 5, 5, 0.8)', // Fundo translúcido
            backdropFilter: 'blur(10px)',     // Efeito de vidro (Glassmorphism)
            boxShadow: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
    >
        <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                {/* Logo */}
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                    THE WAVEM
                </Typography>

                {/* Links Desktop */}
                <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    {['Serviços', 'Processo', 'Projetos', 'Sobre Nós'].map((item) => (
                        <Button key={item} color="inherit" sx={{ fontSize: '0.9rem', opacity: 0.8, '&:hover': { opacity: 1, color: '#7C3AED' } }}>
                            {item}
                        </Button>
                    ))}
                    <Button variant="contained" color="primary" sx={{ borderRadius: '20px', px: 3 }}>
                        Iniciar Projeto
                    </Button>
                </Stack>
            </Toolbar>
        </Container>
    </AppBar>
);

export default function MainLayout() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar />

            {/* O Outlet renderiza a rota filha (no caso, a Home) */}
            <Box sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );
}