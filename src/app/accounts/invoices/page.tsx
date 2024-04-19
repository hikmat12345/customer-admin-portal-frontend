import InvoicesPage from '@/routes/invoices'
import { Suspense } from 'react'

export default async function Home() {
	return (
		<Suspense>
			<InvoicesPage />
		</Suspense>
	)
}
