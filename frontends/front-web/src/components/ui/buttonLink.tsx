import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface Props {
  children: React.ReactNode;
  path: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'empty';
}

export const ButtonLink = ({ children, path, className, variant = 'secondary' }: Props) => {

  let variantStyles = '';
  let paddingStyles = 'py-2 px-5';
  switch (variant) {
    case 'primary':
      variantStyles = 'border border-primary bg-primary hover:bg-primary/75 hover:border-primary/75';
      break;
    case 'secondary':
      variantStyles = 'border border-secondary bg-secondary hover:bg-secondary/75 hover:border-secondary/75';
      break;
    case 'outline':
      variantStyles = 'border border-white hover:border-white/75 hover:text-white/75';
      break;
    case 'empty':
      variantStyles = `text-primary hover:text-primary/75`;
      paddingStyles = 'p-0';
      break;
  }

  return (
    <div>
      <Link href={path}
            className={cn('group inline-flex min-w-11 text-white font-semibold text-md md:text-base rounded items-center justify-center gap-2', paddingStyles, variantStyles, className)}>
        {children}
      </Link>
    </div>
  );
};