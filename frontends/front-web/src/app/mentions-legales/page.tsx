import { Typography } from '@/components/ui/typography';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/buttonLink';

export default function LegalNotice() {

  return (
    <Container className={'space-y-10 h-screen pt-20'}>
      <Typography comp={'h1'} weight={'extrabold'} variant={'t-4'} className={'pb-6'}>Mentions Légales</Typography>
      <Typography comp={'div'} className={'space-y-10'}>
        <p>En vertu de l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique,
          il est précisé aux utilisateurs du site https://franckgaumont.fr l’identité des différents intervenants dans
          le cadre de sa réalisation et de son suivi :</p>
        <div>
          <h3 className={'font-semibold text-xl'}>Propriétaire :</h3>
          <p>Franck Gaumont</p>
        </div>
        <div>
          <h3 className={'font-semibold text-xl'}>Créateur :</h3>
          <p>Agence: Le29mars</p>
        </div>
        <div>
          <h3 className={'font-semibold text-xl'}>Résponsable publication :</h3>
          <p>Franck Gaumont</p>
        </div>
        <div>
          <h3 className={'font-semibold text-xl'}>Développeur :</h3>
          <p>Benjamin Guelle – benjamin.guelle@gmail.com</p>
        </div>
        <div>
          <h3 className={'font-semibold text-xl'}>Designer :</h3>
          <p>Hugues Deroin-Thevenin – hello@monsieurpatte.fr</p>
        </div>
        <div>
          <h3 className={'font-semibold text-xl'}>Hébergeur :</h3>
          <p>O2switch - Chem. des Pardiaux, 63000 Clermont-Ferrand</p>
        </div>
      </Typography>
      <ButtonLink path={'/'}>{`Retour à l'accueil`}</ButtonLink>
    </Container>
  );
}