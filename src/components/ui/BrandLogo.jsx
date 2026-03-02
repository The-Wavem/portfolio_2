import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import logoTheWavem from '@assets/logo-the-wavem.png';

export default function BrandLogo({
    size = 30,
    compact = false,
    showLabel = true,
    label = 'THE WAVEM',
    labelColor = 'inherit',
    labelSx,
    accentColor,
    imageSx
}) {
    const [showFallback, setShowFallback] = useState(false);

    const logoSize = compact ? Math.max(20, size - 4) : size;

    return (
        <Stack direction="row" alignItems="center" spacing={compact ? 0.8 : 1.1}>
            {!showFallback ? (
                <Box
                    component="img"
                    src={logoTheWavem}
                    alt="Logo da The Wavem"
                    onError={() => setShowFallback(true)}
                    sx={{
                        width: logoSize,
                        height: logoSize,
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 10px rgba(124,58,237,0.32))',
                        ...imageSx
                    }}
                />
            ) : (
                <Box
                    sx={{
                        width: logoSize,
                        height: logoSize,
                        borderRadius: compact ? '8px' : '10px',
                        border: '1px solid rgba(124,58,237,0.52)',
                        background: 'linear-gradient(145deg, rgba(124,58,237,0.22), rgba(56,189,248,0.18))',
                        color: '#fff',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: compact ? '0.76rem' : '0.92rem'
                    }}
                >
                    W
                </Box>
            )}

            {showLabel && (
                <Typography
                    sx={{
                        fontWeight: 800,
                        letterSpacing: 1,
                        color: labelColor,
                        fontSize: compact ? '0.92rem' : '1.03rem',
                        transition: 'color 0.25s ease',
                        ...labelSx
                    }}
                >
                    {label}
                </Typography>
            )}

            {accentColor && (
                <Box
                    aria-hidden
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '999px',
                        bgcolor: accentColor,
                        boxShadow: `0 0 12px ${accentColor}`,
                        ml: 0.3
                    }}
                />
            )}
        </Stack>
    );
}
