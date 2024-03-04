import React from 'react';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/sideMenu/SideMenu';
import { PageBlock } from '@/components/layout/pageBlock';
import { Session } from '@/components/session/Session';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Session>
      <Header/>
      <div className={'flex'}>
        <SideMenu/>
        <main className={'flex-1'}>
          <PageBlock>
            {children}
          </PageBlock>
        </main>
      </div>
    </Session>
  );
};