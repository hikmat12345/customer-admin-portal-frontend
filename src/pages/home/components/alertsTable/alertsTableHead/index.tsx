import { TableHead, TableHeader, TableRow } from '@veroxos/design-system'
import React from 'react'

const AlertsTableHead = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead className="text-left">NAME</TableHead>
				<TableHead className="text-nowrap text-left w-[600px] xl:min-w-[900px]">DESCRIPTION</TableHead>
				<TableHead className="text-nowrap">DATE</TableHead>
				<TableHead className="text-center last:text-center lg:w-[100px]">VIEWED</TableHead>
			</TableRow>
		</TableHeader>
	)
}

export default AlertsTableHead
