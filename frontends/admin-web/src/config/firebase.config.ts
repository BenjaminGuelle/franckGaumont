import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from '@firebase/storage';

type ENV = 'LOCAL' | 'PROD'

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app, 'europe-west3');
export const firestore = getFirestore(app);
export const storage = getStorage(app);

let isConnectedToAuthEmulator = false;
let isConnectedToFunctionsEmulator = false;
let isConnectedToFirestoreEmulator = false;
let isConnectedToStorageEmulator = false;

const CURRENT_ENV: ENV = process.env.NEXT_PUBLIC_ENV as ENV;

if (CURRENT_ENV === 'LOCAL') {
  if (!isConnectedToAuthEmulator) {
    isConnectedToAuthEmulator = true;
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  }

  if (!isConnectedToFunctionsEmulator) {
    isConnectedToFunctionsEmulator = true;
    connectFunctionsEmulator(functions, 'localhost', 4089);
  }

  if (!isConnectedToFirestoreEmulator) {
    isConnectedToFirestoreEmulator = true;
    connectFirestoreEmulator(firestore, 'localhost', 8080);
  }

  if (!isConnectedToStorageEmulator) {
    isConnectedToStorageEmulator = true;
    connectStorageEmulator(storage, 'localhost', 5050);
  }
}