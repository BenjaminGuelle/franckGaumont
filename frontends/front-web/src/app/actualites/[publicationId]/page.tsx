import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { getPublicationByIdWithPhotos, getPublicationsWithPhotos } from '@/database/publications.service';
import { PublicationDetails } from '@/components/publications/publication-details';
import { Typography } from '@/components/ui/typography';
import { Divider } from '@/components/divider/divider';
import React from 'react';
import { ContactContainer } from '@/components/contact/contactContainer';
import { ButtonLink } from '@/components/ui/buttonLink';
import { RiInstagramLine } from 'react-icons/ri';

export async function generateStaticParams() {
  const publications = await getPublicationsWithPhotos();

  return publications.map((pub) => ({
    publicationId: pub.uid.toString(),
  }));
}

export default async function Page({ params }: { params: { publicationId: string} }) {
  const publication: PublicationModel = await getPublicationByIdWithPhotos(params.publicationId);

  return (
    <>
      <PublicationDetails publication={publication}/>
      <Divider>
        <Typography variant={'t-3'} theme={'white'} weight={'light'} className={'text-center lg:text-left'}>
          Vous avez un projet <span className={'font-extrabold'}>d’installation</span> ou de <span className={'font-extrabold'}>rénovation</span> ?
        </Typography>
        <div className={'flex flex-col space-y-3 pt-5 md:flex-row md:space-y-0 md:gap-x-5'}>
          <ButtonLink path={'/contact'}>Contactez - moi</ButtonLink>
          <ButtonLink variant={'outline'} path={'https://www.instagram.com/eurl.franckgaumont/'}>
            <RiInstagramLine size={20}/>
            Suivez-moi sur instagram
          </ButtonLink>
        </div>
      </Divider>
      <ContactContainer />
    </>
  )
}
