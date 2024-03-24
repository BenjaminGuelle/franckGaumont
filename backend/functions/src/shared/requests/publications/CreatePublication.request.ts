import { CategoryModel } from '../../models/publication/Publication.model';

export interface CreatePublicationRequest {
  title: string;
  description: string;
  city: string;
  category: CategoryModel;
  isOnline: boolean;
}