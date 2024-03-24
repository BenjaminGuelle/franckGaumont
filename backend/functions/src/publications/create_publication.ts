import { CallableRequest, HttpsError, onCall } from 'firebase-functions/v2/https';
import { CreatePublicationRequest } from '../shared/requests/publications/CreatePublication.request';
import { isBoolean, isIncludedIn, isString } from '../utils/checkTypes';
import { FirestoreWrapper } from '../utils/dataManager/firestore.wrapper';
import { PublicationModel } from '../shared/models/publication/Publication.model';

const db: FirestoreWrapper = new FirestoreWrapper();

export const create_publication = onCall({
  region: 'europe-west3', memory: '4GiB', timeoutSeconds: 540,
}, async (req: CallableRequest<CreatePublicationRequest>): Promise<PublicationModel> => {

  const requestBody: CreatePublicationRequest = req.data;

  const {title, description, category, city, isOnline} = requestBody;

  isString(title, 'title');
  isString(description, 'description');
  isString(city, 'city');
  isIncludedIn(category, ['ARRANGEMENT', 'PLUMBING'], category);
  isBoolean(isOnline, 'isOnline');

  try {
    return await db.add('PUBLICATIONS', requestBody);
  } catch (e) {
    throw new HttpsError('internal', 'Error on create publication', e);
  }

})