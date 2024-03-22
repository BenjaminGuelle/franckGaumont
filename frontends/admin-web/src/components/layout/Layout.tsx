import React from 'react';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/sideMenu/SideMenu';
import { PageBlock } from '@/components/layout/pageBlock';
import { Session } from '@/components/session/Session';
import { Toaster } from '@/components/ui/toaster';
import { MenuProvider, useMenu } from '@/hooks/useMenu';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Session>
      <MenuProvider>
        <div className={'relative flex'}>
          <SideMenu/>
          <main className={`flex-1 overflow-x-hidden bg-grey-400`}>
            <Header />
            {children}
          </main>
        </div>
      </MenuProvider>
      <Toaster/>
    </Session>
  );
};