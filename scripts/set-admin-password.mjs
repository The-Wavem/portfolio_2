import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import process from 'node:process';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

function parseEnvFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return {};
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const lines = raw.split(/\r?\n/);
    const result = {};

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            continue;
        }

        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex <= 0) {
            continue;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        let value = trimmed.slice(separatorIndex + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        result[key] = value;
    }

    return result;
}

function getFirebaseConfig(envMap) {
    return {
        apiKey: process.env.VITE_FIREBASE_API_KEY || envMap.VITE_FIREBASE_API_KEY || '',
        authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || envMap.VITE_FIREBASE_AUTH_DOMAIN || '',
        projectId: process.env.VITE_FIREBASE_PROJECT_ID || envMap.VITE_FIREBASE_PROJECT_ID || '',
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || envMap.VITE_FIREBASE_STORAGE_BUCKET || '',
        messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || envMap.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
        appId: process.env.VITE_FIREBASE_APP_ID || envMap.VITE_FIREBASE_APP_ID || '',
        measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || envMap.VITE_FIREBASE_MEASUREMENT_ID || ''
    };
}

function isFirebaseConfigValid(config) {
    return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

async function run() {
    const workspaceRoot = process.cwd();
    const envPath = path.join(workspaceRoot, '.env');
    const envMap = parseEnvFile(envPath);

    const cliPassword = process.argv[2];
    const password = cliPassword || process.env.ADMIN_PASSWORD || envMap.VITE_ADMIN_PASSWORD || '';

    if (!password) {
        console.error('Senha não informada. Use: npm run admin:set-password -- "SUA_SENHA"');
        process.exit(1);
    }

    const firebaseConfig = getFirebaseConfig(envMap);

    if (!isFirebaseConfigValid(firebaseConfig)) {
        console.error('Configuração Firebase incompleta no .env.');
        process.exit(1);
    }

    const passwordHash = hashPassword(password);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    await setDoc(
        doc(db, 'content', 'admin__auth'),
        {
            page: 'admin',
            section: 'auth',
            data: {
                passwordHash
            },
            updatedAt: new Date().toISOString()
        },
        { merge: true }
    );

    console.log('Senha de admin configurada com sucesso em content/admin__auth (data.passwordHash).');
}

run().catch((error) => {
    console.error('Falha ao configurar senha de admin no Firebase:', error?.message || error);
    process.exit(1);
});
