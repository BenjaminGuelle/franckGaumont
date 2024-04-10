import { PublicationModel } from '../models/publication/Publication.model';

export interface GetPublicationsWithPaginationResponse {
  data: PublicationModel[];
  lastVisible?: number;
  lastPriority?: boolean;
}