import { CategoryModel } from '../../models/publication/Publication.model';

export interface SendEmailRequest {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  postalCode: string;
  message: string;
  city: string;
  category: CategoryModel | 'REPAIR';
  acceptUseData: boolean;
}