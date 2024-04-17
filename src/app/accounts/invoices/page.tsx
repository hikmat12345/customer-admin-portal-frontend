import InvoicesPage from '@/pages/invoices'
import { QueryClient } from '@tanstack/react-query'

export default function Home() {
	const queryClient = new QueryClient()

	// queryClient.prefetchQuery({
	// 	queryKey: ['open_tickets'],
	// 	queryFn: getOpenTickets,
	// })
	return (
		<div>
			<InvoicesPage />
		</div>
	)
}
