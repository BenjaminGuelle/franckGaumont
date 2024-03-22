import { createPublication } from '@/services/publications.service';
import { useRouter } from 'next/navigation';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PublicationForm } from '@/components/modules/publications/Publication-form';
import { useCallback } from 'react';
import { PublicationValues } from '@/utils/schemas/publication.schema';

export const PublicationCreate = () => {
  const router = useRouter();

  const onCreatePublication: (values: PublicationValues) => Promise<void> = useCallback(async (values: PublicationValues): Promise<void> => {
    const publication: PublicationModel | undefined = await createPublication(values);
    if (publication) {
      router.replace(`/publications/${publication.uid}`);
    }
  }, [router]);

  return (
    <div>
      <PublicationForm callbackSubmit={onCreatePublication} />
    </div>
  )
}