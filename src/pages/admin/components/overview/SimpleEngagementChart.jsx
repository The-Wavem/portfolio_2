import { memo } from 'react';
import { Box, Stack, Typography } from '@mui/material';

function SimpleEngagementChartBase({ title, series }) {
    const maxValue = Math.max(
        ...series.flatMap((point) => [point.visits, point.actions]),
        1
    );
    const chartWidth = 100;
    const chartHeight = 200;
    const horizontalPadding = 4;
    const verticalPadding = 10;

    const buildPoint = (index, value) => {
        const denominator = Math.max(series.length - 1, 1);
        const x = horizontalPadding + (index / denominator) * (chartWidth - horizontalPadding * 2);
        const y = chartHeight - verticalPadding - (value / maxValue) * (chartHeight - verticalPadding * 2);
        return [x, y];
    };

    const visitsPoints = series.map((point, index) => buildPoint(index, point.visits));
    const actionsPoints = series.map((point, index) => buildPoint(index, point.actions));

    const buildLinePath = (points) => points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
    const buildAreaPath = (points) => {
        if (!points.length) return '';

        const firstX = points[0][0];
        const lastX = points[points.length - 1][0];
        const baselineY = chartHeight - verticalPadding;

        return `${buildLinePath(points)} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
    };

    const tickIndexes = Array.from(new Set([
        0,
        Math.floor((series.length - 1) / 3),
        Math.floor(((series.length - 1) * 2) / 3),
        series.length - 1
    ])).filter((index) => index >= 0);

    const totalVisits = series.reduce((acc, point) => acc + point.visits, 0);
    const totalActions = series.reduce((acc, point) => acc + point.actions, 0);
    const peakPoint = series.reduce((peak, point) => {
        const current = point.visits + point.actions;
        const peakValue = (peak?.visits ?? 0) + (peak?.actions ?? 0);
        return current > peakValue ? point : peak;
    }, series[0]);

    return (
        <Box
            sx={{
                p: { xs: 2.6, md: 3.2 },
                borderRadius: '18px',
                background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'border-color 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                    borderColor: 'rgba(124,58,237,0.38)',
                    boxShadow: '0 10px 26px rgba(124,58,237,0.14)'
                },
                '&:hover .engagement-line-visits': {
                    strokeWidth: 1.7
                },
                '&:hover .engagement-line-actions': {
                    strokeWidth: 1.7
                }
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.2}>
                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.55rem' }, letterSpacing: '-0.01em' }}>{title}</Typography>
                <Stack direction="row" spacing={1.6}>
                    <Stack direction="row" spacing={0.6} alignItems="center">
                        <Box sx={{ width: 9, height: 9, borderRadius: '999px', bgcolor: '#8B5CF6' }} />
                        <Typography sx={{ color: 'rgba(228,228,231,0.7)', fontSize: '0.9rem' }}>Visitas</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.6} alignItems="center">
                        <Box sx={{ width: 9, height: 9, borderRadius: '999px', bgcolor: '#F59E0B' }} />
                        <Typography sx={{ color: 'rgba(228,228,231,0.7)', fontSize: '0.9rem' }}>Ações</Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Box sx={{ minHeight: 220, overflow: 'hidden' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.1} sx={{ mb: 1.4 }}>
                    <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontSize: '0.84rem' }}>
                        Total visitas: <Box component="span" sx={{ color: '#DDD6FE', fontWeight: 700 }}>{totalVisits}</Box>
                    </Typography>
                    <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontSize: '0.84rem' }}>
                        Total ações: <Box component="span" sx={{ color: '#FDE68A', fontWeight: 700 }}>{totalActions}</Box>
                    </Typography>
                    {peakPoint ? (
                        <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontSize: '0.84rem' }}>
                            Pico: <Box component="span" sx={{ color: '#E4E4E7', fontWeight: 700 }}>{peakPoint.date}</Box>
                        </Typography>
                    ) : null}
                </Stack>

                <Box sx={{ minHeight: 220, overflow: 'hidden', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(255,255,255,0.02)', px: 1.2, py: 1 }}>
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="200" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="visitsArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(139,92,246,0.34)" />
                                <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                            </linearGradient>
                            <linearGradient id="actionsArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(245,158,11,0.3)" />
                                <stop offset="100%" stopColor="rgba(245,158,11,0)" />
                            </linearGradient>
                        </defs>

                        {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
                            <line
                                key={ratio}
                                x1={horizontalPadding}
                                x2={chartWidth - horizontalPadding}
                                y1={chartHeight - verticalPadding - (chartHeight - verticalPadding * 2) * ratio}
                                y2={chartHeight - verticalPadding - (chartHeight - verticalPadding * 2) * ratio}
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="0.4"
                                strokeDasharray="1.6 1.6"
                            />
                        ))}

                        <path d={buildAreaPath(visitsPoints)} fill="url(#visitsArea)" />
                        <path d={buildAreaPath(actionsPoints)} fill="url(#actionsArea)" />

                        <path className="engagement-line-visits" d={buildLinePath(visitsPoints)} fill="none" stroke="#8B5CF6" strokeWidth="1.2" style={{ transition: 'stroke-width 180ms ease' }} />
                        <path className="engagement-line-actions" d={buildLinePath(actionsPoints)} fill="none" stroke="#F59E0B" strokeWidth="1.2" style={{ transition: 'stroke-width 180ms ease' }} />

                        {visitsPoints.map(([x, y], index) => (
                            <circle key={`v-${index}`} cx={x} cy={y} r="0.8" fill="#8B5CF6" />
                        ))}
                        {actionsPoints.map(([x, y], index) => (
                            <circle key={`a-${index}`} cx={x} cy={y} r="0.8" fill="#F59E0B" />
                        ))}
                    </svg>

                    <Box
                        sx={{
                            mt: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            px: 0.5
                        }}
                    >
                        {tickIndexes.map((index) => {
                            const point = series[index];

                            return (
                                <Typography key={`${point?.date ?? index}-${index}`} sx={{ color: 'rgba(228,228,231,0.62)', fontSize: '0.76rem', textAlign: 'center', minHeight: 18 }}>
                                    {point?.date ?? '-'}
                                </Typography>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export const SimpleEngagementChart = memo(SimpleEngagementChartBase);
