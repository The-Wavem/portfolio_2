import { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
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

    useEffect(() => {
        if (currentPage) {
            setExpandedPage(currentPage);
        }
    }, [currentPage]);

    function handlePageClick(pageKey) {
        if (expandedPage === pageKey) {
            setExpandedPage(null);
            return;
        }

        setExpandedPage(pageKey);
        navigate(`/admin/${pageKey}`);
    }

    return (
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
                        component={NavLink}
                        to="/admin"
                        end
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
                            '&.active': {
                                bgcolor: 'rgba(124,58,237,0.78)',
                                boxShadow: '0 10px 24px rgba(124,58,237,0.34)',
                                color: '#FFFFFF'
                            },
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
                                                    component={NavLink}
                                                    to={`/admin/${group.key}/${section.key}`}
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
                        component={NavLink}
                        to="/"
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
    );
}
