import Image from 'next/image';
import thermorLogo from '@/public/images/thermor.png';
import axorLogo from '@/public/images/axor.png';
import aupinelLogo from '@/public/images/aupinel.png';
import atlanticLogo from '@/public/images/atlantic.png';
import schluterLogo from '@/public/images/schluter.png';
import pointpLogo from '@/public/images/pointp.png';
import cedeoShowroomLogo from '@/public/images/cedeo-showroom.png';
import cedeoLogo from '@/public/images/cedeo.png';
import delplastLogo from '@/public/images/delplast.png';
import geberitLogo from '@/public/images/geberit.png';
import groheLogo from '@/public/images/grohe.png';
import hansgroheLogo from '@/public/images/hansgrohe.png';
import React from 'react';

export const Partners = () => {
  return (
    <div
      className={'w-full p-2 bg-white md:rounded-xl absolute bottom-0 translate-y-1/2 left-0 shadow-lg flex flex-col md:flex-row justify-around overflow-hidden'}>
      <ul className={'items-start flex gap-5 justify-center animate-infinite-scroll'}>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={thermorLogo} alt={'logo partenaire thermor'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={axorLogo} alt={'logo partenaire axor'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={aupinelLogo} alt={'logo partenaire aupinel'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={atlanticLogo} alt={'logo partenaire atlantic'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={schluterLogo} alt={'logo partenaire schluter'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={pointpLogo} alt={'logo partenaire pointp'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={cedeoShowroomLogo} alt={'logo partenaire cedeo showroom'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={cedeoLogo} alt={'logo partenaire cedeo'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={delplastLogo} alt={'logo partenaire delplast'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={geberitLogo} alt={'logo partenaire geberit'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={groheLogo} alt={'logo partenaire grohe'}/>
        </li>
        <li className={'w-1/5 flex-shrink-0'}>
          <Image height={100} width={100} src={hansgroheLogo} alt={'logo partenaire hansgrohe'}/>
        </li>
      </ul>
    </div>
  )
}