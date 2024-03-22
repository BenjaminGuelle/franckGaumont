import { ActiveLink } from '@/components/navigation/activeLink';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/container';
import React from 'react';
import { ContactLink } from '@/components/ui/contactLink';

interface Props {
  isActive: boolean;
  toggleMenu:  () => void;
}

export const NavigationMobile = ({isActive, toggleMenu}: Props) => {
  const pathname: string = usePathname();

  return (
  <div className={
    `fixed lg:hidden inset-y-0 right-0 z-40 w-full bg-blue shadow-lg transform transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-0' : 'translate-x-full'}`
  }>
    <Container className="pt-44 px-10 overflow-y-auto max-h-screen">
      <ul className={''}>
        <li onClick={toggleMenu} className={'py-5 border-b border-white/50'}>
          <ActiveLink href={'/'} pathname={pathname}>Accueil</ActiveLink>
        </li>
        <li onClick={toggleMenu} className={'py-5 border-b border-white/50'}>
          <ActiveLink href={'/presentation'} pathname={pathname}>Présentation</ActiveLink>
        </li>
        <li onClick={toggleMenu} className={'py-5 border-b border-white/50'}>
          <ActiveLink href={'/services'} pathname={pathname}>Services</ActiveLink>
        </li>
        <li onClick={toggleMenu} className={'py-5 border-b border-white/50'}>
          <ActiveLink href={'/publications'} pathname={pathname}>Actualités</ActiveLink>
        </li>
        <li onClick={toggleMenu} className={'pb-10 pt-5 border-b border-white/50'}>
          <ActiveLink href={'/contact'} pathname={pathname}>Contact</ActiveLink>
        </li>
      </ul>

      <div className={'space-y-2 py-5 border-b border-white/50'}>
        <ContactLink contactLink={'ADDRESS'} />
        <ContactLink contactLink={'PHONE'} />
        <ContactLink contactLink={'MAIL'} />
      </div>

      <ContactLink contactLink={'INST'} className={'pt-5 pr-2'}/>
      <ContactLink contactLink={'FB'}/>

    </Container>
  </div>
  )
}