import VendorAccountsPage from '@/views/vendor-accounts';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Suspense>
      <VendorAccountsPage />
    </Suspense>
  );
}
