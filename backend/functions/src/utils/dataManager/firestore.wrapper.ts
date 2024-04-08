import { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import {
  FirestoreDbData,
  FirestoreDbObjectWithoutUid,
  FirestoreWrapperCollection, FirestoreWrapperDocument,
  FirestoreWrapperRoot,
} from './firestore.wrapper.interface';
import CollectionReference = firestore.CollectionReference;
import DocumentData = firestore.DocumentData;
import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;
import { ListOfCollections, ListOfFolders, ListOfSubCollection } from '../../shared/functionsMapp/ListOfCollections';
import DocumentReference = firestore.DocumentReference;
import { Storage, getStorage } from 'firebase-admin/storage';
import { Bucket, GetFilesResponse } from '@google-cloud/storage';

export class FirestoreWrapper {
  public db: Firestore;
  public storage: Storage
  collectionName: ListOfCollections;

  constructor() {
    this.db = getFirestore();
    this.storage = getStorage();
  }

  async get<T>(collection: FirestoreWrapperCollection, docUid: string): Promise<null | T>;
  async get<T>(collectionName: ListOfCollections, docUid: string): Promise<null | T>;
  async get<T>(root: FirestoreWrapperRoot, docUid: string): Promise<null | T> {
    const ref: CollectionReference<DocumentData> = this.getCollectionReference(root);
    const result: DocumentSnapshot<DocumentData> = await ref.doc(docUid).get();
    if (result.exists) {
      return result.data() as T;
    }
    return null;
  }

  async getAll<T extends { [key: string]: any }>(collection: FirestoreWrapperCollection): Promise<T[]>;
  async getAll<T extends { [key: string]: any }>(collectionName: ListOfCollections): Promise<T[]>;
  async getAll<T extends { [key: string]: any }>(root: FirestoreWrapperRoot): Promise<T[]> {
    const ref: CollectionReference<DocumentData> = this.getCollectionReference(root);
    const snapshot: QuerySnapshot<DocumentData> = await ref.get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async add<T extends object>(collection: FirestoreWrapperCollection, value: T): Promise<FirestoreDbData<T>>;
  async add<T extends object>(collectionName: ListOfCollections, value: T): Promise<FirestoreDbData<T>>;
  async add<T extends object>(root: FirestoreWrapperRoot, value: T): Promise<FirestoreDbData<T>> {
    const ref: FirestoreWrapperCollection = this.getCollectionReference(root);
    const item: FirestoreDbObjectWithoutUid<T> = {
      creationDate: Timestamp.now(),
      ...value,
    }

    const documentRef: FirestoreWrapperDocument = await ref.add(item);
    const uid: string = documentRef.id;
    await documentRef.update({uid});
    return {...item, uid} as FirestoreDbData<T>;
  }

  async update<T>(collection: FirestoreWrapperCollection, uid: string, value: Partial<T>): Promise<{ info: 'ok' }>;
  async update<T>(collectionName: ListOfCollections, uid: string, value: Partial<T>): Promise<{ info: 'ok' }>;
  async update<T>(root: FirestoreWrapperRoot, uid: string, value: Partial<T>): Promise<{ info: 'ok' }> {
    delete (value as any).uid;
    delete (value as any).creationDate;

    const ref: CollectionReference<DocumentData> = this.getCollectionReference(root);
    await ref.doc(uid).set(value, { merge: true });
    return {
      info: 'ok',
    };
  }

  async set<T>(collectionName: ListOfCollections, value: FirestoreDbData<T>): Promise<T>;
  async set<T>(collection: FirestoreWrapperCollection, value: FirestoreDbData<T>): Promise<T>;
  async set<T>(root: FirestoreWrapperRoot, value: FirestoreDbData<T>): Promise<T> {
    this.testHasUidAndCreationDate(value);
    const ref: CollectionReference<DocumentData> = this.getCollectionReference(root);
    await ref.doc(value.uid).set(value);
    return value as FirestoreDbData<T>;
  }

  async del(collection: FirestoreWrapperCollection, docUid: string): Promise<{ info: 'ok' }>;
  async del(collectionName: ListOfCollections, docUid: string): Promise<{ info: 'ok' }>;
  async del(root: FirestoreWrapperRoot, docUid: string): Promise<{ info: 'ok' }> {
    const ref: CollectionReference<DocumentData> = this.getCollectionReference(root);
    await this.db.recursiveDelete(ref.doc(docUid));

    return { info: 'ok' };
  }

  async getAllWithSub<T extends { [key: string]: any }>(collection: FirestoreWrapperCollection, docUid: string, subCollectionName: ListOfSubCollection): Promise<T[]>;
  async getAllWithSub<T extends { [key: string]: any }>(collectionName: ListOfCollections, docUid: string, subCollectionName: ListOfSubCollection): Promise<T[]>;
  async getAllWithSub<T extends { [key: string]: any }>(root: FirestoreWrapperRoot, docUid: string, subCollectionName: ListOfSubCollection): Promise<T[]> {
    const ref: CollectionReference<DocumentData> = this.getCollectionReference(root).doc(docUid).collection(subCollectionName);
    const snapshot: QuerySnapshot<DocumentData> = await ref.get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async updateWithSub<T>(collection: FirestoreWrapperCollection, docUid: string, subCollectionName: ListOfSubCollection, subDocUid: string, value: Partial<T>): Promise<{ info: 'ok' }>;
  async updateWithSub<T>(collectionName: ListOfCollections, docUid: string, subCollectionName: ListOfSubCollection, subDocUid: string, value: Partial<T>): Promise<{ info: 'ok' }>;
  async updateWithSub<T>(root: FirestoreWrapperRoot, docUid: string, subCollectionName: ListOfSubCollection, subDocUid: string, value: Partial<T>): Promise<{ info: 'ok' }> {
    const ref: DocumentReference<DocumentData> = this.getCollectionReference(root)
      .doc(docUid)
      .collection(subCollectionName)
      .doc(subDocUid);

    const doc: DocumentData = await ref.get();

    if (doc.exists) {
      delete (value as any).uid;
      delete (value as any).creationDate;
      await ref.set({
        ...value,
        updatedDate: Timestamp.now(),
      }, { merge: true });
    } else {
      await ref.set({
        ...value,
        creationDate: Timestamp.now(),
        updatedDate: Timestamp.now(),
      });
    }

    return { info: 'ok' };
  }

  async deleteWithSub(collection: FirestoreWrapperCollection, docUid: string, subCollectionName: ListOfSubCollection, subDocUid: string): Promise<{ info: 'ok' }>;
  async deleteWithSub(collectionName: ListOfCollections, docUid: string, subCollectionName: ListOfSubCollection, subDocUid: string): Promise<{ info: 'ok' }>;
  async deleteWithSub(root: FirestoreWrapperRoot, docUid: string, subCollectionName: ListOfSubCollection, subDocUid: string): Promise<{ info: 'ok' }> {
    const ref: DocumentReference<DocumentData> = this.getCollectionReference(root)
      .doc(docUid)
      .collection(subCollectionName)
      .doc(subDocUid);

    await this.db.recursiveDelete(ref);

    return { info: 'ok' };
  }

  async deleteFilesInStorage(folderName: ListOfFolders, subFolderId: string, fileId?: string) {
    const bucket: Bucket = this.storage.bucket();
    let path: string = `${folderName}/${subFolderId}`;

    if (fileId) {
      path = `${path}/${fileId}`;
    }

    const [files]: GetFilesResponse = await bucket.getFiles({prefix: path});

    if (files.length > 0) {
      const deletePromises: Promise<void>[] = files.map(file => file.delete().then(() => {}));
      await Promise.all(deletePromises);
    }

    return { info: 'ok' };
  }

  private getCollection(collectionName: ListOfCollections): CollectionReference<DocumentData> {
    return this.db.collection(collectionName);
  }

  getSubCollection(collectionName: ListOfCollections, docUid: string, subCollectionName: string): FirestoreWrapperCollection {
    return this.getCollection(collectionName).doc(docUid).collection(subCollectionName);
  }

  private getCollectionReference(root: FirestoreWrapperRoot): FirestoreWrapperCollection {
    return typeof root !== 'string' ? root : this.db.collection(root);
  }

  private testHasUidAndCreationDate(value: unknown): void {
    if (!(value as any)?.uid || !(value as any)?.creationDate) {
      throw new Error('object must have an uid and a creationDate field in case of set');
    }
  }

}