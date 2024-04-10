import type { Metadata } from 'next'
import React from 'react';

export const metadata: Metadata = {
  title: 'À Propos - Franck Gaumont Plomberie',
  description: 'Apprenez-en plus sur Franck Gaumont, votre expert en plomberie et aménagement, et notre engagement pour un service de qualité.',
  creator: 'Benjamin Guelle - agence le29mars',
  openGraph: {
    title: 'À Propos - Franck Gaumont Plomberie',
    description: 'Apprenez-en plus sur Franck Gaumont, votre expert en plomberie et aménagement, et notre engagement pour un service de qualité.',
    url: 'https://www.franckgaumont.fr'
  }
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (<>{children}</>);
}