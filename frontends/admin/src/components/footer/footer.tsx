import bg from '@/public/images/bg.png';
import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import { Typography } from '@/components/ui/typography';
import { LinkModel, LinksModel, groupLinks } from '@/components/footer/footer.data';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundPosition: 'right',
        backgroundSize: 'cover',
      }}
      className={'content-center'}
    >
      <Container className={'flex flex-col md:flex-row justify-between'}>
        <div className={'hidden md:flex items-center'}>
          <div className={'pt-6'}>
            <Logo/>
          </div>
          <div>
            <Typography weight={'semibold'} theme={'white'}>EIRL Franck Gaumont</Typography>
            <a href="https://www.google.com/maps/search/?api=1&query=Calvados" target={'_blank'}>
              <Typography weight={'medium'} theme={'white'} className={'opacity-50'}>Calvados - Normandie</Typography>
            </a>
            <a href={'tel:0783729832'}>
              <Typography weight={'medium'} theme={'white'} className={'opacity-50'}>07 83 72 98 32</Typography>
            </a>
            <a href={'mailTo:contact@franckgaumont.fr'}>
              <Typography weight={'medium'} theme={'white'}
                          className={'opacity-50'}>contact@franckgaumont.fr</Typography>
            </a>
          </div>
        </div>
        <div className={'flex justify-around md:space-x-10'}>
          {
            groupLinks.map((group: LinksModel, index: number) => {
              return (
                <ul key={index}>
                  {group.links.map((link: LinkModel, index: number) => {
                    return (
                      <li key={index}>
                        <FooterLink label={link.label} link={link.link}/>
                      </li>
                    );
                  })}
                </ul>
              );
            })
          }
        </div>
      </Container>
    </footer>
  );
};

const FooterLink: (link: LinkModel) => JSX.Element = (link: LinkModel) => {
  return (
    <Link href={link.link}>
      <Typography theme={'white'} className={'underline'}>{link.label}</Typography>
    </Link>
  );
};