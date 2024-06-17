import { GiPositionMarker } from 'react-icons/gi';
import React from 'react';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import Image from 'next/image';
import { EmptyImage } from '@/components/publications/emptyPicture';
import { ComponentType } from '@/types/ui/Component.type';
import Link from 'next/link';
import { RiAddFill } from 'react-icons/ri';
import { cn } from '@/lib/utils';

interface Props {
  publication: PublicationModel;
  comp?: ComponentType;
}

export const PublicationCard = ({publication, comp: Component = 'li', }: Props) => {
  const { title, city, description, uid, category } = publication;

  const getPhoto = () => {
    const { photos } = publication;
    if (!photos || photos?.length === 0) {
      return (<EmptyImage/>);
    }
    const photo = photos.find((photo) => photo.isHero)?.url || photos[0].url;

    return (<Image priority={true} fill={true} src={photo} alt={'photo de la publication'}
                  className={'object-cover hover:scale-105 transition ease-in-out'}/>)
  }

  return (
    <Component className={'col-span-12 md:col-span-4 cursor-pointer py-2 group'}>
      <Link href={`/actualites/${uid}`}>
        <figure className={'w-full aspect-square relative overflow-hidden'}>
          {getPhoto()}
          <div className={'hidden md:block absolute top-5 left-0 bg-grey-400/75 py-2 px-4'}>{category === 'PLUMBING' ? 'Plomberie' : 'Agencement'}</div>
          <div className={'md:hidden absolute bottom-0 left-0 right-0 p-2 bg-primary bg-opacity-50'}>
            <h3 className="text-sm font-bold text-white">{title}</h3>
            <p className="text-sm text-grey-300 italic flex items-center py-2">
              {city}
            </p>
          </div>
        </figure>
        <div className="hidden md:flex py-4 h-[11rem] flex-col">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-lg text-grey-300 italic flex items-center py-2">
            <GiPositionMarker className={'text-grey-300 text-lg'}/>
            {city}
          </p>
          <p className="line-clamp-3 overflow-hidden text-ellipsis">{description}</p>
        </div>
        <span className={cn('hidden md:flex items-center text-md md:text-base gap-2 link font-semibold')}>
          <p>Voir la réalisation</p>
          <div
            className={'rounded-full bg-accent text-primary p-2 group-hover:scale-125 transition-transform ease-in-out duration-200'}>
            <RiAddFill/>
          </div>
        </span>
      </Link>
    </Component>
  )
}