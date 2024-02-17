import { Container } from '@/components/ui/container';
import bg from '@/public/images/bg.png';
import React from 'react';
import Image from 'next/image';
import phone from '@/public/images/phone.png';

interface Props {
  hasPhone?: boolean;
  children: React.ReactNode;
}

export const Divider = ({children, hasPhone = true}: Props) => {
  return (
    <div style={{
      backgroundImage: `url(${bg.src})`,
      backgroundPosition: 'left',
      backgroundSize: 'cover',
    }}
    className={''}
    >
      <Container className={'relative'}>
        {children}
        {hasPhone &&
            <div className={'hidden lg:block absolute top-1/2 right-0 -translate-y-1/2'}>
                <Image src={phone} alt={'instagram franck gaumont'}/>
            </div>
        }
      </Container>
    </div>
  )
}