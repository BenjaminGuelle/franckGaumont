import { Button } from '@/components/ui/button';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

export const GoBack = () => {
  const router = useRouter();

  return (
    <Button variant={'link'} onClick={() => router.back()} className={'px-0'}>
      <div className={'bg-primary p-2 rounded-full'}>
        <RiArrowLeftLine className={'w-6 h-6 md:w-8 md:h-8 text-white'}/>
      </div>
      Retour
    </Button>
  )
}