import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import {
    getAdminAnalyticsEventsPageRemote,
    getAdminOverviewData,
    getAdminOverviewDataFromEvents,
    getAdminOverviewDataRemote
} from '@/service/content';
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

const REMOTE_EVENTS_PAGE_SIZE = 400;
const MAX_FILTERED_EVENTS_AUTO_LOAD = 3200;

function toDayStartTs(dateText) {
    if (!dateText) {
        return null;
    }

    const parsed = new Date(`${dateText}T00:00:00`).getTime();
    return Number.isFinite(parsed) ? parsed : null;
}

function toDayEndTs(dateText) {
    if (!dateText) {
        return null;
    }

    const parsed = new Date(`${dateText}T23:59:59.999`).getTime();
    return Number.isFinite(parsed) ? parsed : null;
}

function hasDateFilter(filter) {
    if (!filter) {
        return false;
    }

    if (filter.mode === 'single') {
        return Boolean(filter.singleDate);
    }

    return Boolean(filter.startDate || filter.endDate);
}

function resolveDateFilterRange(filter) {
    if (!hasDateFilter(filter)) {
        return { startTsMs: null, endTsMs: null };
    }

    if (filter.mode === 'single') {
        const startTsMs = toDayStartTs(filter.singleDate);
        const endTsMs = toDayEndTs(filter.singleDate);
        return { startTsMs, endTsMs };
    }

    return {
        startTsMs: toDayStartTs(filter.startDate),
        endTsMs: toDayEndTs(filter.endDate)
    };
}

