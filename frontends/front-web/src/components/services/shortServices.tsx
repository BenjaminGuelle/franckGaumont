import { Container } from '@/components/ui/container';
import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import { CardServices } from '@/components/services/cardServices';
import { servicesData } from '@/data/services.data';

export const ShortServices = () => {
  return (
    <section>
      <Container className={'lg:pt-20 pb-20'}>
        <TitleSection title={'Les Services'}/>
        <SubtitleSection
          path={'/services'}
          buttonText={'Découvrir tous les services'}
          text={'De l\'installation de nouveaux équipements, à la réparation de fuites,\n' +
          ' en passant par l’agencement de salle de bain et de cuisine,\n' +
          ' je m\'engage à fournir des solutions complètes, rapides et durables.'}
        />
        <ul className={'grid grid-cols-12 space-y-10 lg:space-y-0 md:gap-10 md:px-10 py-10 md:py-20'}>
          {servicesData.map((service: ServicesModel, index: number) =>
            <li key={index} className={'col-span-12 lg:col-span-4 hover:scale-105 transition ease-in-out'}>
              <CardServices services={service}/>
            </li>)}
        </ul>
      </Container>
    </section>
  );
};