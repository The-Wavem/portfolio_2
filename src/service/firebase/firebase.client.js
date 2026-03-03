import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig, isFirebaseConfigured } from './firebase.config';

let appInstance;
let firestoreInstance;
let authInstance;

export function getFirebaseApp() {
    if (!isFirebaseConfigured()) {
        return null;
    }

    if (appInstance) {
        return appInstance;
    }

    appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig);
    return appInstance;
}

export function getFirestoreDb() {
    if (firestoreInstance) {
        return firestoreInstance;
    }

    const app = getFirebaseApp();
    if (!app) {
        return null;
    }

    firestoreInstance = getFirestore(app);
    return firestoreInstance;
}

export function getFirebaseAuth() {
    if (authInstance) {
        return authInstance;
    }

    const app = getFirebaseApp();
    if (!app) {
        return null;
    }

    authInstance = getAuth(app);
    return authInstance;
}
