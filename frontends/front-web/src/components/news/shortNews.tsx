'use client'

import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import { Container } from '@/components/ui/container';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { NewsCard } from '@/components/news/newsCard';
import { newsData } from '@/data/news.data';

interface Props {

}

export const ShortNews = ({}: Props) => {

  return (
    <section>
      <Container className={'lg:pt-20 pb-40'}>
        <TitleSection title={'Les Réalisations'}/>
        <SubtitleSection
          path={'/actualites'}
          buttonText={'Voir toutes les réalisations'}
          text={'Vidéos exclusives et photos avant/après, ' +
            'suivez mes réalisations en direct des chantiers de plomberie, ' +
            'd’aménagement ou de dépannage en vous abonnnant à mon compte Instagram :'}
        />

        <div className={'bg-accent flex min-h-[350px] w-full justify-center p-10 items-center'}>
          <Carousel className="w-full">
            <CarouselContent className={'gap-x-5'}>
              {newsData.map((news) => {
                return (
                  <CarouselItem key={news.uid} className={'md:basis-1/2 lg:basis-1/3 bg-grey'}>
                    <NewsCard />
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