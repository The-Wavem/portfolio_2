import { getFirebaseContent } from '@/service/firebase';

const ADMIN_SESSION_STORAGE_KEY = 'the_wavem.admin.session.v1';
const ADMIN_SESSION_DURATION_MS = 36 * 60 * 60 * 1000;

function hasWindow() {
    return typeof window !== 'undefined';
}

function toHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
}

export async function hashAdminPassword(rawPassword) {
    const encoded = new TextEncoder().encode(String(rawPassword ?? ''));
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    return toHex(hashBuffer);
}

export async function verifyAdminPassword(rawPassword) {
    const response = await getFirebaseContent({
        page: 'admin',
        section: 'auth',
        fallbackData: null
    });

    const remoteConfig = response?.data;
    const expectedHash = typeof remoteConfig?.passwordHash === 'string'
        ? remoteConfig.passwordHash.trim().toLowerCase()
        : '';

    if (!expectedHash) {
        return {
            ok: false,
            reason: 'not-configured'
        };
    }

    const providedHash = (await hashAdminPassword(rawPassword)).toLowerCase();

    return {
        ok: providedHash === expectedHash,
        reason: providedHash === expectedHash ? null : 'invalid-password'
    };
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
