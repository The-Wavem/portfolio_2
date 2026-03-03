import { memo, useMemo, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

function SimpleEngagementChartBase({ title, series }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
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
    const stepWidth = series.length > 1
        ? (chartWidth - horizontalPadding * 2) / (series.length - 1)
        : (chartWidth - horizontalPadding * 2);
    const activeIndex = hoveredIndex !== null && hoveredIndex >= 0 && hoveredIndex < series.length
        ? hoveredIndex
        : null;
    const activePoint = activeIndex !== null ? series[activeIndex] : null;
    const activeVisitsPoint = activeIndex !== null ? visitsPoints[activeIndex] : null;
    const activeActionsPoint = activeIndex !== null ? actionsPoints[activeIndex] : null;
    const tooltipLeft = useMemo(() => {
        if (!activeVisitsPoint) {
            return 14;
        }

        const raw = (activeVisitsPoint[0] / chartWidth) * 100;
        return Math.max(14, Math.min(86, raw));
    }, [activeVisitsPoint, chartWidth]);

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

                <Box
                    onMouseLeave={() => setHoveredIndex(null)}
                    sx={{ minHeight: 220, overflow: 'hidden', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(255,255,255,0.02)', px: 1.2, py: 1, position: 'relative' }}
                >
                    {activePoint ? (
                        <Box
                            sx={{
                                position: 'absolute',
                                left: `${tooltipLeft}%`,
                                top: 10,
                                transform: 'translateX(-50%)',
                                zIndex: 3,
                                px: 1.1,
                                py: 0.9,
                                borderRadius: '10px',
                                border: '1px solid rgba(124,58,237,0.42)',
                                background: 'linear-gradient(160deg, rgba(22,22,30,0.94), rgba(10,10,16,0.94))',
                                backdropFilter: 'blur(8px)',
                                boxShadow: '0 10px 24px rgba(7,7,12,0.42)',
                                minWidth: 128,
                                pointerEvents: 'none'
                            }}
                        >
                            <Typography sx={{ color: 'rgba(228,228,231,0.8)', fontSize: '0.72rem', fontWeight: 700 }}>
                                {activePoint.date}
                            </Typography>
                            <Stack direction="row" spacing={1.1} sx={{ mt: 0.4 }}>
                                <Typography sx={{ color: '#C4B5FD', fontSize: '0.74rem', fontWeight: 700 }}>
                                    Visitas: {activePoint.visits}
                                </Typography>
                                <Typography sx={{ color: '#FDE68A', fontSize: '0.74rem', fontWeight: 700 }}>
                                    Ações: {activePoint.actions}
                                </Typography>
                            </Stack>
                        </Box>
                    ) : null}

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

                        {activeVisitsPoint && activeActionsPoint ? (
                            <>
                                <line
                                    x1={activeVisitsPoint[0]}
                                    x2={activeVisitsPoint[0]}
                                    y1={verticalPadding}
                                    y2={chartHeight - verticalPadding}
                                    stroke="rgba(196,181,253,0.38)"
                                    strokeWidth="0.6"
                                    strokeDasharray="1.6 1.6"
                                />
                                <circle cx={activeVisitsPoint[0]} cy={activeVisitsPoint[1]} r="1.4" fill="#8B5CF6" stroke="rgba(255,255,255,0.75)" strokeWidth="0.4" />
                                <circle cx={activeActionsPoint[0]} cy={activeActionsPoint[1]} r="1.4" fill="#F59E0B" stroke="rgba(255,255,255,0.75)" strokeWidth="0.4" />
                            </>
                        ) : null}

                        {series.map((_, index) => {
                            const centerX = visitsPoints[index]?.[0] ?? horizontalPadding;
                            const rectWidth = stepWidth;
                            const rectX = Math.max(horizontalPadding, centerX - rectWidth / 2);

                            return (
                                <rect
                                    key={`hit-${index}`}
                                    x={rectX}
                                    y={verticalPadding}
                                    width={rectWidth}
                                    height={chartHeight - verticalPadding * 2}
                                    fill="transparent"
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onClick={() => setHoveredIndex(index)}
                                />
                            );
                        })}
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
