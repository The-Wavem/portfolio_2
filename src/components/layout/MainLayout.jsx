import { useEffect } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import Footer from './Footer'; // Assumindo que você já tem ou vai criar o Footer.jsx

const routeScrollThemeMap = {
    '/': { start: '#7C3AED', end: '#A78BFA' },
    '/sobre': { start: '#06B6D4', end: '#38BDF8' },
    '/projetos': { start: '#22C55E', end: '#4ADE80' },
    '/contato': { start: '#F59E0B', end: '#FBBF24' }
};

function getScrollThemeByPath(pathname) {
    const matchedRoute = Object.keys(routeScrollThemeMap)
        .filter((route) => route !== '/')
        .find((route) => pathname.startsWith(route));

    if (matchedRoute) {
        return routeScrollThemeMap[matchedRoute];
    }

    return routeScrollThemeMap['/'];
}

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
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        color: 'inherit',
                        textDecoration: 'none'
                    }}
                >
                    THE WAVEM
                </Typography>

                {/* Links Desktop */}
                <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    <Button
                        component={RouterLink}
                        to="/"
                        color="inherit"
                        sx={{ fontSize: '0.9rem', opacity: 0.8, '&:hover': { opacity: 1, color: '#7C3AED' } }}
                    >
                        Início
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/projetos"
                        color="inherit"
                        sx={{ fontSize: '0.9rem', opacity: 0.8, '&:hover': { opacity: 1, color: '#7C3AED' } }}
                    >
                        Projetos
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/sobre"
                        color="inherit"
                        sx={{ fontSize: '0.9rem', opacity: 0.8, '&:hover': { opacity: 1, color: '#7C3AED' } }}
                    >
                        Sobre Nós
                    </Button>
                    <Button component={RouterLink} to="/projetos" variant="contained" color="primary" sx={{ borderRadius: '20px', px: 3 }}>
                        Iniciar Projeto
                    </Button>
                </Stack>
            </Toolbar>
        </Container>
    </AppBar>
);

export default function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        const rootStyle = document.documentElement.style;
        const scrollTheme = getScrollThemeByPath(location.pathname);

        rootStyle.setProperty('--page-scroll-start', scrollTheme.start);
        rootStyle.setProperty('--page-scroll-end', scrollTheme.end);
    }, [location.pathname]);

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