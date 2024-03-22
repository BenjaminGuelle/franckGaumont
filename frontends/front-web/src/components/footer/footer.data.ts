export interface LinkModel {
  label: string;
  link: string;
}

export interface LinksModel {
  type: string;
  links: LinkModel[];
}

const linksPlan: LinkModel[] = [
  {
    label: 'Accueil',
    link: '/',
  },
  {
    label: 'Présentation',
    link: '/presentation',
  },
  {
    label: 'Services',
    link: '/services',
  },
  {
    label: 'Actualités',
    link: '/publications',
  },
]

const linksInformation: LinkModel[] = [
  {
    label: 'Contact',
    link: '/contact',
  },
  {
    label: 'Mentions Légales',
    link: '/mentions-legales',
  },
  {
    label: 'Données personnelles',
    link: '/donnees-personnelles',
  },
]

export const groupLinks: LinksModel[] = [
  {
    type: 'plan',
    links: linksPlan,
  },
  {
    type: 'information',
    links: linksInformation,
  }
];