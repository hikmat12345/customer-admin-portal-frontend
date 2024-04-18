import Image from 'next/image'
import React from 'react'
import Skeleton from '../skeleton/skeleton'

type Variant = 'success' | 'destructive'

const PeakIndicator = ({ isLoading, percentage }: { variant: Variant; isLoading?: boolean; percentage?: number }) => {
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
		<div>
			{isLoading ? (
				<div className={`absolute right-0 top-0 rounded-full`}>
					<Skeleton variant="avatar" height="40px" width="40px" />
				</div>
			) : (
				<div className={`absolute right-4 ${backgroundColor} w-9 h-9 items-center flex justify-center rounded-full`}>
					<Image
						src={arrowImageSrc}
						alt={percentage && percentage > 0 ? 'Up Peak Arrow' : 'Down Peak Arrow'}
						width={15}
						height={15}
					/>
				</div>
			)}
		</div>
	)
}

export default PeakIndicator
