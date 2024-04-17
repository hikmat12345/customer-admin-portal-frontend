'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: true } } })

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			{children}
		</QueryClientProvider>
	)
}
