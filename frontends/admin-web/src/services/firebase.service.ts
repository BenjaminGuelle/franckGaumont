import { httpsCallable, HttpsCallableResult } from '@firebase/functions';
import { firestore, functions, storage } from '@/config/firebase.config';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc as getDOC, getDocs,
  onSnapshot,
  query,
} from '@firebase/firestore';
import { FirebaseFunctions } from '@/shared/functionsMapp/FirebaseFunctions';
import { ListOfCollections, ListOfSubCollection } from '@/shared/functionsMapp/ListOfCollections';
import {
  StorageReference,
  UploadTask,
  ref,
  uploadBytesResumable,
  listAll, UploadTaskSnapshot, getDownloadURL,
} from '@firebase/storage';
import { uuidv4 } from '@firebase/util';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';

export interface ErrorSnapshot {
  code: string,
  message: string;
}

export type StorageName = 'PUBLICATIONS_MEDIA';

export class FirebaseWrapperClient {
  getFunctions;
  getFirestore;

  constructor() {
    this.getFunctions = functions;
    this.getFirestore = firestore;
  }

  getDocRef(collectionName: ListOfCollections, uid: string): DocumentReference {
    return doc(this.getFirestore, collectionName, uid);
  }

  getCollectionRef(collectionName: ListOfCollections): CollectionReference {
    return collection(this.getFirestore, collectionName);
  }

  getSubColRef(collectionName: ListOfCollections, docUid: string, subCollectionName: ListOfSubCollection): CollectionReference {
    const parentDocRef = doc(this.getFirestore, collectionName, docUid);
    return collection(parentDocRef, subCollectionName);
  }

  async onCall<T extends keyof FirebaseFunctions>(
    functionName: FirebaseFunctions[T]['functionName'],
    requestData: FirebaseFunctions[T]['request'],
  ): Promise<FirebaseFunctions[T]['response']> {
    const { data }: HttpsCallableResult = await httpsCallable(this.getFunctions, functionName)(requestData);
    return data as FirebaseFunctions[T]['response'];
  }

  async getDoc<T>(collectionName: ListOfCollections, uid: string): Promise<T> {
    const docSnapshot = await getDOC(doc(this.getFirestore, collectionName, uid));
    return docSnapshot.data() as T;
  }

  async getCollection<T>(collectionName: ListOfCollections): Promise<T[]> {
    const collectionSnapshot = this.getCollectionRef(collectionName);
    const querySnapshot = await getDocs(collectionSnapshot);
    return querySnapshot.docs.map(doc => doc.data() as T);
  }

  onSnapshotCollection<T>(collectionRef: CollectionReference, callback: (data: T[]) => void): () => void {
    return onSnapshot(collectionRef, (querySnapshot) => {
      if (querySnapshot.empty) {
        callback([]);
      } else {
        const docs: T[] = querySnapshot.docs.map(doc => doc.data() as T);
        callback(docs);
      }
    }, (error) => {
      console.error("Erreur lors de l'écoute de la collection :", error);
      callback([]);
    });
  }

  onSnapshotDoc<T>(documentRef: DocumentReference, callback: (data: T | undefined) => void): () => void {
    return onSnapshot(documentRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback(docSnapshot.data() as T);
      } else {
        callback(undefined);
      }
    }, (error) => {
      console.error("Erreur lors de l'écoute du document :", error);
      callback(undefined);
    });
  }

  getLisAllStorage() {
    const ref = this.getStorageRef();
    return listAll(ref);
  }

  getStorageRef() {
    let storageRef: StorageReference;
    const path = 'PUBLICATIONS_MEDIA';
    return storageRef = ref(
      storage,
      path
    );
  }

  async uploadFilesInStorage(storageName: StorageName, storageUid: string, items: filesToUpload[]): Promise<Partial<PublicationPhotoModel>[]> {
    const itemsWithUid: filesToUpload[] = this.verifyUidOnItem(items);

    const uploadPromises = itemsWithUid.map((item) => {
      let path: string = `${storageName}/${storageUid}/${item.uid}`;
      let storageRef = ref(storage, path);
      let uploadTask = uploadBytesResumable(storageRef, item.file);

      return new Promise<Partial<PublicationPhotoModel>>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            // Optionnel : suivi de l'état de l'upload
          },
          (error) => {
            console.error('Upload error', error);
            reject(error);
          },
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              uid: item.uid,
              url: downloadUrl,
              name: this.sanitizeFileName(item.file.name),
            });
          }
        );
      });
    });

    return Promise.all(uploadPromises);
  }


  private verifyUidOnItem(items: filesToUpload[]): filesToUpload[] {
    return items.map((item) => {
      if (!item.uid) {
        item.uid = uuidv4();
      }

      return item
    })
  }

  private sanitizeFileName(fileName: string) {
    return fileName
      .replace(/\s+/g, '_')
      .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')
  }
}

export interface filesToUpload {
  file: File;
  uid?: string;
}

