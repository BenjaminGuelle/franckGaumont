'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiEditLine } from 'react-icons/ri';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PageBlock } from '@/components/layout/pageBlock';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

interface Props {
  publications: PublicationModel[];
}

export const PublicationsList = ({publications}: Props) => {
  const router = useRouter();

  const [pubFiltered, setPubFiltered] = useState<PublicationModel[]>([]);
  const [filter, setFilter] = useState<boolean>(false);

  const navigateToNewUid: (uid: string) => void = useCallback((uid: string) => {
    router.push(`/publications/${uid}`)
  }, [router]);

  useEffect(() => {
    const pub = publications.filter((pub) => pub.priority);
    setPubFiltered(filter ? pub : publications);
  }, [publications, filter]);

  return (
    <PageBlock>
      <div className={'flex items-center gap-4 py-4'}>
        <Switch
          className={''}
          checked={filter}
          onCheckedChange={() => setFilter(!filter)}
        />
        <p>Filtrer par prioritaire</p>
      </div>
      <Table>
        <TableCaption>Liste des publications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Index</TableHead>
            <TableHead>Titres</TableHead>
            <TableHead>Catégories</TableHead>
            <TableHead className={''}>Prioritaire</TableHead>
            <TableHead className={''}>En ligne</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pubFiltered.map((publication, index) => (
            <TableRow key={index} onClick={() => navigateToNewUid(publication.uid)}>
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{publication.title}</TableCell>
              <TableCell>{publication.category}</TableCell>
              <TableCell className={'pl-10'}>
                <div className={cn('w-2 h-2 rounded-full', publication.priority ? 'bg-success' : 'bg-secondary')}></div>
              </TableCell>
              <TableCell className={'pl-10'}>
                <div className={cn('w-2 h-2 rounded-full', publication.isOnline ? 'bg-success' : 'bg-secondary')}></div>
              </TableCell>
              <TableCell><RiEditLine className={'text-primary'}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageBlock>
  )
}