import { Container } from '@/components/ui/container';
import React from 'react';
import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import {
  getPublicationsWithPaginationResponse,
  getPublicationsWithPhotosWithPagination,
} from '@/database/publications.service';
import { Publications } from '@/components/publications/publications';
import { Typography } from '@/components/ui/typography';
import { Divider } from '@/components/divider/divider';
import { ShortServices } from '@/components/services/shortServices';
import { ButtonLink } from '@/components/ui/buttonLink';
import { RiInstagramLine } from 'react-icons/ri';

export default async function News() {
  const {data, lastVisible}: getPublicationsWithPaginationResponse = await getPublicationsWithPhotosWithPagination({perPage: 3});

  return (
    <>
      <Container className={'pt-14 md:pt-20'}>
        <TitleSection title={'Découvrez les dernières réalisations'} label={'Actualités'} comp={'h1'} classNameIcon={'hidden md:block'}/>
        <SubtitleSection
          text={'Explorez les différentes réalisations et visualisez l’évolution progressive des chantiers. ' +
            'Découvrez des exemples de chantiers réussis, témoignant de ma passion, de matériaux de qualité et de mon savoir-faire en action.'}
        />

        <Publications publications={data} lastVisible={lastVisible}/>

      </Container>
      <Divider>
        <Typography variant={'t-3'} theme={'white'} weight={'light'} className={'text-center lg:text-left'}>
          Vous avez un projet <span className={'font-extrabold'}>d’installation</span> ou de <span className={'font-extrabold'}>rénovation</span> ?
        </Typography>
        <div className={'flex flex-col space-y-3 pt-5 md:flex-row md:space-y-0 md:gap-x-5'}>
          <ButtonLink path={'/contact'}>Contactez - moi</ButtonLink>
          <ButtonLink variant={'outline'} path={'https://www.instagram.com/eurl.franckgaumont/'}>
            <RiInstagramLine size={20}/>
            Suivez-moi sur instagram
          </ButtonLink>
        </div>
      </Divider>
      <ShortServices />
    </>
  );
}