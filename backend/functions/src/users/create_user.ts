import * as admin from 'firebase-admin';
import { createUser } from './services/createUser.service';
import { CreateUserRequest } from '../requests/users/CreateUser.request';
import { CreateUserResponse } from '../responses/users/CreateUser.response';
import { CallableRequest, onCall } from 'firebase-functions/v2/https';
import { testEmail, testPassword } from '../utils/testsLogic';
import { isString } from '../utils/checkTypes';
import { HttpsError } from 'firebase-functions/v2/https';

const db = admin.firestore();

export const create_user = onCall({
  region: 'europe-west3', memory: '4GiB', timeoutSeconds: 540,
}, async (req: CallableRequest<CreateUserRequest>): Promise<CreateUserResponse> => {

  const requestBody: CreateUserRequest = req.data;

  const {email, password, firstName, lastName} = requestBody;

  testEmail(email);
  testPassword(password);
  if (firstName) {
    isString(firstName, 'firstName');
  }
  if (lastName) {
    isString(lastName, 'lastName');
  }

  try {
    const userUid: string = await createUser(requestBody, db);
    return { info: 'created', user: userUid };
  } catch (e) {
    throw new HttpsError('internal', 'Error on create user');
  }
});
