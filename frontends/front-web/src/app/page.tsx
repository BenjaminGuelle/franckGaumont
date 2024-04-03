import { HeroTop } from '@/components/hero-top/hero-top';
import { ShortServices } from '@/components/services/shortServices';
import { Divider } from '@/components/divider/divider';
import { Typography } from '@/components/ui/typography';
import { ContactMe } from '@/components/ui/contactMe';
import { InstaLink } from '@/components/ui/instaLink';
import React from 'react';
import { ShortNews } from '@/components/news/shortNews';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { getPublicationsWithPhotos } from '@/database/publications.service';
import Image from 'next/image';
import thermorLogo from '@/public/images/thermor.png';
import axorLogo from '@/public/images/axor.png';
import aupinelLogo from '@/public/images/aupinel.png';
import atlanticLogo from '@/public/images/atlantic.png';
import pointpLogo from '@/public/images/pointp.png';
import schluterLogo from '@/public/images/schluter.png';
import cedeoShowroomLogo from '@/public/images/cedeo-showroom.png';
import cedeoLogo from '@/public/images/cedeo.png';
import delplastLogo from '@/public/images/delplast.png';
import geberitLogo from '@/public/images/geberit.png';
import groheLogo from '@/public/images/grohe.png';
import hansgroheLogo from '@/public/images/hansgrohe.png';



export default async function Home(): Promise<React.JSX.Element> {
  const publications: PublicationModel[] = await getPublicationsWithPhotos();

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
          <div
            className={'w-full p-2 bg-white md:rounded-xl absolute bottom-0 translate-y-1/2 left-0 shadow-lg flex flex-col md:flex-row justify-around overflow-hidden'}>
            <ul className={'items-start flex gap-5 justify-center animate-infinite-scroll'}>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={thermorLogo} alt={'logo partenaire thermor'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={axorLogo} alt={'logo partenaire axor'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={aupinelLogo} alt={'logo partenaire aupinel'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={atlanticLogo} alt={'logo partenaire atlantic'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={schluterLogo} alt={'logo partenaire schluter'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={pointpLogo} alt={'logo partenaire pointp'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={cedeoShowroomLogo} alt={'logo partenaire cedeo showroom'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={cedeoLogo} alt={'logo partenaire cedeo'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={delplastLogo} alt={'logo partenaire delplast'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={geberitLogo} alt={'logo partenaire geberit'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={groheLogo} alt={'logo partenaire grohe'}/>
              </li>
              <li className={'w-1/5 flex-shrink-0'}>
                <Image height={100} width={100} src={hansgroheLogo} alt={'logo partenaire hansgrohe'}/>
              </li>
            </ul>
          </div>
        </Typography>
      </Divider>
    </div>
  );
}

