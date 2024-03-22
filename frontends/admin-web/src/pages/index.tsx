import { Seo } from '@/components/Seo';
import { Layout } from '@/components/layout/Layout';
import { LandingPageContainer } from '@/components/modules/landingPage/LandingPage.container';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <>
      <Seo title={'Admin - Franck Gaumont'} description={'back office du site franck gaumont'} />
      <Layout>
        <LandingPageContainer />
      </Layout>
    </>
  );
}
