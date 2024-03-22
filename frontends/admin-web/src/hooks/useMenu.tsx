import React, { createContext, useContext, useState } from 'react';

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

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <MenuContext.Provider value={{ isMenuVisible, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};