import { auth, FirebaseError } from 'firebase-admin';
import { manageError } from '../../utils/errors';
import UserRecord = auth.UserRecord;
import { CreateUserRequest } from '../../shared/requests/users/CreateUser.request';
import { Timestamp } from 'firebase-admin/firestore';
import { UserModel } from '../../shared/models/users/User.model';
import { FirestoreWrapper } from '../../utils/dataManager/firestore.wrapper';

const db: FirestoreWrapper = new FirestoreWrapper();

export async function createUser(request: CreateUserRequest): Promise<string> {

  const createdUser: UserRecord = await auth().createUser(request);

  if (!createdUser.uid) {
    manageError('internal', 'Error on create user auth, no uid generate');
  }

  const uid = createdUser.uid;

  await createUserInDb(request, uid);

  return uid;
}

async function createUserInDb(request: CreateUserRequest, uid: string): Promise<void> {
  try {

    const userPublic: UserModel = {
      uid,
      creationDate: Timestamp.now(),
      isAdmin: false,
      isSuperAdmin: false,
      firstName: request.firstName || '',
      lastName: request.lastName || '',
      email: request.email,
      description: request.description || '',
    };

    await db.set('USERS', userPublic)

  } catch (e) {
    const error = e as FirebaseError;
    manageError('failed-precondition', error.message);
  }
}
