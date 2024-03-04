'use client';

import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { observer } from 'mobx-react';
import { useStore } from '@/stores/root.store';
import { Suspense } from 'react';

export const Header = observer(() => {
  const pathName: string = usePathname();
  const { user } = useStore();

  return (
    <header className={'w-full h-40 bg-white flex items-center'}>
      <div className={'w-40 flex items-center justify-center'}>
        <Logo/>
      </div>
      <div className={'flex w-full justify-between px-10'}>
        <p>{pathName}</p>
        <Suspense>
          <p className={'text-primary uppercase text-xl'}>{user?.userDocument?.firstName}</p>
        </Suspense>
      </div>
    </header>
  );
});
