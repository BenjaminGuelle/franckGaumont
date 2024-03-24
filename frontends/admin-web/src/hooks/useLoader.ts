import { DependencyList, useCallback, useState } from 'react';

export function useLoader<T extends (...args: Parameters<T>) => ReturnType<T>>(callback: T, deps: DependencyList): [(...args: Parameters<T>) => Promise<ReturnType<T>>, boolean ] {
  const [isLoading, setIsLoading] = useState(false);

  const reactCallback = useCallback(async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    setIsLoading(true);
    try {
      const returnValue: ReturnType<T> = callback(...args);
      setIsLoading(false);
      return returnValue;
    } catch(e) {
      setIsLoading(false);
      throw e;
    }
  }, [callback]);

  return [reactCallback, isLoading];
}
