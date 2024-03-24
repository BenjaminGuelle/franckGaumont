import Image from 'next/image';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';
import imageEmpty from '@public/images/empty-folder.png';
import React from 'react';
import { RiAddLine } from 'react-icons/ri';

interface Props {
  publication: PublicationModel;
  photos: PublicationPhotoModel[];
}

export const PublicationCard = ({ publication, photos }: Props) => {
  const { uid, description, title, city, category, creationDate } = publication;

  const photo: string | undefined = photos[0]?.url;

  return (
    <div className={'inline-block rounded w-full shadow-xl shadow-grey-500 overflow-hidden'}>
      <div className={'w-full h-auto relative flex'}>
        {photo
          ? (<Image width={50} height={50} unoptimized src={photo} priority={true} alt={'image'}
                    className={'w-full object-contain'}/>)
          : (
            <div className="w-full h-52 flex flex-col items-center justify-center space-y-2">
              <div className="bg-primary-500 p-2 rounded-full inline-block">
                <RiAddLine className="w-6 h-6 text-white"/>
              </div>
              <p className="text-black text-sm px-4 text-center">Cliquer pour uploader une image</p>
            </div>
          )
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