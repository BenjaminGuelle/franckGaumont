import { onCall } from 'firebase-functions/v2/https';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import { ConfirmationResponse } from '../shared/responses/Confirmation.response';
import { isString } from '../utils/checkTypes';
import { FirestoreWrapper } from '../utils/dataManager/firestore.wrapper';
import { deletePublication } from './services/deletePublication.service';

const fbWrapper: FirestoreWrapper = new FirestoreWrapper();

export const delete_publication = onCall({
  region: 'europe-west3', memory: '4GiB', timeoutSeconds: 540,
}, async (req: CallableRequest<{publicationId: string}>): Promise<ConfirmationResponse> => {

  const {publicationId}: { publicationId: string } = req.data;

  isString('publicationId', publicationId);

  try {
    return await deletePublication(publicationId, fbWrapper);
  } catch (e) {
    throw new HttpsError('internal', `Failed to delete publication with uid ${publicationId}`, e);
  }
})