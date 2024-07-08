import ServiceSitesPage from '@/views/sites-accounts';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Suspense>
      <ServiceSitesPage />
    </Suspense>
  );
}
