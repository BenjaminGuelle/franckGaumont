import { cn } from '@/lib/utils';
import Image from 'next/image';
import logoSpin from '@/public/images/logoSpin.png'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Spinner = ({ size = 'sm' }: Props) => {

  let sizeStyles = '';
  let withStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'w-8 h-8';
      withStyles = 'w-5';
      break;
    case 'md':
      sizeStyles = 'w-10 h-10';
      withStyles = 'w-6';
      break;
    case 'lg':
      sizeStyles = 'w-14 h-14';
      withStyles = 'w-8';
      break;
    case 'xl':
      sizeStyles = 'w-20 h-20';
      withStyles = 'w-12';
      break;
  }

  return (
    <div aria-label="Loading..." className={'relative inline-block'} role="status">
      <svg className={cn('animate-spin fill-red-300', sizeStyles)} viewBox="3 3 18 18">
        <path className="opacity-20"
              d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
        </path>
        <path
          d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
        </path>
      </svg>
      <Image priority={true} className={cn('absolute w-7 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', withStyles)} src={logoSpin} alt={'logo loader'} />
    </div>
  )
    ;
};