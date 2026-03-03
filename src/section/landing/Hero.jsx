import { useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import BrandNetworkMark from '@components/ui/BrandNetworkMark';
import { getHomeHeroContent, getHomeHeroContentRemote } from '@/service/content';
import { trackAction } from '@/service/analytics/tracking.service';

const MotionTypography = motion.create(Typography);
const MotionBox = motion.create(Box);

export default function Hero() {
    const [hero, setHero] = useState(() => getHomeHeroContent());

    useEffect(() => {
        let isMounted = true;

        async function loadHeroRemote() {
            try {
                const remoteHero = await getHomeHeroContentRemote();
                if (isMounted && remoteHero) {
                    setHero(remoteHero);
                }
            } catch {
                return;
            }
        }

        loadHeroRemote();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Box
            sx={{
                minHeight: { xs: 'auto', md: '92vh' },
                display: 'flex',
                alignItems: 'center',
                background: 'radial-gradient(circle at 22% 8%, rgba(124, 58, 237, 0.2) 0%, rgba(5, 5, 5, 0) 42%), radial-gradient(circle at 82% 18%, rgba(56, 189, 248, 0.14) 0%, rgba(5, 5, 5, 0) 36%)',
                pt: { xs: 11, md: 10 },
                pb: { xs: 8, md: 6 },
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.div
                aria-hidden
                animate={{ opacity: [0.12, 0.2, 0.12], scale: [1, 1.04, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    right: '-140px',
                    top: '-100px',
                    width: 420,
                    height: 420,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.46) 0%, rgba(124,58,237,0) 70%)',
                    filter: 'blur(46px)',
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="lg">
                <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
                        gap: { xs: 3.5, md: 4 },
                        alignItems: 'center'
                    }}
                >
                    <Box textAlign={{ xs: 'center', md: 'left' }}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 1.2 }} alignItems={{ xs: 'center', md: 'center' }} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                            
                            <Typography variant="overline" color="primary" sx={{ letterSpacing: 3.2, fontWeight: 'bold', fontSize: '0.68rem' }}>
                                {hero.eyebrow}
                            </Typography>
                        </Stack>

                        <MotionTypography
                            variant="h2"
                            component="h1"
                            sx={{
                                mt: 2,
                                mb: 2.2,
                                background: 'linear-gradient(90deg, #FFF 0%, #A1A1AA 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: { xs: '2rem', sm: '2.7rem', md: '3.3rem' },
                                lineHeight: 1.05,
                                letterSpacing: '-0.03em'
                            }}
                        >
                            {hero.titleStart} <span style={{ color: '#7C3AED', WebkitTextFillColor: '#7C3AED' }}>{hero.titleHighlight}</span>
                        </MotionTypography>

                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: { xs: '100%', md: 620 }, mx: { xs: 'auto', md: 0 }, mb: 3.2, lineHeight: 1.6, fontSize: { xs: '0.98rem', md: '1.05rem' }, color: 'rgba(228,228,231,0.82)' }}>
                            {hero.description}
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                            <Button
                                component="a"
                                href={hero.primaryCta.href}
                                onClick={() => trackAction({ page: 'home', section: 'hero', action: 'click_primary_cta', label: hero.primaryCta.label })}
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 3.3,
                                    py: 1.3,
                                    fontSize: '1rem',
                                    fontWeight: 800,
                                    borderRadius: '999px',
                                    boxShadow: '0px 0px 20px rgba(124, 58, 237, 0.4)'
                                }}
                            >
                                {hero.primaryCta.label}
                            </Button>

                            <Button
                                component={RouterLink}
                                to={hero.secondaryCta.to}
                                onClick={() => trackAction({ page: 'home', section: 'hero', action: 'click_secondary_cta', label: hero.secondaryCta.label })}
                                variant="outlined"
                                size="large"
                                sx={{
                                    px: 3.1,
                                    py: 1.3,
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    borderRadius: '999px',
                                    borderColor: 'rgba(255,255,255,0.35)',
                                    color: '#fff',
                                    '&:hover': { borderColor: '#7C3AED', background: 'rgba(124,58,237,0.12)' }
                                }}
                            >
                                {hero.secondaryCta.label}
                            </Button>
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.8, sm: 1.8 }} sx={{ mt: 2 }} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                            {hero.trustPills.map((item) => (
                                <Typography key={item} sx={{ color: 'rgba(228,228,231,0.84)', fontSize: '0.82rem' }}>
                                    • {item}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>

                    <motion.div
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.16, ease: 'easeOut' }}
                        style={{ width: '100%' }}
                    >
                        <Box
                            sx={{
                                p: { xs: 2.1, md: 2.4 },
                                borderRadius: '18px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                                textAlign: 'left',
                                backdropFilter: 'blur(12px)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                aria-hidden
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                                    backgroundSize: '24px 24px',
                                    opacity: 0.22,
                                    pointerEvents: 'none'
                                }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                                <Typography sx={{ color: '#7C3AED', fontWeight: 800, fontSize: '0.73rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    {hero.executionContext.eyebrow}
                                </Typography>
                                <BrandNetworkMark size={80} textColor="#F5F5F5" motionLevel="subtle" />
                            </Box>

                            <Typography sx={{ mt: 0.8, color: '#fff', fontWeight: 800, fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.2 }}>
                                {hero.executionContext.title}
                            </Typography>

                            <Stack spacing={1.05} sx={{ mt: 1.4, position: 'relative', zIndex: 1 }}>
                                {hero.executionContext.steps.map((step) => (
                                    <Box
                                        key={step.id}
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: '34px 1fr',
                                            gap: 1,
                                            alignItems: 'center',
                                            p: 0.9,
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(255,255,255,0.03)'
                                        }}
                                    >
                                        <Box sx={{ width: 24, height: 24, borderRadius: '999px', border: '1px solid rgba(124,58,237,0.65)', color: '#C4B5FD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.66rem', fontWeight: 800 }}>
                                            {step.id}
                                        </Box>
                                        <Typography sx={{ color: 'rgba(228,228,231,0.84)', fontSize: '0.84rem' }}>{step.text}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </motion.div>
                </MotionBox>
            </Container>
        </Box>
    );
}