import { CallableRequest, HttpsError, onCall } from 'firebase-functions/v2/https';
import { isBoolean, isIncludedIn, isString } from '../utils/checkTypes';
import { ConfirmationResponse } from '../shared/responses/Confirmation.response';
import { templateHtml } from './templateHtml';
import { SendEmailRequest } from '../shared/requests/mails/SendEmail.request';
const nodemailer = require("nodemailer");
import * as functions from "firebase-functions"

export const send_email = onCall({
  region: 'europe-west3', memory: '4GiB', timeoutSeconds: 540,
}, async (req: CallableRequest<SendEmailRequest>): Promise<ConfirmationResponse> => {
  const requestBody: SendEmailRequest = req.data;
  const {
    firstName,
    lastName,
    address,
    message,
    email,
    acceptUseData,
    phone,
    postalCode,
    city,
    category} = requestBody;

  const mailgun = functions.config().mailgun;
  const transporter = nodemailer.createTransport({
    host: mailgun.host,
    port: 587,
    auth: {
      user: mailgun.username,
      pass: mailgun.password
    }
  });

  isString(firstName, 'firstName');
  isString(lastName, 'lastName');
  isString(address, 'address');
  isString(message, 'message');
  isString(email, 'email');
  isString(phone, 'phone');
  isString(postalCode, 'postalCode');
  isString(city, 'city');
  isIncludedIn(category, ['ARRANGEMENT', 'PLUMBING', 'REPAIR'], category);
  isBoolean(acceptUseData, 'acceptUseData');

  const mailOptions = {
    from: `"Demande de contact" <noreply${email}>`,
    to: 'eurl.franckgaumont@gmail.com', // PROD
    // to: 'ben.test.fg@yopmail.fr', // DEV
    subject: 'Nouvelle demande de contact',
    text: `Nom: ${firstName} ${lastName}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`,
    html: templateHtml(requestBody),
  };


  try {
    await transporter.sendMail(mailOptions);
    return {info: 'ok'}
  } catch (e) {
    throw new HttpsError('internal', 'Error on send email', e);
  }
})
