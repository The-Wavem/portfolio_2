import { memo } from 'react';
import { Box, Stack, Typography } from '@mui/material';

function PagePresenceCardBase({ items }) {
    const maxValue = Math.max(...items.map((item) => item.value), 1);

    return (
        <Box sx={{ p: { xs: 2.6, md: 3.2 }, borderRadius: '18px', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.4rem' }, mb: 1.8, letterSpacing: '-0.01em' }}>
                Presença por página
            </Typography>

            <Stack spacing={1.2}>
                {items.length ? items.map((item) => (
                    <Box key={item.id}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.45}>
                            <Typography sx={{ color: '#E4E4E7', fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontWeight: 700, fontSize: '0.85rem' }}>
                                {item.value} ({item.percentage}%)
                            </Typography>
                        </Stack>
                        <Box sx={{ width: '100%', height: 8, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.14)' }}>
                            <Box
                                sx={{
                                    width: `${(item.value / maxValue) * 100}%`,
                                    height: '100%',
                                    borderRadius: '999px',
                                    bgcolor: '#8B5CF6'
                                }}
                            />
                        </Box>
                    </Box>
                )) : (
                    <Typography sx={{ color: 'rgba(228,228,231,0.7)', fontSize: '0.9rem' }}>
                        Sem dados de presença ainda.
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}

function RouteFlowCardBase({ items }) {
    const maxValue = Math.max(...items.map((item) => item.value), 1);

    return (
        <Box sx={{ p: { xs: 2.6, md: 3.2 }, borderRadius: '18px', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))', border: '1px solid rgba(255,255,255,0.08)', height: '100%' }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.35rem' }, mb: 1.8, letterSpacing: '-0.01em' }}>
                Fluxo de navegação
            </Typography>

            <Stack spacing={1.2}>
                {items.length ? items.map((item) => (
                    <Box key={item.id}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.45}>
                            <Typography sx={{ color: '#E4E4E7', fontWeight: 700, fontSize: '0.86rem' }}>{item.label}</Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontWeight: 700, fontSize: '0.85rem' }}>{item.value}</Typography>
                        </Stack>
                        <Box sx={{ width: '100%', height: 7, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.14)' }}>
                            <Box sx={{ width: `${(item.value / maxValue) * 100}%`, height: '100%', borderRadius: '999px', bgcolor: '#22D3EE' }} />
                        </Box>
                    </Box>
                )) : (
                    <Typography sx={{ color: 'rgba(228,228,231,0.7)', fontSize: '0.9rem' }}>
                        Sem dados de navegação ainda.
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}

function FaqInsightsCardBase({ items }) {
    const maxValue = Math.max(...items.map((item) => item.value), 1);

    return (
        <Box sx={{ p: { xs: 2.6, md: 3.2 }, borderRadius: '18px', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))', border: '1px solid rgba(255,255,255,0.08)', height: '100%' }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.35rem' }, mb: 1.8, letterSpacing: '-0.01em' }}>
                Dúvidas do FAQ
            </Typography>

            <Stack spacing={1.2}>
                {items.length ? items.map((item) => (
                    <Box key={item.id}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.45}>
                            <Typography sx={{ color: '#E4E4E7', fontWeight: 700, fontSize: '0.86rem' }}>{item.label}</Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontWeight: 700, fontSize: '0.85rem' }}>{item.value}</Typography>
                        </Stack>
                        <Box sx={{ width: '100%', height: 7, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.14)' }}>
                            <Box sx={{ width: `${(item.value / maxValue) * 100}%`, height: '100%', borderRadius: '999px', bgcolor: '#F472B6' }} />
                        </Box>
                    </Box>
                )) : (
                    <Typography sx={{ color: 'rgba(228,228,231,0.7)', fontSize: '0.9rem' }}>
                        Ninguém abriu o FAQ ainda.
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}

export const PagePresenceCard = memo(PagePresenceCardBase);
export const RouteFlowCard = memo(RouteFlowCardBase);
export const FaqInsightsCard = memo(FaqInsightsCardBase);
