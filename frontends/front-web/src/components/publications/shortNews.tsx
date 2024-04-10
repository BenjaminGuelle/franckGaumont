
import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import { Container } from '@/components/ui/container';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import React from 'react';
import { PublicationCard } from '@/components/publications/publicationCard';

interface Props {
  publications: PublicationModel[];
}

export const ShortNews = ({ publications }: Props) => {
  return (
    <Container className={'lg:pt-20 pb-20'}>
      <TitleSection title={'Les Réalisations'}/>
      <SubtitleSection
        path={'/publications'}
        buttonText={'Voir toutes les réalisations'}
        text={'Vidéos exclusives et photos avant/après, ' +
          'suivez mes réalisations en direct des chantiers de plomberie, ' +
          'd’aménagement ou de dépannage en vous abonnnant à mon compte Instagram :'}
      />

      <div className={'flex min-h-[350px] w-full justify-center py-10 items-center'}>
        <Carousel className="w-full">
          <CarouselContent className={'md:px-20'}>
            {publications.map((news) => {
              return (
                <CarouselItem key={news.uid} className={'md:basis-1/2 lg:basis-1/3'}>
                  <PublicationCard publication={news} comp={'div'} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

    </Container>
  );
};