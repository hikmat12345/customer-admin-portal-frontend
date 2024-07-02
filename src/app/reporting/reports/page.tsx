import { getVendorAccounts } from '@/services/tickets/ticketsService';
import ReportsPage from '@/views/reports';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

export default function Home() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['vendor_accounts'],
    queryFn: getVendorAccounts,
  });

  return (
    <Suspense>
      <ReportsPage />
    </Suspense>
  );
}
