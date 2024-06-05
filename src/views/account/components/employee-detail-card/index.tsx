import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton'
import { ReactNode } from 'react'

const SiteCard = ({
	data,
	title,
	message,
	isLoading,
}: {
	data?: ReactNode
	title?: string
	message: string
	isLoading?: boolean
}) => {
	return (
		<div className="min-w-[250px] min-h-[150px] lg:min-h-[140px] xl:min-h-[155px] max-w-full h-auto border border-custom-plaster pl-7 pt-3 rounded-lg relative">
			<div className="flex gap-[10px]">
				{isLoading ? (
					<div className={`w-[24rem] mt-2 mr-14`}>
						<Skeleton variant="paragraph" rows={3} />
					</div>
				) : (
					<div className="flex flex-col gap-4 pb-3">
						<h2 className="text-custom-black text-sm md:text-base 2xl:text-lg font-semibold">{title}</h2>
						<div className="flex items-center gap-5">{data}</div>
						<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-custom-grey">{message}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default SiteCard
