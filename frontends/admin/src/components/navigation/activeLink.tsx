import Link from 'next/link';
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  href: string;
  children: React.ReactNode;
  pathname: string;
  className?: string;
}

export const ActiveLink = ({href, className, pathname, children}: Props) => {
  const isActive: boolean = useMemo(() => pathname === href,[pathname, href]);

  return (
    <Link href={href} className={cn('text-white h-full flex items-center', isActive ? 'font-semibold' : 'font-thin', className)}>
      {children}
    </Link>
  )
}