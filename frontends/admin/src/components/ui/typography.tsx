import React from 'react';
import { cn } from '@/lib/utils';
import { ThemeType } from '@/types/ui/Theme.type';
import { VariantTypoType } from '@/types/ui/VariantTypo.type';
import { ComponentType } from '@/types/ui/Component.type';
import { FontWeightType } from '@/types/ui/FontWeight.type';

interface Props {
  variant?: VariantTypoType;
  className?: string;
  children?: React.ReactNode;
  theme?: ThemeType,
  comp?: ComponentType;
  weight?: FontWeightType;
}

export const Typography = ({
   variant = 'base',
   theme = 'primary',
   weight = 'normal',
   comp: Component = 'p',
   className,
   children,
 }: Props) => {

  let variantStyles: string = 'font-montserrat tracking-tight';
  switch (variant) {
    case 'base':  // DEFAULT
      variantStyles = `${variantStyles} text-md md:text-base leading-7`;
      break;
    case 'lead':
      variantStyles = `${variantStyles} text-md leading-7`;
      break;
    case 't-1':
      variantStyles = `${variantStyles} text-xl leading-7`;
      break;
    case 't-2':
      variantStyles = `${variantStyles} text-xl md:text-2xl leading-7`;
      break;
    case 't-3':
      variantStyles = `${variantStyles} text-3xl leading-7`;
      break;
    case 't-4':
      variantStyles = `${variantStyles} text-3xl lg:text-4xl uppercase leading-7`;
      break;
    case 't-5':
      variantStyles = `${variantStyles} text-3xl md:text-4xl lg:text-5xl leading-7`;
      break;
  }

  let colorStyles: string = '';
  switch (theme) {
    case 'primary': // DEFAULT
      colorStyles = 'text-primary';
      break;
    case 'secondary':
      colorStyles = 'text-secondary';
      break;
    case 'accent':
      colorStyles = 'text-accent';
      break;
    case 'grey':
      colorStyles = 'text-grey';
      break;
    case 'white':
      colorStyles = 'text-white';
      break;
  }

  let weightStyles: string = '';
  switch (weight) {
    case 'light':
      weightStyles = 'font-light';
      break;
    case 'normal': // DEFAULT
      weightStyles = 'font-normal';
      break;
    case 'medium':
      weightStyles = 'font-medium';
      break;
    case 'semibold':
      weightStyles = 'font-semibold';
      break;
    case 'extrabold':
      weightStyles = 'font-extrabold';
      break;
  }

  return (
    <Component className={cn(className, variantStyles, colorStyles, weightStyles)}>
      {children}
    </Component>
  );
};