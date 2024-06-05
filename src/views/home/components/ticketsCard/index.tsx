import Reviews from '@/components/ui/review'
import { TicketsData } from '@/types/tickets/types'
import PeakIndicator from './peak-indicators'
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton'
import Badge from '@veroxos/design-system/dist/ui/Badge/badge'

const TicketsCard = ({ data, isLoading }: { data: TicketsData; isLoading: boolean }) => {
	const formattedPercentageDifference =
		data?.percentageDifference > 0
			? `+${data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
			: data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })

	const badgeVariant = data?.percentageDifference > 0 ? 'success' : 'destructive'

	let averageReviews = data?.averageScore

	if (averageReviews % 1 >= 0.5) {
		averageReviews = Math.ceil(averageReviews)
	}

	return (
		<div className="min-w-[300px] min-h-[150px] h-auto border border-custom-plaster pl-7 pt-3 rounded-lg relative">
			<div className="flex gap-[10px]">
				{isLoading ? (
					<div className="w-[24rem] mt-2 mr-16 xl:mr-16">
						<Skeleton variant="paragraph" rows={3} />
					</div>
				) : (
					<div className="flex flex-col gap-4 pb-3 w-full pr-5">
						<h2 className="text-custom-black text-lg font-semibold">Tickets this Month</h2>
						<div className="flex items-center gap-5">
							<h1 className="text-lg lg:text-2xl 2xl:text-3xl font-bold">{data?.totalMonthTickets}</h1>
							<Badge className="text-sm lg:text-xs" variant={badgeVariant}>
								{formattedPercentageDifference}%
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-custom-grey">
								Total tickets created this month.
							</p>

							<div className="flex items-center gap-4 lg:gap-[10px] xl:gap-4">
								{typeof averageReviews === 'number' &&
									averageReviews > 0 &&
									Array.from({ length: Math.floor(averageReviews) }).map((_, index) => <Reviews key={index} />)}
							</div>
						</div>
					</div>
				)}
				<div className="absolute right-4">
					<PeakIndicator variant={badgeVariant} isLoading={isLoading} />
				</div>
			</div>
		</div>
	)
}

export default TicketsCard
