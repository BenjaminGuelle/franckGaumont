import { LoginContainer } from '@/components/modules/authentication/Login.container';
import React from 'react';
import { Logo } from '@/components/logo';

export default function Connexion() {
  return (
    <div className={'w-screen h-screen bg-grey-400 flex flex-col space-y-10 items-center'}>
      <div className={'flex flex-col justify-center items-center space-y-5 pt-52'}>
        <Logo />
        <h1 className={'font-medium text-xl'}>Franck Gaumont</h1>
      </div>
      <LoginContainer />
    </div>
  )
}