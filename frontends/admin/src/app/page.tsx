import { HeroTop } from '@/components/hero-top/hero-top';
import { ShortServices } from '@/components/services/shortServices';
import { Divider } from '@/components/divider/divider';
import { Typography } from '@/components/ui/typography';
import { ContactMe } from '@/components/ui/contactMe';
import { InstaLink } from '@/components/ui/instaLink';
import React from 'react';
import { ShortNews } from '@/components/news/shortNews';

export default function Home() {

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
      <ShortNews />
    </div>
  );
}
