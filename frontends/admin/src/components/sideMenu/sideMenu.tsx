'use client'

import { usePathname } from 'next/navigation';
import { ActiveLink } from '@/components/sideMenu/activeLink';
import { signOutUser } from '@/api/auth/auth.services';
import { observer } from 'mobx-react';
import { useStore } from '@/stores/root.store';
import { useRouter } from 'next/navigation';

export const SideMenu = observer(() => {
  const {user} = useStore();
  const router = useRouter();
  const pathName: string = usePathname();

  const isAdmin: boolean = !!user?.userDocument?.isAdmin;

  async function signOut(): Promise<void> {
    await signOutUser();
    router.push('/connexion');
  }

  return (
      <nav className={'h-screen w-40 bg-white'}>
        <ul className={'space-y-2'}>
          {menuItems.map((item: MenuItem, index: number) => {
            if (!item.isAdmin) {
              return <ActiveLink key={index} item={item} pathName={pathName}/>;
            }
            if (item.isAdmin === isAdmin) {
              return <ActiveLink key={index} item={item} pathName={pathName}/>
            }
          })}
          {user &&
              <div className={'flex items-center justify-center py-4 text-red cursor-pointer'} onClick={signOut}>
                  <p>Se déconnecter</p>
              </div>}
        </ul>
      </nav>
  )
})

export interface MenuItem {
  name: string;
  path: string;
  isAdmin: boolean;
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    isAdmin: false,
  },
  {
    name: 'Administration',
    path: '/administration',
    isAdmin: true,
  },
  {
    name: 'Actualités',
    path: '/actualites',
    isAdmin: true,
  },
]