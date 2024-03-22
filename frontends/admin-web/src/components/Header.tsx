import { Button } from '@/components/ui/button';
import { useMenu } from '@/hooks/useMenu';
import { RiArrowLeftRightFill } from 'react-icons/ri';
import { GoBack } from '@/components/goBack/GoBack';

export const Header = () => {
  const { toggleMenu } = useMenu();

  return (
    <header className={'w-full h-40 px-4 lg:px-14 flex items-center justify-between p-4'}>
      <div>
        <GoBack/>
      </div>
      <div className={'flex justify-end items-center gap-4'}>
        <Button onClick={toggleMenu} size={'icon'} variant={'defaultLine'} className={'md:hidden'}>
          <RiArrowLeftRightFill/>
        </Button>
      </div>
    </header>
  )
}