import { Typography } from '@/components/ui/typography';
import { ComponentType } from '@/types/ui/Component.type';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  className?: string;
  comp?: ComponentType;
  label?: string;
}

export const TitleSection = ({title, comp: Component = 'h2', label}: Props) => {
  return (
    <Typography variant={'t-4'} weight={'extrabold'} comp={'div'} className={'relative'}>
      <div className={'flex items-center'}>
        <div>
          {label &&
              <h3 className={'text-grey-400 text-base uppercase font-medium leading-6 tracking-wide'}>{label}</h3>}
          <Component className={cn('pb-2')}>
            {title}
          </Component>
        </div>
      </div>
    </Typography>
  )
}