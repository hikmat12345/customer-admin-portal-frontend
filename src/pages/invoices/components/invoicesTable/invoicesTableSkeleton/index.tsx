import { Table } from '@/components/ui/table/table'
import React from 'react'
import TableBodySkeleton from '@/components/ui/table/tableBodySkeleton'
import InvoicesTableHead from '../invoicesTableHead'

type DownloadTableSkeletonProps = {
	limit: number
}
const InvoicesTableSkeleton: React.FC<DownloadTableSkeletonProps> = ({ limit }) => {
	return (
		<div className="overflow-auto lg:max-h-[210px] xl:max-h-full">
			<Table>
				<InvoicesTableHead />
				<TableBodySkeleton rowCount={limit} columnCount={11} />
			</Table>
		</div>
	)
}

export default InvoicesTableSkeleton
