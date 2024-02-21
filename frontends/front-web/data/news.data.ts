interface NewsModel {
  uid: string;
  title: string;
  city: string;
  description: string;
  type: 'Agencement' | 'plomberie';
}

export const newsData: NewsModel[] = [
  {
    uid: '1',
    title: 'Salle de bain',
    city: 'Caen',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    type: 'Agencement'
  },
  {
    uid: '2',
    title: 'Cuisne',
    city: 'Ouistreham',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    type: 'Agencement'
  },
  {
    uid: '3',
    title: 'Salle',
    city: 'EPRON',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    type: 'Agencement'
  },
  {
    uid: '4',
    title: 'Salle de bain',
    city: 'Caen',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    type: 'plomberie'
  }

]