export default function AdminOverview() {
    const [generalPeriodDays, setGeneralPeriodDays] = useState(7);
    const [chartPeriodDays, setChartPeriodDays] = useState(7);
    const [showAllInteractions, setShowAllInteractions] = useState(false);
    const [overview, setOverview] = useState(() => getAdminOverviewData({ generalPeriodDays: 7, chartPeriodDays: 7 }));
    const [remoteEventsState, setRemoteEventsState] = useState({
        items: [],
        cursor: null,
        hasMore: false,
        loadingMore: false
    });
    const [modalDateFilter, setModalDateFilter] = useState({ mode: 'range', startDate: '', endDate: '', singleDate: '' });
    const [serverFilteredModalState, setServerFilteredModalState] = useState({
        active: false,
        loading: false,
        items: []
    });

    useEffect(() => {
        let isMounted = true;

        async function loadRemoteOverview() {
            try {
                const remotePage = await getAdminAnalyticsEventsPageRemote({
                    periodDays: generalPeriodDays,
                    limitCount: REMOTE_EVENTS_PAGE_SIZE
                });
                const remoteEvents = Array.isArray(remotePage?.events) ? remotePage.events : [];

                if (isMounted && remoteEvents.length > 0) {
                    setRemoteEventsState({
                        items: remoteEvents,
                        cursor: remotePage?.nextCursor ?? null,
                        hasMore: Boolean(remotePage?.hasMore),
                        loadingMore: false
                    });
                    setOverview(getAdminOverviewDataFromEvents(remoteEvents, { generalPeriodDays, chartPeriodDays }));
                    return;
                }

                const remoteOverview = await getAdminOverviewDataRemote({ generalPeriodDays, chartPeriodDays });
                if (isMounted && remoteOverview) {
                    setRemoteEventsState({ items: [], cursor: null, hasMore: false, loadingMore: false });
                    setOverview(remoteOverview);
                }
            } catch {
                if (isMounted) {
                    setRemoteEventsState({ items: [], cursor: null, hasMore: false, loadingMore: false });
                    setOverview(getAdminOverviewData({ generalPeriodDays, chartPeriodDays }));
                }
            }
        }

        loadRemoteOverview();

        return () => {
            isMounted = false;
        };
    }, [generalPeriodDays, chartPeriodDays]);

    const handleLoadMoreRemoteInteractions = useCallback(async () => {
        if (remoteEventsState.loadingMore || !remoteEventsState.hasMore) {
            return;
        }

        setRemoteEventsState((current) => ({
            ...current,
            loadingMore: true
        }));

        try {
            const nextPage = await getAdminAnalyticsEventsPageRemote({
                periodDays: generalPeriodDays,
                limitCount: REMOTE_EVENTS_PAGE_SIZE,
                cursor: remoteEventsState.cursor
            });

            const nextEvents = Array.isArray(nextPage?.events) ? nextPage.events : [];

            setRemoteEventsState((current) => {
                const mergedMap = new Map(current.items.map((event) => [event.id, event]));
                nextEvents.forEach((event) => {
                    mergedMap.set(event.id, event);
                });
                const mergedEvents = [...mergedMap.values()];

                setOverview(getAdminOverviewDataFromEvents(mergedEvents, { generalPeriodDays, chartPeriodDays }));

                return {
                    items: mergedEvents,
                    cursor: nextPage?.nextCursor ?? null,
                    hasMore: Boolean(nextPage?.hasMore),
                    loadingMore: false
                };
            });
        } catch {
            setRemoteEventsState((current) => ({
                ...current,
                loadingMore: false
            }));
        }
    }, [remoteEventsState.loadingMore, remoteEventsState.hasMore, remoteEventsState.cursor, generalPeriodDays, chartPeriodDays]);

    const handleModalDateFilterChange = useCallback(async (nextFilter) => {
        setModalDateFilter(nextFilter);

        if (!hasDateFilter(nextFilter)) {
            setServerFilteredModalState({ active: false, loading: false, items: [] });
            return;
        }

        const { startTsMs, endTsMs } = resolveDateFilterRange(nextFilter);
        if (Number.isFinite(startTsMs) && Number.isFinite(endTsMs) && startTsMs > endTsMs) {
            setServerFilteredModalState({ active: true, loading: false, items: [] });
            return;
        }

        setServerFilteredModalState({ active: true, loading: true, items: [] });

        try {
            let cursor = null;
            let hasMore = true;
            let aggregatedEvents = [];

            while (hasMore && aggregatedEvents.length < MAX_FILTERED_EVENTS_AUTO_LOAD) {
                const page = await getAdminAnalyticsEventsPageRemote({
                    limitCount: REMOTE_EVENTS_PAGE_SIZE,
                    cursor,
                    startTsMs,
                    endTsMs
                });

                const events = Array.isArray(page?.events) ? page.events : [];
                if (!events.length) {
                    break;
                }

                aggregatedEvents = [...aggregatedEvents, ...events];
                cursor = page?.nextCursor ?? null;
                hasMore = Boolean(page?.hasMore);

                if (!cursor) {
                    hasMore = false;
                }
            }

            const uniqueEvents = [...new Map(aggregatedEvents.map((event) => [event.id, event])).values()];
            const filteredOverview = getAdminOverviewDataFromEvents(uniqueEvents, {
                generalPeriodDays: null,
                chartPeriodDays
            });

            setServerFilteredModalState({
                active: true,
                loading: false,
                items: filteredOverview?.actionTimeline ?? []
            });
        } catch {
            setServerFilteredModalState({ active: true, loading: false, items: [] });
        }
    }, [chartPeriodDays]);

    const modalItems = useMemo(
        () => (serverFilteredModalState.active ? serverFilteredModalState.items : (overview.actionTimeline ?? [])),
        [serverFilteredModalState.active, serverFilteredModalState.items, overview.actionTimeline]
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
                items={modalItems}
                hasMoreRemote={!serverFilteredModalState.active && remoteEventsState.hasMore}
                loadingRemote={remoteEventsState.loadingMore}
                onLoadMoreRemote={handleLoadMoreRemoteInteractions}
                serverFilter={modalDateFilter}
                onServerFilterChange={handleModalDateFilterChange}
                loadingServerFilter={serverFilteredModalState.loading}
            />
        </Container>
    );
}
