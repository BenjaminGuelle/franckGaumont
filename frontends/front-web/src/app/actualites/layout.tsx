import type { Metadata } from 'next'
import React from 'react';

export const metadata: Metadata = {
  title: 'Actualités - Dernières Nouvelles de Franck Gaumont',
  description: 'Restez informé des dernières nouvelles et mises à jour chez Franck Gaumont, votre spécialiste en plomberie et aménagement.',
  creator: 'Benjamin Guelle - agence le29mars',
  openGraph: {
    title: 'Actualités - Dernières Nouvelles de Franck Gaumont',
    description: 'Restez informé des dernières nouvelles et mises à jour chez Franck Gaumont, votre spécialiste en plomberie et aménagement.',
    url: 'https://www.franckgaumont.fr'
  }
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (<>{children}</>);
}