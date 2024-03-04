import React, { useEffect, useState } from 'react';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { Spinner } from '@/components/spinner/spinner';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export const Session = ({children}: Props) => {
  const router = useRouter();
  const {authUser, authUserIsLoading} = useFirebaseAuth();
  const path: string = usePathname();
  const authRoute: boolean = path.startsWith('/connexion');

  if (!authRoute && !authUserIsLoading) {
    if (authUser) {
      return <>{children}</>
    } else router.push('/connexion');
  }

  if (authRoute && !authUserIsLoading) {
    return <>{children}</>
  }

  return (
    <div className={'w-screen h-screen flex justify-center items-center bg-white'}>
      <Spinner size={'xl'} />
    </div>
  )
}