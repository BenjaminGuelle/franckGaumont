import { Login } from '@/components/authentication/login';
import { PageBlock } from '@/components/ui/pageBlock';

export default async function Page() {
  return (
    <PageBlock>
      <Login />
    </PageBlock>
  );
}
