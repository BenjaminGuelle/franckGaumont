import * as admin from 'firebase-admin';
import { auth, FirebaseError, firestore } from 'firebase-admin';
import { isString } from '../../utils/checkTypes';
import { manageError } from '../../utils/errors';
import Firestore = firestore.Firestore;
import UserRecord = auth.UserRecord;
import DocumentReference = admin.firestore.DocumentReference;
import { CreateUserRequest } from '../../requests/users/CreateUser.request';
import { Timestamp } from 'firebase-admin/firestore';
import { UserModel } from '../../models/users/User.model';

export async function createUser(request: CreateUserRequest, db: Firestore): Promise<string> {

  const createdUser: UserRecord = await auth().createUser(request);

  if (!createdUser.uid) {
    manageError('internal', 'Error on create user auth');
  }

  const userUid = createdUser.uid;

  await createUserInDb({...request, userUid}, db);

  return userUid;
}

async function createUserInDb(request: CreateUserRequest, db: Firestore): Promise<void> {
  try {
    const {userUid, lastName, firstName, email, description} = request;

    const uid: string = userUid as string;
    isString(uid, 'userUid');

    const ref: DocumentReference = db.collection('users').doc(uid);

    const userPublic: UserModel = {
      description: description || '',
      creationDate: Timestamp.now(),
      birthdate: null,
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      isAdmin: false,
      isSuperAdmin: false,
      uid,
    };

    await ref.set(userPublic);

  } catch (e) {
    const error = e as FirebaseError;
    manageError('failed-precondition', error.message);
  }
}
