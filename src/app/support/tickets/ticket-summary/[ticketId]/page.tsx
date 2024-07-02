import TicketSummary from '@/routes/tickets/ticket-summary/[ticketId]';
import { getTicketSummary } from '@/services/tickets/ticketsService';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { ticketId: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { ticketId } = params;

  return {
    title: `Ticket - SUP${ticketId}`,
    description: 'Ticket Summary',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

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
