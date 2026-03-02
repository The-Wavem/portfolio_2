import { useMemo, useState } from 'react';
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import {
    TbChartBar,
    TbClick,
    TbX,
    TbEye,
    TbTimeline,
    TbMouse,
    TbTrophy,
    TbUsers
} from 'react-icons/tb';
import { getAdminOverviewData } from '@/service/content';

const kpiIconMap = {
    eye: TbEye,
    click: TbClick,
    trophy: TbTrophy,
    mouse: TbMouse,
    users: TbUsers
};

function MetricCard({ item }) {
    const Icon = kpiIconMap[item.iconKey] ?? TbChartBar;

    return (
        <Box
            sx={{
                p: 2.8,
                borderRadius: '18px',
                background: `linear-gradient(160deg, ${item.accent}1C, rgba(16,16,18,0.98) 32%, rgba(10,10,12,0.98) 100%)`,
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: 164,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: `${item.accent}66`,
                    boxShadow: `0 10px 24px ${item.accent}22`
                }
            }}
        >
            <Stack direction="row" spacing={1.4} alignItems="center">
                <Icon size={28} color={item.accent} />
                <Typography sx={{ color: '#F4F4F5', fontWeight: 800, fontSize: item.id === 'topProject' ? '2rem' : '2.3rem', letterSpacing: '-0.02em' }}>
                    {item.value}
                </Typography>
            </Stack>
            <Typography sx={{ mt: 0.45, color: 'rgba(228,228,231,0.66)', fontSize: '1rem' }}>{item.label}</Typography>
            {item.helper ? <Typography sx={{ mt: 0.25, color: 'rgba(228,228,231,0.58)', fontSize: '0.9rem' }}>{item.helper}</Typography> : null}
        </Box>
    );
}

