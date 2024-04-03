"use client"

import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import { Container } from '@/components/ui/container';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { useMemo } from 'react';
import Image from 'next/image';

interface Props {
  publications: PublicationModel[];
}

export const ShortNews = ({publications}: Props) => {

  const activePublications: PublicationModel[] = useMemo(() => {
    const filteredPublications: PublicationModel[] = publications.filter(pub => pub.isOnline);

    console.log(filteredPublications)
    return filteredPublications.slice(0, 3);
  }, [publications]);

  return (
    <section>
      <Container className={'lg:pt-20 pb-40'}>
        <TitleSection title={'Les Réalisations'}/>
        <SubtitleSection
          path={'/publications'}
          buttonText={'Voir toutes les réalisations'}
          text={'Vidéos exclusives et photos avant/après, ' +
            'suivez mes réalisations en direct des chantiers de plomberie, ' +
            'd’aménagement ou de dépannage en vous abonnnant à mon compte Instagram :'}
        />

        <div className={'bg-accent flex min-h-[350px] w-full justify-center p-10 items-center'}>
          <Carousel className="w-full">
            <CarouselContent className={'gap-x-0'}>
              {activePublications.map((news) => {
                return (
                  <CarouselItem key={news.uid} className={'md:basis-1/2 h-full lg:basis-1/3'}>
                    <div className={'h-full bg-secondary'}>
                      {news.photos && <Image width={200} height={200} src={news.photos[0].url} alt={'photo'}/>}
                      <p>{news.title}</p>
                      <p>{news.description}</p>
                      <p>{news.city}</p>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            {/*<CarouselPrevious />*/}
            {/*<CarouselNext />*/}
          </Carousel>
        </div>

      </Container>
    </section>
  )
}