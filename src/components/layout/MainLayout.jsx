import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button, Stack, IconButton, Drawer } from '@mui/material';
import { motion } from 'framer-motion';
import { TbMenu2, TbX } from 'react-icons/tb';
import BrandIntroOverlay from '@/components/ui/BrandIntroOverlay';
import { getRouteBrandTheme } from '@/theme/routeBrandTheme';
import Footer from './Footer'; // Assumindo que você já tem ou vai criar o Footer.jsx
import BrandNetworkMark from '../ui/BrandNetworkMark';
import {
    getTrackingConsentStatus,
    setTrackingConsentStatus,
    trackAction,
    trackPageViewFromPath,
    trackRouteNavigation
} from '@/service/analytics/tracking.service';

function isRouteActive(pathname, routePath) {
    if (routePath === '/') {
        return pathname === '/';
    }

    return pathname.startsWith(routePath);
}

const navLinks = [
    { label: 'Início', to: '/' },
    { label: 'Serviços', to: '/servicos' },
    { label: 'Projetos', to: '/projetos' },
    { label: 'Sobre Nós', to: '/sobre' }
];

const routePrefetchMap = {
    '/': () => import('@pages/public/Home'),
    '/servicos': () => import('@pages/public/Services'),
    '/projetos': () => import('@pages/public/Projects'),
    '/sobre': () => import('@pages/public/About')
};

const prefetchedRoutes = new Set();

function prefetchRoute(route) {
    if (prefetchedRoutes.has(route)) {
        return;
    }

    const load = routePrefetchMap[route];
    if (!load) {
        return;
    }

    prefetchedRoutes.add(route);
    void load();
}

