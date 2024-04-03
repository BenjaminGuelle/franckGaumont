"use client"

import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import { Container } from '@/components/ui/container';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { useMemo } from 'react';
import Image from 'next/image';
import { GiPositionMarker } from 'react-icons/gi';
import { ActionLink } from '@/components/ui/actionLink';

interface Props {
  publications: PublicationModel[];
}

export const ShortNews = ({publications}: Props) => {

  const activePublications: PublicationModel[] = useMemo(() => {
    const filteredPublications: PublicationModel[] = publications.filter(pub => pub.isOnline);

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

        <div className={'flex min-h-[350px] w-full justify-center py-10 items-center'}>
          <Carousel className="w-full">
            <CarouselContent className={'gap-x-0'}>
              {activePublications.map((news) => {
                return (
                  <CarouselItem key={news.uid} className={'md:basis-1/2 lg:basis-1/3'}>
                    <div>
                      <div className={'w-full aspect-square relative'}>
                        {news.photos &&
                            <Image priority={true} fill={true} src={news.photos[0].url} alt={'photo'} className={'object-cover'}/>}
                      </div>
                      <div className="py-4 h-[11rem] flex flex-col">
                        <h3 className="text-xl font-bold">{news.title}</h3>
                        <p className="text-lg text-grey-300 italic flex items-center py-2">
                          <GiPositionMarker className={'text-grey-300 text-lg'} />
                          {news.city}
                        </p>
                        <p className="line-clamp-3 overflow-hidden text-ellipsis">{news.description}</p>
                      </div>
                      <ActionLink path={'/'} text={'Voir la réalisation'} className={'flex'}/>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>

      </Container>
    </section>
  )
}