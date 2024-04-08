'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter();
  useEffect(() => {
    router.replace('/404');
  }, [error, router])

  return (
    <div className={'w-screen h-screen'}>
      <p>Vous rencontrez une erreur, vous avez surement du vouloir</p>
    </div>
  )
}