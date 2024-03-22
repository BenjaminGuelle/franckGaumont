import { PublicationModel } from '../../models/publication/Publication.model';
import { PublicationPhotoModel } from '../../models/publication/PublicationPhoto.model';

export interface UpdatePublicationRequest {
  publicationUid: string;
  publication?: Partial<PublicationModel>;
  photos?: Partial<PublicationPhotoModel>[];
}
