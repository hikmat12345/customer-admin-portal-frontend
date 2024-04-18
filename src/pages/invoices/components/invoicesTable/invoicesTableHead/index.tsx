import { TableHead, TableHeader, TableRow } from '@veroxos/design-system'

const InvoicesTableHead = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead>ID</TableHead>
				<TableHead className="text-nowrap">Invoice #</TableHead>
				<TableHead className="text-nowrap">Vendor</TableHead>
				<TableHead className="text-nowrap">Account #</TableHead>
				<TableHead className="text-nowrap">Invoice Date</TableHead>
				<TableHead className="text-nowrap">Due Date</TableHead>
				<TableHead className="text-nowrap">Status</TableHead>
				<TableHead className="text-right text-nowrap">APF #</TableHead>
				<TableHead className="text-right text-nowrap">APF Date</TableHead>
				<TableHead className="text-center text-nowrap">Total</TableHead>
				<TableHead className="last:text-center">Currency</TableHead>
			</TableRow>
		</TableHeader>
	)
}

export default InvoicesTableHead
