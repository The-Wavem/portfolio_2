import { memo } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

function TopActionsCardBase({ items, onOpenAll, totalInteractions }) {
    const maxValue = Math.max(...items.map((item) => item.value), 1);

    return (
        <Box
            sx={{
                p: { xs: 2.6, md: 3.2 },
                borderRadius: '18px',
                background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))',
                border: '1px solid rgba(255,255,255,0.08)',
                height: '100%',
                transition: 'border-color 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                    borderColor: 'rgba(245,158,11,0.36)',
                    boxShadow: '0 10px 26px rgba(245,158,11,0.12)'
                }
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.2}>
                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.6rem' }, letterSpacing: '-0.01em' }}>
                    O que estão fazendo?
                </Typography>
                <Button
                    onClick={onOpenAll}
                    sx={{
                        borderRadius: '999px',
                        textTransform: 'none',
                        fontWeight: 700,
                        color: '#DDD6FE',
                        border: '1px solid rgba(124,58,237,0.42)',
                        px: 1.4,
                        minWidth: 0,
                        transition: 'all 180ms ease',
                        '&:hover': {
                            borderColor: 'rgba(167,139,250,0.8)',
                            bgcolor: 'rgba(124,58,237,0.18)'
                        }
                    }}
                >
                    Ver todas
                </Button>
            </Stack>

            <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.82rem', mb: 1.1 }}>
                {totalInteractions} interações no período selecionado.
            </Typography>

            <Stack spacing={1.6}>
                {items.map((item) => (
                    <Box key={item.id}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                            <Typography sx={{ color: '#E4E4E7', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.9rem' }}>{item.label}</Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontWeight: 700 }}>{item.value}</Typography>
                        </Stack>
                        <Box sx={{ width: '100%', height: 6, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.14)' }}>
                            <Box
                                sx={{
                                    width: `${(item.value / maxValue) * 100}%`,
                                    height: '100%',
                                    borderRadius: '999px',
                                    bgcolor: '#F59E0B',
                                    transition: 'width 280ms ease'
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

export const TopActionsCard = memo(TopActionsCardBase);
