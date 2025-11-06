import APFAccountPage from '@/views/apf-accounts';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Suspense>
      <APFAccountPage />
    </Suspense>
  );
}
