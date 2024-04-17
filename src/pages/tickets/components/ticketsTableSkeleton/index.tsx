import { Table } from '@/components/ui/table/table'
import React from 'react'
import TicketsTableHead from '../ticketsTable/ticketsTableHead'
import TableBodySkeleton from '@/components/ui/table/tableBodySkeleton'

type DownloadTableSkeletonProps = {
	limit: number
}
const TicketsTableSkeleton: React.FC<DownloadTableSkeletonProps> = ({ limit }) => {
	return (
		<div className="overflow-auto lg:max-h-[210px] xl:max-h-full">
			<Table>
				<TicketsTableHead />
				<TableBodySkeleton rowCount={limit} columnCount={9} />
			</Table>
		</div>
	)
}

export default TicketsTableSkeleton
