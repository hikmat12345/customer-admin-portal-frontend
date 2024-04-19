import HomePage from '@/routes/home'
import { getOpenTickets } from '@/services/tickets/ticketsService'
import { QueryClient } from '@tanstack/react-query'

export default async function Home() {
	const queryClient = new QueryClient()

	queryClient.prefetchQuery({
		queryKey: ['open_tickets'],
		queryFn: getOpenTickets,
	})

	return <HomePage />
}
