import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { getFirebaseAuth, getFirestoreDb } from '@/service/firebase';

const ADMIN_SESSION_STORAGE_KEY = 'the_wavem.admin.session.v1';
const ADMIN_SESSION_DURATION_MS = 36 * 60 * 60 * 1000;

function hasWindow() {
    return typeof window !== 'undefined';
}

async function ensureAuthPersistence(auth) {
    try {
        await setPersistence(auth, browserLocalPersistence);
    } catch {
        return;
    }
}

async function isAdminUid(uid) {
    const db = getFirestoreDb();
    if (!db || !uid) {
        return false;
    }

    try {
        const snapshot = await getDoc(doc(db, 'admins', uid));
        return snapshot.exists();
    } catch {
        return false;
    }
}

export function createAdminSession() {
    if (!hasWindow()) {
        return;
    }

    const now = Date.now();
    const sessionData = {
        createdAt: now,
        expiresAt: now + ADMIN_SESSION_DURATION_MS
    };

    window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(sessionData));
}

export function clearAdminSession() {
    if (!hasWindow()) {
        return;
    }

    window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
}

export function isAdminSessionValid() {
    if (!hasWindow()) {
        return false;
    }

    try {
        const raw = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
        if (!raw) {
            return false;
        }

        const parsed = JSON.parse(raw);
        const expiresAt = Number(parsed?.expiresAt);

        if (!Number.isFinite(expiresAt) || Date.now() >= expiresAt) {
            clearAdminSession();
            return false;
        }

        return true;
    } catch {
        clearAdminSession();
        return false;
    }
}

export async function signInAdmin({ email, password }) {
    const normalizedEmail = String(email ?? '').trim();
    const normalizedPassword = String(password ?? '');

    if (!normalizedEmail) {
        return { ok: false, reason: 'missing-email' };
    }

    if (!normalizedPassword) {
        return { ok: false, reason: 'missing-password' };
    }

    const auth = getFirebaseAuth();
    const db = getFirestoreDb();
    if (!auth || !db) {
        return { ok: false, reason: 'firebase-not-configured' };
    }

    await ensureAuthPersistence(auth);

    try {
        const credential = await signInWithEmailAndPassword(auth, normalizedEmail, normalizedPassword);
        const uid = credential?.user?.uid;
        const adminAllowed = await isAdminUid(uid);

        if (!adminAllowed) {
            await signOut(auth);
            clearAdminSession();
            return { ok: false, reason: 'forbidden' };
        }

        createAdminSession();
        return { ok: true, user: credential.user };
    } catch (error) {
        const code = error?.code || '';

        if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
            return { ok: false, reason: 'invalid-credentials' };
        }

        if (code === 'auth/too-many-requests') {
            return { ok: false, reason: 'too-many-requests' };
        }

        return { ok: false, reason: 'auth-error' };
    }
}

export async function signOutAdmin() {
    clearAdminSession();

    const auth = getFirebaseAuth();
    if (!auth) {
        return;
    }

    try {
        await signOut(auth);
    } catch {
        return;
    }
}

export async function isCurrentAdminAuthenticated() {
    if (!isAdminSessionValid()) {
        await signOutAdmin();
        return false;
    }

    const auth = getFirebaseAuth();
    if (!auth?.currentUser?.uid) {
        return false;
    }

    const adminAllowed = await isAdminUid(auth.currentUser.uid);
    if (!adminAllowed) {
        await signOutAdmin();
        return false;
    }

    return true;
}
