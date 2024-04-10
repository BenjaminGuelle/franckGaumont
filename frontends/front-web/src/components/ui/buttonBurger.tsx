import { RiCloseFill, RiMenuFill } from 'react-icons/ri';
import React from 'react';

interface Props {
  toggleMenu:  () => void;
  isMenuActive: boolean;
}

export const ButtonBurger = ({toggleMenu, isMenuActive}: Props) => {

  return (
    <button onClick={toggleMenu} className={'lg:hidden'}>
      {isMenuActive ? <RiCloseFill fill={'#ffffff'} size={25}/> : <RiMenuFill fill={'#ffffff'} size={25}/>}
    </button>
  )
}