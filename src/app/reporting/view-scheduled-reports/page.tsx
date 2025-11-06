import ScheduledReportsPage from '@/views/view-scheduled-reports';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <ScheduledReportsPage />
    </Suspense>
  );
}
