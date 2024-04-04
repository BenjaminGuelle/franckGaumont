import { cn } from '@/lib/utils';
import { RiInstagramLine } from 'react-icons/ri';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import phone from '@/public/images/phone.png';

interface Props {
  hasPhone?: boolean;
}

export const LiveInstagramAction = ({ hasPhone = true }: Props) => {
  return (
    <div className={'py-10 inline-block'}>
      <div className={'bg-secondary rounded-xl relative z-10'}>
        <Link href="https://www.instagram.com/eurl.franckgaumont/"
              className={cn('text-center text-white flex items-center gap-2 p-4 md:pr-10')}>
          <RiInstagramLine size={20}/>
          Suivez-moi sur instagram
        </Link>
        {hasPhone &&
            <div className={'hidden lg:block absolute top-1/2 -right-[100px] -translate-y-1/2'}>
                <Image src={phone} alt={'instagram franck gaumont'} className={'w-48'}/>
            </div>
        }
      </div>
    </div>
  );
};