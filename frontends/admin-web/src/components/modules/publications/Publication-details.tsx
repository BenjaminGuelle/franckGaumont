import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PublicationCard } from '@/components/modules/publications/Publication-card';
import { PublicationForm } from '@/components/modules/publications/Publication-form';
import { PublicationValues } from '@/utils/schemas/publication.schema';
import { useCallback, useState } from 'react';
import { deletePublication, updatePublication } from '@/services/publications.service';
import { PublicationPictures } from '@/components/modules/publications/Publication-pictures';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';
import { UpdatePublicationRequest } from '@/shared/requests/publications/UpdatePublication.request';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';

interface Props {
  publication: PublicationModel;
  photos: PublicationPhotoModel[];
}

export const PublicationDetails = ({publication, photos}: Props) => {
  const {uid, description, title, city, category} = publication;

  const [deleteLoading, setDeleteLoading] = useState(false);

  const initialData: PublicationValues = {
    title, description, city, category,
  }

  const onUpdatePublication: (values: PublicationValues) => Promise<void> = useCallback(async (values: PublicationValues): Promise<void> => {
    const request: UpdatePublicationRequest = {
      publicationUid: uid,
      publication: values,
    }
    await updatePublication(request);
  }, [uid]);

  const deletePublicationByUid: (publicationId: string) => Promise<void> = useCallback(async (publicationId: string) => {
    setDeleteLoading(true);
    await deletePublication(publicationId);
    setDeleteLoading(false);
  }, [])

  return (
    <>
      <div className={'px-4 lg:px-14 flex items-center justify-between'}>
        <div>
          <h1 className={'text-lg lg:text-xxl font-medium'}>Détails de la publication</h1>
          <h2 className={'text-base text-grey font-medium'}>n°{uid}</h2>
        </div>
        <Button variant={'link'} isLoading={deleteLoading} onClick={() => deletePublicationByUid(uid)}>
          <div className={'bg-secondary p-2 rounded-full'}>
            <RiDeleteBin5Line className={'w-6 h-6 text-white'}/>
          </div>
          <p className={'text-secondary'}>supprimer la publication</p>
        </Button>
      </div>
      <div className={'flex flex-col md:flex-row px-4 lg:px-14 gap-10'}>
        <Container className={'flex-1'}>
          <PublicationForm callbackSubmit={onUpdatePublication} initialData={initialData}/>
          <PublicationPictures publication={publication} photos={photos}/>
        </Container>
        <Container className={'h-auto space-y-5'}>
          <div className={'border-b border-b-primary-500'}>
            <h3 className={'text-primary font-medium text-lg'}>Prévisualisation</h3>
          </div>
          <Container className={'p-10'}>
            <PublicationCard publication={publication} photos={photos}/>
          </Container>
        </Container>
      </div>
    </>
  )
}