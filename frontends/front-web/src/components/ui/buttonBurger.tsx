import { RiCloseFill, RiMenuFill } from 'react-icons/ri';
import React from 'react';

interface Props {
  toggleMenu:  () => void;
  isMenuActive: boolean;
}

export const ButtonBurger = ({toggleMenu, isMenuActive}: Props) => {

  return (
    <button onClick={toggleMenu} className={'lg:hidden'}>
      {isMenuActive ? <RiCloseFill fill={'#ffffff'} /> : <RiMenuFill fill={'#ffffff'} />}
    </button>
  )
}