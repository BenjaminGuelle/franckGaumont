import bg from '@/public/images/background-tools.png';
import Image from 'next/image';
import { LiveInstagramAction } from '@/components/ui/liveInstagramAction';
import React from 'react';

interface Props {

}

export const BackgroundTools = ({}: Props) => {
  return (
    <div className={'relative flex items-center justify-center'}>
      <LiveInstagramAction />
      <Image src={bg} alt={'tools'} className={'absolute -bottom-1/3 left-0 right-0 w-full hidden md:block'}/>
    </div>
  )
}