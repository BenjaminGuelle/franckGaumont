/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((requests, responses) => {
//   logger.info("Hello logs!", {structuredData: true});
//   responses.send("Hello from Firebase!");
// });

import * as admin from 'firebase-admin';

admin.initializeApp();

export * as USERS from './users';
export * as PUBLICATIONS from './publications';
