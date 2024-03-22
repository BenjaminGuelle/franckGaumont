import { ConfirmationResponse } from './Confirmation.response';

export interface CreatePublicationResponse extends ConfirmationResponse {
  uid: string;
}