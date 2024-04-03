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
    <div className={'py-10'}>
      <div className={'bg-secondary rounded-xl relative'}>
        <Link href="https://www.instagram.com/eurl.franckgaumont/"
              className={cn('text-center text-white flex items-center gap-2 p-4')}>
          <RiInstagramLine size={20}/>
          Suivez-moi sur instagram
        </Link>
        {hasPhone &&
            <div className={'hidden lg:block absolute top-1/2 -right-[80px] -translate-y-1/2'}>
                <Image src={phone} alt={'instagram franck gaumont'} className={'w-48'}/>
            </div>
        }
      </div>
    </div>
  );
};