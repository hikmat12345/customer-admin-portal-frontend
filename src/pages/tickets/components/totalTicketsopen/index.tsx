import PieChart from '@/components/ui/pieChart'
import Skeleton from '@/components/ui/skeleton/skeleton'
import { OpenTicketSummary } from '@/types/tickets/types'
import { ApexOptions } from 'apexcharts'
import React from 'react'

const TotalTicketsOpen = ({ data, isLoading }: { data: OpenTicketSummary; isLoading: boolean }) => {
	const openTicketsCount = data?.openTickets?.count

	const chartOptions: ApexOptions = {
		series: [data?.closedTicketsLast24Hours.count],
		labels: ['Closed tickets'],
		chart: {
			width: 100,
			type: 'donut',
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: 0,
		},
		plotOptions: {
			pie: {
				donut: {
					size: '92%',
					labels: {
						show: true,
						name: {
							offsetY: -15,
							fontSize: '10px',
							color: '#637381',
							formatter(val) {
								return 'Closed Tickets'
							},
						},
						value: {
							show: true,
							fontSize: '20px',
							fontWeight: 700,
							color: '#212B36',
							offsetY: -4,
						},
					},
				},
			},
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200,
					},
					legend: {
						show: false,
					},
				},
			},
		],
		legend: {
			show: false,
		},
		tooltip: {
			enabled: true,
			y: {},
		},
		colors: ['#219653'],
	}

	return (
		<div className="min-w-[300px] min-h-[150px] h-auto border border-[#EAEAEA] pl-7 pt-3 rounded-lg relative">
			{isLoading ? (
				<div className="mt-2 lg:mr-7">
					<Skeleton variant="paragraph" rows={3} className="mr-7" />
				</div>
			) : (
				<div className="flex gap-[6px]">
					<div className="flex flex-col gap-4 pb-3 w-full pr-5">
						<h2 className="text-[#000000] text-lg font-bold">Total Tickets Open</h2>
						<div className="flex items-center gap-5">
							<h1 className="text-lg lg:text-2xl 2xl:text-3xl font-bold text-[#F08E1B]">{openTicketsCount}</h1>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-[#444444]">
								{openTicketsCount} tickets are currently open.
							</p>
							<div className="mt-[-100px] lg:mt-[-103px] 2xl:mt-[-103px] w-[120px] h-[103px] lg:h-[106px] 2xl:h-[120px] mr-2 relative">
								<PieChart chartOptions={chartOptions} />
								<span className="absolute lg:bottom-[5%] xl:bottom-[14%] left-[34%] text-[8px] text-[#637381] font-bold">
									in last 24 hours
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default TotalTicketsOpen
