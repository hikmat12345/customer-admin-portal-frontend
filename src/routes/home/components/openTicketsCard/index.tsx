import React from 'react'
import { useGetOpenTickets } from '@/hooks/useTickets'
import PieChart from '@/components/ui/pieChart'
import { TICKETS_STATUS_LIST } from '../../../../utils/constants/statusList.constants'
import { ApexOptions } from 'apexcharts'
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton'

const OpenTicketsCard = ({ title }: { title: string }) => {
	const { data: openTicketsData, isLoading } = useGetOpenTickets()
	const openTicket = openTicketsData?.openTickets
	const closeTicketsIn24Hours = openTicketsData?.closedTicketsLast24Hours

	const closeTicketHighlight = closeTicketsIn24Hours?.count === 0 ? '#E41323' : '#219653'

	const statusCounts = openTicketsData?.statusCounts
	const statusValues = statusCounts && Object.values(statusCounts)
	const statusKeys = statusCounts && Object.keys(statusCounts)

	const statusNames = statusKeys?.map((statusKey: string) => TICKETS_STATUS_LIST[statusKey])

	const chartOptions: ApexOptions = {
		series: statusValues,
		labels: statusNames,
		chart: {
			width: 100,
			type: 'donut',
		},
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			pie: {
				donut: {
					size: '88%',
					labels: {
						show: true,
						name: {
							offsetY: 4,
						},
						total: {
							show: true,
							showAlways: true,
							fontSize: '10px',
							fontWeight: 700,
							label: 'Status Overview',
							color: '#212B36',
							formatter: function (val) {
								return ''
							},
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
			y: {
				formatter: (value: number) => `${value}`,
			},
		},
	}

	return (
		<div className="min-w-[300px] min-h-[150px] h-auto border border-[#EAEAEA] pl-7 pt-3 rounded-lg relative">
			<div className="flex gap-[10px]">
				{isLoading ? (
					<div className="w-[24rem] mt-2 mr-6">
						<Skeleton variant="paragraph" rows={3} />
					</div>
				) : (
					<div className="flex flex-col gap-4 pb-3 w-full pr-5">
						<h2 className="text-[#000000] text-lg font-semibold">{title}</h2>
						<div className="flex items-center gap-5">
							<h1 className="text-lg lg:text-2xl 2xl:text-3xl font-bold">{openTicket?.count}</h1>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-[#444444]">
								<span className={`text-[${closeTicketHighlight}] font-bold`}>{closeTicketsIn24Hours?.count}</span>{' '}
								tickets closed in last 24hours.
							</p>
							<div className="mt-[-115px] w-[120px] h-[110px]">
								<PieChart chartOptions={chartOptions} />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default OpenTicketsCard
