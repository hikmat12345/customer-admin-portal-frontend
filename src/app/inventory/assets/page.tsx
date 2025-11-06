import AssetsPage from '@/views/assets';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Suspense>
      <AssetsPage />
    </Suspense>
  );
}
