import Skeleton from '@/components/ui/skeleton/skeleton'

const InvoicesProcessed = ({ data, title, isLoading }: any) => {
	return (
		<div className="min-w-[300px] min-h-[150px] lg:min-h-[140px] xl:min-h-[155px] h-auto border border-[#EAEAEA] pl-7 pt-3 rounded-lg relative">
			{isLoading ? (
				<div className="mt-2 mr-8">
					<Skeleton variant="paragraph" rows={3} />
				</div>
			) : (
				<div className="flex gap-[6px]">
					<div className="flex flex-col gap-4 pb-3 w-full pr-5">
						<h2 className="text-[#000000] text-sm md:text-base xl:text-lg font-semibold">{title}</h2>
						<div className="flex items-center gap-5">
							<h1 className="text-lg lg:text-2xl 2xl:text-3xl font-bold">{data?.invoices?.length}</h1>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-xs xl:text-xs 2xl:text-sm font-medium text-[#444444]">
								So far this month, {data?.invoices?.length} invoices have been processed.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default InvoicesProcessed
