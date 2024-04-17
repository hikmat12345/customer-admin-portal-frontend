'use client'
import Image from 'next/image'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetCostSavings } from '@/hooks/useGetCostSavings'
import { useGetMonthlyTickets } from '@/hooks/useTickets'
import CostSavingsCard from './components/costSavingsCard'
import OpenTicketsCard from './components/openTicketsCard'
import TicketsCard from './components/ticketsCard'
import AlertsTable from './components/alertsTable'
import { useGetMonthlyInvoices } from '@/hooks/useGetInvoices'
import AccountCard from '../../components/ui/accountCard/card'
import { getFormattedTotal } from '@/utils/utils'

const HomePage = () => {
	const currentDate = new Date()
	const currentYear = currentDate.getFullYear()
	const currentMonth = currentDate.getMonth() + 1
	const { data: invoicesData, isLoading: invoiceLoading } = useGetMonthlyInvoices()
	const { data: costSavingsData, isLoading: costSavingLoading } = useGetCostSavings(currentYear)
	const { data: monthlyTickets, isLoading: isMonthlyTicketsLoading } = useGetMonthlyTickets(currentYear, currentMonth)

	const absoluteDifferenceThisMonth = Math.abs(invoicesData?.thisMonth?.difference)
	const absoluteDifferenceLastMonth = Math.abs(invoicesData?.lastMonth?.difference)

	const formattedDifferenceThisMonth = getFormattedTotal(absoluteDifferenceThisMonth)
	const formattedDifferenceLastMonth = getFormattedTotal(absoluteDifferenceLastMonth)

	const getMessage = (difference: number, formattedDifference: string) => {
		let message = null
		switch (true) {
			case difference > 0:
				message = (
					<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-[#444444]">
						You've spent <span className="text-[#E41323]">${formattedDifference}</span> more than the previous month.
					</p>
				)
				break
			case difference < 0:
				message = (
					<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-[#444444]">
						You've spent <span className="text-[#219653]">${formattedDifference}</span> less than the previous month.
					</p>
				)
				break
			default:
		}
		return message
	}

	return (
		<>
			<div className="grid grid-auto-flow-column gap-3 w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg p-5">
				<h2 className="text-[#1D46F3] text-[22px] font-bold">Accounts</h2>
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
					<AccountCard
						data={invoicesData?.thisMonth}
						message={getMessage(invoicesData?.thisMonth?.difference, formattedDifferenceThisMonth)}
						title={'This Month'}
						isLoading={invoiceLoading}
						peakIndicator
						badge
						graph
					/>
					<AccountCard
						data={invoicesData?.lastMonth}
						message={getMessage(invoicesData?.lastMonth?.difference, formattedDifferenceLastMonth)}
						title={'Last Month'}
						isLoading={invoiceLoading}
						peakIndicator
						badge
						graph
					/>
					<CostSavingsCard data={costSavingsData} title={'Cost Saving'} isLoading={costSavingLoading} />
				</div>
			</div>
			<div className="flex gap-3 w-full mt-6">
				<div className="min-w-[473px] h-full w-full md:w-[473px] md:h-[235px] bg-[#FFFFFF] rounded-lg p-5 border border-[##ECECEC]">
					<h2 className="text-[#1D46F3] text-[22px] font-bold">Activity Feed</h2>
					<ScrollArea className="md:h-[170px] py-4">
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-5">
								<Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
								<h2 className="text-base text-[#444444] font-normal">Verizon Invoice 2345 Processed</h2>
							</div>
							<div className="flex items-center gap-5">
								<Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
								<h2 className="text-base text-[#444444] font-normal">Verizon Invoice 2345 Processed</h2>
							</div>
							<div className="flex items-center gap-5">
								<Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
								<h2 className="text-base text-[#444444] font-normal">Verizon Invoice 2345 Processed</h2>
							</div>
							<div className="flex items-center gap-5">
								<Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
								<h2 className="text-base text-[#444444] font-normal">Verizon Invoice 2345 Processed</h2>
							</div>
							<div className="flex items-center gap-5">
								<Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
								<h2 className="text-base text-[#444444] font-normal">Verizon Invoice 2345 Processed</h2>
							</div>
							<div className="flex items-center gap-5">
								<Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
								<h2 className="text-base text-[#444444] font-normal">Verizon Invoice 2345 Processed</h2>
							</div>
							<div className="flex items-center gap-5">
								<Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
								<h2 className="text-base text-[#444444] font-normal">Verizon Invoice 2345 Processed</h2>
							</div>
							<div className="flex items-center gap-5">
								<Image src="/svg/clipboard.svg" width={25} height={25} alt="Copy clipboard icon" />
								<h2 className="text-base text-[#444444] font-normal">Verizon Invoice 2345 Processed</h2>
							</div>
						</div>
					</ScrollArea>
				</div>

				<div className="grid grid-auto-flow-column gap-3 w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg p-5">
					<h2 className="text-[#1D46F3] text-[22px] font-bold">Customer Service</h2>
					<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
						<TicketsCard data={monthlyTickets} isLoading={isMonthlyTicketsLoading} />
						<OpenTicketsCard title="Tickets Open" />
					</div>
				</div>
			</div>
			<div className="w-full mt-6">
				<div className="grid grid-auto-flow-column gap-3 w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg p-5">
					<h2 className="text-[#1D46F3] text-[22px] font-bold">Actions & Alerts</h2>
					<AlertsTable />
				</div>
			</div>
		</>
	)
}

export default HomePage
