'use client'

import React from 'react';
import { Spinner } from '@/components/spinner/spinner';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoutes = ({children}: Props) => {

  const {authUser, authUserIsLoading} = useFirebaseAuth();

  if (authUserIsLoading) {
    return <> <Spinner/> </>
  }

  if (authUser && !authUserIsLoading) {
    return (
      <>{children}</>
    )
  }

  return (
    <>{children}</>
  )
}