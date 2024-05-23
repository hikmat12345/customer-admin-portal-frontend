'use client'

import React, { useEffect } from 'react'
import InventoryCard from './components/inventoryCard'
import SearchField from '@/components/ui/search-field'
import SelectComponent from './components/select'
import useGetMenuOptions from './components/select/options'
import { useGetInventories, useGetLiveServices, useGetMonthlyInventoryCount } from '@/hooks/useGetInventories'
import { InventoryCardData } from '@/types/inventory/types'
import InventoryTable from './components/inventoryTable'
import InventoryTableSkeleton from './components/inventoryTable/inventoryTableSkeleton'
import Pagination from '@/components/ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CreateQueryString from '@/utils/createQueryString'
import debounce from 'lodash.debounce'

const InventoryPage = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	const createQueryString = CreateQueryString()
	const page = searchParams?.get('page') || '1'
	const vendor = searchParams && searchParams?.get('vendor')
	const account = searchParams && searchParams?.get('account')
	const serviceType = searchParams && searchParams?.get('service_type')
	const serviceStatus = searchParams && searchParams?.get('service_status')
	const searchQuery = searchParams && searchParams?.get('searchQuery')

	const limit = 7
	const offset = +page - 1
	const menuOptions = useGetMenuOptions()
	const { data: monthlyCount, isLoading: monthInventoryLoading } = useGetMonthlyInventoryCount()
	const { data: liveServicesData, isLoading: liveServicesLoading } = useGetLiveServices()
	const {
		data: inventories,
		isLoading: isInventoriesLoading,
		isFetched: isInventoriesFetched,
		refetch: refetchInventories,
	} = useGetInventories(
		offset,
		limit,
		account?.length !== 0 ? account : undefined,
		vendor?.length !== 0 ? vendor : undefined,
		typeof serviceType !== 'undefined' && serviceType !== null ? +serviceType : undefined,
		typeof serviceStatus !== 'undefined' && serviceStatus !== null ? +serviceStatus : undefined,
		searchQuery?.length !== 0 ? searchQuery?.trim() : undefined
	)

	const totalPages = inventories?.total

	const inventoryData = [
		{
			id: 1,
			title: 'Live Services',
			description: `Currently, there are ${liveServicesData?.live} active services.`,
			data: (
				<h1 className="text-nowrap text-lg text-[#1B7DF0] lg:text-2xl 2xl:text-3xl font-bold">
					{liveServicesData?.live.toLocaleString()}
				</h1>
			),
		},
		{
			id: 2,
			title: 'Disconnected Services',
			description: `${monthlyCount?.currentMonth?.disconnected} services are disconnected this month.`,
			data: (
				<h1 className="text-nowrap text-[#E41323] text-lg lg:text-2xl 2xl:text-3xl font-bold">
					{monthlyCount?.currentMonth?.disconnected}
				</h1>
			),
		},
		{
			id: 3,
			title: 'New Services',
			description: `${monthlyCount?.lastMonth?.new} New Services were added last month.`,
			data: (
				<h1 className="text-nowrap text-lg text-[#219653] lg:text-2xl 2xl:text-3xl font-bold">
					{monthlyCount?.lastMonth?.new}
				</h1>
			),
		},
	]

	const handleSearchField = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		if (value.length === 0) {
			router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`)
		} else {
			router.push(`${pathname}?${createQueryString('searchQuery', value)}`)
		}
	}

	const debouncedSearchFieldHandlder = React.useCallback(debounce(handleSearchField, 500), [])

	const handlePageChange = async (page: number) => {
		const params = new URLSearchParams()
		if (searchParams) {
			searchParams.forEach((value, key) => {
				params.set(key, value)
			})
		}
		params.set('page', page.toString())
		router.push(`${pathname}?${params.toString()}`)
		await refetchInventories()
	}

	const isLoadingData = monthInventoryLoading || liveServicesLoading

	const queryParams = new URLSearchParams(searchParams?.toString())
	const keys = Array.from(queryParams.keys())

	useEffect(() => {
		if (searchParams) {
			if (keys.length > 1 || !keys.includes('page')) {
				router.push(`${pathname}?${createQueryString('page', 1)}`)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keys.length])

	return (
		<div>
			<div className="grid grid-auto-flow-column gap-3 w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg p-5">
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
					{inventoryData?.map((inventory: InventoryCardData) => (
						<InventoryCard
							key={inventory.id}
							title={inventory.title}
							data={inventory.data}
							message={inventory.description}
							isLoading={isLoadingData}
						/>
					))}
				</div>
			</div>
			<div className="grid grid-auto-flow-column gap-3 w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg px-3 pt-5 pb-2 mt-6">
				<div className="w-[100%] flex items-center justify-between gap-5">
					<SearchField
						className="rounded-none bg-transparent border-b ml-2 outline-none focus:border-[#44444480] w-[500px] xl:min-w-[600px] font-normal"
						iconWidth={16}
						iconHeight={16}
						onChange={debouncedSearchFieldHandlder}
					/>
					<div className="flex gap-2">
						{menuOptions?.map((menuOption: any, index: number) => (
							<SelectComponent key={index} menuOption={menuOption} index={index} />
						))}
					</div>
				</div>
				<div className="mt-2">
					{isInventoriesLoading && <InventoryTableSkeleton limit={limit} />}
					{isInventoriesFetched && <InventoryTable data={inventories?.data} />}
				</div>
			</div>
			{inventories?.total > 8 && inventories?.data?.length !== 0 && (
				<div className="">
					<Pagination
						className="flex justify-end pt-4"
						totalPages={totalPages}
						currentPage={Number(page)}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	)
}

export default InventoryPage
