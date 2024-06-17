import React, { useCallback, useEffect, useState } from 'react';
import { filesToUpload } from '@/services/firebase.service';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { Button } from '@/components/ui/button';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';
import { deletePublicationFile, updatePublication, uploadFiles } from '@/services/publications.service';
import { UpdatePublicationRequest } from '@/shared/requests/publications/UpdatePublication.request';
import { RxUpdate } from 'react-icons/rx';
import { PhotoCard } from '@/components/modules/publications/photo-card';
import { Switch } from '@/components/ui/switch';

interface Props {
  publication: PublicationModel;
  photos: PublicationPhotoModel[];
  onPhotoUpdate: () => void;
}

export interface ItemFile {
  file?: File;
  uid?: string;
  preview?: string;
  url?: string;
  isHero?: boolean;
}

export const PublicationPictures = ({ publication, photos = [], onPhotoUpdate }: Props) => {
  const { uid } = publication;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [deleteFileLoading, setDeleteFileLoading] = useState<string | null>(null);

  const [data, setData] = useState<PublicationPhotoModel[]>(photos);
  const [itemFile, setItemFile] = useState<ItemFile[]>([]);

  const handleFileSelect = (index: number) => async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setItemFile(current =>
        current.map((item, idx) =>
          idx === index ?
            { ...item, file, preview: reader.result as string, url: undefined } : item));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteFile: (fileUid: string) => Promise<void> = useCallback(async (fileUid: string) => {
    setDeleteFileLoading(fileUid);
    await deletePublicationFile(uid, fileUid);
    onPhotoUpdate();
    setDeleteFileLoading(null);
  }, [uid, onPhotoUpdate]);

  const handleImageUpload = async () => {
    setIsLoading(true);
    const imagesUploaded: Partial<PublicationPhotoModel>[] = await updateNewFilePicture();
    const itemsUpdated: PublicationPhotoModel[] = data.filter((item) => item && item.uid);

    const request: UpdatePublicationRequest = {
      publicationUid: uid,
      photos: [...itemsUpdated, ...imagesUploaded],
    };

    await updatePublication(request);
    onPhotoUpdate();

    setIsLoading(false);
  };

  const updateNewFilePicture: () => Promise<Partial<PublicationPhotoModel>[] | any[]> = async () => {
    const validItems: ItemFile[] = itemFile.filter((item) => item && item.file);
    if (validItems.length > 0) {
      const imagesToUpload: filesToUpload[] = validItems.map((item) => ({
        uid: item.uid, file: item.file,
      } as filesToUpload));
      return await uploadFiles(uid, imagesToUpload);
    }
    else return [];
  }

  const handleHeroChange = (index: number) => (isChecked: boolean) => {
    setData(current =>
      current.map((item, idx) => ({
        ...item,
        isHero: idx === index ? isChecked : false
      }))
    );
  };

  const refresh: () => void = useCallback(() => {
    const initialItemFiles: ItemFile[] = Array.from({ length: 4 }).map((_, index) => ({
      uid: data[index]?.uid,
      file: undefined,
      preview: undefined,
      url: data[index]?.url,
      isHero: data[index]?.isHero,
    }));
    setItemFile(initialItemFiles);
  }, [data]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className={'space-y-5'}>
      <div className={'border-b border-b-primary-500 flex items-center justify-between py-4 md:py-0'}>
        <h3 className={'text-primary font-medium md:text-lg'}>Photos</h3>
        <Button type="button" size={'icon'} isLoading={isLoading} className={'pl-0 md:hidden'}
                onClick={handleImageUpload}>
          <div className={'bg-primary p-2 rounded-full'}>
            <RxUpdate className={'w-6 h-6 text-white'}/>
          </div>
        </Button>
      </div>
      <div className={'flex flex-wrap gap-4 justify-center md:justify-normal'}>
        {itemFile.map((item, index) =>
          (<aside key={index}>
              <PhotoCard
                item={item}
                onFileSelect={handleFileSelect(index)}
                onDelete={(fileId: string) => handleDeleteFile(fileId)}
                isLoading={deleteFileLoading === item.uid}
              />
              <div className="flex gap-2 justify-center py-3">
                <Switch
                  className={item.url ? 'block' : 'hidden'}
                  checked={item.isHero ?? false}
                  onCheckedChange={handleHeroChange(index)}
                />
                <p className={item.isHero ? 'visible' : 'invisible'}>Première</p>
              </div>
            </aside>
          ))
        }
      </div>

      <div className={'hidden md:flex justify-center lg:justify-normal'}>
        <Button type="button" variant={'link'} isLoading={isLoading} className={'pl-0'} onClick={handleImageUpload}>
          <div className={'bg-primary p-2 rounded-full'}>
            <RxUpdate className={'w-6 h-6 text-white'}/>
          </div>
          <p className={'text-primary'}>
            Mettre à jour les photos
          </p>
        </Button>
      </div>
    </div>
  );
};