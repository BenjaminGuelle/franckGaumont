import Image from 'next/image';
import empty from '@/public/images/empty-image.png';
import React from 'react';

export const EmptyImage = () => {
  return (
    <div className={'bg-grey-400 flex w-full h-full items-center justify-center opacity-50'}>
      <Image src={empty} alt={'pas de photo'}/>
    </div>
  )
}