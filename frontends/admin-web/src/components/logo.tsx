import { cn } from '@/lib/utils';
import Image from 'next/image';
import logo from '@public/images/logo-franck-gaumont.png'
import { SizeType } from '@/shared/types/Size.type';

interface Props {
  size?: SizeType;
  className?: string;
}

export const Logo: ({ size, className }: Props) => JSX.Element = ({size = 'medium', className}: Props) => {
  let sizeStyles: string = '';
  switch (size) {
    case 'very-small':
      sizeStyles = 'w-[68px] h-[68px]';
      break;
    case 'small':
      sizeStyles = 'w-[94px] h-[94px]';
      break;
    case 'medium': // default
      sizeStyles = 'w-[109px] h-[109px]';
      break;
    case 'large':
      sizeStyles = 'w-[157px] h-[157px]';
      break;
  }

  return (
    <div className={cn(sizeStyles, className)}>
      <Image priority={true} src={logo} alt={'logo de franck gaumont'} />
    </div>
  )
}