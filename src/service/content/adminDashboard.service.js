import { getAnalyticsOverviewData } from '@/service/analytics/tracking.service';

export const adminOverviewData = getAnalyticsOverviewData();

export function getAdminOverviewData(options = 7) {
    return getAnalyticsOverviewData(options);
}
