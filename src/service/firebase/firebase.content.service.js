import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirestoreDb } from './firebase.client';

const CONTENT_COLLECTION = 'content';

function buildContentDocId(page, section) {
    return `${page}__${section}`;
}

export async function getFirebaseContent({ page, section, fallbackData = null }) {
    const db = getFirestoreDb();
    if (!db) {
        return {
            source: 'local-fallback',
            data: fallbackData,
            error: 'firebase-not-configured'
        };
    }

    try {
        const snapshot = await getDoc(doc(db, CONTENT_COLLECTION, buildContentDocId(page, section)));

        if (!snapshot.exists()) {
            return {
                source: 'local-fallback',
                data: fallbackData,
                error: null
            };
        }

        return {
            source: 'firebase',
            data: snapshot.data()?.data ?? fallbackData,
            error: null
        };
    } catch (error) {
        return {
            source: 'local-fallback',
            data: fallbackData,
            error
        };
    }
}

export async function setFirebaseContent({ page, section, data }) {
    const db = getFirestoreDb();
    if (!db) {
        return {
            ok: false,
            error: 'firebase-not-configured'
        };
    }

    try {
        await setDoc(
            doc(db, CONTENT_COLLECTION, buildContentDocId(page, section)),
            {
                page,
                section,
                data,
                updatedAt: serverTimestamp()
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
