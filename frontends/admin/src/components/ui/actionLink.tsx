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
    <Link href={path} className={cn('hidden lg:flex items-center text-sm gap-2 link font-semibold', className)}>
      {text}
      <div className={'rounded-full bg-accent text-primary p-2'}>
        <RiAddFill  />
      </div>
    </Link>
  )
}