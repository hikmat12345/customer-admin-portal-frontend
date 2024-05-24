import React from 'react'

interface SkeletonProps {
	variant?: 'paragraph' | 'avatar' | 'block'
	rows?: number
	width?: string
	height?: string
	className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({ variant, rows, width, height, className }) => {
	let skeletonContent

	switch (variant) {
		case 'avatar':
			skeletonContent = (
				<div className={`max-w-sm w-full mx-auto ${className}`}>
					<div className="animate-pulse flex space-x-4 p-4 rounded-full bg-gradient-animation">
						<div className={`rounded-full bg-gray-400 h-12 w-12`} style={{ width: width, height: height }}></div>
					</div>
				</div>
			)
			break
		case 'paragraph':
			const skeletonRows = Array.from({ length: rows ?? 3 }).map((_, index, arr) => (
				<div
					key={index}
					className={`h-6 bg-gray-400 rounded-md w-full ${index !== arr?.length - 1 ? 'mb-4' : ''}  ${className}`}
				/>
			))
			skeletonContent = (
				<div className={`max-w-sm w-full`}>
					<div className="animate-pulse bg-gradient-to-r from-ant-skeleton-gradient-from-color via-ant-skeleton-color to-ant-skeleton-gradient-to-color">
						{skeletonRows}
					</div>
				</div>
			)
			break
		case 'block':
			skeletonContent = (
				<div className={`max-w-sm mx-auto   ${className}`}>
					<div className="animate-pulse flex space-x-4 p-4 rounded-full bg-gradient-to-r from-ant-skeleton-gradient-from-color via-ant-skeleton-color to-ant-skeleton-gradient-to-color">
						<div className={`rounded-md bg-gray-400 h-[${height}] w-[${width}]`} style={{height: height, width:width}}></div>
					</div>
				</div>
			)
			break
		default:
			skeletonContent = (
				<div className="max-w-sm w-full mx-auto">
					<div className="animate-pulse flex space-x-4 p-4 rounded bg-gradient-to-r from-ant-skeleton-gradient-from-color via-ant-skeleton-color to-ant-skeleton-gradient-to-color">
						<div className="h-12 bg-gray-400 rounded-full w-12"></div>
					</div>
				</div>
			)
	}

	return skeletonContent
}

export default Skeleton
