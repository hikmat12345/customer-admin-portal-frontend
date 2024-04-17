import { TableHead, TableHeader, TableRow } from '@/components/ui/table/table'
import React from 'react'

const TicketsTableHead = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead className="text-nowrap">Veroxos REF</TableHead>
				<TableHead className="text-nowrap">Client REF</TableHead>
				<TableHead className="text-nowrap">Site / Employee</TableHead>
				<TableHead className="text-nowrap">Vendor</TableHead>
				<TableHead className="text-nowrap">Request Type</TableHead>
				<TableHead className="text-nowrap">Status</TableHead>
				<TableHead className="text-nowrap">Last Updated</TableHead>
				<TableHead className="text-nowrap">Priority</TableHead>
				<TableHead className="text-right">Action</TableHead>
			</TableRow>
		</TableHeader>
	)
}

export default TicketsTableHead
