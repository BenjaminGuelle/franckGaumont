import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import bg from '@/public/images/BG-Header.png';
import franck from '@/public/images/photos/franck.png';
import React, { useCallback } from 'react';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/buttonLink';

export const HeroTop = () => {

  return (
    <div style={{
      backgroundImage: `url(${bg.src})`,
      backgroundPosition: 'right',
      backgroundSize: 'auto',
    }}
    >
      <Container className={'relative flex items-center lg:h-[590px]'} >
        <div className={'space-y-5 md:space-y-10'}>
          <Typography variant={'t-5'} comp={'h1'} weight={'extrabold'} theme={'white'} className={'md:max-w-xl lg:max-w-4xl flex flex-wrap gap-2 md:gap-4 xl:gap-8 capitalize'}>
            <span>Plomberie,</span>
            <span>aménagement</span>
            <span>& dépannage</span>
          </Typography>
          <Typography comp={'div'} weight={'normal'} theme={'white'}>
            <p>Passionné et expérimenté, je transforme vos envies en véritable réussite.</p>
            <p>Mon objectif :  mettre tout mon savoir-faire à disposition de votre projet.</p>
          </Typography>
          <div className={'flex flex-col space-y-3 md:flex-row md:space-y-0 md:gap-x-5'}>
            <ButtonLink path={'/contact'}>Contactez - moi</ButtonLink>
            <ButtonLink variant={'outline'} path={'/services'}>Découvrez mes compétences</ButtonLink>
          </div>
        </div>
        <div className={'hidden lg:flex absolute right-0 w-auto bottom-0'}>
          <Image className={'z-10'} src={franck} alt={'franck gaumont'} />
        </div>
      </Container>
    </div>
  )
}