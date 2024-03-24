import { FirestoreWrapper } from '../../utils/dataManager/firestore.wrapper';
import { HttpsError } from 'firebase-functions/v2/https';
import { ConfirmationResponse } from '../../shared/responses/Confirmation.response';
export async function deletePublication(publicationId: string, fbWrapper: FirestoreWrapper): Promise<ConfirmationResponse> {

  try {
    await fbWrapper.deleteFilesInStorage('PUBLICATIONS_MEDIA', publicationId);
  } catch (e) {
    throw new HttpsError('internal', `Failed to delete files of publication with uid ${publicationId}`, e);
  }

  return await fbWrapper.del('PUBLICATIONS', publicationId);
}

export async function deletePublicationFile(publicationId: string, fileId: string, fbWrapper: FirestoreWrapper): Promise<ConfirmationResponse> {

  try {
    await fbWrapper.deleteFilesInStorage('PUBLICATIONS_MEDIA', publicationId, fileId);
 } catch (e) {
    throw new HttpsError('internal', `Failed to delete file uid :: ${fileId} of publication uid :: ${publicationId}`, e);
 }

  return await fbWrapper.deleteWithSub('PUBLICATIONS', publicationId, 'PHOTOS', fileId);
}