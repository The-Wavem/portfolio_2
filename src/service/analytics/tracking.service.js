const STORAGE_KEY = 'the_wavem.analytics.events.v1';
const MAX_EVENTS = 5000;
const PAGE_VIEW_DEDUP_WINDOW_MS = 3500;
const SESSION_STORAGE_KEY = 'the_wavem.analytics.session_id.v1';
const NAVIGATION_DEDUP_WINDOW_MS = 1200;
const CONSENT_STORAGE_KEY = 'the_wavem.analytics.consent.v1';
const VISITOR_ID_STORAGE_KEY = 'the_wavem.analytics.visitor_id.v1';

let memoryEvents = [];

function hasWindow() {
    return typeof window !== 'undefined';
}

function readStoredEvents() {
    if (!hasWindow()) {
        return memoryEvents;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeStoredEvents(events) {
    const normalized = events.slice(-MAX_EVENTS);

    if (!hasWindow()) {
        memoryEvents = normalized;
        return;
    }

    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch {
        memoryEvents = normalized;
    }
}

function nowIso() {
    return new Date().toISOString();
}

function createEvent(payload) {
    return {
        id: `${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
        ts: nowIso(),
        ...payload
    };
}

function getSessionId() {
    if (!hasWindow()) {
        return 'server-session';
    }

    try {
        const current = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (current) {
            return current;
        }

        const created = `session_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, created);
        return created;
    } catch {
        return `fallback_${Date.now()}`;
    }
}

function pushEvent(payload) {
    const events = readStoredEvents();
    const nextEvents = [...events, createEvent(payload)];
    writeStoredEvents(nextEvents);
}

function mapPathToPage(pathname) {
    if (!pathname || pathname === '/') {
        return 'home';
    }

    if (pathname.startsWith('/sobre')) {
        return 'about';
    }

    if (pathname.startsWith('/projetos')) {
        return 'projects';
    }

    if (pathname.startsWith('/servicos')) {
        return 'services';
    }

    return pathname;
}

function getConsentStatus() {
    if (!hasWindow()) {
        return 'pending';
    }

    try {
        const status = window.localStorage.getItem(CONSENT_STORAGE_KEY);
        if (status === 'accepted' || status === 'rejected') {
            return status;
        }

        return 'pending';
    } catch {
        return 'pending';
    }
}

function hasTrackingConsent() {
    return getConsentStatus() === 'accepted';
}

function getOrCreateVisitorId() {
    if (!hasWindow()) {
        return 'server-visitor';
    }

    try {
        const existing = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY);
        if (existing) {
            return existing;
        }

        const created = `visitor_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
        window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, created);
        return created;
    } catch {
        return `visitor_fallback_${Date.now()}`;
    }
}

export function getTrackingConsentStatus() {
    return getConsentStatus();
}

export function setTrackingConsentStatus(status) {
    if (!hasWindow()) {
        return;
    }

    if (status !== 'accepted' && status !== 'rejected') {
        return;
    }

    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
    } catch {
        return;
    }

    if (status === 'accepted') {
        const visitorId = getOrCreateVisitorId();
        const sessionId = getSessionId();

        pushEvent({
            kind: 'system',
            page: 'consent',
            action: 'consent_accepted',
            label: 'Consentimento aceito',
            meta: {
                sessionId,
                visitorId
            }
        });
    }
}

export function trackPageView(page, meta = {}) {
    if (!hasTrackingConsent()) {
        return;
    }

    const events = readStoredEvents();
    const sessionId = getSessionId();
    const visitorId = getOrCreateVisitorId();
    const now = Date.now();
    const pageEvents = events
        .filter((event) => event.kind === 'page_view' && event.page === page)
        .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    const lastEvent = pageEvents[0];
    const lastEventTime = lastEvent ? new Date(lastEvent.ts).getTime() : 0;
    const lastSessionId = lastEvent?.meta?.sessionId;

    if (lastEvent && lastSessionId === sessionId && (now - lastEventTime) < PAGE_VIEW_DEDUP_WINDOW_MS) {
        return;
    }

    pushEvent({
        kind: 'page_view',
        page,
        meta: {
            ...meta,
            sessionId,
            visitorId
        }
    });
}

export function trackPageViewFromPath(pathname, meta = {}) {
    const page = mapPathToPage(pathname);
    trackPageView(page, meta);
}

export function trackAction({ page, section, action, label, meta = {} }) {
    if (!hasTrackingConsent()) {
        return;
    }

    const sessionId = getSessionId();
    const visitorId = getOrCreateVisitorId();

    pushEvent({
        kind: 'action',
        page,
        section,
        action,
        label,
        meta: {
            ...meta,
            sessionId,
            visitorId
        }
    });
}

export function trackRouteNavigation(fromPath, toPath) {
    const from = mapPathToPage(fromPath);
    const to = mapPathToPage(toPath);

    if (!to || from === to) {
        return;
    }

    const sessionId = getSessionId();
    const events = readStoredEvents();
    const now = Date.now();
    const lastNav = [...events]
        .reverse()
        .find((event) => event.kind === 'action' && event.action === 'route_navigation' && event.meta?.sessionId === sessionId);

    if (lastNav) {
        const lastTime = new Date(lastNav.ts).getTime();
        if (now - lastTime < NAVIGATION_DEDUP_WINDOW_MS && lastNav.meta?.from === from && lastNav.meta?.to === to) {
            return;
        }
    }

    trackAction({
        page: to,
        section: 'navigator',
        action: 'route_navigation',
        label: `${from} → ${to}`,
        meta: {
            from,
            to
        }
    });
}

export function getAnalyticsEvents() {
    return readStoredEvents();
}

function normalizeEventsForAggregation(events) {
    const sorted = [...events].sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
    const lastPageViewByKey = {};

    return sorted.filter((event) => {
        if (event.kind !== 'page_view') {
            return true;
        }

        const sessionId = event.meta?.sessionId || 'legacy';
        const key = `${sessionId}_${event.page}`;
        const currentTime = new Date(event.ts).getTime();
        const previousTime = lastPageViewByKey[key] || 0;

        if (currentTime - previousTime < PAGE_VIEW_DEDUP_WINDOW_MS) {
            return false;
        }

        lastPageViewByKey[key] = currentTime;
        return true;
    });
}

function formatDay(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
}

function formatDateTime(iso) {
    const date = new Date(iso);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month} ${hours}:${minutes}`;
}

function isSameDay(iso, date) {
    const parsed = new Date(iso);
    return parsed.getFullYear() === date.getFullYear()
        && parsed.getMonth() === date.getMonth()
        && parsed.getDate() === date.getDate();
}

function filterEventsByPeriod(events, periodDays) {
    if (!Number.isFinite(periodDays) || periodDays <= 0) {
        return events;
    }

    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(end.getDate() - (periodDays - 1));

    const startTime = start.getTime();

    return events.filter((event) => new Date(event.ts).getTime() >= startTime);
}

function buildChartSeries(events, periodDays) {
    const days = [];
    const today = new Date();

    for (let index = periodDays - 1; index >= 0; index -= 1) {
        const date = new Date(today);
        date.setDate(today.getDate() - index);
        days.push(date);
    }

    return days.map((date) => {
        const visits = events.filter((event) => event.kind === 'page_view' && isSameDay(event.ts, date)).length;
        const actions = events.filter((event) => event.kind === 'action' && isSameDay(event.ts, date)).length;

        return {
            date: formatDay(date),
            visits,
            actions
        };
    });
}

function getTopActions(actionEvents) {
    const grouped = actionEvents.reduce((acc, event) => {
        const key = event.label || event.action || 'ação sem nome';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const items = Object.entries(grouped)
        .map(([label, value]) => ({
            id: label.toLowerCase().replace(/\s+/g, '-'),
            label,
            value
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

    if (items.length > 0) {
        return items;
    }

    return [{ id: 'sem-acoes', label: 'Sem ações ainda', value: 0 }];
}

function getTopProject(actionEvents) {
    const projectEvents = actionEvents.filter((event) => event.action === 'open_project');
    const grouped = projectEvents.reduce((acc, event) => {
        const key = event.label || 'Projeto sem nome';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const [name, clicks] = Object.entries(grouped).sort((a, b) => b[1] - a[1])[0] || ['--', 0];
    return { name, clicks };
}

function getUniqueVisitors(viewEvents) {
    const unique = new Set(
        viewEvents
            .map((event) => event.meta?.visitorId || event.meta?.sessionId)
            .filter(Boolean)
    );

    return unique.size;
}

function getPageBreakdown(viewEvents) {
    const labels = {
        home: 'Home',
        about: 'Sobre',
        projects: 'Projetos',
        services: 'Serviços'
    };

    const grouped = viewEvents.reduce((acc, event) => {
        acc[event.page] = (acc[event.page] || 0) + 1;
        return acc;
    }, {});

    const total = viewEvents.length || 1;

    return Object.entries(grouped)
        .map(([page, value]) => ({
            id: page,
            label: labels[page] || page,
            value,
            percentage: Math.round((value / total) * 100)
        }))
        .sort((a, b) => b.value - a.value);
}

function getRouteBreakdown(actionEvents) {
    const routeEvents = actionEvents.filter((event) => event.action === 'route_navigation');
    const grouped = routeEvents.reduce((acc, event) => {
        const key = event.label || `${event.meta?.from || '--'} → ${event.meta?.to || '--'}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([label, value]) => ({
            id: label.toLowerCase().replace(/\s+/g, '-'),
            label,
            value
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);
}

function getFaqBreakdown(actionEvents) {
    const faqEvents = actionEvents.filter((event) => event.action === 'faq_expand');
    const grouped = faqEvents.reduce((acc, event) => {
        const key = event.label || 'Pergunta sem título';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([label, value]) => ({
            id: label.toLowerCase().replace(/\s+/g, '-'),
            label,
            value
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
}

function getActionTimeline(actionEvents) {
    return [...actionEvents]
        .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
        .map((event) => ({
            id: event.id,
            label: event.label || event.action || 'Interação',
            action: event.action,
            page: event.page,
            section: event.section,
            date: formatDateTime(event.ts)
        }));
}

export function getAnalyticsOverviewData(periodDays = 7) {
    const options = typeof periodDays === 'object' && periodDays !== null
        ? periodDays
        : { generalPeriodDays: periodDays, chartPeriodDays: periodDays };
    const generalPeriodDays = options.generalPeriodDays;
    const chartPeriodDays = Number.isFinite(options.chartPeriodDays) ? options.chartPeriodDays : 7;
    const normalizedEvents = normalizeEventsForAggregation(getAnalyticsEvents());
    const events = filterEventsByPeriod(normalizedEvents, generalPeriodDays);
    const chartEvents = filterEventsByPeriod(normalizedEvents, chartPeriodDays);
    const views = events.filter((event) => event.kind === 'page_view');
    const actions = events.filter((event) => event.kind === 'action');
    const uniqueVisitors = getUniqueVisitors(views);
    const projectClicks = actions.filter((event) => event.action === 'open_project').length;
    const topProject = getTopProject(actions);
    const pageBreakdown = getPageBreakdown(views);
    const routeBreakdown = getRouteBreakdown(actions);
    const faqBreakdown = getFaqBreakdown(actions);
    const actionTimeline = getActionTimeline(actions);

    return {
        kpis: [
            {
                id: 'uniqueVisitors',
                label: 'Visitantes Únicos',
                value: uniqueVisitors,
                accent: '#22D3EE',
                iconKey: 'users'
            },
            {
                id: 'views',
                label: 'Visualizações',
                value: views.length,
                accent: '#00E38C',
                iconKey: 'eye'
            },
            {
                id: 'projectClicks',
                label: 'Cliques em Projetos',
                value: projectClicks,
                accent: '#3B82F6',
                iconKey: 'click'
            },
            {
                id: 'topProject',
                label: 'Projeto em Destaque',
                value: topProject.name,
                helper: `${topProject.clicks} cliques`,
                accent: '#FACC15',
                iconKey: 'trophy'
            },
            {
                id: 'interactions',
                label: 'Interações Gerais',
                value: actions.length,
                accent: '#F59E0B',
                iconKey: 'mouse'
            }
        ],
        chart: {
            title: `Tráfego vs. Engajamento (últimos ${chartPeriodDays} dias)`,
            series: buildChartSeries(chartEvents, chartPeriodDays)
        },
        topActions: getTopActions(actions),
        pageBreakdown,
        routeBreakdown,
        faqBreakdown,
        actionTimeline,
        periodDays: generalPeriodDays,
        chartPeriodDays
    };
}

export function clearAnalyticsEvents() {
    writeStoredEvents([]);
}
