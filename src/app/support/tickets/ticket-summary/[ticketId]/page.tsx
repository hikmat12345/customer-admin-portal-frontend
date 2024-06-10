import TicketSummary from '@/routes/tickets/ticket-summary/[ticketId]';
import { getTicketSummary } from '@/services/tickets/ticketsService';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

export default async function Home({ params: { ticketId } }: any) {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['ticket_summary', ticketId],
    queryFn: getTicketSummary,
  });

  return (
    <Suspense>
      <TicketSummary ticketId={ticketId} />
    </Suspense>
  );
}
