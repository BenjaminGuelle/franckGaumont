import { FirestoreWrapper } from '../utils/dataManager/firestore.wrapper';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { ConfirmationResponse } from '../shared/responses/Confirmation.response';
import {
  patchPublicationsPriority,
} from './services/updatePublication.service';

const db = new FirestoreWrapper();
export const patch_publication_priority = onCall({
  region: 'europe-west3', memory: '4GiB', timeoutSeconds: 540,
}, async (): Promise<ConfirmationResponse> => {

  try {
    await patchPublicationsPriority(db);

    return {
      info: 'ok'
    }
  } catch (e) {
    throw new HttpsError('internal', 'Failed to update publication');
  }
})