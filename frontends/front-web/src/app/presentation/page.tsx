import { Container } from '@/components/ui/container';
import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import franckWithGirl from '@/public/images/photos/franck-with-girl.png';
import franckSmile from '@/public/images/photos/franck-face.png';
import { Divider } from '@/components/divider/divider';
import React from 'react';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { getPublicationsWithPhotos } from '@/database/publications.service';
import { ShortNews } from '@/components/publications/shortNews';
import { LiveInstagramAction } from '@/components/ui/liveInstagramAction';
import bg from '@/public/images/background-tools.png';
import { ButtonLink } from '@/components/ui/buttonLink';

export default async function Presentation() {
  const publications: PublicationModel[] = await getPublicationsWithPhotos(3);

  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundPosition: 'bottom',
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container className={'grid grid-cols-12 pt-14 md:pt-20 md:gap-10 lg:gap-20'}>

        <div className={'col-span-12 md:col-span-6 flex flex-col justify-between'}>
          <div>
            <TitleSection comp={'h1'} label={'Présentation'} title={'Franck Gaumont'} classNameIcon={'hidden md:block'}/>
            <SubtitleSection
              text={'“Faites vos choix avec mes meilleurs conseils”'}
              className={'italic'}
            />
          </div>
          <Typography variant={'base'} weight={'light'} comp={'div'} className={'space-y-5 py-10'}>
            <p>
              Vous êtes à la recherche d’une plombier dans le périmètre de Caen la Mer ? Je suis disponible !
            </p>
            <p>
              Sérieux, réactif et passionné par mon métier depuis 5 ans, je me charge de réaliser des plans en 3D pour
              visualiser au mieux votre projet et obtenir un résultat à la hauteur de vos attentes.
            </p>
          </Typography>
          <div className={'hidden md:flex w-full relative'}>
            <Image src={franckWithGirl} alt={'photo de franck gaumont avec une cliente'} className={'w-full'}/>
          </div>
          <div className={'md:hidden w-full relative'}>
            <Image src={franckSmile} alt={'photo de franck gaumont avec une cliente'} className={'w-full'}/>
          </div>
        </div>

        <div className={'col-span-12 md:col-span-6 flex flex-col justify-between'}>
          <div className={'hidden md:flex w-full relative'}>
            <Image src={franckSmile} alt={'photo de franck gaumont avec une cliente'} className={'w-full'}/>
          </div>
          <div className={'md:hidden w-full relative order-2 md:order-1'}>
            <Image src={franckWithGirl} alt={'photo de franck gaumont avec une cliente'} className={'w-full'}/>
          </div>
          <Typography variant={'base'} weight={'light'} comp={'div'} className={'space-y-5 pt-10 pb-10 md:pb-0 order-1 md:order-2'}>
            <p>
              Choisir un artisan à proximité de chez vous permet d’échanger sur site plus facilement et d’intervenir
              plus
              rapidement pour vos urgences.
              Si vous ne pouvez pas vous déplacer, je vous fait suivre un compte rendu des avancées suite à chaque
              intervention pour un suivi de chantier régulier.
            </p>
            <p>
              En tant que plombier, la satisfaction de mes clients est ma priorité. Un client satisfait est le gage
              d’une
              relation de confiance durable.
            </p>
          </Typography>
        </div>
      </Container>
      <Divider hasPhone={false}>
        <Typography comp={'div'} variant={'t-3'} theme={'white'} weight={'light'}
                    className={'flex flex-col items-center py-4 md:pb-10 md:space-y-10'}>
          <h2 className={'hidden md:flex uppercase font-medium text-base md:text-xl'}>
            Faire appel à Franck Gaumont
          </h2>
          <div className={'flex flex-col md:flex-row justify-around h-auto w-full'}>
            <Typography comp={'div'} theme={'white'} className={'space-y-5 text-center flex-1'}>
              <p className={'hidden md:inline md:text-[5rem] uppercase font-extrabold opacity-25 italic'}>1</p>
              <p className={'text-[2rem] md:text-[2rem] uppercase font-semibold'}>Proximité</p>
            </Typography>
            <Typography comp={'div'} theme={'white'} className={'space-y-5 text-center flex-1'}>
              <p className={'hidden md:inline md:text-[5rem] uppercase font-extrabold opacity-25 italic'}>2</p>
              <p className={'text-[2rem] md:text-[2rem] uppercase font-semibold'}>Efficacité</p>
            </Typography>
            <Typography comp={'div'} theme={'white'} className={'space-y-5 text-center flex-1'}>
              <p className={'hidden md:inline md:text-[5rem] uppercase font-extrabold opacity-25 italic'}>3</p>
              <p className={'text-[2rem] md:text-[2rem] uppercase font-semibold'}>Satisfaction</p>
            </Typography>
          </div>
        </Typography>
        <ButtonLink path={'/contact'} className={'absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2'}>Contactez - moi</ButtonLink>
      </Divider>
      <ShortNews publications={publications}/>
      <div className={'relative flex items-center justify-center h-64 md:py-20'}>
        <LiveInstagramAction/>
      </div>
    </div>
  );
}