import { CallableRequest, onCall } from 'firebase-functions/v2/https';
import { ConfirmationResponse } from '../shared/responses/Confirmation.response';
import { HttpsError } from 'firebase-functions/v2/https';
import { FirestoreWrapper } from '../utils/dataManager/firestore.wrapper';
import { isString } from '../utils/checkTypes';
import { testAllKeysPublication, testAllKeysPublicationPhoto } from './services/testAllKeysOfPublicationUpdate';
import { updatePublication, updatePublicationPhotos } from './services/updatePublication.service';
import { UpdatePublicationRequest } from '../shared/requests/publications/UpdatePublication.request';

const db = new FirestoreWrapper();
export const update_publication = onCall({
  region: 'europe-west3', memory: '4GiB', timeoutSeconds: 540,
}, async (request: CallableRequest<UpdatePublicationRequest>): Promise<ConfirmationResponse> => {

  const {publicationUid, publication, photos} = request.data;

  isString('publicationUid', publicationUid);
  testAllKeysPublication(publication);
  testAllKeysPublicationPhoto(photos);

  try {
    if (photos) {
      await updatePublicationPhotos(publicationUid, photos, db);
    }

    if (publication) {
      await updatePublication(publicationUid, publication, db);
    }

    return {
      info: 'ok'
    }
  } catch (e) {
    throw new HttpsError('internal', 'Failed to update publication');
  }
})







