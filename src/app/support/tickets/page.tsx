import TicketsPage from '@/routes/tickets'
import { getOpenTickets } from '@/services/tickets/ticketsService'
import { QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function Home() {
	const queryClient = new QueryClient()

	queryClient.prefetchQuery({
		queryKey: ['open_tickets'],
		queryFn: getOpenTickets,
	})

	return (
		<Suspense>
			<TicketsPage />
		</Suspense>
	)
}
