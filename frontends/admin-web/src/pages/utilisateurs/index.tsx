import { Seo } from '@/components/Seo';
import { Layout } from '@/components/layout/Layout';
import { PageBlock } from '@/components/layout/pageBlock';
import React from 'react';

export default function Users() {
  return (
    <>
      <Seo title={'Admin - utilisateurs'} description={'page de gestion des utilisateurs'} />
      <Layout>
        <PageBlock>
          <h1>utilisateurs</h1>
        </PageBlock>
      </Layout>
    </>
  );
}
