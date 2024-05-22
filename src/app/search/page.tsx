import SearchPage from '@/views/search'
import { Suspense } from 'react'
export default function Home() {
	return (
		<Suspense>
			<SearchPage />
		</Suspense>
	)
}
