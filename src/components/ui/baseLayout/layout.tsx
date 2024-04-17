'use client'

import SearchTextFieldArea from '@/components/ui/searchTextFieldArea'
import Sidebar from '@/components/ui/sidebar/sidebar'
import { usePathname } from 'next/navigation'
import * as React from 'react'

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()
	const pathSegments = pathname && pathname.split('/')
	let endWord = (pathSegments && pathSegments[pathSegments?.length - 1]) || 'Home'
	endWord = endWord.replace(/[-/]+/g, ' ')
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col py-[1rem] pl-[290px] pr-[45px] w-full min-h-[100vh] max-h-full bg-[#f4f7fe]">
				<div className="flex items-center justify-between mb-4">
					<h2 className="capitalize font-bold text-[#000000] text-[34px]">{endWord}</h2>
					<SearchTextFieldArea />
				</div>
				{children}
			</div>
		</div>
	)
}

export default BaseLayout
