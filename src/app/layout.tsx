import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '../../lib/query-provider'
import BaseLayout from '@/components/ui/baseLayout/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Veroxos 2.0',
	description: 'Veroxos',
	icons: {
		icon: '/favicon.svg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<BaseLayout>{children}</BaseLayout>
				</Providers>
			</body>
		</html>
	)
}
