import React from 'react'
import TicketsTableHead from '../ticketsTable/ticketsTableHead'
import { TableBodySkeleton, Table } from '@veroxos/design-system'

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
