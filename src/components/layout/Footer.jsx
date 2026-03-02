import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import { TbBrandGithub, TbBrandInstagram, TbBrandLinkedin, TbBrandWhatsapp, TbMail } from 'react-icons/tb';
import { getContactChannels } from '@/service/content';
import BrandNetworkMark from '../ui/BrandNetworkMark';

const socialLinks = [
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com', icon: TbBrandInstagram },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com', icon: TbBrandLinkedin },
    { id: 'github', label: 'GitHub', href: 'https://github.com', icon: TbBrandGithub }
];

const footerNavigation = [
    { id: 'inicio', label: 'Início', href: '/' },
    { id: 'projetos', label: 'Projetos', href: '/projetos' },
    { id: 'sobre', label: 'Sobre', href: '/sobre' },
];

export default function Footer() {
    const channels = getContactChannels();
    const whatsappChannel = channels.find((channel) => channel.id === 'whatsapp');
    const emailChannel = channels.find((channel) => channel.id === 'email');

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: 'linear-gradient(180deg, rgba(8,8,8,0.96) 0%, rgba(5,5,5,1) 100%)'
            }}
        >
            <Container maxWidth="lg" sx={{ py: { xs: 4.5, md: 6 } }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
                        gap: { xs: 3, md: 2.6 }
                    }}
                >
                    <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / span 5' } }}>
                        <BrandNetworkMark size={100} textColor="#F5F5F5" motionLevel="subtle" />

                        <Typography sx={{ mt: 1.1, color: 'rgba(228,228,231,0.72)', lineHeight: 1.75, maxWidth: 420, fontSize: '0.92rem' }}>
                            Criação e manutenção de aplicações digitais com foco em clareza técnica, performance e crescimento contínuo do negócio.
                        </Typography>

                        <Stack direction="row" spacing={0.8} sx={{ mt: 1.8 }}>
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <IconButton
                                        key={social.id}
                                        component="a"
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        sx={{
                                            color: 'rgba(255,255,255,0.84)',
                                            border: '1px solid rgba(255,255,255,0.16)',
                                            borderRadius: '10px',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                color: '#fff',
                                                background: 'rgba(124,58,237,0.12)'
                                            }
                                        }}
                                    >
                                        <Icon size={18} />
                                    </IconButton>
                                );
                            })}
                        </Stack>
                    </Box>

                    <Box sx={{ gridColumn: { xs: '1 / -1', md: '6 / span 3' } }}>
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.01em' }}>
                            Navegação
                        </Typography>
                        <Stack spacing={0.8} sx={{ mt: 1.2 }}>
                            {footerNavigation.map((item) => (
                                <Button
                                    key={item.id}
                                    component={RouterLink}
                                    to={item.href}
                                    variant="text"
                                    sx={{
                                        p: 0,
                                        minWidth: 0,
                                        justifyContent: 'flex-start',
                                        color: 'rgba(228,228,231,0.72)',
                                        fontWeight: 600,
                                        '&:hover': { color: '#fff', background: 'transparent' }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Stack>
                    </Box>

                    <Box sx={{ gridColumn: { xs: '1 / -1', md: '9 / span 4' } }}>
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.01em' }}>
                            Contato
                        </Typography>
                        <Stack spacing={0.9} sx={{ mt: 1.2 }}>
                            <Button
                                component="a"
                                href={whatsappChannel?.href}
                                target="_blank"
                                rel="noreferrer"
                                variant="text"
                                startIcon={<TbBrandWhatsapp size={16} />}
                                sx={{ p: 0, minWidth: 0, justifyContent: 'flex-start', color: 'rgba(228,228,231,0.72)', fontWeight: 600, '&:hover': { color: '#fff', background: 'transparent' } }}
                            >
                                WhatsApp direto
                            </Button>

                            <Button
                                component="a"
                                href={emailChannel?.href}
                                variant="text"
                                startIcon={<TbMail size={16} />}
                                sx={{ p: 0, minWidth: 0, justifyContent: 'flex-start', color: 'rgba(228,228,231,0.72)', fontWeight: 600, '&:hover': { color: '#fff', background: 'transparent' } }}
                            >
                                contato.thewavem@gmail.com
                            </Button>

                            <Typography sx={{ mt: 0.5, color: 'rgba(228,228,231,0.58)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                                Atendimento em horário comercial · Resposta inicial em até 1 dia útil.
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Divider sx={{ my: { xs: 2.8, md: 3.2 }, borderColor: 'rgba(255,255,255,0.08)' }} />

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2} justifyContent="space-between">
                    <Typography sx={{ color: 'rgba(228,228,231,0.58)', fontSize: '0.8rem' }}>
                        © {new Date().getFullYear()} The Wavem. Todos os direitos reservados.
                    </Typography>
                    <Typography sx={{ color: 'rgba(228,228,231,0.5)', fontSize: '0.78rem' }}>
                        Tratamento de dados e privacidade alinhados com a LGPD durante o processo comercial e execução técnica.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}