import { useMemo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { getAdminOverviewData } from '@/service/content';
import {
    FaqInsightsCard,
    InteractionsModal,
    MetricCard,
    PagePresenceCard,
    PeriodFilterGroup,
    RouteFlowCard,
    SimpleEngagementChart,
    TopActionsCard
} from './components/overview';

const generalPeriodOptions = [
    { label: '7 dias', value: 7 },
    { label: '30 dias', value: 30 },
    { label: 'Todos os tempos', value: null }
];

const chartPeriodOptions = [
    { label: '7 dias', value: 7 },
    { label: '30 dias', value: 30 }
];

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

                <PeriodFilterGroup
                    title="Dados gerais"
                    options={generalPeriodOptions}
                    value={generalPeriodDays}
                    onChange={setGeneralPeriodDays}
                />

                <PeriodFilterGroup
                    title="Gráfico"
                    options={chartPeriodOptions}
                    value={chartPeriodDays}
                    onChange={setChartPeriodDays}
                />
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
