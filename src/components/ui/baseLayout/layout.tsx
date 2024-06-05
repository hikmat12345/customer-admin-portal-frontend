'use client'

import SearchTextFieldArea from '@/components/ui/searchTextFieldArea'
import Sidebar from '@/components/ui/sidebar/sidebar'
import Image from 'next/image'
import { useParams, usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
 
const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()
	const params = useParams()
	const router = useRouter()
	const pathSegments = pathname && pathname.split('/')
	let endWord =(position:number =1) => {
		const findPath= pathSegments && pathSegments[pathSegments?.length - position] || 'Home';
		return findPath.replace(/[-/]+/g, ' ')
	}
	
	const handleRouteBack = () => {
		router.back()
	}  

    const isSummaryPage = !isNaN(Number(params?.id));
 	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col py-[1rem] lg:pl-[279px] xl:pl-[300px] lg:pr-[30px] xl:pr-[55px]  w-full min-h-[100vh] max-h-full bg-custom-background">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-5 relative">
						{endWord() === 'search' && (
							<button
								className="flex items-center justify-center absolute left-[-35px] p-2 w-[27px] h-[27px] rounded-full border border-custom-blue"
								onClick={handleRouteBack} >
								<Image src="/svg/search/arrowBack.svg" alt="Arrow back" width={6} height={6} />
							</button>
						)}
						<h2 className="capitalize font-bold text-custom-black text-[30px]">
						{isSummaryPage ? endWord(2)+" Summary"  : endWord()}</h2>
					</div>
					<SearchTextFieldArea />
				</div>
				{children}
			</div>
		</div>
	)
}

export default BaseLayout
