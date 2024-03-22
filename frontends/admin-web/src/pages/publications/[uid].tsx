import { Seo } from '@/components/Seo';
import { Layout } from '@/components/layout/Layout';
import { GoBack } from '@/components/goBack/GoBack';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PublicationDetails } from '@/components/modules/publications/Publication-details';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { Spinner } from '@/components/spinner/spinner';
import { FirebaseWrapperClient } from '@/services/firebase.service';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';
import { PageBlock } from '@/components/layout/pageBlock';

export default function DetailsPublication() {
  const { query } = useRouter();

  const publicationUid: string | null = typeof query.uid === 'string' ? query.uid : null;
  const [publication, setPublication] = useState<PublicationModel | undefined>(undefined);
  const [photos, setPhotos] = useState<PublicationPhotoModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribePub: () => void = () => {
    };
    let unsubscribePhotos: () => void = () => {
    };
    setIsLoading(true);

    if (publicationUid) {

      const fbWrapper = new FirebaseWrapperClient;
      const pubRef = fbWrapper.getDocRef('PUBLICATIONS', publicationUid);
      const photosRef = fbWrapper.getSubColRef('PUBLICATIONS', publicationUid, 'PHOTOS');

      unsubscribePub = fbWrapper.onSnapshotDoc<PublicationModel>(pubRef, (data: PublicationModel | undefined) => {
        if (data) {
          setPublication((prevState: PublicationModel | undefined) => ({
            ...prevState,
            ...data,
          }));
          setIsLoading(false);
        }
      });

      unsubscribePhotos = fbWrapper.onSnapshotCollection<PublicationPhotoModel>(photosRef, (data: PublicationPhotoModel[]) => {
        if (data) {
          console.log('DATA OF PHOTOS', data);
          setPhotos((prevState: PublicationPhotoModel[]) => ([
            ...prevState,
            ...data,
          ]));
        }
      });
    }

    return () => {
      unsubscribePub();
      unsubscribePhotos();
    };

  }, [publicationUid]);

  return (
    <>
      <Seo title={'Admin - détails de publication'} description={`page de création d'une publication`}/>
      <Layout>
        {isLoading
          ? <Spinner/>
          : publication && <PublicationDetails publication={publication} photos={photos}/>}
      </Layout>
    </>
  );
}