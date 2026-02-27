import { useEffect } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
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

function isRouteActive(pathname, routePath) {
    if (routePath === '/') {
        return pathname === '/';
    }

    return pathname.startsWith(routePath);
}

const navLinks = [
    { label: 'Início', to: '/' },
    { label: 'Projetos', to: '/projetos' },
    { label: 'Sobre Nós', to: '/sobre' }
];

// Um Navbar simplificado para começar (podemos mover para um arquivo próprio depois)
const Navbar = ({ pathname }) => {
    const routeTheme = getScrollThemeByPath(pathname);
    const activeColor = routeTheme.end;

    return (
        <AppBar
            component={motion.header}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            position="fixed"
            sx={{
                background: 'rgba(5, 5, 5, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            color: isRouteActive(pathname, '/') ? activeColor : 'inherit',
                            textDecoration: 'none',
                            transition: 'color 0.25s ease, transform 0.25s ease',
                            '&:hover': {
                                color: activeColor,
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        THE WAVEM
                    </Typography>

                    <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        {navLinks.map((link) => {
                            const active = isRouteActive(pathname, link.to);

                            return (
                                <Button
                                    key={link.to}
                                    component={RouterLink}
                                    to={link.to}
                                    color="inherit"
                                    sx={{
                                        fontSize: '0.9rem',
                                        opacity: active ? 1 : 0.8,
                                        color: active ? activeColor : 'inherit',
                                        position: 'relative',
                                        transition: 'color 0.25s ease, opacity 0.25s ease, transform 0.25s ease',
                                        '&:hover': { opacity: 1, color: activeColor, transform: 'translateY(-1px)' },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 10,
                                            right: 10,
                                            bottom: 3,
                                            height: '2px',
                                            borderRadius: '999px',
                                            background: activeColor,
                                            transform: active ? 'scaleX(1)' : 'scaleX(0)',
                                            transformOrigin: 'center',
                                            transition: 'transform 0.25s ease'
                                        },
                                        '&:hover::after': {
                                            transform: 'scaleX(1)'
                                        }
                                    }}
                                >
                                    {link.label}
                                </Button>
                            );
                        })}
                        <Button
                            component={RouterLink}
                            to="/projetos"
                            variant="contained"
                            sx={{
                                borderRadius: '20px',
                                px: 3,
                                fontWeight: 700,
                                color: '#fff',
                                backgroundColor: `${activeColor}D9`,
                                boxShadow: `0 8px 20px ${activeColor}33`,
                                transition: 'transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
                                '&:hover': {
                                    transform: 'translateY(-1px)',
                                    backgroundColor: activeColor,
                                    boxShadow: `0 10px 24px ${activeColor}4D`
                                }
                            }}
                        >
                            Iniciar Projeto
                        </Button>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        const rootStyle = document.documentElement.style;
        const scrollTheme = getScrollThemeByPath(location.pathname);

        rootStyle.setProperty('--page-scroll-start', scrollTheme.start);
        rootStyle.setProperty('--page-scroll-end', scrollTheme.end);
    }, [location.pathname]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [location.pathname]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar pathname={location.pathname} />

            {/* O Outlet renderiza a rota filha (no caso, a Home) */}
            <Box sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );
}