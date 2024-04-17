import { QueryClient } from '@tanstack/react-query'
import HomePage from '@/pages/home'
import { getOpenTickets } from '@/services/tickets/ticketsService'

export default async function Home() {
	const queryClient = new QueryClient()

	queryClient.prefetchQuery({
		queryKey: ['open_tickets'],
		queryFn: getOpenTickets,
	})

	return <HomePage />
}
