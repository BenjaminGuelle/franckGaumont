import { ActiveLink } from '@/components/sideMenu/ActiveLink';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { signOutUser } from '@/services/auth.services';
import { ReactElement, useCallback } from 'react';
import { RiApps2Line, RiArrowLeftRightFill, RiArticleLine, RiLogoutCircleLine, RiUserLine } from 'react-icons/ri';
import { useMenu } from '@/hooks/useMenu';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const SideMenu = () => {
  const {authUser} = useFirebaseAuth();
  const { isMenuVisible, toggleMenu } = useMenu();

  const disconnect = useCallback(async () => {
    await signOutUser();
  }, [])

  return (
    <div
      className={cn('absolute h-screen md:relative top-0 -left-64 w-64 bg-white pt-12 px-4 transform transition ease-in-out z-40', isMenuVisible ? '-translate-x-0' : 'translate-x-64')}>
      <div className={'flex items-center pb-8'}>
        <div>
          <Logo size={'small'}/>
        </div>
        <h1 className={'font-medium pl-4 text-xl'}>Franck Gaumont</h1>
      </div>

      <div className={'flex justify-end md:hidden'}>
        <Button onClick={toggleMenu} size={'icon'} variant={'defaultLine'}>
          <RiArrowLeftRightFill/>
        </Button>
      </div>

      <div className={'border-b mb-4'}>
        <h3>Général</h3>
      </div>
      <div className={''}>
        <nav className={``}>
          <ul className={'space-y-2 flex flex-col justify-center'}>
            {menuItems.map((item: MenuItem, index: number) => {
              if (!item.isAdmin) {
                return <ActiveLink key={index} item={item}/>;
              }
              if (item.isAdmin) {
                return <ActiveLink key={index} item={item}/>;
              }
            })}
            {authUser &&
                <li className={'mx-auto'}>
                    <Button onClick={disconnect}>
                        <RiLogoutCircleLine className={'w-6 h-6'}/>
                        <p>Se déconnecter</p>
                    </Button>
                </li>
            }
          </ul>
        </nav>
      </div>
    </div>
  )
}

export interface MenuItem {
  name: string;
  path: string;
  isAdmin: boolean;
  icon: ReactElement<any, any>;
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    isAdmin: false,
    icon: <RiApps2Line className={'w-6 h-6'} />
  },
  {
    name: 'Publications',
    path: '/publications',
    isAdmin: true,
    icon: <RiArticleLine className={'w-6 h-6'} />
  },
  {
    name: 'Utilisateurs',
    path: '/utilisateurs',
    isAdmin: true,
    icon: <RiUserLine className={'w-6 h-6'} />
  },
]