import { Seo } from '@/components/Seo';
import { Layout } from '@/components/layout/Layout';
import { PublicationsList } from '@/components/modules/publications/Publications-list';
import { useCallback, useEffect, useState } from 'react';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { getPublications } from '@/services/publications.service';
import { RiAddLine } from 'react-icons/ri';
import Link from 'next/link';

export default function Publications() {
  const [publications, setPublications] = useState<PublicationModel[]>([]);

  const getPub: () => Promise<void> = useCallback( async () => {
    const publicationArr: PublicationModel[] = await getPublications();
    setPublications(publicationArr)
  }, []);

  useEffect(() => {
    void getPub();
  }, [getPub]);

  return (
    <>
      <Seo title={'Admin - publications'} description={'page de gestion des publications'} />
      <Layout>
        <section className={'space-y-5'}>
          <div className={'px-4 lg:px-14 flex items-center justify-between'}>
            <h1 className={'text-base md:text-lg lg:text-xxl font-medium'}>Liste des publications</h1>
            <Link href={'/publications/creation'} className={'inline-flex items-center gap-2 text-primary text-sm md:text-base'}>
              <div className={'bg-primary p-1 rounded-full'}>
                <RiAddLine className={'w-6 h-6 md:w-10 md:h-10 text-white'}/>
              </div>
              Ajouter une publication
            </Link>
          </div>
          <PublicationsList publications={publications}/>
        </section>
      </Layout>
    </>
  )
}