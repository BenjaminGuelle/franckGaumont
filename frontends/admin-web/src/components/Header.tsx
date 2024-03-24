import { Button } from '@/components/ui/button';
import { useMenu } from '@/hooks/useMenu';
import { RiArrowLeftRightFill } from 'react-icons/ri';
import { GoBack } from '@/components/goBack/GoBack';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const Header = () => {
  const pathName = usePathname();
  const { toggleMenu } = useMenu();

  const canGoBack: boolean = useMemo(() => {
    switch (pathName) {
      case '/':
      case '/publications':
      case '/utilisateurs':
        return false;
      default:
        return true;
    }
  }, [pathName])

  return (
    <header className={'w-full h-40 px-4 lg:px-14 flex items-center justify-between p-4'}>
      {canGoBack && <div>
          <GoBack/>
      </div>}
      <div className={'flex justify-end items-center gap-4'}>
        <Button onClick={toggleMenu} size={'icon'} variant={'defaultLine'} className={'md:hidden'}>
          <RiArrowLeftRightFill/>
        </Button>
      </div>
    </header>
  )
}