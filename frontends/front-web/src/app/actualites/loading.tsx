import { Spinner } from '@/components/spinner/spinner';

export default function Loading() {
  return (
    <div className={'w-screen h-screen flex items-center justify-center'}>
      <Spinner size={'lg'}/>
    </div>
  );
}