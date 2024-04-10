import { Typography } from '@/components/ui/typography';
import { Container } from '@/components/ui/container';
import React from 'react';
import { ButtonLink } from '@/components/ui/buttonLink';

export default function PersonalData() {

  return (
    <Container className={'space-y-10 min-h-screen py-20'}>
      <Typography comp={'h1'} weight={'extrabold'} variant={'t-4'} className={'pb-6'}>
        Politique de Confidentialité de <span className={'font-extrabold'}>franckgaumont.fr</span>
      </Typography>
      <Typography comp={'div'} className={'space-y-10 pb-20'}>
        <div>
          <h3 className={'font-semibold text-xl'}>Introduction :</h3>
          <p>{`Chez franckgaumont.fr, nous nous engageons à protéger la confidentialité et 
            la sécurité des données personnelles que nous recueillons auprès de vous en tant qu'utilisateur de notre site.
            Cette politique explique comment nous collectons, utilisons et partageons vos informations personnelles.`}</p>
        </div>

        <div>
          <h3 className={'font-semibold text-xl'}>Quelles informations collectons-nous ? :</h3>
          <p>{`Nous collectons des informations que vous nous fournissez directement via notre formulaire de contact, 
          comme votre nom, votre adresse e-mail et tout autre renseignement que vous choisissez de nous fournir.`}</p>
        </div>

        <div>
          <h3 className={'font-semibold text-xl'}>Comment utilisons-nous vos informations ? :</h3>
          <p>{`Les informations que nous collectons via le formulaire de contact sont utilisées pour répondre à vos demandes, 
          gérer notre relation client, et, si vous y consentez, vous envoyer des informations sur nos services.`}</p>
        </div>

        <div>
          <h3 className={'font-semibold text-xl'}>Partage des informations :</h3>
          <p>{`Nous ne partageons pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour répondre à vos demandes, se conformer à la loi, ou protéger nos droits.`}</p>
        </div>

        <div>
          <h3 className={'font-semibold text-xl'}>Vos droits :</h3>
          <p>{`Conformément au RGPD, vous avez le droit d'accéder, de rectifier, de supprimer et de restreindre le traitement 
          de vos données personnelles. Vous pouvez également vous opposer au traitement de vos données et avez le droit à la portabilité de vos données.`}</p>
        </div>

        <div>
          <h3 className={'font-semibold text-xl'}>Sécurité :</h3>
          <p>{`Nous prenons des mesures de sécurité strictes pour protéger vos données personnelles contre l'accès non autorisé, 
          la modification, la divulgation ou la destruction.`}</p>
        </div>

        <div>
          <h3 className={'font-semibold text-xl'}>Modifications de cette politique :</h3>
          <p>{`NNous pouvons mettre à jour cette politique de confidentialité pour refléter les changements dans nos pratiques d'information. 
          Si nous apportons des changements importants, nous vous en informerons sur notre site ou par d'autres moyens, comme l'e-mail.`}</p>
        </div>

        <div>
          <h3 className={'font-semibold text-xl'}>Contactez-nous :</h3>
          <p>{`Pour toute question ou préoccupation concernant cette politique ou vos données personnelles, 
          veuillez nous contacter à eurl.franckgaumont@gmail.com.`}</p>
        </div>

        <p>Cette Politique de Confidentialité est effective à partir du 10 avril 2024.</p>
      </Typography>
      <ButtonLink path={'/'}>{`Retour à l'accueil`}</ButtonLink>
    </Container>
  );
}