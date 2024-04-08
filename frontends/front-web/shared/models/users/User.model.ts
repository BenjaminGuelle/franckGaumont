import { Timestamp } from 'firebase-admin/firestore';

export interface UserModel {
  uid: string;
  email: string,
  creationDate: Timestamp,

  firstName?: string,
  lastName?: string,
  description?: string;
  birthdate?: null,

  isAdmin: boolean,
  isSuperAdmin: boolean,
}