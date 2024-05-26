import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

import env from '../EnvSchema'

const firebaseConfig = {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: env.FIREBASE_AUTH_DOMAIN,
    projectId: env.FIREBASE_PROJECT_ID,
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.FIREABSE_MESSAGING_SENDER_ID,
    appId: env.FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { app, storage }