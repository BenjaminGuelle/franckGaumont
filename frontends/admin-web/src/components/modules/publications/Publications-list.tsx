import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RiEditLine } from 'react-icons/ri';
import { PublicationModel } from '@/shared/models/publication/Publication.model';
import { PageBlock } from '@/components/layout/pageBlock';

interface Props {
  publications: PublicationModel[];
}

export const PublicationsList = ({publications}: Props) => {
  const router = useRouter();

  const navigateToNewUid: (uid: string) => void = useCallback((uid: string) => {
    router.push(`/publications/${uid}`)
  }, [router]);

  return (
    <PageBlock>
      <Table>
        <TableCaption>Liste des publications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Index</TableHead>
            <TableHead>Titres</TableHead>
            <TableHead>Catégories</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publications.map((publication, index) => (
            <TableRow key={index} onClick={() => navigateToNewUid(publication.uid)}>
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{publication.title}</TableCell>
              <TableCell>{publication.category}</TableCell>
              <TableCell><RiEditLine className={'text-primary'}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageBlock>
  )
}