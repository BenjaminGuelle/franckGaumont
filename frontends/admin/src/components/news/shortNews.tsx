import { TitleSection } from '@/components/ui/titleSection';
import { SubtitleSection } from '@/components/ui/subtitleSection';
import { Container } from '@/components/ui/container';

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

      </Container>
    </section>
  )
}