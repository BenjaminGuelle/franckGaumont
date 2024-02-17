import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';

export const metadata: Metadata = {
  title: 'Franck Gaumont - ',
  description: 'Plomberie, aménagement et dépannage',
};

export default function RootLayout({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
    <body suppressHydrationWarning={true}>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </body>
    </html>
  );
}
