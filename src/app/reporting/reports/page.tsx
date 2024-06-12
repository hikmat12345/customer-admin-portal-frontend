import ReportsPage from '@/views/reports';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <ReportsPage />
    </Suspense>
  );
}
