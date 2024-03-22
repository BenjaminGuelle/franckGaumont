import * as admin from 'firebase-admin';
import Firestore = admin.firestore.Firestore;
import { firestore } from 'firebase-admin';
import DocumentReference = firestore.DocumentReference;
import CollectionReference = firestore.CollectionReference;
import DocumentData = firestore.DocumentData;
import { ListOfCollections } from '../../shared/functionsMapp/ListOfCollections';

export interface DataManagerConfig {
  db: Firestore;
  collectionName: string;
  collectionRef?: CollectionReference;
}

export class DataManager<T> {
  db: Firestore;
  collectionName: string;
  collectionRef?: CollectionReference;
  ref?: DocumentReference;
  docUid?: string;

  constructor({db, collectionName, collectionRef}: DataManagerConfig) {
    this.db = db;
    this.collectionName = collectionName;
    if (collectionRef) {
      this.collectionRef = collectionRef;
    }
  }

  async resolveDoc(docUid: string): Promise<T | null> {
    if (!docUid) {
      return null as  unknown as T;
    }

    this.docUid = docUid;
    this.ref = this.db.collection(this.collectionName).doc(docUid);
    const snap = await this.ref.get();

    if (!snap.exists) {
      return null;
    }

    return snap.data() as T;
  }

  async resolveCollection(): Promise<T[]> {
    const ref = this.collectionName ? this.db.collection(this.collectionName) : this.collectionRef;
    const snap = await (ref as CollectionReference).get();
    const data: T[] = [];
    if (snap.size > 0) {
      snap.forEach(value => data.push({...value.data() as T}));
    }
    return data;
  }

  getDocRef(): DocumentReference {
    if (this.docUid && this.ref && this.collectionName) {
      return this.db.collection(this.collectionName).doc(this.docUid);
    } else {
      throw new Error('Data Manager must contains docUid, collection Name and ref');
    }
  }

  getCollectionRef(collectionName: ListOfCollections): CollectionReference<DocumentData> {
    return this.db.collection(collectionName);
  }


}