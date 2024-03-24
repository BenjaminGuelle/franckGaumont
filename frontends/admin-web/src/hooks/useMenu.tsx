import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
  children: React.ReactNode;
}

const MenuContext = createContext({
  isMenuVisible: false,
  toggleMenu: () => {},
});

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }: Props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      if (isMenuVisible) {
        setIsMenuVisible(false);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isMenuVisible, router.events]);

  return (
    <MenuContext.Provider value={{ isMenuVisible, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
