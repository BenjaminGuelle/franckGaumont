import { FirebaseWrapperClient } from '@/database/firebase.service';
import { SendEmailRequest } from '@/shared/requests/mails/SendEmail.request';
import { ConfirmationResponse } from '@/shared/responses/Confirmation.response';

const fs = new FirebaseWrapperClient;

export async function sendEmailContact(request: SendEmailRequest): Promise<ConfirmationResponse> {
  return await fs.onCall<'sendEmail'>('MAIL-send_email', request);
}