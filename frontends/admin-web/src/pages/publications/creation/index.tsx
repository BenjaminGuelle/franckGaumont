import { Seo } from '@/components/Seo';
import { Layout } from '@/components/layout/Layout';
import { PublicationCreate } from '@/components/modules/publications/Publication-create';
import { GoBack } from '@/components/goBack/GoBack';
import { PageBlock } from '@/components/layout/pageBlock';

export default function CreatePublication() {
  return (
    <>
      <Seo title={'Admin - création publications'} description={`page de création d'une publication`} />
      <Layout>
        <div className={'p-4 lg:px-14 space-y-5'}>
          <h1 className={'text-base md:text-lg lg:text-xxl font-medium'}>Créé une publication</h1>
        </div>
        <PageBlock>
          <PublicationCreate/>
        </PageBlock>
      </Layout>
    </>
  )
}