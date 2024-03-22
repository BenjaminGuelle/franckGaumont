import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageBlock: ({ children, className }: Props) => React.JSX.Element = ({children, className}: Props) => {
  return (
    <section className={cn('px-4 lg:px-14', className)}>
      <Container>
        {children}
      </Container>
    </section>
  )
}
