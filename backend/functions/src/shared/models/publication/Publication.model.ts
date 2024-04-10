import { Timestamp } from 'firebase-admin/firestore';
import { PublicationPhotoModel } from './PublicationPhoto.model';

export interface PublicationModel {
  uid: string;
  creationDate: Timestamp | number,
  updatedDate?: Timestamp | number,

  title: string;
  description: string;
  category: CategoryModel;
  city: string;

  isOnline: boolean;
  priority: boolean;

  // always for front
  photos?: PublicationPhotoModel[];
}

export type CategoryModel = 'ARRANGEMENT' | 'PLUMBING';