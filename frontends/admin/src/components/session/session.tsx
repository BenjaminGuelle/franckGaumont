'use client'

import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '@/stores/root.store';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/spinner/spinner';

interface Props {
  children: React.ReactNode;
}

const Session = observer(({children}: Props) => {
  const {user, isLoading} = useStore();
  const router = useRouter();

  if (!user && !isLoading) {
    router.push('/connexion');
    return <>{children}</>
  }

  if (!isLoading) {
    return <>{children}</>
  }

  return (
    <div className={'h-screen w-screen flex justify-center items-center'}>
      <Spinner size={'xl'} />
    </div>)

})

export default Session;