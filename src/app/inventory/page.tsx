import InventoryPage from '@/views/inventory';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <InventoryPage />
    </Suspense>
  );
}
