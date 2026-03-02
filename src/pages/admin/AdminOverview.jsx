import { Box, Container, Stack, Typography } from '@mui/material';
import {
    TbChartBar,
    TbClick,
    TbEye,
    TbMouse,
    TbTrophy
} from 'react-icons/tb';
import { getAdminOverviewData } from '@/service/content';

const kpiIconMap = {
    eye: TbEye,
    click: TbClick,
    trophy: TbTrophy,
    mouse: TbMouse
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
                justifyContent: 'center'
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

    return (
        <Box sx={{ p: { xs: 2.6, md: 3.2 }, borderRadius: '18px', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))', border: '1px solid rgba(255,255,255,0.08)' }}>
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

            <Stack direction="row" alignItems="flex-end" spacing={1.4} sx={{ minHeight: 220 }}>
                {series.map((point) => {
                    const visitsHeight = `${(point.visits / maxValue) * 150}px`;
                    const actionsHeight = `${(point.actions / maxValue) * 150}px`;

                    return (
                        <Box key={point.date} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Stack direction="row" spacing={0.5} alignItems="flex-end" sx={{ height: 160 }}>
                                <Box sx={{ width: { xs: 11, md: 14 }, height: visitsHeight, borderRadius: '6px 6px 0 0', bgcolor: '#8B5CF6' }} />
                                <Box sx={{ width: { xs: 11, md: 14 }, height: actionsHeight, borderRadius: '6px 6px 0 0', bgcolor: '#F59E0B' }} />
                            </Stack>
                            <Typography sx={{ mt: 1, color: 'rgba(228,228,231,0.62)', fontSize: '0.82rem' }}>{point.date}</Typography>
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
}

function TopActionsCard({ items }) {
    const maxValue = Math.max(...items.map((item) => item.value), 1);

    return (
        <Box sx={{ p: { xs: 2.6, md: 3.2 }, borderRadius: '18px', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))', border: '1px solid rgba(255,255,255,0.08)', height: '100%' }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.6rem' }, mb: 2.2, letterSpacing: '-0.01em' }}>
                O que estão fazendo?
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
                                    bgcolor: '#F59E0B'
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

export default function AdminOverview() {
    const overview = getAdminOverviewData();

    return (
        <Container maxWidth={false} sx={{ px: { xs: 2.2, md: 3.2 }, py: { xs: 2.4, md: 3.2 } }}>
            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '2rem', md: '2.35rem' }, letterSpacing: '-0.02em', mb: 2.2 }}>
                Visão Geral
            </Typography>

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
                <TopActionsCard items={overview.topActions} />
            </Box>
        </Container>
    );
}
