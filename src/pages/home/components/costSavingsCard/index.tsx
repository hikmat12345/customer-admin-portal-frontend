import { Skeleton } from '@veroxos/design-system'
import CostSavingChart from './costSavingChart'
import { Badge } from '@veroxos/design-system'

const CostSavingsCard = ({
	data,
	title,
	badge,
	isLoading,
}: {
	data?: any
	title?: string
	badge?: boolean
	isLoading: boolean
}) => {
	const badgeVariant = data?.percentageDifference > 0 ? 'destructive' : 'primary'

	const formattedPercentageDifference =
		data?.percentageDifference > 0
			? `+${data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
			: data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })

	const chartVariant = data?.percentageDifference > 0 ? '#E41323' : '#219653'
	const regex = /\$([\d,.]+)k/g

	const highlightedMessage = data?.message?.replace(
		regex,
		(match: any) => `<span style="color: ${chartVariant};">${match}</span>`
	)

	return (
		<div className="min-w-[250px] min-h-[150px] max-w-full h-auto border border-[#EAEAEA] pl-7 pt-3 rounded-lg relative">
			<div className="flex gap-[10px]">
				{isLoading ? (
					<div className="w-[24rem] mt-2">
						<Skeleton variant="paragraph" rows={3} />
					</div>
				) : (
					<div className="flex flex-col gap-4 pb-3">
						<h2 className="text-[#000000] text-sm md:text-base 2xl:text-lg font-semibold">{title}</h2>
						<div className="flex items-center gap-5">
							<h1 className="text-nowrap text-lg lg:text-2xl 2xl:text-3xl font-bold">
								$ {Math.floor(data?.total || data?.totalCostSavings).toLocaleString()}
							</h1>
							{badge && (
								<Badge className=" text-nowrap text-sm lg:text-xs" variant={badgeVariant}>
									{formattedPercentageDifference}%
								</Badge>
							)}
						</div>
						<p
							className="text-xs xl:text-xs 2xl:text-sm font-medium text-[#444444]"
							dangerouslySetInnerHTML={{ __html: highlightedMessage || data?.message }}
						></p>
					</div>
				)}

				<div className="pt-1 pr-4 bg-gradient-to-r from-eb5757 via-eb5757 to-transparent">
					<CostSavingChart data={data?.data} variant={chartVariant} />
				</div>
			</div>
		</div>
	)
}

export default CostSavingsCard
