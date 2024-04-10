'use client';

import { ActiveLink } from '@/components/navigation/activeLink';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const pathname: string = usePathname();

  return (
    <div className={'space-x-16 h-full hidden lg:flex items-center'}>
      <ActiveLink href={'/'} pathname={pathname}>Accueil</ActiveLink>
      <ActiveLink href={'/presentation'} pathname={pathname}>Présentation</ActiveLink>
      <ActiveLink href={'/services'} pathname={pathname}>Services</ActiveLink>
      <ActiveLink href={'/actualites'} pathname={pathname}>Actualités</ActiveLink>
      <ActiveLink href={'/contact'} pathname={pathname} className={'bg-white text-primary px-5 hover:text-primary/75'}>Contact</ActiveLink>
    </div>
  )
}


