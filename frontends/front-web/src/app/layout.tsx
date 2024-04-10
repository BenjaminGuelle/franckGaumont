import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Franck Gaumont - Expert en Plomberie et Aménagement',
  description: 'Découvrez les services de Franck Gaumont pour tous vos besoins en plomberie, aménagement intérieur et dépannage rapide à domicile.',
  creator: 'Benjamin Guelle - agence le29mars',
  openGraph: {
    title: 'Franck Gaumont - Expert en Plomberie et Aménagement',
    description: 'Découvrez les services de Franck Gaumont pour tous vos besoins en plomberie, aménagement intérieur et dépannage rapide à domicile.',
    url: 'https://www.franckgaumont.fr'
  }
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
      <Toaster/>
    </body>
    </html>
  );
}
