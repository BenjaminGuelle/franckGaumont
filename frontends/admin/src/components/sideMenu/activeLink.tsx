import { useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/components/sideMenu/sideMenu';

interface Props {
  item: MenuItem;
  pathName: string;
}

export const ActiveLink = ({item, pathName}: Props) => {
  const {name, path}: MenuItem = item;
  const isActive: boolean = useMemo(() => path === pathName,[path, pathName])

  return (
    <li>
      <Link href={item.path}
            className={cn('h-24 flex flex-col font-extrabold text-primary w-full justify-center items-center bg-primary-100 hover:bg-primary-200 border-r-4', isActive ? 'border-r-primary-200' : 'border-r-primary-100')}>
        <p>{name}</p>
      </Link>
    </li>
  )
}