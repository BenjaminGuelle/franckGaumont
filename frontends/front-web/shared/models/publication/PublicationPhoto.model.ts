import { Timestamp } from '@firebase/firestore';

export interface PublicationPhotoModel {
  uid: string;
  url: string;
  name: string;
  creationDate: Timestamp | number,
  updatedDate?: Timestamp | number,
  isHero: boolean;
}