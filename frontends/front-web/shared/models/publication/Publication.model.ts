import { PublicationPhotoModel } from './PublicationPhoto.model';
import { Timestamp } from '@firebase/firestore';

export interface PublicationModel {
  uid: string;
  creationDate: Timestamp | number,
  updatedDate?: Timestamp | number,

  title: string;
  description: string;
  category: CategoryModel;
  city: string;

  isOnline: boolean;

  // always for front
  photos?: PublicationPhotoModel[];
}

export type CategoryModel = 'ARRANGEMENT' | 'PLUMBING';