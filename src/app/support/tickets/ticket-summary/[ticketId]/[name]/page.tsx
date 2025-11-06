import TicketSummary from '@/views/tickets/ticket-summary/[ticketId]';
import { getTicketSummary } from '@/services/tickets/ticketsService';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { decrypt } from '@/utils/encryptParam';

type Props = {
  params: { ticketId: string; name: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { ticketId, name } = params;

  return {
    title: `SUP${ticketId} - ${decrypt(name)} | Veroxos`,
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
