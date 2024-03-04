import { Seo } from '@/components/Seo';
import { Layout } from '@/components/layout/Layout';

export default function Users() {
  return (
    <>
      <Seo title={'Admin - utilisateurs'} description={'page de gestion des utilisateurs'} />
      <Layout>
        <h1>utilisateurs</h1>
      </Layout>
    </>
  );
}
