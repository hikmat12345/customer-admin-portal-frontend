import SavingTrackerPage from '@/views/saving-tracker';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <SavingTrackerPage />
    </Suspense>
  );
}
