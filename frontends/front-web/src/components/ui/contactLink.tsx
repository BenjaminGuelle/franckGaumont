import React from 'react';
import { RiFacebookCircleFill, RiInstagramLine, RiMailSendLine, RiMapPinLine, RiPhoneFill } from 'react-icons/ri';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { FontWeightType } from '@/types/ui/FontWeight.type';
import { ThemeType } from '@/types/ui/Theme.type';

interface Props {
  contactLink: ContactLink;
  className?: string;
  variant?: 'black' | 'white' | 'accent';
  weight?: FontWeightType;
}

type ContactLink = 'ADDRESS' | 'PHONE' | 'MAIL' | 'INST' | 'FB'

export const ContactLink = ({ contactLink, className, variant = 'white', weight = 'light' }: Props) => {

  let variantIconStyles = '';
  let variantThemeStyles: ThemeType = 'white';
  let variantPhoneBox = '';
  let variantPhoneStyles = '';
  switch (variant) {
    case 'white':
      variantIconStyles = 'text-white';
      variantPhoneBox = 'bg-white';
      variantThemeStyles = 'white';
      variantPhoneStyles = 'text-primary';
      break;
    case 'black':
      variantIconStyles = 'text-primary';
      variantPhoneBox = 'bg-primary';
      variantThemeStyles = 'primary';
      variantPhoneStyles = 'text-white';
      break;
    case 'accent':
      variantIconStyles = 'text-white';
      variantPhoneBox = 'bg-accent';
      variantThemeStyles = 'white';
      variantPhoneStyles = 'text-primary';
      break;
  }

  return (
    <>
      {
        contactLink === 'ADDRESS' &&
          <a href="https://www.google.com/maps/search/?api=1&query=Calvados" target={'_blank'}
             className={cn('inline-flex items-center space-x-1', className)}>
              <RiMapPinLine className={variantIconStyles} size={20}/>
              <Typography theme={variantThemeStyles} weight={weight} className={'uppercase'}>
                  Calvados - Normandie
              </Typography>
          </a>
      }
      {
        contactLink === 'MAIL' &&
          <a href={'mailTo:contact@franckgaumont.fr'}
             className={cn('inline-flex items-center space-x-1', className)}>
              <RiMailSendLine className={variantIconStyles} size={20}/>
              <Typography theme={variantThemeStyles} weight={weight}>
                  contact@franckgaumont.fr
              </Typography>
          </a>
      }
      {
        contactLink === 'PHONE' &&
          <a href={'tel:0783729832'}
             className={cn('inline-flex items-center space-x-1', className)}>
              <div className={cn('rounded-full w-7 h-7 flex justify-center items-center p-1', variantPhoneBox)}>
                  <RiPhoneFill className={variantPhoneStyles} size={20}/>
              </div>
              <Typography weight={weight} theme={variantThemeStyles} className={'md:text-xl'}>
                  07 83 72 98 32
              </Typography>
          </a>
      }
      {
        contactLink === 'FB' &&
          <a href="https://www.facebook.com/profile.php?id=100087400862064" target="_blank"
             className={cn('inline-flex', className)}>
              <RiFacebookCircleFill className={variantIconStyles} size={20}/>
          </a>
      }
      {
        contactLink === 'INST' &&
          <a href="https://www.instagram.com/eurl.franckgaumont/" target="_blank"
             className={cn('inline-flex', className)}>
              <RiInstagramLine className={variantIconStyles} size={20}/>
          </a>
      }
    </>
  );
};