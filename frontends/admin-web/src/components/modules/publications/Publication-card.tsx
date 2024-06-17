import Image from 'next/image';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';
import imageEmpty from '@public/images/empty-folder.png';
import React from 'react';

interface Props {
  publication: PublicationModel;
  photos: PublicationPhotoModel[];
}

export const PublicationCard = ({ publication, photos }: Props) => {
  const { description, title, city, category } = publication;

  const photo: string | undefined = photos[0]?.url;
  const photoHero: string | undefined = photos.find((photo) => photo.isHero)?.url;

  return (
    <div className={'inline-block rounded w-full shadow-xl shadow-grey-500 overflow-hidden'}>
      <div className={'w-full h-auto relative flex'}>
        {photo
          ? (<Image width={50} height={50} unoptimized src={photoHero ? photoHero : photo} priority={true} alt={'image'}
                    className={'w-full object-contain'}/>)
          : (<Image width={50} height={50} unoptimized src={imageEmpty} priority={true} alt={'image'}
                    className={'w-full object-contain'}/>)
        }
        <p className={'absolute top-5 left-0 px-4 bg-grey-500 py-2'}>{category}</p>
      </div>
      <div className={'space-y-2'}>
        <h2 className={'font-semibold text-xl'}>{title}</h2>
        <p className={'italic text-sm text-accent-300'}>{city}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};