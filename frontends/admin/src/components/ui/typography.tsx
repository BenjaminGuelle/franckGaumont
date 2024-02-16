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
   variant = 'p',
   theme = 'primary',
   weight = 'regular',
   comp: Component = 'p',
   className,
   children,
 }: Props) => {

  let variantStyles: string = 'font-montserrat';
  switch (variant) {
    case 'p':
    case 'base':
      variantStyles = `${variantStyles} text-md`;
      break;
    case 'lead':
      variantStyles = `${variantStyles} text-sm`;
      break;
    case 'span':
      variantStyles = `${variantStyles} `;
      break;
    case 't-1':
      variantStyles = `${variantStyles} text-xl`;
      break;
    case 't-2':
      variantStyles = `${variantStyles} text-2xl`;
      break;
    case 't-3':
      variantStyles = `${variantStyles} text-3xl`;
      break;
    case 't-4':
      variantStyles = `${variantStyles} text-4xl uppercase`;
      break;
    case 't-5':
      variantStyles = `${variantStyles} text-5xl uppercase`;
      break;
  }

  let colorStyles: string = '';
  switch (theme) {
    case 'primary':
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
    case 'medium':
      weightStyles = 'font-medium';
      break;
    case 'regular':
      weightStyles = 'font-regular';
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