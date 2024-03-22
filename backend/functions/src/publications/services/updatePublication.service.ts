import { PublicationPhotoModel } from '../../shared/models/publication/PublicationPhoto.model';
import { Timestamp } from 'firebase-admin/firestore';
import { FirestoreWrapper } from '../../utils/dataManager/firestore.wrapper';
import { PublicationModel } from '../../shared/models/publication/Publication.model';
import { HttpsError } from 'firebase-functions/v2/https';

export async function updatePublication(publicationUid: string, publication: Partial<PublicationModel>, db: FirestoreWrapper) {
  const pub: Partial<PublicationModel> = {
    ...publication,
    updatedDate: Timestamp.now(),
  }
  await db.update('PUBLICATIONS', publicationUid, pub);
}

export async function updatePublicationPhotos(publicationUid: string, photos: Partial<PublicationPhotoModel>[], db: FirestoreWrapper): Promise<void> {
  for (const photo of photos) {
    const {uid, url, name} = photo;
    if (!uid) throw new HttpsError('failed-precondition', "Photo UID is required");
    if (!url) throw new HttpsError('failed-precondition',"Photo URL is required");
    if (!name) throw new HttpsError('failed-precondition',"Photo NAME is required");

    try {
      await db.updateWithSub('PUBLICATIONS', publicationUid, 'PHOTOS', uid, photo);
    } catch (e) {
      throw new HttpsError('failed-precondition', `Failed to update photo for publication ${publicationUid}`);
    }
  }
}

