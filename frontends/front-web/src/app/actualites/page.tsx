import { Container } from '@/components/ui/container';
import React from 'react';
import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { getPublicationsWithPhotos } from '@/database/publications.service';
import { Publications } from '@/components/news/publications';
import { Typography } from '@/components/ui/typography';
import { ContactMe } from '@/components/ui/contactMe';
import { InstaLink } from '@/components/ui/instaLink';
import { Divider } from '@/components/divider/divider';
import { ShortServices } from '@/components/services/shortServices';

export default async function News() {
  const publications: PublicationModel[] = await getPublicationsWithPhotos();

  return (
    <>
      <Container>
        <TitleSection title={'Découvrez les dernières réalisations'}/>
        <SubtitleSection
          text={'Explorez les différentes réalisations et visualisez l’évolution progressive des chantiers. ' +
            'Découvrez des exemples de chantiers réussis, témoignant de ma passion, de matériaux de qualité et de mon savoir-faire en action.'}
        />

        <Publications publications={publications} />

      </Container>
      <Divider>
        <Typography variant={'t-3'} theme={'white'} weight={'light'} className={'text-center lg:text-left'}>
          Vous avez un projet <span className={'font-extrabold'}>d’installation</span> ou de <span className={'font-extrabold'}>rénovation</span> ?
        </Typography>
        <div className={'flex flex-col space-y-3 pt-5 md:flex-row md:space-y-0 md:gap-x-5'}>
          <ContactMe />
          <InstaLink />
        </div>
      </Divider>
      <ShortServices />
    </>
  );
}