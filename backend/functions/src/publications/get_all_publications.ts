import { FirestoreWrapper } from '../utils/dataManager/firestore.wrapper';
import { onCall } from 'firebase-functions/v2/https';
import { PublicationModel } from '../shared/models/publication/Publication.model';
import { HttpsError } from 'firebase-functions/v2/https';

const db: FirestoreWrapper = new FirestoreWrapper();

export const get_all_publications = onCall({
  region: 'europe-west3', memory: '4GiB', timeoutSeconds: 540,
}, async (): Promise<PublicationModel[]> => {
  try {
    return await db.getAll<PublicationModel>('PUBLICATIONS');
  } catch (e) {
    throw new HttpsError('internal', 'Failed to get all publications', e);
  }
})