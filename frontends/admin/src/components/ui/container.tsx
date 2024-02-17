import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container: ({ children, className }: Props) => React.JSX.Element = ({children, className}: Props) => {
  return (
    <div className={cn('max-w-7xl px-8 xs:px-8 md:px-10 py-10 mx-auto', className)}>
      {children}
    </div>
  )
}