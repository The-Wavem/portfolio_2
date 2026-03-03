import { useEffect, useState } from 'react';
import { Alert, Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { createAdminSession, isAdminSessionValid, verifyAdminPassword } from '@/service/auth/adminAuth.service';

export default function AdminLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const destinationPath = typeof location.state?.from === 'string' && location.state.from.startsWith('/admin')
        ? location.state.from
        : '/admin';

    useEffect(() => {
        if (isAdminSessionValid()) {
            navigate('/admin', { replace: true });
        }
    }, [navigate]);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!password.trim()) {
            setErrorMessage('Informe a senha do admin.');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const result = await verifyAdminPassword(password);

            if (result.ok) {
                createAdminSession();
                navigate(destinationPath, { replace: true });
                return;
            }

            if (result.reason === 'not-configured') {
                setErrorMessage('Senha de admin não configurada no Firebase. Crie o documento content/admin__auth com o campo data.passwordHash.');
            } else {
                setErrorMessage('Senha inválida.');
            }
        } catch {
            setErrorMessage('Falha ao validar credenciais agora.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                bgcolor: '#050505',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 12% 10%, rgba(124,58,237,0.28) 0%, rgba(5,5,5,0) 34%), radial-gradient(circle at 88% 18%, rgba(56,189,248,0.14) 0%, rgba(5,5,5,0) 36%)',
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        p: { xs: 2.3, md: 2.8 },
                        borderRadius: '20px',
                        border: '1px solid rgba(124,58,237,0.36)',
                        bgcolor: 'rgba(12,12,14,0.92)',
                        backdropFilter: 'blur(14px)',
                        boxShadow: '0 24px 72px rgba(8,8,12,0.56)'
                    }}
                >
                    <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '1.6rem', md: '1.9rem' }, letterSpacing: '-0.02em' }}>
                        Login Admin
                    </Typography>
                    <Typography sx={{ mt: 0.65, color: 'rgba(228,228,231,0.74)', fontSize: '0.9rem' }}>
                        Acesso protegido da área administrativa.
                    </Typography>

                    <Stack spacing={1.2} sx={{ mt: 2.1 }}>
                        <TextField
                            type="password"
                            label="Senha"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoFocus
                            fullWidth
                            sx={{
                                '& .MuiInputBase-root': {
                                    bgcolor: 'rgba(7,7,8,0.88)',
                                    borderRadius: '13px',
                                    color: '#F5F5F5'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255,255,255,0.16)'
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(228,228,231,0.74)'
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#C4B5FD'
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                                borderRadius: '999px',
                                textTransform: 'none',
                                fontWeight: 800,
                                py: 1.08,
                                bgcolor: '#7C3AED',
                                '&:hover': { bgcolor: '#6D28D9' }
                            }}
                        >
                            {isSubmitting ? 'Validando...' : 'Entrar no Admin'}
                        </Button>
                    </Stack>

                    {errorMessage ? (
                        <Alert
                            severity="error"
                            sx={{ mt: 1.3, borderRadius: '12px', bgcolor: 'rgba(220,38,38,0.16)', color: '#FECACA', border: '1px solid rgba(220,38,38,0.42)' }}
                        >
                            {errorMessage}
                        </Alert>
                    ) : null}
                </Box>
            </Container>
        </Box>
    );
}
