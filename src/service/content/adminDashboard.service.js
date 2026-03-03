import {
    getAnalyticsEventsRemotePage,
    getAnalyticsOverviewData,
    getAnalyticsOverviewDataFromEvents,
    getAnalyticsOverviewDataRemote
} from '@/service/analytics/tracking.service';

export const adminOverviewData = getAnalyticsOverviewData();

export function getAdminOverviewData(options = 7) {
    return getAnalyticsOverviewData(options);
}

export async function getAdminOverviewDataRemote(options = 7) {
    return getAnalyticsOverviewDataRemote(options);
}

export function getAdminOverviewDataFromEvents(events, options = 7) {
    return getAnalyticsOverviewDataFromEvents(events, options);
}

export async function getAdminAnalyticsEventsPageRemote(options = {}) {
    return getAnalyticsEventsRemotePage(options);
}
