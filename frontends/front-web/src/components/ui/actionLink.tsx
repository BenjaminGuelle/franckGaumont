import { RiAddFill } from 'react-icons/ri';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  text: string;
  path: string;
  className?: string;
}

export const ActionLink = ({text, path, className}: Props) => {
  return (
    <div>
      <Link href={path} className={cn('group hidden lg:flex items-center text-md md:text-base gap-2 link font-semibold', className)}>
        {text}
        <div className={'rounded-full bg-accent text-primary p-2 group-hover:scale-125 transition-transform ease-in-out duration-200'}>
          <RiAddFill  />
        </div>
      </Link>
    </div>
  )
}