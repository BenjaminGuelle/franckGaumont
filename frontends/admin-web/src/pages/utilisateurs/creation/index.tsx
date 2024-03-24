import { Seo } from '@/components/Seo';
import { Layout } from '@/components/layout/Layout';

export default function Create() {
  return (
    <>
      <Seo title={`Admin - création d'utilisateurs`} description={`page de création d'utilisateurs`} />
      <Layout>
        <h1>Admin - création utilisateur</h1>
      </Layout>
    </>
  );
}
