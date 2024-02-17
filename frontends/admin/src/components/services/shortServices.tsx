'use client'

import { Container } from '@/components/ui/container';
import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import { CardServices } from '@/components/services/cardServices';
import { servicesData } from '@/data/services.data';

export const ShortServices = () => {
  return (
    <section>
      <Container className={'lg:pt-20 pb-40'}>
        <TitleSection title={'Les Services'}/>
        <SubtitleSection
          path={'/services'}
          buttonText={'Découvrir tous les services'}
          text={'De l\'installation de nouveaux équipements, à la réparation de fuites,\n' +
          ' en passant par l’agencement de salle de bain et de cuisine,\n' +
          ' je m\'engage à fournir des solutions complètes, rapides et durables.'}
        />
        <div className={'pt-10 md:flex md:flex-wrap md:justify-center md:gap-10 lg:gap-20'}>
          {servicesData.map((service: ServicesModel, index: number) => <CardServices key={index} services={service}/>)}
        </div>
      </Container>
    </section>
  );
};