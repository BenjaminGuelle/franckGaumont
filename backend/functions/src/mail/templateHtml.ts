import { SendEmailRequest } from '../shared/requests/mails/SendEmail.request';

export const templateHtml = (requestBody: SendEmailRequest): string => {
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
    category,
  } = requestBody;

  function categoryFR() {
    switch (category) {
      case 'REPAIR':
        return 'Dépannage';
      case 'PLUMBING':
        return 'Plomberie';
      case 'ARRANGEMENT':
        return 'Agencement';
    }
  }

  return (
    `<!DOCTYPE html>
      <html>
      <head>
          <style>
              .email-container {
                  font-family: Arial, sans-serif;
                  color: #333333;
                  max-width: 600px;
                  margin: auto;
                  padding: 20px;
                  border: 1px solid #dddddd;
                  border-radius: 10px;
                  background-color: #f9f9f9;
              }
              .email-header {
                  text-align: center;
                  border-bottom: 2px solid #eeeeee;
                  margin-bottom: 20px;
              }
              .email-header h1 {
                  color: #333333;
                  font-size: 24px;
              }
              .email-content {
                  line-height: 1.6;
              }
              .email-content p {
                  margin: 10px 0;
              }
              .email-footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #aaaaaa;
                  font-size: 12px;
              }
          </style>
          <title>Email de contact</title>
      </head>
      <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Nouvelle Demande de Contact</h1>
          </div>
          <div class="email-content">
              <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Téléphone :</strong> ${phone}</p>
              <p><strong>Adresse :</strong> ${address}, ${postalCode} ${city}</p>
              <p><strong>Catégorie :</strong> ${categoryFR()}</p>
              <p><strong>Message :</strong> ${message}</p>
              <p><strong>Accepte l'utilisation des données :</strong> ${acceptUseData ? 'Oui' : 'Non'}</p>
          </div>
          <div class="email-footer">
              <p>Ceci est un email automatique, merci de ne pas y répondre directement.</p>
          </div>
      </div>
      </body>
      </html>`
  );
};