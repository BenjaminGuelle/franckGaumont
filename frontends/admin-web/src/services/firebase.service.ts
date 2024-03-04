import { httpsCallable, HttpsCallableResult } from '@firebase/functions';
import { firestore, functions } from '@/config/firebase.config';
import { doc, DocumentReference, getDoc as getDOC } from '@firebase/firestore';
import { FunctionsMapp } from '@/config/functionsMapp';

export async function onCall<T extends keyof FunctionsMapp>(
  functionName: FunctionsMapp[T]['functionName'],
  requestData: FunctionsMapp[T]['request']
): Promise<FunctionsMapp[T]['response']> {
  const { data }: HttpsCallableResult = await httpsCallable(functions, functionName)(requestData);
  return data as FunctionsMapp[T]['response'];
}

export async function getDoc<T>(path: string, uid: string): Promise<T | undefined> {
  const docSnapshot = await getDOC(doc(firestore, path, uid));
  return docSnapshot.data() as T;
}

export function docRef(path: string, uid: string): DocumentReference {
  return doc(firestore, path, uid);
}
