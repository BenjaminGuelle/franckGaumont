import { HeroTop } from '@/components/hero-top/hero-top';
import { ShortServices } from '@/components/services/shortServices';
import { Divider } from '@/components/divider/divider';
import { Typography } from '@/components/ui/typography';
import { ContactMe } from '@/components/ui/contactMe';
import { InstaLink } from '@/components/ui/instaLink';
import React from 'react';
import { ShortNews } from '@/components/publications/shortNews';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { getPublicationsWithPhotos } from '@/database/publications.service';
import { ContactContainer } from '@/components/contact/contactContainer';
import { Partners } from '@/components/divider/partners';



export default async function Home(): Promise<React.JSX.Element> {
  const publications: PublicationModel[] = await getPublicationsWithPhotos(3);

  return (
    <div className={'w-full h-full'}>
      <HeroTop />
      <ShortServices />
      <Divider>
        <Typography variant={'t-3'} theme={'white'} weight={'light'} className={'text-center lg:text-left'}>
          Vous avez un projet <span className={'font-extrabold'}>d’installation</span> ou de <span className={'font-extrabold'}>rénovation</span> ?
        </Typography>
        <div className={'flex flex-col space-y-3 pt-5 md:flex-row md:space-y-0 md:gap-x-5'}>
          <ContactMe />
          <InstaLink />
        </div>
      </Divider>
      <ShortNews publications={publications}/>
      <Divider hasPhone={false}>
        <Typography comp={'div'} variant={'t-3'} theme={'white'} weight={'light'} className={'text-center pb-8'}>
          <h2 className={'uppercase font-extrabold text-base md:text-xl'}>Les partenaires</h2>
          <p className={'text-sm md:text-base py-4'}>
            Etant artisan partenaire avec des entreprises telle que Schluter, Cédéo, Point P.
            je dispose de produits durables et innovants pour votre utilisation quotidienne.
          </p>
          <Partners />
        </Typography>
      </Divider>
      <ContactContainer />
    </div>
  );
}

