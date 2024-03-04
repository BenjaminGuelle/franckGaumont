import { ConfirmationResponse } from '../Confirmation.response';

export interface CreateUserResponse extends ConfirmationResponse {
  user: string;
}
