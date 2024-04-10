'use client';

import { CategoryModel, PublicationModel } from '@/shared/models/publication/Publication.model';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PublicationCard } from '@/components/publications/publicationCard';
import {
  getPublicationsWithPhotosWithPagination,
} from '@/database/publications.service';
import { GetPublicationsWithPaginationResponse } from '@/shared/responses/GetPublicationsWithPagination.response';

interface Props {
  publications: PublicationModel[];
  lastVisible?: number;
  lastPriority?: boolean;
}

export const Publications = ({ publications, lastVisible, lastPriority }: Props) => {

  const [cat, setCat] = useState<CategoryModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastPublication, setLastPublication] = useState<number | undefined>(lastVisible);
  const [lastPublicationPriority, setLastPublicationPriority] = useState<boolean | undefined>(lastPriority);
  const [publicationsActive, setPublicationsActive] = useState<PublicationModel[]>(publications.filter((pub) => pub.isOnline));
  const [publicationsFiltered, setPublicationsFiltered] = useState<PublicationModel[]>([]);

  const loadDataMore: () => Promise<void> = useCallback(async () => {
    setIsLoading(true);
    const {data, lastVisible, lastPriority}: GetPublicationsWithPaginationResponse = await getPublicationsWithPhotosWithPagination({perPage: 6, lastVisible: lastPublication, lastPriority: lastPublicationPriority});
    setLastPublication(lastVisible);
    setLastPublicationPriority(lastPriority);
    setPublicationsActive((prevState) => [...prevState, ...data]);
    setIsLoading(false);
  }, [lastPublication, lastPublicationPriority]);

  useEffect(() => {
    setPublicationsFiltered(
      cat ? publicationsActive.filter((pub) => pub.category === cat) : publicationsActive,
    );
  }, [cat, publicationsActive]);

  return (
    <>
      <div className={'hidden md:flex justify-center gap-20 py-10'}>
        <Button
          className={cn('text-black font-semibold w-40 hover:bg-accent-200', cat === null ? 'bg-accent' : 'bg-grey-300')}
          onClick={() => setCat(null)}
        >Tout voir</Button>
        <Button
          className={cn('text-black font-semibold w-40 hover:bg-accent-200', cat === 'PLUMBING' ? 'bg-accent' : 'bg-grey-300')}
          onClick={() => setCat('PLUMBING')}
        >Plomberie</Button>
        <Button
          className={cn('text-black font-semibold w-40 hover:bg-accent-200', cat === 'ARRANGEMENT' ? 'bg-accent' : 'bg-grey-300')}
          onClick={() => setCat('ARRANGEMENT')}
        >Agencement</Button>
      </div>

      <Suspense>
        <ul className={'grid grid-cols-12 gap-4 md:gap-10'}>
          {publicationsFiltered.map((pub: PublicationModel, index: number) => (
            <PublicationCard key={index} publication={pub}/>
          ))}
        </ul>
      </Suspense>

      <div className={'flex justify-center py-10'}>
        <Button
          className={cn('')}
          onClick={loadDataMore}
          isLoading={isLoading}
        >Voir plus de publications</Button>
      </div>
    </>
  );
};