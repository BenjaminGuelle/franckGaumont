'use client'

import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import bg from '@/public/images/BG-Header.png';
import franck from '@/public/images/franck.png';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ContactMe } from '@/components/ui/contactMe';

export const HeroTop = () => {
  const router: AppRouterInstance = useRouter();

  const navigateTo: (path: string) => void = useCallback((path: string) => router.push(path), []);

  return (
    <section style={{
      backgroundImage: `url(${bg.src})`,
      backgroundPosition: 'right',
      backgroundSize: 'auto',
    }}
    className={''}>
      <Container className={'relative flex items-center lg:h-[590px]'} >
        <div className={'space-y-5 md:space-y-10'}>
          <Typography variant={'t-5'} comp={'h1'} weight={'extrabold'} theme={'white'} className={'md:max-w-xl lg:max-w-3xl capitalize'}>
            Plomberie, aménagement & dépannage
          </Typography>
          <Typography comp={'div'} weight={'normal'} theme={'white'}>
            <p>Passionné et expérimenté, je transforme vos envies en véritable réussite.</p>
            <p>Mon objectif :  mettre tout mon savoir-faire à disposition de votre projet.</p>
          </Typography>
          <div className={'flex flex-col space-y-3 pt-5 md:flex-row md:space-y-0 md:gap-x-5'}>
            <ContactMe />
            <Button onClick={() => navigateTo('/services')} variant={'outline'}>Découvrez mes compétences</Button>
          </div>
        </div>
        <div className={'hidden lg:flex absolute right-0 w-auto bottom-0'}>
          <Image className={'z-10'} src={franck} alt={'franck gaumont'}/>
        </div>
      </Container>
    </section>
  )
}