import './globals.css';
import { Metadata } from 'next';
import React from 'react';
import { SideMenu } from '@/components/sideMenu/sideMenu';
import { Header } from '@/components/header/header';
import { Toaster } from '@/components/ui/toaster';
import { StoreWrapper } from '@/components/provider/storeProvider';
import { ProtectedRoutes } from '@/components/provider/protectedRoutes';

export const metadata: Metadata = {
  title: 'ADMIN - Franck Gaumont',
  description: 'site administration franck gaumont',
};

export default function RootLayout({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
    <body suppressHydrationWarning={true}>
    <StoreWrapper>
      <ProtectedRoutes>
      <Header />
      <div className={'flex'}>
        <SideMenu />
        <main className={'px-5 bg-white w-full'}>
          {children}
        </main>
        <Toaster />
      </div>
      </ProtectedRoutes>
    </StoreWrapper>
    </body>
    </html>
  );
}
