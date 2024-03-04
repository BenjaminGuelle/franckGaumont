import { MenuItem } from '@/components/sideMenu/SideMenu';
import { useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  item: MenuItem;
  pathName: string;
}

export const ActiveLink = ({item, pathName}: Props) => {
  const {name, path}: MenuItem = item;
  const isActive: boolean = useMemo(() => path === pathName,[path, pathName])

  return (
    <li className={'p-2'}>
      <Link href={item.path}
            className={cn('h-24 flex flex-col rounded-xl font-extrabold text-white w-full justify-center items-center bg-primary hover:bg-primary-500 border-r-4', isActive ? 'border-r-secondary' : 'border-r-primary')}>
        <p>{name}</p>
      </Link>
    </li>
  )
}