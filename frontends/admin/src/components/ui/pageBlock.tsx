import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const PageBlock: ({ children }: Props) => React.JSX.Element = ({children}: Props) => {
  return (
    <section className={'p-10 bg-primary-100 rounded-lg'}>
      {children}
    </section>
  )
}