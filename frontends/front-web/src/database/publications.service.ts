import {
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  startAfter,
  Timestamp, where,
} from '@firebase/firestore';
import { FirebaseWrapperClient } from '@/database/firebase.service';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';
import { query } from '@firebase/firestore';

const fs = new FirebaseWrapperClient;

export async function getPublicationsWithPhotos(withLimit?: number): Promise<PublicationModel[]> {
  const collectionSnapshot: CollectionReference = fs.getCollectionRef('PUBLICATIONS');

  let publicationsQuery;

  if (withLimit) {
    publicationsQuery = query(collectionSnapshot, where('isOnline', '==', true), orderBy('creationDate', 'desc'), limit(3));
  } else {
    publicationsQuery = query(collectionSnapshot, where('isOnline', '==', true), orderBy('creationDate', 'desc'));
  }

  const querySnapshot = await getDocs(publicationsQuery);

  const publications = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      uid: doc.id,
      ...data,
    } as PublicationModel;
  });

  return returnPublicationWithPhotoSerialized(publications);
}

export interface getPublicationsWithPaginationRequest {
  perPage: number;
  lastVisible?: number;
}

export interface getPublicationsWithPaginationResponse {
  data: PublicationModel[];
  lastVisible?: number;
}

export async function getPublicationsWithPhotosWithPagination(request: getPublicationsWithPaginationRequest): Promise<getPublicationsWithPaginationResponse> {
  const { perPage = 9 }: getPublicationsWithPaginationRequest = request;

  const collectionSnapshot: CollectionReference = fs.getCollectionRef('PUBLICATIONS');

  let publicationsQuery;
  let lastVisible: number | undefined = request.lastVisible;
  let data: PublicationModel[] = [];

  if (lastVisible) {
    const date = new Date(lastVisible);
    const lastVisibleToTimestamp = Timestamp.fromDate(date);
    publicationsQuery = query(collectionSnapshot, where('isOnline', '==', true), orderBy('creationDate'), startAfter(lastVisibleToTimestamp), limit(perPage));
  } else {
    publicationsQuery = query(collectionSnapshot, where('isOnline', '==', true), orderBy('creationDate'), limit(perPage));
  }

  const querySnapshot = await getDocs(publicationsQuery);
  if (!querySnapshot.empty) {
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    lastVisible = lastDoc.data().creationDate.toMillis();

    const publications = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: doc.id,
        ...data,
      } as PublicationModel;
    });

    data = await returnPublicationWithPhotoSerialized(publications);
  }

  return { lastVisible, data };
}

export async function getPublicationByIdWithPhotos(publicationId: string): Promise<PublicationModel> {
  const publication: PublicationModel = await fs.getDoc<PublicationModel>('PUBLICATIONS', publicationId);
  const photoRef: CollectionReference = fs.getSubColRef('PUBLICATIONS', publicationId, 'PHOTOS');
  publication.photos = await fs.getSubCollection<PublicationPhotoModel>(photoRef);

  return serializeForClient(publication);
}

async function returnPublicationWithPhotoSerialized(publications: PublicationModel[]) {
  return await Promise.all(publications.map(async (pub) => {
    const subCollRef: CollectionReference = fs.getSubColRef('PUBLICATIONS', pub.uid, 'PHOTOS');
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

function serializeForClient(pub: PublicationModel) {
  return {
    ...pub,
    creationDate: convertFakeTimeStampToNumber(pub.creationDate),
    updatedDate: pub.updatedDate ? convertFakeTimeStampToNumber(pub.updatedDate) : undefined,
    photos: pub.photos?.map(img => ({
      ...img,
      creationDate: convertFakeTimeStampToNumber(img.creationDate),
      updatedDate: img.updatedDate ? convertFakeTimeStampToNumber(img.updatedDate) : undefined,
    })),
  };
}

export function convertFakeTimeStampToNumber(time: Timestamp | number): number {
  if (time instanceof Timestamp) {
    return new Date(time.seconds * 1000 + time.nanoseconds / 1000000).getTime();
  }
  return time;
}