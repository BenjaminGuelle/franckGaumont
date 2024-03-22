import { useLoader } from '@/hooks/useLoader';
import React, { useEffect, useState } from 'react';
import { filesToUpload } from '@/services/firebase.service';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { Button } from '@/components/ui/button';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';
import { updatePublication, uploadFiles } from '@/services/publications.service';
import { UpdatePublicationRequest } from '@/shared/requests/publications/UpdatePublication.request';
import { ImageUploadInput } from '@/components/modules/publications/ImageUploadInput';
import { toast } from '@/components/ui/use-toast';
import { RxUpdate } from 'react-icons/rx';

interface Props {
  publication: PublicationModel;
  photos: PublicationPhotoModel[];
}

export const PublicationPictures = ({publication, photos = []}: Props) => {
  const {uid} = publication;
  const [selectedFiles, setSelectedFiles] = useState<filesToUpload[]>([]);
  const [previews, setPreviews] = useState<string[]>(photos.map(photo => photo.url));

  const [handleImageUpload, uploadFilesLoading] = useLoader(async () => {
    const validFiles = selectedFiles.filter(item => item && item.file);

    if (validFiles.length > 0) {
      try {
        const photosData: Partial<PublicationPhotoModel>[] = await uploadFiles(uid, validFiles);
        const request: UpdatePublicationRequest = {
          publicationUid: uid,
          photos: photosData,
        };
        await updatePublication(request);
      } catch (error) {
        toast({
          title: 'Modification des photos enregistrées',
          description: `Erreur lors de l'ajou ou la modification d'images`,
        });
        console.error(error);
      }
    } else {
      toast({
        title: 'Modification des photos enregistrées',
        description: `aucun fichier n'a été ajouté ou remplacé`,
      });
    }
  }, []);

  const handleFileSelect = (index: number) => (file: File) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = { file, uid: photos[index]?.uid };
    setSelectedFiles(newSelectedFiles);

    const reader = new FileReader();
    reader.onload = (e) => {
      const newPreviews = [...previews];
      let imgDataUrl: string | ArrayBuffer | null = null;
      if (e.target) {
        imgDataUrl = e.target.result;
      }
      newPreviews[index] = imgDataUrl as string;

      setPreviews(newPreviews);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
  }, [previews, selectedFiles]);

  return (
    <div className={'space-y-5'}>
      <div className={'border-b border-b-primary-500'}>
        <h3 className={'text-primary font-medium text-lg'}>Photos</h3>
      </div>
      <div className={'flex flex-wrap gap-4 justify-center md:justify-normal'}>
        <ImageUploadInput onFileSelect={handleFileSelect(0)} previewSrc={previews[0]}/>
        <ImageUploadInput onFileSelect={handleFileSelect(1)} previewSrc={previews[1]}/>
        <ImageUploadInput onFileSelect={handleFileSelect(2)} previewSrc={previews[2]}/>
        <ImageUploadInput onFileSelect={handleFileSelect(3)} previewSrc={previews[3]}/>
      </div>

      <div className={'flex justify-center lg:justify-normal'}>
        <Button type="button" variant={'link'} isLoading={uploadFilesLoading} className={'pl-0'} onClick={handleImageUpload}>
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