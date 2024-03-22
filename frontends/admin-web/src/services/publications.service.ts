import { CreatePublicationRequest } from '@/shared/requests/publications/CreatePublication.request';
import { filesToUpload, FirebaseWrapperClient, StorageName } from '@/services/firebase.service';
import { toast } from '@/components/ui/use-toast';
import { FirebaseError } from '@firebase/util';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { UpdatePublicationRequest } from '@/shared/requests/publications/UpdatePublication.request';
import { PublicationPhotoModel } from '@/shared/models/publication/PublicationPhoto.model';

const db = new FirebaseWrapperClient;

export async function createPublication(request: CreatePublicationRequest): Promise<PublicationModel | undefined> {
  try {
    const publication: PublicationModel = await db.onCall<'createPublication'>('PUBLICATIONS-create_publication', request);
    toast({
      title: 'Nouvelle publication ajoutée !',
      description: `Publication ${publication.uid} bien ajoutée eb db.`,
    });

    return publication;
  } catch (e) {
    const error = e as FirebaseError;

    toast({
      title: error.code,
      description: error.message,
    });
  }
}

export async function getPublication(publicationId: string): Promise<PublicationModel | undefined> {
  try {
    return await db.getDoc<PublicationModel>('PUBLICATIONS', publicationId);
  } catch (e) {
    const error = e as FirebaseError;
    toast({
      title: error.code,
      description: error.message,
    });
  }
}

export async function getPublications(): Promise<PublicationModel[]> {
  try {
    return await db.getCollection<PublicationModel>('PUBLICATIONS');

  } catch (e) {
    const error = e as FirebaseError;
    toast({
      title: error.code,
      description: error.message,
    });

    return [];
  }
}

export async function deletePublication(publicationId: string): Promise<void> {
  try {
    await db.onCall<'deletePublication'>('PUBLICATIONS-delete_publication', {publicationId});
    toast({
      title: `Publication uid ${publicationId}`,
      description: 'La publication à bien été supprimée.',
    });
  } catch (e) {
    const error = e as FirebaseError;
    toast({
      title: error.code,
      description: error.message,
    });
  }
}

export async function updatePublication(request: UpdatePublicationRequest): Promise<void> {
  const {publicationUid} = request;
  try {
    await db.onCall<'updatePublication'>('PUBLICATIONS-update_publication', request);
    toast({
      title: `Publication uid ${publicationUid}`,
      description: 'La publication à bien été mis à jour.',
    });
  } catch (e) {
    const error = e as FirebaseError;
    toast({
      title: error.code,
      description: error.message,
    });
  }
}

export async function uploadFiles(publicationUid: string, items: filesToUpload[]): Promise<Partial<PublicationPhotoModel>[]> {
  try {
    const fb = new FirebaseWrapperClient();
    return await fb.uploadFilesInStorage('PUBLICATIONS_MEDIA', publicationUid, items);

  } catch (e) {
    const error = e as FirebaseError;
    toast({
      title: error.code,
      description: error.message,
    });

    return [];
  }
}

