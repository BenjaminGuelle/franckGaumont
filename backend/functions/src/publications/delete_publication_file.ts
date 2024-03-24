import { onCall } from 'firebase-functions/v2/https';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import { ConfirmationResponse } from '../shared/responses/Confirmation.response';
import { isString } from '../utils/checkTypes';
import { deletePublicationFile } from './services/deletePublication.service';
import { FirestoreWrapper } from '../utils/dataManager/firestore.wrapper';
import { DeletePublicationFileRequest } from '../shared/requests/publications/DeletePublicationFile.request';

const fbWrapper: FirestoreWrapper = new FirestoreWrapper();

export const delete_publication_file = onCall({
  region: 'europe-west3', memory: '4GiB', timeoutSeconds: 540,
}, async (req: CallableRequest<DeletePublicationFileRequest>): Promise<ConfirmationResponse> => {

  const {publicationId, fileId }: DeletePublicationFileRequest = req.data;

  isString('publicationId', publicationId);
  isString('fileId', fileId);

  try {
    return await deletePublicationFile(publicationId, fileId, fbWrapper);
  } catch (e) {
    throw new HttpsError('internal', `Failed to delete publication with uid ${publicationId}`, e);
  }
})