// Um Navbar simplificado para começar (podemos mover para um arquivo próprio depois)
const Navbar = ({ pathname, onNavigate }) => {
    const routeTheme = getRouteBrandTheme(pathname);
    const activeColor = routeTheme.end;
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    function toggleMobileMenu() {
        setMobileOpen((prev) => !prev);
    }

    function closeMobileMenu() {
        setMobileOpen(false);
    }

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
                    <Box
                        component={RouterLink}
                        to="/"
                        onClick={() => onNavigate({ to: '/', label: 'Logo Wavem' })}
                        onMouseEnter={() => prefetchRoute('/')}
                        onFocus={() => prefetchRoute('/')}
                        sx={{
                            color: isRouteActive(pathname, '/') ? activeColor : 'inherit',
                            textDecoration: 'none',
                            transition: 'color 0.25s ease, transform 0.25s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            '&:hover': {
                                color: activeColor,
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        <BrandNetworkMark size={100} textColor="#F5F5F5" motionLevel="subtle" />

                    </Box>

                    <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        {navLinks.map((link) => {
                            const active = isRouteActive(pathname, link.to);

                            return (
                                <Button
                                    key={link.to}
                                    component={RouterLink}
                                    to={link.to}
                                    onClick={() => onNavigate({ to: link.to, label: link.label })}
                                    onMouseEnter={() => prefetchRoute(link.to)}
                                    onFocus={() => prefetchRoute(link.to)}
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
                            onClick={() => onNavigate({ to: '/projetos', label: 'Iniciar Projeto' })}
                            onMouseEnter={() => prefetchRoute('/projetos')}
                            onFocus={() => prefetchRoute('/projetos')}
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

                    <IconButton
                        onClick={toggleMobileMenu}
                        sx={{
                            display: { xs: 'inline-flex', md: 'none' },
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.16)',
                            borderRadius: '10px'
                        }}
                        aria-label="Abrir menu"
                    >
                        {mobileOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
                    </IconButton>
                </Toolbar>
            </Container>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={closeMobileMenu}
                PaperProps={{
                    sx: {
                        width: 'min(82vw, 320px)',
                        background: 'rgba(8, 8, 8, 0.98)',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        pt: 2,
                        px: 2,
                        color: '#fff'
                    }
                }}
            >
                <Stack spacing={1.2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pb: 1.2 }}>
                        <BrandNetworkMark size={100} textColor="#F5F5F5" motionLevel="subtle" />

                        <IconButton onClick={closeMobileMenu} sx={{ color: '#fff' }} aria-label="Fechar menu">
                            <TbX size={20} />
                        </IconButton>
                    </Stack>

                    {navLinks.map((link) => {
                        const active = isRouteActive(pathname, link.to);

                        return (
                            <Button
                                key={`mobile-${link.to}`}
                                component={RouterLink}
                                to={link.to}
                                onClick={() => {
                                    onNavigate({ to: link.to, label: `Menu mobile ${link.label}` });
                                    closeMobileMenu();
                                }}
                                onMouseEnter={() => prefetchRoute(link.to)}
                                onFocus={() => prefetchRoute(link.to)}
                                sx={{
                                    justifyContent: 'flex-start',
                                    borderRadius: '10px',
                                    py: 1.05,
                                    px: 1.4,
                                    color: active ? activeColor : 'rgba(255,255,255,0.86)',
                                    border: `1px solid ${active ? `${activeColor}66` : 'rgba(255,255,255,0.1)'}`,
                                    background: active ? `${activeColor}14` : 'transparent',
                                    fontWeight: active ? 800 : 700,
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: active ? `${activeColor}1F` : 'rgba(255,255,255,0.05)'
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
                        onClick={() => {
                            onNavigate({ to: '/projetos', label: 'Menu mobile iniciar projeto' });
                            closeMobileMenu();
                        }}
                        variant="contained"
                        sx={{
                            mt: 1,
                            borderRadius: '12px',
                            py: 1.2,
                            fontWeight: 800,
                            color: '#fff',
                            backgroundColor: `${activeColor}D9`,
                            boxShadow: `0 8px 20px ${activeColor}30`,
                            '&:hover': {
                                backgroundColor: activeColor,
                                boxShadow: `0 10px 24px ${activeColor}4A`
                            }
                        }}
                    >
                        Iniciar Projeto
                    </Button>
                </Stack>
            </Drawer>
        </AppBar>
    );
};

export default function MainLayout() {
    const location = useLocation();
    const [showBrandIntro, setShowBrandIntro] = useState(true);
    const previousPathRef = useRef(location.pathname);
    const [trackingConsent, setTrackingConsent] = useState(() => getTrackingConsentStatus());

    function handleBrandIntroDone() {
        setShowBrandIntro(false);
    }

    useEffect(() => {
        const rootStyle = document.documentElement.style;
        const scrollTheme = getRouteBrandTheme(location.pathname);

        rootStyle.setProperty('--page-scroll-start', scrollTheme.start);
        rootStyle.setProperty('--page-scroll-end', scrollTheme.end);
    }, [location.pathname]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [location.pathname]);

    useEffect(() => {
        const previousPath = previousPathRef.current;
        trackRouteNavigation(previousPath, location.pathname);
        previousPathRef.current = location.pathname;
    }, [location.pathname]);

    function handleAcceptTracking() {
        setTrackingConsentStatus('accepted');
        setTrackingConsent('accepted');
        trackPageViewFromPath(location.pathname, { source: 'consent_accept' });
    }

    function handleRejectTracking() {
        setTrackingConsentStatus('rejected');
        setTrackingConsent('rejected');
    }

    function handleNavigate({ to, label }) {
        trackAction({
            page: location.pathname,
            section: 'navigator',
            action: 'click_navigation',
            label,
            meta: {
                to
            }
        });
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <BrandIntroOverlay
                open={showBrandIntro}
                onDone={handleBrandIntroDone}
                duration={1650}
            />
            <Navbar pathname={location.pathname} onNavigate={handleNavigate} />

            {/* O Outlet renderiza a rota filha (no caso, a Home) */}
            <Box sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>

            {trackingConsent === 'pending' ? (
                <Box
                    sx={{
                        position: 'fixed',
                        left: { xs: 12, md: 24 },
                        right: { xs: 12, md: 24 },
                        bottom: { xs: 12, md: 18 },
                        zIndex: 1400,
                        p: { xs: 1.6, md: 2 },
                        borderRadius: '14px',
                        border: '1px solid rgba(255,255,255,0.14)',
                        background: 'rgba(10,10,12,0.94)',
                        backdropFilter: 'blur(14px)',
                        boxShadow: '0 16px 34px rgba(0,0,0,0.38)'
                    }}
                >
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
                        <Typography sx={{ color: 'rgba(228,228,231,0.88)', fontSize: { xs: '0.84rem', md: '0.9rem' }, lineHeight: 1.6, maxWidth: 900 }}>
                            Coletamos dados de navegação e interações para melhorar sua experiência e entender quais conteúdos são mais úteis. Você pode aceitar ou recusar a coleta.
                        </Typography>

                        <Stack direction="row" spacing={0.9} sx={{ width: { xs: '100%', md: 'auto' } }}>
                            <Button
                                onClick={handleRejectTracking}
                                variant="outlined"
                                sx={{
                                    borderRadius: '999px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    color: 'rgba(228,228,231,0.9)',
                                    borderColor: 'rgba(255,255,255,0.22)',
                                    width: { xs: '50%', md: 'auto' }
                                }}
                            >
                                Recusar
                            </Button>
                            <Button
                                onClick={handleAcceptTracking}
                                variant="contained"
                                sx={{
                                    borderRadius: '999px',
                                    textTransform: 'none',
                                    fontWeight: 800,
                                    bgcolor: '#7C3AED',
                                    '&:hover': { bgcolor: '#6D28D9' },
                                    width: { xs: '50%', md: 'auto' }
                                }}
                            >
                                Aceitar coleta
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            ) : null}

            <Footer />
        </Box>
    );
}