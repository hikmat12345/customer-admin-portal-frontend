import InvoiceSummaryPage from '@/views/invoice-detail'
import { Suspense } from 'react'

export default async function Home({ params }: { params: { id: string } }) {
	return (
		<Suspense>
			<InvoiceSummaryPage invoiceId={parseInt(params.id)} />
		</Suspense>
	)
}
