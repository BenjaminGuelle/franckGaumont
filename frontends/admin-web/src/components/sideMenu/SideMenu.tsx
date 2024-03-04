import { ActiveLink } from '@/components/sideMenu/ActiveLink';
import { usePathname, useRouter } from 'next/navigation';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { signOutUser } from '@/services/auth.services';
import { useCallback } from 'react';

export const SideMenu = () => {
  const router = useRouter();
  const pathName: string = usePathname();
  const {authUser, authUserIsLoading} = useFirebaseAuth();
  //
  function navigateToConnexion() {
    router.push('/connexion')
  }

  const disconnect = useCallback(async () => {
    await signOutUser();
  }, [])

  return (
    <nav className={'h-screen w-56 px-5'}>
      <ul className={'space-y-2'}>
        {menuItems.map((item: MenuItem, index: number) => {
          if (!item.isAdmin) {
            return <ActiveLink key={index} item={item} pathName={pathName}/>;
          }
          if (item.isAdmin) {
            return <ActiveLink key={index} item={item} pathName={pathName}/>
          }
        })}
        {authUser &&
            <div className={'flex items-center justify-center py-4 text-secondary font-semibold cursor-pointer'} onClick={disconnect}>
                <p>Se déconnecter</p>
            </div>}
      </ul>
    </nav>
  )
}

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
    name: 'Utilisateurs',
    path: '/utilisateurs',
    isAdmin: true,
  },
  {
    name: 'création',
    path: '/utilisateurs/creation',
    isAdmin: true,
  },
]