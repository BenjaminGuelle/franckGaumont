'use client';

import { CategoryModel, PublicationModel } from '@/shared/models/publication/Publication.model';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { GiPositionMarker } from 'react-icons/gi';
import { ActionLink } from '@/components/ui/actionLink';

interface Props {
  publications: PublicationModel[];
}

export const Publications = ({ publications }: Props) => {

  const [cat, setCat] = useState<CategoryModel | null>(null);
  const [publicationsActive, _] = useState<PublicationModel[]>(publications.filter((pub) => pub.isOnline));
  const [publicationsFiltered, setPublicationsFiltered] = useState<PublicationModel[]>([]);

  useEffect(() => {
    setPublicationsFiltered(
      cat ? publicationsActive.filter((pub) => pub.category === cat ) : publicationsActive
    );
  }, [cat, publicationsActive]);

  return (
    <>
      <div className={'hidden md:flex justify-center gap-20 py-10'}>
        <Button
          className={cn('text-black font-semibold w-40 hover:bg-accent-200', cat === null ? 'bg-accent' : 'bg-grey-300')}
          onClick={() => setCat(null)}
        >Tout voir</Button>
        <Button
          className={cn('text-black font-semibold w-40 hover:bg-accent-200', cat === 'PLUMBING' ? 'bg-accent' : 'bg-grey-300')}
          onClick={() => setCat('PLUMBING')}
        >Plomberie</Button>
        <Button
          className={cn('text-black font-semibold w-40 hover:bg-accent-200', cat === 'ARRANGEMENT' ? 'bg-accent' : 'bg-grey-300')}
          onClick={() => setCat('ARRANGEMENT')}
        >Agencement</Button>
      </div>

      <ul className={'grid grid-cols-12 gap-4 md:gap-10'}>
        {publicationsFiltered.map((pub, index) => (
          <li key={index} className={'col-span-12 md:col-span-4 cursor-pointer'}>
            <figure className={'w-full aspect-square relative'}>
              {pub.photos &&
                  <Image priority={true} fill={true} src={pub.photos[0].url} alt={'photo'}
                         className={'object-cover'}/>}
              <div className={'md:hidden absolute bottom-0 left-0 right-0 p-2 bg-primary bg-opacity-50'}>
                <h3 className="text-sm font-bold text-white">{pub.title}</h3>
                <p className="text-sm text-grey-300 italic flex items-center py-2">
                  {pub.city}
                </p>
              </div>
            </figure>
            <div className="hidden md:flex py-4 h-[11rem] flex-col">
              <h3 className="text-xl font-bold">{pub.title}</h3>
              <p className="text-lg text-grey-300 italic flex items-center py-2">
              <GiPositionMarker className={'text-grey-300 text-lg'}/>
                {pub.city}
              </p>
              <p className="line-clamp-3 overflow-hidden text-ellipsis">{pub.description}</p>
            </div>
            <ActionLink path={'/'} text={'Voir la réalisation'} className={'hidden md:flex'}/>
          </li>
        ))}
      </ul>
    </>
  )
};