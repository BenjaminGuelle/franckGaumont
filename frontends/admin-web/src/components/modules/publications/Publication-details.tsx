import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PublicationCard } from '@/components/modules/publications/Publication-card';
import { PublicationForm } from '@/components/modules/publications/Publication-form';
import { PublicationValues } from '@/utils/schemas/publication.schema';
import { useCallback, useEffect, useState } from 'react';
import { deletePublication, updatePublication } from '@/services/publications.service';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';
import { UpdatePublicationRequest } from '@/shared/requests/publications/UpdatePublication.request';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import { PublicationPictures } from '@/components/modules/publications/Publication-pictures';
import { FirebaseWrapperClient } from '@/services/firebase.service';
import { Spin } from '@/components/spinner/spin';
import { router } from 'next/client';
import { useRouter } from 'next/navigation';

interface Props {
  publication: PublicationModel;
}

export const PublicationDetails = ({publication}: Props) => {
  const {uid, description, title, city, category, isOnline, priority} = publication;
  const router = useRouter();
  const [photos, setPhotos] = useState<PublicationPhotoModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const initialData: PublicationValues = {
    title, description, city, category, isOnline, priority
  }

  const getPhotos: () => Promise<void> = useCallback(async () => {
    setIsLoading(true);
    const fbWrapper = new FirebaseWrapperClient;
    const photosRef = fbWrapper.getSubColRef('PUBLICATIONS', uid, 'PHOTOS');
    const data: PublicationPhotoModel[] = await fbWrapper.getSubCollection<PublicationPhotoModel>(photosRef);
    setPhotos(data);
    setIsLoading(false);
  }, [uid])

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
    router.push('/publications');
    setDeleteLoading(false);
  }, [router])

  useEffect(() => {
    void getPhotos();
  }, [getPhotos])
  return (
    <div className={'space-y-5'}>
      <div className={'px-4 lg:px-14 flex items-center justify-between'}>
        <div>
          <h1 className={'text-base md:text-lg lg:text-xxl font-medium'}>Détails de la publication</h1>
          <h2 className={'text-sm md:text-base text-grey font-medium'}>n°{uid}</h2>
        </div>
        <Button variant={'link'} isLoading={deleteLoading} onClick={() => deletePublicationByUid(uid)}>
          <div className={'bg-secondary p-2 rounded-full'}>
            <RiDeleteBin5Line className={'w-6 h-6 text-white'}/>
          </div>
          <p className={'text-secondary hidden md:flex'}>supprimer la publication</p>
        </Button>
      </div>
      <div className={'flex flex-col lg:flex-row px-4 lg:px-14 gap-10'}>
        <Container className={'flex-1'}>
          <PublicationForm callbackSubmit={onUpdatePublication} initialData={initialData}/>
          {isLoading ? <Spin /> : <PublicationPictures publication={publication} photos={photos} onPhotoUpdate={getPhotos}/>}
        </Container>
        <Container className={'rightBloc space-y-5 self-start'}>
          <div className={'border-b border-b-primary-500'}>
            <h3 className={'text-primary font-medium md:text-lg'}>Prévisualisation</h3>
          </div>
          <Container className={'py-4 md:p-10 max-w-96'}>
            <PublicationCard publication={publication} photos={photos}/>
          </Container>
        </Container>
      </div>
    </div>
  )
}