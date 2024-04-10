import { Typography } from '@/components/ui/typography';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/buttonLink';
import { ContactLink } from '@/components/ui/contactLink';
import { cn } from '@/lib/utils';
import { RiPhoneFill } from 'react-icons/ri';
import React from 'react';

export default function LegalNotice() {

  return (
    <Container className={'space-y-10 min-h-screen py-20'}>
      <Typography comp={'h1'} weight={'extrabold'} variant={'t-4'} className={'pb-6'}>Mentions Légales</Typography>
      <Typography comp={'div'} className={'space-y-10 pb-20'}>
        <p>En vertu de l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique,
          il est précisé aux utilisateurs du site https://franckgaumont.fr l’identité des différents intervenants dans
          le cadre de sa réalisation et de son suivi :</p>
        <div className={'flex flex-col'}>
          <h3 className={'font-semibold text-xl'}>Propriétaire :</h3>
          <p>Eurl Franck Gaumont</p>
          <ContactLink contactLink={'ADDRESS'} className={'hidden lg:flex'} variant={'black'} weight={'medium'}/>
          <a href={'tel:0783729832'}
             className={cn('inline-flex items-center space-x-1 group group-hover:text-primary/75')}>
            <RiPhoneFill className={'group-hover:text-primary/50'} size={20}/>
            <Typography weight={'medium'} theme={'primary'} className={'md:text-xl group-hover:text-primary/75'}>
              07 83 72 98 32
            </Typography>
          </a>
          <ContactLink contactLink={'MAIL'} className={'hidden lg:flex '} variant={'black'}
                       weight={'medium'}/>
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