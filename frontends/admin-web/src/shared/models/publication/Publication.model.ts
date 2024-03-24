import { Timestamp } from 'firebase-admin/firestore';
import { PublicationPhotoModel } from './PublicationPhoto.model';

export interface PublicationModel {
  uid: string;
  creationDate: Timestamp,
  updatedDate?: Timestamp,

  title: string;
  description: string;
  category: CategoryModel;
  city: string;

  isOnline: boolean;

  images?: PublicationPhotoModel[];
}

export type CategoryModel = 'ARRANGEMENT' | 'PLUMBING';