import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig, isFirebaseConfigured } from './firebase.config';

let appInstance;
let firestoreInstance;

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
