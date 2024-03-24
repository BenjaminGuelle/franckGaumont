import { Button } from '@/components/ui/button';
import { TbTrashX } from 'react-icons/tb';
import Image from 'next/image';
import { RiAddLine } from 'react-icons/ri';
import React, { useCallback, useRef } from 'react';
import { ItemFile } from '@/components/modules/publications/Publication-pictures';
import { Spin } from '@/components/spinner/spin';

interface Props {
  item: ItemFile;
  onFileSelect: (file: File) => void;
  onDelete: (fileId: string) => void;
  isLoading: boolean;
}

export const PhotoCard = ({ item, onFileSelect, onDelete, isLoading }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const triggerFileInputClick = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  return (
    <div className='relative'>
      {item.uid && item.url &&
          <Button size='icon' variant='secondary' className='absolute -top-2 -right-2 z-10 h-6 w-6' onClick={() => onDelete(item.uid!)}>
            {isLoading ? <Spin color={'white'}/> : <TbTrashX />}
          </Button>
      }
      <div
        className='border border-primary border-dashed w-48 h-48 md:h-32 md:w-32 cursor-pointer p-2 overflow-hidden'
        onClick={triggerFileInputClick}
      >
        <input type='file' className='hidden' ref={fileInputRef} onChange={handleImageSelect} />
        {item.url && (
          <div className='h-full w-full overflow-hidden'>
            <Image width={50} height={50} unoptimized src={item.url} alt='image' className='w-full object-contain' />
          </div>
        )}
        {item.preview && !item.url && (
          <div className='h-full w-full overflow-hidden'>
            <Image width={50} height={50} unoptimized src={item.preview} alt='image' className='w-full object-contain' />
          </div>
        )}
        {!item.preview && !item.url && (
          <div className='flex flex-col items-center justify-center h-full space-y-2'>
            <div className='bg-primary-500 p-2 rounded-full inline-block'>
              <RiAddLine className='w-6 h-6 text-white' />
            </div>
            <p className='text-black text-sm px-4 text-center'>Cliquer pour uploader une image</p>
          </div>
        )}
      </div>
    </div>
  );
};