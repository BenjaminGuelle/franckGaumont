import { onCall } from 'firebase-functions/v2/https';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import { ConfirmationResponse } from '../shared/responses/Confirmation.response';
import { isString } from '../utils/checkTypes';
import { FirestoreWrapper } from '../utils/dataManager/firestore.wrapper';

const db: FirestoreWrapper = new FirestoreWrapper();

export const delete_publication = onCall({
  region: 'europe-west3', memory: '4GiB', timeoutSeconds: 540,
}, async (req: CallableRequest<{publicationId: string}>): Promise<ConfirmationResponse> => {

  const {publicationId}: { publicationId: string } = req.data;

  isString('publicationId', publicationId);

  try {
    return await db.del('PUBLICATIONS', publicationId);
  } catch (e) {
    throw new HttpsError('internal', `Failed to delete publication with uid ${publicationId}`, e);
  }
})