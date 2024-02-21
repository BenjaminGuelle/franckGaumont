import { Logo } from '@/components/ui/logo';
import { Typography } from '@/components/ui/typography';

interface Props {
  title: string;
  className?: string;
}

export const TitleSection = ({title, className}: Props) => {
  return (
    <Typography variant={'t-4'} weight={'extrabold'} comp={'div'} className={'relative pb-14'}>
      <div className={'absolute flex items-center -left-2 md:-left-7'}>
        <Logo className={''} size={'very-small'}/>
        <h2 className={'pb-2'}>
          {title}
        </h2>
      </div>
    </Typography>
  )
}