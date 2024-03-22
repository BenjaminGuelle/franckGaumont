import { firestore } from 'firebase-admin';
import CollectionReference = firestore.CollectionReference;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import { Timestamp } from 'firebase-admin/firestore';
import { ListOfCollections } from '../../shared/functionsMapp/ListOfCollections';

export type FirestoreWrapperCollection = CollectionReference<DocumentData>;
export type FirestoreWrapperDocument = DocumentReference<DocumentData>;
export type FirestoreWrapperRoot = ListOfCollections | FirestoreWrapperCollection;
export type FirestoreDbData<T> = FirestoreDbObject<T>;

export type FirestoreDbObjectWithoutUid<T> = {
  creationDate: Timestamp;
} & T;

export type FirestoreDbObject<T> = {
  uid: string;
  creationDate: Timestamp;
} & T;