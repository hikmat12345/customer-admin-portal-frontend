import { Badge } from '@veroxos/design-system'
import { Skeleton } from '@veroxos/design-system'
import ChartComponent from '../../../pages/home/components/chartComponent'
import { ReactNode } from 'react'
import { PeakIndicator } from '@veroxos/design-system'
import Image from 'next/image'

const AccountCard = ({
	data,
	title,
	peakIndicator,
	message,
	badge,
	graph,
	isLoading,
}: {
	data?: any
	title?: string
	peakIndicator?: boolean
	message: ReactNode
	badge?: boolean
	graph?: boolean
	isLoading: boolean
}) => {
	const badgeVariant = data?.percentageDifference > 0 ? 'destructive' : 'success'

	const formattedPercentageDifference =
		data?.percentageDifference > 0
			? `+${data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
			: data?.percentageDifference?.toLocaleString(undefined, { maximumFractionDigits: 2 })

	const chartVariant = data?.percentageDifference > 0 ? '#E41323' : '#219653'

	const percentage = data?.percentageDifference

	let arrowImageSrc
	let backgroundColor

	switch (percentage && percentage > 0) {
		case true:
			arrowImageSrc = '/svg/upPeakArrow.svg'
			backgroundColor = 'bg-[#E41323]'
			break
		case false:
			arrowImageSrc = '/svg/downPeakArrow.svg'
			backgroundColor = 'bg-[#219653]'
			break
		default:
			arrowImageSrc = ''
			backgroundColor = ''
	}

	return (
		<div className="min-w-[250px] min-h-[150px] lg:min-h-[140px] xl:min-h-[155px] max-w-full h-auto border border-[#EAEAEA] pl-7 pt-3 rounded-lg relative">
			<div className="flex gap-[10px]">
				{isLoading ? (
					<div className={`w-[24rem] mt-2 ${graph ? 'mr-6' : 'mr-14'}`}>
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

						{message}
					</div>
				)}

				{peakIndicator && (
					<PeakIndicator variant={badgeVariant} isLoading={isLoading} backgroundColor={backgroundColor}>
						<Image
							src={arrowImageSrc}
							alt={percentage && percentage > 0 ? 'Up Peak Arrow' : 'Down Peak Arrow'}
							width={15}
							height={15}
						/>
					</PeakIndicator>
				)}

				{graph && (
					<div className="pt-1 pr-4 bg-gradient-to-r from-eb5757 via-eb5757 to-transparent">
						<ChartComponent data={data?.lastSixMonthsInvoices} variant={chartVariant} />
					</div>
				)}
			</div>
		</div>
	)
}

export default AccountCard
