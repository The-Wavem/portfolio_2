import {
    collection,
    doc,
    documentId,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    startAfter,
    where
} from 'firebase/firestore';
import { getFirestoreDb } from './firebase.client';

const ANALYTICS_COLLECTION = 'analytics_events';
const DEFAULT_LIMIT = 5000;
const DEFAULT_PAGE_LIMIT = 400;

function getEventTimestampMs(event) {
    const parsed = new Date(event?.ts || Date.now()).getTime();
    return Number.isFinite(parsed) ? parsed : Date.now();
}

export async function persistAnalyticsEvent(event) {
    const db = getFirestoreDb();
    if (!db || !event?.id) {
        return {
            ok: false,
            error: 'firebase-not-configured'
        };
    }

    try {
        await setDoc(
            doc(db, ANALYTICS_COLLECTION, event.id),
            {
                ...event,
                tsMs: getEventTimestampMs(event),
                storedAt: serverTimestamp()
            },
            { merge: true }
        );

        return {
            ok: true,
            error: null
        };
    } catch (error) {
        return {
            ok: false,
            error
        };
    }
}

export async function listAnalyticsEvents(limitCount = DEFAULT_LIMIT) {
    const response = await listAnalyticsEventsPage({ limitCount });
    return response.events;
}

export async function listAnalyticsEventsPage(options = {}) {
    const db = getFirestoreDb();
    if (!db) {
        return {
            events: [],
            nextCursor: null,
            hasMore: false
        };
    }

    const normalizedLimit = Number.isFinite(options.limitCount) && options.limitCount > 0
        ? Math.min(options.limitCount, DEFAULT_LIMIT)
        : DEFAULT_PAGE_LIMIT;
    const normalizedStartTsMs = Number.isFinite(options.startTsMs)
        ? options.startTsMs
        : null;
    const normalizedEndTsMs = Number.isFinite(options.endTsMs)
        ? options.endTsMs
        : null;
    const normalizedCursor = options.cursor && Number.isFinite(options.cursor.tsMs) && options.cursor.id
        ? options.cursor
        : null;

    try {
        const queryParts = [
            collection(db, ANALYTICS_COLLECTION),
            orderBy('tsMs', 'desc'),
            orderBy(documentId(), 'desc')
        ];

        if (normalizedStartTsMs !== null) {
            queryParts.push(where('tsMs', '>=', normalizedStartTsMs));
        }

        if (normalizedEndTsMs !== null) {
            queryParts.push(where('tsMs', '<=', normalizedEndTsMs));
        }

        if (normalizedCursor) {
            queryParts.push(startAfter(normalizedCursor.tsMs, normalizedCursor.id));
        }

        queryParts.push(limit(normalizedLimit));

        const eventsQuery = query(...queryParts);
        const snapshot = await getDocs(eventsQuery);
        const events = snapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id
        }));
        const lastDoc = snapshot.docs[snapshot.docs.length - 1] ?? null;

        return {
            events,
            nextCursor: lastDoc
                ? {
                    id: lastDoc.id,
                    tsMs: lastDoc.data()?.tsMs ?? null
                }
                : null,
            hasMore: snapshot.docs.length >= normalizedLimit
        };
    } catch {
        return {
            events: [],
            nextCursor: null,
            hasMore: false
        };
    }
}
