'use client'

import React from 'react'
import SearchField from '@/components/ui/search-field'
import SearchTable from './components/searchTable'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import { usePathname, useSearchParams } from 'next/navigation'
import { useGetSearchResults } from '@/hooks/useGetSearchResults'
import { useRouter } from 'next/navigation'
import { FILTERS } from './components/searchTable/select/options'
import SelectComponent from './components/searchTable/select'
const SearchPage = () => {
	const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()
	const search: string = searchParams?.get('query'?.toString()) || ''
	const searchFieldRef = React.createRef<HTMLInputElement>()
	React.useEffect(() => {
		const allFilters = FILTERS.map((f: any) => f.name)
		setSelectedFilters(allFilters)
	}, [])
	const updateSearchParams = () => {
		if (searchFieldRef.current && searchFieldRef.current.value) {
			const newSearchVal = searchFieldRef.current.value
			router.replace(`${pathname}?query=${newSearchVal}`)
		}
	}
	const { data, isLoading } = useGetSearchResults(search, selectedFilters)
	const searchData = data?.results || []
	return (
		<div className="h-screen">
			<div className="bg-[#FFFFFF] rounded-lg my-4 p-4 flex items-center justify-between">
				<div className="flex-1 ">
					<SearchField
						iconWidth={16}
						iconHeight={16}
						className="bg-transparent border-b shadow-none rounded-none ml-2 min-w-full max-w-full"
						defaultValue={search}
						ref={searchFieldRef}
					/>
				</div>
				<div className=" flex justify-end gap-x-2">
					<SelectComponent selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
					<Button variant="primary" onClick={updateSearchParams}>
						Search
					</Button>
				</div>
			</div>
			{isLoading && !searchData.length && (
				<div className="bg-[#FFFFFF] rounded-lg flex items-center justify-center py-8">
					<p className="font-bold text-base">{'Loading...'}</p>
				</div>
			)}
			{!isLoading && !searchData.length && (
				<div className="bg-[#FFFFFF] rounded-lg flex items-center justify-center py-8">
					<p className="font-bold text-base">{'No records found!'}</p>
				</div>
			)}
			{!isLoading && searchData.length > 0 && (
				<div className="bg-[#FFFFFF] rounded-lg h-4/6">
					<div className="w-[100%] pl-4 py-4">
						<p className="text-[#000] font-bold text-base">Search Result</p>
						<p className="text-[#575757] text-sm">
							Maximum 1000 Results Shown. Currently showing ({searchData.length})
						</p>
					</div>
					<SearchTable data={searchData} />
				</div>
			)}
		</div>
	)
}
export default SearchPage
