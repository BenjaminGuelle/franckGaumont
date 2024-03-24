import { MenuItem } from '@/components/sideMenu/SideMenu';
import { useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { RiApps2Line } from "react-icons/ri";
import { usePathname } from 'next/navigation';

interface Props {
  item: MenuItem;
}

export const ActiveLink = ({item}: Props) => {
  const {name, path, icon}: MenuItem = item;
  const pathName: string = usePathname();

  const isActive: boolean | undefined = useMemo(() => path === '/' ? pathName === path : pathName?.startsWith(path), [pathName, path]);

  return (
    <li className={'p-4'}>
      <Link href={item.path}
            className={cn('flex items-center py-4 px-6 gap-2 rounded-[50px] w-full hover:bg-primary-500', isActive ? 'bg-primary-500 text-primary' : 'bg-white text-black')}>
        {icon}
        <p>{name}</p>
      </Link>
    </li>
  )
}