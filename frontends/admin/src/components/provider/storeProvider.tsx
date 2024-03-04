'use client'

import React from 'react';
import { rootStore, StoreProvider } from '@/stores/root.store';

interface Props {
  children: React.ReactNode;
}

export const StoreWrapper: ({ children }: Props) => React.JSX.Element = ({children}: Props) => {
  return (
    <StoreProvider value={rootStore}>
      {children}
    </StoreProvider>
  )
}