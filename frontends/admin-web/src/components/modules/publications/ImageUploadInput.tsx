import React, { useCallback, useRef } from 'react';
import { RiAddLine, RiCamera2Fill, RiDeleteBin5Line } from 'react-icons/ri';
import imageEmpty from '@public/images/empty-folder.png';
import Image from 'next/image';

interface Props {
  onFileSelect: (file: File) => void;
  previewSrc: string | null;
}

export const ImageUploadInput = ({ onFileSelect, previewSrc }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const triggerFileInputClick: () => void = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  return (
    <div className={'border border-primary border-dashed h-32 w-32 cursor-pointer p-2 overflow-hidden'}
         onClick={triggerFileInputClick}>
      <input type="file" className={'hidden'} ref={fileInputRef} onChange={handleImageSelect}/>
      {previewSrc
        ? (
          <div className={'overflow-hidden'}>
            <Image width={50} height={50} unoptimized src={previewSrc} alt={'image'}
                   className={'w-full object-contain'}/>
          </div>
        )
        : (
          <div className={'flex flex-col items-center justify-center h-full space-y-2'}>
            <div className={'bg-primary-500 p-2 rounded-full inline-block'}>
              <RiAddLine className={'w-6 h-6 text-white'}/>
            </div>
            <p className={'text-black text-sm px-4 text-center'}>Cliquer pour uploader une image</p>
          </div>
        )}
    </div>
  );
};