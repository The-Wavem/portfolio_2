import { Outlet, NavLink } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import {
    TbEye,
    TbLayoutGrid,
    TbMessage,
    TbBulb,
    TbCode,
    TbRosetteDiscountCheck,
    TbLayoutList,
    TbHelp,
    TbLogout,
    TbArrowLeft
} from 'react-icons/tb';

const adminLinks = [
    { label: 'Visão Geral', to: '/admin', icon: TbEye, end: true },
    { label: 'Hero & Perfil', to: '/admin/hero-perfil', icon: TbLayoutGrid },
    { label: 'Contato', to: '/admin/contato', icon: TbMessage },
    { label: 'Filosofia', to: '/admin/filosofia', icon: TbBulb },
    { label: 'Toolkit (Skills)', to: '/admin/toolkit', icon: TbCode },
    { label: 'Certificados', to: '/admin/certificados', icon: TbRosetteDiscountCheck },
    { label: 'Meus Projetos', to: '/admin/projetos', icon: TbLayoutList },
    { label: 'FAQ / Dúvidas', to: '/admin/faq', icon: TbHelp }
];

export default function AdminLayout() {
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
                    {adminLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                            <Button
                                key={link.to}
                                component={NavLink}
                                to={link.to}
                                end={link.end}
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
                                <Icon size={19} />
                                {link.label}
                            </Button>
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
