import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container: ({ children, className }: Props) => React.JSX.Element = ({children, className}: Props) => {
  return (
    <div className={cn('p-4 bg-white rounded-lg shadow', className)}>
      {children}
    </div>
  )
}