import { getDocs, Timestamp } from '@firebase/firestore';
import { FirebaseWrapperClient } from '@/database/firebase.service';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';

const fs = new FirebaseWrapperClient;

export async function getPublicationsWithPhotos(): Promise<PublicationModel[]> {
  const collectionSnapshot = fs.getCollectionRef('PUBLICATIONS');
  const querySnapshot = await getDocs(collectionSnapshot);

  const publications = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      uid: doc.id,
      ...data,
    } as PublicationModel;
  });

  return await Promise.all(publications.map(async (pub) => {
    const subCollRef = fs.getSubColRef('PUBLICATIONS', pub.uid, 'PHOTOS');
    const querySubSnap = await getDocs(subCollRef);
    pub.photos = querySubSnap.docs.map(doc => {
      const imgData: PublicationPhotoModel = doc.data() as PublicationPhotoModel;
      return {
        ...imgData,
      } as unknown as PublicationPhotoModel;
    });
    return serializeForClient(pub);
  }));
}

export function convertFakeTimeStampToNumber(time: Timestamp | number): number {
  if (time instanceof Timestamp) {
    return  new Date(time.seconds * 1000 + time.nanoseconds / 1000000).getTime();
  }
  return time;
}

function serializeForClient(pub: PublicationModel) {
  return {
    ...pub,
    creationDate: convertFakeTimeStampToNumber(pub.creationDate),
    updatedDate: pub.updatedDate ? convertFakeTimeStampToNumber(pub.updatedDate) : undefined,
    photos: pub.photos?.map(img => ({
      ...img,
      creationDate: convertFakeTimeStampToNumber(img.creationDate),
      updatedDate: img.updatedDate ? convertFakeTimeStampToNumber(img.updatedDate) : undefined,
    }))
  };
}