'use client'

import { Spinner } from '@/components/spinner/spinner';
import { observer } from 'mobx-react';

const Home = observer(() => {
  return (
    <div>
      <p>Hello</p>
      <Spinner />
    </div>
  );
});

export default Home;
