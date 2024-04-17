import { Badge } from '@/components/ui/badge'
import Skeleton from '@/components/ui/skeleton/skeleton'
import { useGetMonthlyTickets } from '@/hooks/useTickets'
import PeakIndicator from './peak-indicators/peakIndicators'

const MonthlyTickets = ({ title, year, month }: { title: string; year: number; month: number }) => {
	const { data: monthlyTicketsData, isLoading } = useGetMonthlyTickets(year, month)

	const totalTickets = monthlyTicketsData?.totalMonthTickets

	const formattedPercentageDifference =
		monthlyTicketsData?.percentageDifference > 0
			? `+${monthlyTicketsData?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
			: monthlyTicketsData?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })

	const badgeVariant = monthlyTicketsData?.percentageDifference > 0 ? 'primary' : 'destructive'

	function difference(difference: number) {
		const absDifference = Math.abs(difference)

		const className = difference > 0 ? '#219653' : '#E41323'

		const message =
			difference > 0
				? 'more tickets this month compared to the previous month.'
				: 'fewer tickets previous month compared to this month.'

		return (
			<>
				<span className={`font-bold text-[${className}]`}>{absDifference}</span> {message}
			</>
		)
	}

	return (
		<div className="min-w-[300px] min-h-[150px] h-auto border border-[#EAEAEA] pl-7 pt-3 rounded-lg relative">
			<div className="flex gap-[10px]">
				{isLoading ? (
					<div className="w-[24rem] mt-2 lg:mr-12">
						<Skeleton variant="paragraph" rows={3} />
					</div>
				) : (
					<div className="flex flex-col gap-4 pb-3 w-full pr-5">
						<h2 className="text-[#000000] text-lg font-semibold">{title}</h2>
						<div className="flex items-center gap-5">
							<h1 className="text-lg lg:text-2xl 2xl:text-3xl font-bold">{totalTickets}</h1>
							<Badge className="text-sm lg:text-xs" variant="destructive">
								{formattedPercentageDifference}%
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-xs 2xl:text-sm font-medium text-[#444444]">
								{difference(monthlyTicketsData?.difference)}
							</p>
						</div>
					</div>
				)}
				<PeakIndicator variant={badgeVariant} isLoading={isLoading} />
			</div>
		</div>
	)
}

export default MonthlyTickets
