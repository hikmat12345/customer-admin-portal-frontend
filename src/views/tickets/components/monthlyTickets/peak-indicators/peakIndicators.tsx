import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton'
import Image from 'next/image'
import React from 'react'

type Variant = 'success' | 'destructive'

const PeakIndicator = ({ variant, isLoading }: { variant: Variant; isLoading?: boolean }) => {
	let arrowImageSrc
	let backgroundColor
	switch (variant) {
		case 'success':
			arrowImageSrc = '/svg/upPeakArrow.svg'
			backgroundColor = 'bg-[#219653]'
			break
		case 'destructive':
			arrowImageSrc = '/svg/downPeakArrow.svg'
			backgroundColor = 'bg-[#E41323]'
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
						alt={variant === 'success' ? 'Up Peak Arrow' : 'Down Peak Arrow'}
						width={15}
						height={15}
					/>
				</div>
			)}
		</div>
	)
}

export default PeakIndicator
