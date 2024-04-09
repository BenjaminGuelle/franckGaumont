'use client';

import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { Container } from '@/components/ui/container';
import { TitleSection } from '@/components/ui/titleSection';
import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { EmptyImage } from '@/components/publications/emptyPicture';
import { GiPositionMarker } from 'react-icons/gi';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';

interface Props {
  publication: PublicationModel;
}

export const PublicationDetails = ({ publication }: Props) => {
  const { title, category, city, description, photos }: PublicationModel = publication;
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>((photos && photos.length > 0) ? photos[0].url : null);

  const displayThisPicture = useCallback((url: string) => {
    setPreview(url);
  }, []);

  const categoryFR: string = useMemo(() => {
    switch (category) {
      case 'ARRANGEMENT':
        return 'Agencement';
      case 'PLUMBING':
        return 'Plomberie';
    }
  }, [category]);

  return (
    <Container className={'space-y-0 md:space-y-4 pt-14 md:pt-20'}>
      <TitleSection title={title}/>

      <section className={'grid grid-cols-12 gap-0 space-y-4 md:gap-10'}>

        <div className={'col-span-12 md:col-span-6'}>
          <div className={'hidden md:block w-full aspect-square relative bg'}>
            {preview
              ? <Image priority={true} fill={true} src={preview} alt={'photo de la publication'}
                       className={'object-cover'}/>
              : <EmptyImage/>}
          </div>
          <div className={'flex min-h-[350px] md:hidden w-full justify-center py-10 items-center'}>
            <Carousel className="w-full">
              <CarouselContent className={'gap-x-0'}>
                {photos?.map((photo: PublicationPhotoModel) => {
                  return (
                    <CarouselItem key={photo.uid} className={'md:basis-1/2 lg:basis-1/3'}>
                      <div className={'w-full aspect-square relative bg'}>
                        <Image priority={true} fill={true} src={photo.url} alt={'photo de la publication'}
                               className={'object-cover'}/>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        <aside className={'col-span-12 md:col-span-6 flex flex-col justify-between'}>
          <div>
            <div className={'bg-grey-400 opacity-75 rounded inline-flex p-2'}>
              <h3 className={'text-sm'}>{categoryFR}</h3>
            </div>
            <h1 className={'font-semibold text-2xl pt-2'}>{title}</h1>
            <p className="text-sm text-grey-300 italic flex items-center py-2">
              <GiPositionMarker className={'text-grey-300 text-lg'}/>
              {city}
            </p>
            <Typography className={'text-justify pt-5'}>
              {description}
            </Typography>
          </div>
          <div className={'hidden md:flex border-t border-t-grey-400 gap-4 pt-10'}>
            {photos?.map((photo, index) => (
              <div key={index} className={'w-1/4 aspect-square relative cursor-pointer'} onClick={() => displayThisPicture(photo.url)}>
                <Image priority={true} fill={true} src={photo.url} alt={'photo de la publication'}
                       className={'object-cover'}/>
              </div>
            ))}
          </div>
        </aside>
        <div className={'col-span-12 md:col-span-6'}>
          <Button onClick={() => router.push(`/actualites`)} variant={'default'} className={'px-6 py-3'}>
            Retour aux actus
          </Button>
        </div>
        {/* ICI LES BOUTONS DE NAVIGATIONS | A AJOUTER PLUS TARD */}
        {/*<div className={'col-span-6 flex justify-end gap-4'}>*/}
        {/*  <Button variant={'secondary'} className={'px-6 py-3'}>Précédente</Button>*/}
        {/*  <Button variant={'secondary'} className={'px-6 py-3'}>Suivante</Button>*/}
        {/*</div>*/}
      </section>
    </Container>
  );
};