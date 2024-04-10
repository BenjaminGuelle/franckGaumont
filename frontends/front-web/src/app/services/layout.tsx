import type { Metadata } from 'next'
import React from 'react';

export const metadata: Metadata = {
  title: 'Nos Services - Franck Gaumont Plomberie et Aménagement',
  description: 'Explorez notre gamme de services en plomberie, installation, rénovation et aménagement conçus pour améliorer votre habitat.',
  creator: 'Benjamin Guelle - agence le29mars',
  openGraph: {
    title: 'Nos Services - Franck Gaumont Plomberie et Aménagement',
    description: 'Explorez notre gamme de services en plomberie, installation, rénovation et aménagement conçus pour améliorer votre habitat.',
    url: 'https://www.franckgaumont.fr'
  }
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (<>{children}</>);
}