'use client'

import { useGetInvoices, useGetMonthlyInvoices } from '@/hooks/useGetInvoices'
import React, { useEffect } from 'react'
import AccountCard from '../../components/ui/accountCard/card'
import { getFormattedTotal } from '@/utils/utils'
import InvoicesProcessed from './components/invoicesProcessedCard'
import InvoicesTable from './components/invoicesTable'
import Pagination from '@/components/ui/pagination'
import SearchField from '@/components/ui/search-field'
import { usePathname, useSearchParams } from 'next/navigation'
import CreateQueryString from '@/utils/createQueryString'
import { useRouter } from 'next/navigation'
import InvoicesTableSkeleton from './components/invoicesTable/invoicesTableSkeleton'
import SelectComponent from './components/select'
import useGetMenuOptions from './components/select/options'
import debounce from 'lodash.debounce'

const InvoicesPage = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	const createQueryString = CreateQueryString()
	const page = searchParams?.get('page') || '1'
	const account_number = searchParams && searchParams?.get('account')
	const countryId = searchParams && searchParams?.get('country')
	const vendor = searchParams && searchParams?.get('vendor')

	const searchQuery = searchParams && searchParams?.get('searchQuery')

	const limit = 7
	const offset = +page - 1

	const { data: invoicesData, isLoading: invoiceLoading } = useGetMonthlyInvoices()
	const {
		data: allInvoices,
		isLoading: isAllInvoicesLoading,
		isFetched: isAllInvoiesFetched,
		refetch: refetchInvoices,
	} = useGetInvoices(
		offset,
		limit,
		account_number?.length !== 0 ? account_number : undefined,
		typeof countryId !== 'undefined' && countryId !== null ? +countryId : undefined,
		vendor?.length !== 0 ? vendor : undefined,
		searchQuery?.length !== 0 ? searchQuery?.trim() : undefined
	)

	const handleSearchField = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		if (value.length === 0) {
			router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`)
		} else {
			router.push(`${pathname}?${createQueryString('searchQuery', value)}`)
		}
	}

	const debouncedSearchFieldHandlder = React.useCallback(debounce(handleSearchField, 500), [])

	const totalPages = allInvoices?.total

	const handlePageChange = async (page: number) => {
		const params = new URLSearchParams()
		if (searchParams) {
			searchParams.forEach((value, key) => {
				params.set(key, value)
			})
		}
		params.set('page', page.toString())
		router.push(`${pathname}?${params.toString()}`)
		await refetchInvoices()
	}

	const queryParams = new URLSearchParams(searchParams?.toString())
	const keys = Array.from(queryParams.keys())

	const menuOptions = useGetMenuOptions()

	const absoluteDifferenceThisMonth = Math.abs(invoicesData?.thisMonth?.difference)
	const formattedDifferenceThisMonth = getFormattedTotal(absoluteDifferenceThisMonth)

	const getThisMonthMessage = (difference: number, formattedDifference: string) => {
		let message = null
		switch (true) {
			case difference > 0:
				message = (
					<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-[#444444]">
						Current expenditure exceeds last month's by over{' '}
						<span className="text-[#E41323] font-semibold">${formattedDifference}</span>
					</p>
				)
				break
			case difference < 0:
				message = (
					<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-[#444444]">
						Current expenditure is lower than last month's by over{' '}
						<span className="text-[#219653] font-semibold">${formattedDifference}</span>
					</p>
				)
				break
			default:
		}
		return message
	}

	const lastMonthMessage = (
		<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-[#444444]">
			Invoice value of{' '}
			<span
				className={`${
					invoicesData?.lastMonth?.percentageDifference < 0 ? 'text-[#219653]' : 'text-[#E41323]'
				} font-semibold`}
			>
				${getFormattedTotal(invoicesData?.lastMonth?.total)}
			</span>{' '}
			processed previous month.
		</p>
	)

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
					<AccountCard
						data={invoicesData?.thisMonth}
						message={getThisMonthMessage(invoicesData?.thisMonth?.difference, formattedDifferenceThisMonth)}
						title={'This Month'}
						isLoading={invoiceLoading}
						peakIndicator={true}
					/>
					<AccountCard
						data={invoicesData?.lastMonth}
						message={lastMonthMessage}
						title={'Last Month'}
						isLoading={invoiceLoading}
						peakIndicator
					/>
					<InvoicesProcessed
						data={invoicesData?.thisMonth}
						title="Total Invoices Processed"
						isLoading={invoiceLoading}
					/>
				</div>
			</div>
			<div className="grid grid-auto-flow-column gap-3 w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg px-3 pt-5 pb-2 mt-6">
				<div className="flex items-center justify-between gap-2">
					<SearchField
						className="rounded-none bg-transparent border-b ml-2 outline-none focus:border-[#44444480] w-[500px] xl:min-w-[700px] font-normal"
						iconWidth={16}
						iconHeight={16}
						onChange={debouncedSearchFieldHandlder}
					/>
					<div className="flex gap-4">
						{menuOptions?.map((menuOption: any, index: number) => (
							<SelectComponent key={index} menuOption={menuOption} index={index} />
						))}
					</div>
				</div>
				<div className="mt-2">
					{isAllInvoicesLoading && <InvoicesTableSkeleton limit={limit} />}
					{isAllInvoiesFetched && <InvoicesTable data={allInvoices} />}
				</div>
			</div>
			{allInvoices?.total > 8 && allInvoices?.invoices?.length !== 0 && (
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

export default InvoicesPage