function SimpleEngagementChart({ title, series }) {
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

function TopActionsCard({ items, onOpenAll, totalInteractions }) {
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

function InteractionsModal({ open, onClose, items }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '18px',
                    bgcolor: 'rgba(12,12,14,0.96)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(14px)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ color: '#fff', fontWeight: 800, p: 0 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        px: 2.2,
                        py: 1.6,
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        background: 'linear-gradient(160deg, rgba(124,58,237,0.16), rgba(18,18,22,0.2))'
                    }}
                >
                    <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem' }}>
                            Todas as interações
                        </Typography>
                        <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.82rem' }}>
                            Histórico detalhado do período selecionado
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} sx={{ color: 'rgba(228,228,231,0.82)', border: '1px solid rgba(255,255,255,0.16)' }}>
                        <TbX size={18} />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ px: 2.2, py: 1.8 }}>
                <Stack spacing={1.1} sx={{ maxHeight: 520, overflowY: 'auto', pr: 0.3 }}>
                    {items.length ? items.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                p: 1.3,
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
                                transition: 'transform 160ms ease, border-color 160ms ease, background 160ms ease',
                                '&:hover': {
                                    transform: 'translateX(2px)',
                                    borderColor: 'rgba(124,58,237,0.4)',
                                    background: 'linear-gradient(160deg, rgba(124,58,237,0.12), rgba(255,255,255,0.02))'
                                }
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.2}>
                                <Stack direction="row" spacing={0.9} alignItems="center" sx={{ minWidth: 0 }}>
                                    <Box sx={{ width: 22, height: 22, borderRadius: '999px', display: 'grid', placeItems: 'center', bgcolor: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.42)', flexShrink: 0 }}>
                                        <TbTimeline size={13} color="#DDD6FE" />
                                    </Box>
                                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</Typography>
                                </Stack>
                                <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontSize: '0.78rem', flexShrink: 0 }}>{item.date}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={0.7} sx={{ mt: 0.8, flexWrap: 'wrap', rowGap: 0.6 }}>
                                {[item.page, item.section, item.action].filter(Boolean).map((detail) => (
                                    <Box
                                        key={`${item.id}-${detail}`}
                                        sx={{
                                            px: 0.9,
                                            py: 0.3,
                                            borderRadius: '999px',
                                            bgcolor: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontSize: '0.72rem', fontWeight: 600 }}>
                                            {detail}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )) : (
                        <Stack spacing={0.8} alignItems="center" sx={{ py: 5 }}>
                            <Box sx={{ width: 48, height: 48, borderRadius: '999px', display: 'grid', placeItems: 'center', bgcolor: 'rgba(124,58,237,0.16)', border: '1px solid rgba(124,58,237,0.35)' }}>
                                <TbTimeline size={24} color="#C4B5FD" />
                            </Box>
                            <Typography sx={{ color: '#E4E4E7', fontSize: '0.95rem', fontWeight: 700 }}>
                                Sem interações no período
                            </Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.82rem' }}>
                                Assim que alguém interagir, os eventos aparecerão aqui.
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

function PagePresenceCard({ items }) {
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

function RouteFlowCard({ items }) {
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

function FaqInsightsCard({ items }) {
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

export default function AdminOverview() {
    const [generalPeriodDays, setGeneralPeriodDays] = useState(7);
    const [chartPeriodDays, setChartPeriodDays] = useState(7);
    const [showAllInteractions, setShowAllInteractions] = useState(false);
    const overview = useMemo(
        () => getAdminOverviewData({ generalPeriodDays, chartPeriodDays }),
        [generalPeriodDays, chartPeriodDays]
    );

    return (
        <Container maxWidth={false} sx={{ px: { xs: 2.2, md: 3.2 }, py: { xs: 2.4, md: 3.2 } }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1.2} sx={{ mb: 2.2 }}>
                <Box>
                    <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '2rem', md: '2.35rem' }, letterSpacing: '-0.02em' }}>
                        Visão Geral
                    </Typography>
                    <Typography sx={{ mt: 0.4, color: 'rgba(228,228,231,0.7)', fontSize: '0.88rem' }}>
                        Dados contabilizados apenas após aceite de coleta.
                    </Typography>
                </Box>

                <Stack spacing={0.6}>
                    <Typography sx={{ color: 'rgba(228,228,231,0.66)', fontSize: '0.76rem', fontWeight: 700 }}>
                        Dados gerais
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Button
                            onClick={() => setGeneralPeriodDays(7)}
                            sx={{
                                borderRadius: '999px',
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 2,
                                color: generalPeriodDays === 7 ? '#fff' : 'rgba(228,228,231,0.82)',
                                bgcolor: generalPeriodDays === 7 ? 'rgba(124,58,237,0.7)' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${generalPeriodDays === 7 ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.14)'}`
                            }}
                        >
                            7 dias
                        </Button>
                        <Button
                            onClick={() => setGeneralPeriodDays(30)}
                            sx={{
                                borderRadius: '999px',
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 2,
                                color: generalPeriodDays === 30 ? '#fff' : 'rgba(228,228,231,0.82)',
                                bgcolor: generalPeriodDays === 30 ? 'rgba(124,58,237,0.7)' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${generalPeriodDays === 30 ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.14)'}`
                            }}
                        >
                            30 dias
                        </Button>
                        <Button
                            onClick={() => setGeneralPeriodDays(null)}
                            sx={{
                                borderRadius: '999px',
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 2,
                                color: generalPeriodDays == null ? '#fff' : 'rgba(228,228,231,0.82)',
                                bgcolor: generalPeriodDays == null ? 'rgba(124,58,237,0.7)' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${generalPeriodDays == null ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.14)'}`
                            }}
                        >
                            Todos os tempos
                        </Button>
                    </Stack>
                </Stack>

                <Stack spacing={0.6}>
                    <Typography sx={{ color: 'rgba(228,228,231,0.66)', fontSize: '0.76rem', fontWeight: 700 }}>
                        Gráfico
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Button
                            onClick={() => setChartPeriodDays(7)}
                            sx={{
                                borderRadius: '999px',
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 2,
                                color: chartPeriodDays === 7 ? '#fff' : 'rgba(228,228,231,0.82)',
                                bgcolor: chartPeriodDays === 7 ? 'rgba(124,58,237,0.7)' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${chartPeriodDays === 7 ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.14)'}`
                            }}
                        >
                            7 dias
                        </Button>
                        <Button
                            onClick={() => setChartPeriodDays(30)}
                            sx={{
                                borderRadius: '999px',
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 2,
                                color: chartPeriodDays === 30 ? '#fff' : 'rgba(228,228,231,0.82)',
                                bgcolor: chartPeriodDays === 30 ? 'rgba(124,58,237,0.7)' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${chartPeriodDays === 30 ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.14)'}`
                            }}
                        >
                            30 dias
                        </Button>
                    </Stack>
                </Stack>
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
                    gap: 2
                }}
            >
                {overview.kpis.map((kpi) => (
                    <MetricCard key={kpi.id} item={kpi} />
                ))}
            </Box>

            <Box
                sx={{
                    mt: 2.2,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.35fr) minmax(0, 0.75fr)' },
                    gap: 2
                }}
            >
                <SimpleEngagementChart title={overview.chart.title} series={overview.chart.series} />
                <TopActionsCard
                    items={overview.topActions}
                    totalInteractions={overview.actionTimeline?.length ?? 0}
                    onOpenAll={() => setShowAllInteractions(true)}
                />
            </Box>

            <Box sx={{ mt: 2 }}>
                <PagePresenceCard items={overview.pageBreakdown ?? []} />
            </Box>

            <Box
                sx={{
                    mt: 2,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
                    gap: 2
                }}
            >
                <RouteFlowCard items={overview.routeBreakdown ?? []} />
                <FaqInsightsCard items={overview.faqBreakdown ?? []} />
            </Box>

            <InteractionsModal
                open={showAllInteractions}
                onClose={() => setShowAllInteractions(false)}
                items={overview.actionTimeline ?? []}
            />
        </Container>
    );
}
