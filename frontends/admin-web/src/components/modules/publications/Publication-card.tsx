import Image from 'next/image';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';
import imageEmpty from '@public/images/empty-folder.png';
import React from 'react';

interface Props {
  publication: PublicationModel;
  photos: PublicationPhotoModel[];
}
export const PublicationCard = ({publication, photos}: Props) => {
  const {uid, description, title, city, category, creationDate} = publication;

  const photo: string | undefined = photos[0]?.url;

  return (
    <div className={'inline-block rounded w-72 shadow-xl shadow-accent-200 overflow-hidden'}>
      <div className={'w-72 h-auto relative flex'}>
        {photo
          ? (<Image width={50} height={50} unoptimized src={photo} priority={true} alt={'image'} className={'w-full object-contain'} />)
          : (<Image width={50} height={50} unoptimized src={imageEmpty} priority={true} alt={'empty'} className={'w-full object-contain'} />)
        }
        <p className={'absolute top-5 left-0 px-4 bg-accent-200 py-2'}>{category}</p>
      </div>
      <h2 className={'font-semibold text-xl'}>{title}</h2>
      <p className={'italic text-sm text-accent-300'}>{city}</p>
      <p>{description}</p>
    </div>
  )
}