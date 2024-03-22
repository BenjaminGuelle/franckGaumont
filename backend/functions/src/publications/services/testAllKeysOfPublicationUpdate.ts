import { PublicationModel } from '../../shared/models/publication/Publication.model';
import { isIncludedIn, isString } from '../../utils/checkTypes';
import { PublicationPhotoModel } from '../../shared/models/publication/PublicationPhoto.model';

export function testAllKeysPublication(publication?: Partial<PublicationModel>) {
  if (publication) {
    const {uid, city, title, description, category} = publication;

    if (uid) {
      isString('uid', uid);
    }
    isString(title, 'title');
    isString(description, 'description');
    isString(city, 'city');

    if (category) {
      isIncludedIn(category, ['ARRANGEMENT', 'PLUMBING'], category);
    }
  }
}

export function testAllKeysPublicationPhoto(photos?: Partial<PublicationPhotoModel>[]) {
  photos?.forEach((photo) => {
    const {uid, url, name} = photo;

    if (uid) {
      isString('uid', uid);
    }
    if (url) {
      isString('url', url);
    }
    if (name) {
      isString('name', name);
    }
  })
}