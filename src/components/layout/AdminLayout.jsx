import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import {
    TbEye,
    TbHome,
    TbSettings,
    TbUser,
    TbLayoutList,
    TbHelp,
    TbLogout,
    TbArrowLeft,
    TbChevronDown,
    TbChevronRight
} from 'react-icons/tb';
import { AdminUnsavedChangesContext } from '@/pages/admin/adminUnsavedChanges.context';
import { signOutAdmin } from '@/service/auth/adminAuth.service';

const adminPageGroups = [
    {
        key: 'home',
        label: 'Home',
        icon: TbHome,
        sections: [
            { key: 'hero', label: 'Hero & Perfil' },
            { key: 'processo', label: 'Filosofia / Processo' },
            { key: 'portfolio', label: 'Portfólio' },
            { key: 'contato', label: 'Contato' },
            { key: 'faq', label: 'FAQ / Dúvidas' }
        ]
    },
    {
        key: 'servicos',
        label: 'Serviços',
        icon: TbSettings,
        sections: [
            { key: 'hero', label: 'Hero' },
            { key: 'destaques', label: 'Destaques' },
            { key: 'processo', label: 'Processo' }
        ]
    },
    {
        key: 'sobre',
        label: 'Sobre',
        icon: TbUser,
        sections: [
            { key: 'hero', label: 'Hero' },
            { key: 'historia', label: 'História' },
            { key: 'time', label: 'Time' }
        ]
    },
    {
        key: 'projetos',
        label: 'Projetos',
        icon: TbLayoutList,
        sections: [
            { key: 'hero', label: 'Hero' },
            { key: 'catalogo', label: 'Catálogo' }
        ]
    }
];

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathParts = location.pathname.split('/').filter(Boolean);
    const currentPage = pathParts[1] || null;
    const currentSection = pathParts[2] || null;
    const [expandedPage, setExpandedPage] = useState(currentPage);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [pendingNavigationPath, setPendingNavigationPath] = useState(null);
    const [pendingLogout, setPendingLogout] = useState(false);
    const currentPathRef = useRef(`${location.pathname}${location.search}${location.hash}`);

    useEffect(() => {
        if (currentPage) {
            setExpandedPage(currentPage);
        }
    }, [currentPage]);

    useEffect(() => {
        currentPathRef.current = `${location.pathname}${location.search}${location.hash}`;
    }, [location.pathname, location.search, location.hash]);

    const requestNavigation = useCallback((to) => {
        if (!to || location.pathname === to) {
            return;
        }

        if (hasUnsavedChanges) {
            setPendingNavigationPath(to);
            return;
        }

        navigate(to);
    }, [hasUnsavedChanges, location.pathname, navigate]);

    useEffect(() => {
        function handlePopState() {
            const targetPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
            const currentPath = currentPathRef.current;

            if (!hasUnsavedChanges || targetPath === currentPath) {
                return;
            }

            window.history.pushState(window.history.state, '', currentPath);
            setPendingNavigationPath(targetPath);
        }

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [hasUnsavedChanges]);

    function handlePageClick(pageKey) {
        if (expandedPage === pageKey) {
            setExpandedPage(null);
            return;
        }

        setExpandedPage(pageKey);
        requestNavigation(`/admin/${pageKey}`);
    }

    async function handleDiscardAndNavigate() {
        if (!pendingNavigationPath) {
            return;
        }

        setHasUnsavedChanges(false);

        if (pendingLogout) {
            await signOutAdmin();
            navigate('/admin/login', { replace: true });
            setPendingNavigationPath(null);
            setPendingLogout(false);
            return;
        }

        navigate(pendingNavigationPath);
        setPendingNavigationPath(null);
    }

    function handleCancelNavigation() {
        setPendingNavigationPath(null);
        setPendingLogout(false);
    }

    async function handleLogoutClick() {
        if (hasUnsavedChanges) {
            setPendingNavigationPath('/admin/login');
            setPendingLogout(true);
            return;
        }

        await signOutAdmin();
        navigate('/admin/login', { replace: true });
    }

    return (
        <AdminUnsavedChangesContext.Provider value={{ hasUnsavedChanges, setHasUnsavedChanges, requestNavigation }}>
            <Box
                sx={{
                    minHeight: '100vh',
                    position: 'relative',
                    bgcolor: '#050505',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' },
                    overflow: 'hidden'
                }}
            >
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 12% 8%, rgba(124,58,237,0.2) 0%, rgba(5,5,5,0) 36%), radial-gradient(circle at 90% 18%, rgba(56,189,248,0.1) 0%, rgba(5,5,5,0) 34%)',
                    pointerEvents: 'none'
                }}
            />

            <Box
                component="aside"
                sx={{
                    bgcolor: 'rgba(10,10,10,0.86)',
                    backdropFilter: 'blur(14px)',
                    borderRight: '1px solid rgba(255,255,255,0.08)',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: { xs: 'auto', lg: '100vh' },
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.55rem', letterSpacing: '-0.02em', px: 1, py: 0.8 }}>
                    ADMIN PORTFÓLIO
                </Typography>

                <Stack spacing={1} sx={{ mt: 1.6 }}>
                    <Button
                        onClick={() => requestNavigation('/admin')}
                        sx={{
                            justifyContent: 'flex-start',
                            gap: 1.2,
                            px: 1.4,
                            py: 1.15,
                            borderRadius: '999px',
                            color: 'rgba(244,244,245,0.9)',
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '1rem',
                            ...(location.pathname === '/admin' ? {
                                bgcolor: 'rgba(124,58,237,0.78)',
                                boxShadow: '0 10px 24px rgba(124,58,237,0.34)',
                                color: '#FFFFFF'
                            } : {}),
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.08)'
                            }
                        }}
                    >
                        <TbEye size={19} />
                        Visão Geral
                    </Button>

                    {adminPageGroups.map((group) => {
                        const Icon = group.icon;
                        const isExpanded = expandedPage === group.key;
                        const isPageActive = currentPage === group.key;

                        return (
                            <Box key={group.key}>
                                <Button
                                    onClick={() => handlePageClick(group.key)}
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        px: 1.4,
                                        py: 1.15,
                                        borderRadius: '999px',
                                        color: isPageActive ? '#FFFFFF' : 'rgba(244,244,245,0.9)',
                                        bgcolor: isPageActive ? 'rgba(124,58,237,0.62)' : 'transparent',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.08)'
                                        }
                                    }}
                                >
                                    <Stack direction="row" spacing={1.2} alignItems="center">
                                        <Icon size={19} />
                                        <span>{group.label}</span>
                                    </Stack>
                                    {isExpanded ? <TbChevronDown size={18} /> : <TbChevronRight size={18} />}
                                </Button>

                                {isExpanded ? (
                                    <Stack spacing={0.6} sx={{ pl: 2.4, pr: 0.2, pt: 0.8 }}>
                                        {group.sections.map((section) => {
                                            const isSectionActive = isPageActive && currentSection === section.key;

                                            return (
                                                <Button
                                                    key={section.key}
                                                    onClick={() => requestNavigation(`/admin/${group.key}/${section.key}`)}
                                                    sx={{
                                                        justifyContent: 'flex-start',
                                                        borderRadius: '12px',
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        fontSize: '0.92rem',
                                                        py: 0.78,
                                                        px: 1.2,
                                                        color: isSectionActive ? '#EDE9FE' : 'rgba(228,228,231,0.76)',
                                                        bgcolor: isSectionActive ? 'rgba(124,58,237,0.28)' : 'transparent',
                                                        border: isSectionActive ? '1px solid rgba(124,58,237,0.45)' : '1px solid transparent',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(255,255,255,0.06)'
                                                        }
                                                    }}
                                                >
                                                    {section.label}
                                                </Button>
                                            );
                                        })}
                                    </Stack>
                                ) : null}
                            </Box>
                        );
                    })}
                </Stack>

                <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Button
                        onClick={() => requestNavigation('/')}
                        startIcon={<TbArrowLeft size={18} />}
                        sx={{
                            width: '100%',
                            mb: 1,
                            borderRadius: '999px',
                            textTransform: 'none',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.88)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' }
                        }}
                    >
                        Voltar ao Site
                    </Button>
                    <Button
                        startIcon={<TbLogout size={18} />}
                        onClick={handleLogoutClick}
                        sx={{
                            width: '100%',
                            borderRadius: '999px',
                            textTransform: 'none',
                            fontWeight: 700,
                            color: '#F87171',
                            border: '1px solid rgba(248,113,113,0.4)',
                            '&:hover': { bgcolor: 'rgba(248,113,113,0.08)' }
                        }}
                    >
                        Sair
                    </Button>
                </Box>
            </Box>

            <Box component="main" sx={{ minWidth: 0, position: 'relative', zIndex: 1 }}>
                <Outlet />
            </Box>
            </Box>

            <Dialog
                open={Boolean(pendingNavigationPath)}
                onClose={handleCancelNavigation}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '18px',
                        bgcolor: 'rgba(12,12,14,0.98)',
                        border: '1px solid rgba(248,113,113,0.32)'
                    }
                }}
            >
                <DialogTitle sx={{ color: '#fff', fontWeight: 800 }}>
                    Alterações não salvas
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: 'rgba(228,228,231,0.82)', fontSize: '0.95rem' }}>
                        Você possui modificações não salvas nesta edição. Deseja sair mesmo assim?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 2.2, pb: 1.8 }}>
                    <Button
                        onClick={handleCancelNavigation}
                        sx={{ borderRadius: '999px', textTransform: 'none', fontWeight: 700, color: 'rgba(228,228,231,0.86)' }}
                    >
                        Continuar editando
                    </Button>
                    <Button
                        onClick={handleDiscardAndNavigate}
                        variant="contained"
                        sx={{ borderRadius: '999px', textTransform: 'none', fontWeight: 700, bgcolor: '#DC2626', '&:hover': { bgcolor: '#B91C1C' } }}
                    >
                        Sair sem salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </AdminUnsavedChangesContext.Provider>
    );
}
