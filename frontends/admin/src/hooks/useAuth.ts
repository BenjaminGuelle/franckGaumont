import { useStore } from '@/stores/root.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  const {isLoading, isAuthenticated} = useStore();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/connexion'); // Remplace par le chemin vers ta page de connexion
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}