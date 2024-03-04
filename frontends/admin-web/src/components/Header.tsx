import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { Suspense } from 'react';
import { Logo } from '@/components/logo';

export const Header = () => {
  const {authUser, authUserIsLoading} = useFirebaseAuth();

  return (
    <header className={'w-full h-40 bg-white flex items-center'}>
      <div className={'w-64 p-5 flex items-center justify-center'}>
        <Logo/>
      </div>
      <div className={'flex w-full justify-between px-10'}>
        <Suspense>
          <p className={'text-primary uppercase text-xl'}>{authUser?.userDocument?.firstName}</p>
        </Suspense>
      </div>
    </header>
  )
}