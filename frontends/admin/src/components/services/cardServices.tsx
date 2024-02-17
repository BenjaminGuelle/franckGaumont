import Image, { StaticImageData } from 'next/image';
import bathroom from '@/public/images/bathroom.png';
import plumbing from '@/public/images/plumbing.png';
import repair from '@/public/images/repair.png';
import { Typography } from '@/components/ui/typography';
import { ActionLink } from '@/components/ui/actionLink';
import Link from 'next/link';

interface Props {
  services: ServicesModel;
}

export const CardServices = ({ services }: Props) => {
  const { type, title, shortDescription } = services;

  let icon: StaticImageData;
  let alt: string = '';
  let imageStyles: string = 'justify-center item-center';

  switch (type) {
    case 'plumbing':
      icon = plumbing;
      alt = 'plomberie';
      imageStyles = `${imageStyles} w-10 md:w-12 flex`;
      break;
    case 'bathroom':
      icon = bathroom;
      alt = 'salle de bain';
      imageStyles = `${imageStyles} w-20 md:w-12 flex`;
      break;
    case 'repair':
      icon = repair;
      alt = 'dépannage';
      imageStyles = `${imageStyles} w-10 md:w-12 flex`;
      break;
  }

  return (
    <article
      className={'mt-10 px-5 md:px-10 py-8 md:py-10 min-h-72 md:min-h-80 w-full md:max-w-72 rounded-tr-[40px] rounded-bl-[40px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] serviceCard'}>
      <Link href={'/services'} className={'min-h-72 md:min-h-80 flex flex-col justify-between'}>
        <div className={'flex md:flex-col'}>
          <div className={imageStyles}>
            <Image src={icon} alt={alt} className={'object-contain w-full'}/>
          </div>
          <Typography comp={'div'} variant={'t-2'} weight={'semibold'}
                      className={'relative pl-5 md:pl-0 md:pt-5 pb-2 serviceTitle'}>
            <h2>{title}</h2>
          </Typography>
        </div>
        <Typography className={'leading-6 md:py-10'}>
          {shortDescription}
        </Typography>
        <ActionLink text={'Découvrir'} path={'/services'} className={'flex'}/>
      </Link>
    </article>
  );
};
