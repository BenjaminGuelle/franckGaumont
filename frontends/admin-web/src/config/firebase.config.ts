import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyByNVv69cZ6RvVt5UvksLYsQ82Usji2E48',
  authDomain: 'franckgaumont-f4191.firebaseapp.com',
  projectId: 'franckgaumont-f4191',
  storageBucket: 'franckgaumont-f4191.appspot.com',
  messagingSenderId: '824681192834',
  appId: '1:824681192834:web:2ecc4f6144c404a141039b',
  measurementId: 'G-8MXQX9DBPN',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app, 'europe-west3');
export const firestore = getFirestore(app);

let isConnectedToAuthEmulator = false;
let isConnectedToFunctionsEmulator = false;
let isConnectedToFirestoreEmulator = false;

const CURRENT_ENV = 'LOCAL';

if (CURRENT_ENV === 'LOCAL' && !isConnectedToAuthEmulator) {
  isConnectedToAuthEmulator = true;
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
}

if (CURRENT_ENV === 'LOCAL' && !isConnectedToFunctionsEmulator) {
  isConnectedToFunctionsEmulator = true;
  connectFunctionsEmulator(functions, 'localhost', 4089);
}

if (CURRENT_ENV === 'LOCAL' && !isConnectedToFirestoreEmulator) {
  isConnectedToFirestoreEmulator = true;
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}