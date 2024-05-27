'use client'

import SearchTextFieldArea from '@/components/ui/searchTextFieldArea'
import Sidebar from '@/components/ui/sidebar/sidebar'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()
	const router = useRouter()
	const pathSegments = pathname && pathname.split('/')
	let endWord = (pathSegments && pathSegments[pathSegments?.length - 1]) || 'Home'
	endWord = endWord.replace(/[-/]+/g, ' ')

	const handleRouteBack = () => {
		router.back()
	}

	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col py-[1rem] pl-[300px] pr-[55px] w-full min-h-[100vh] max-h-full bg-[#f4f7fe]">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-5 relative">
						{endWord === 'search' && (
							<button
								className="flex items-center justify-center absolute left-[-35px] p-2 w-[27px] h-[27px] rounded-full border border-[#1D46F3]"
								onClick={handleRouteBack}
							>
								<Image src="/svg/search/arrowBack.svg" alt="Arrow back" width={6} height={6} />
							</button>
						)}
						<h2 className="capitalize font-bold text-[#000000] text-[34px]">{endWord}</h2>
					</div>
					<SearchTextFieldArea />
				</div>
				{children}
			</div>
		</div>
	)
}

export default BaseLayout
