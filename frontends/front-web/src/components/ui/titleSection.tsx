import { Logo } from '@/components/ui/logo';
import { Typography } from '@/components/ui/typography';
import { ComponentType } from '@/types/ui/Component.type';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  className?: string;
  classNameIcon?: string;
  comp?: ComponentType;
  label?: string;
}

export const TitleSection = ({title, comp: Component = 'h2', label, className, classNameIcon}: Props) => {
  return (
    <Typography variant={'t-4'} weight={'extrabold'} comp={'div'} className={'relative pb-14'}>
      <div className={'absolute flex items-center -left-2 md:-left-7'}>
        <Logo className={classNameIcon} size={'very-small'}/>
        <div>
          {label &&
              <h3 className={'text-grey-400 text-base uppercase font-medium leading-6 tracking-wide'}>{label}</h3>}
          <Component className={cn(label ? 'pb-4' : 'pb-2')}>
            {title}
          </Component>
        </div>
      </div>
    </Typography>
  )
}