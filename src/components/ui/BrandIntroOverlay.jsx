import { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import BrandNetworkMark from '@/components/ui/BrandNetworkMark';
import { getCurrentPathname, getRouteBrandTheme } from '@/theme/routeBrandTheme';

export default function BrandIntroOverlay({
    open,
    onDone,
    duration = 1400,
    accentColor,
    nodeColor,
    linkColor,
    textColor
}) {
    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            onDone?.();
        }, duration);

        return () => window.clearTimeout(timer);
    }, [duration, onDone, open]);

    if (!open) {
        return null;
    }

    const currentPath = getCurrentPathname();
    const routeTheme = getRouteBrandTheme(currentPath);
    const resolvedAccentColor = accentColor || routeTheme.start;
    const resolvedNodeColor = nodeColor || routeTheme.end;
    const resolvedLinkColor = linkColor || routeTheme.start;
    const resolvedTextColor = textColor || '#111111';

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 1400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `radial-gradient(circle at 50% 18%, ${resolvedAccentColor}38 0%, rgba(5,5,5,0.98) 46%)`,
                backdropFilter: 'blur(4px)'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.42, ease: 'easeOut' }}
            >
                <Stack alignItems="center" spacing={1.6}>
                    <Typography sx={{ color: 'rgba(228,228,231,0.84)', fontSize: '0.76rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                        Bem-vindo à The Wavem
                    </Typography>

                    <Box
                        sx={{
                            px: { xs: 1.2, sm: 2 },
                            py: { xs: 1.2, sm: 1.6 },
                            borderRadius: '18px',
                            background: '#ECECEF',
                            border: '1px solid rgba(255,255,255,0.35)',
                            boxShadow: '0 24px 58px rgba(0,0,0,0.42)'
                        }}
                    >
                        <BrandNetworkMark size={520} textColor={resolvedTextColor} nodeColor={resolvedNodeColor} linkColor={resolvedLinkColor} surface="light" />
                    </Box>

                    <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        preparando sua experiência
                    </Typography>
                </Stack>
            </motion.div>
        </Box>
    );
}
