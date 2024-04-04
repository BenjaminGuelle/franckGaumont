import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { ContactLink } from '@/components/ui/contactLink';
import React from 'react';
import { LiveInstagramAction } from '@/components/ui/liveInstagramAction';
import { ContactForm } from '@/components/contact/contactForm';

interface Props {

}

export const ContactContainer = ({}: Props) => {
  return (
    <Container className={'flex flex-col md:flex-row pt-20'}>
      <aside className={'w-full md:w-1/3 space-y-5 md:space-y-10'}>
        <Typography comp={'h3'} variant={'t-4'} className={'flex flex-col uppercase space-y-2'}>
          <span className={'font-extrabold'}>Contactez</span>
          <span className={'font-extrabold'}>Franck</span>
          <span className={'font-extrabold'}>Gaumont</span>
        </Typography>
        <div className={'space-y-2'}>
          <ContactLink contactLink={'ADDRESS'} className={'hidden lg:flex'} variant={'black'} weight={'medium'}/>
          <ContactLink contactLink={'PHONE'} variant={'black'} weight={'medium'}/>
          <ContactLink contactLink={'MAIL'} className={'hidden lg:flex hover:underline'} variant={'black'}
                       weight={'medium'}/>
        </div>
        <Typography comp={'p'} variant={'lead'} theme={'primary'}>
          Je suis disponible et réactif, contactez-moi pour échanger sur vos projets d’installation ou de rénovation.
          Imaginons ensemble les solutions pour simplifier votre quotidien !
        </Typography>
        <div className={'w-full flex justify-center md:justify-normal'}>
          <LiveInstagramAction/>
        </div>
      </aside>
      <ContactForm/>
    </Container>
  );
};