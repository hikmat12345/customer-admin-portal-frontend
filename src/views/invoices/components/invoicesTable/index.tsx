import Table from '@veroxos/design-system/dist/ui/Table/table'
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption'
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell'
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody'
import InvoicesTableHead from './invoicesTableHead'
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow'

const InvoicesTable = ({ data }: any) => {
	const isNoData = data?.invoices?.length === 0

	return (
		<div className="overflow-auto lg:max-h-[225px] xl:max-h-full">
			<Table>
				<InvoicesTableHead />
				{isNoData && <TableCaption>No invoices available.</TableCaption>}

				<TableBody>
					{data?.invoices?.map((invoice: any) => {
						return (
							<TableRow key={invoice.id}>
								<TableCell className="font-normal py-[19px]">{invoice?.id}</TableCell>
								<TableCell>{invoice?.invoice_number}</TableCell>
								<TableCell>{invoice?.companyNetwork?.network?.name}</TableCell>
								<TableCell>{invoice?.companyNetwork?.account_number}</TableCell>
								<TableCell>{invoice?.invoice_date}</TableCell>
								<TableCell>{invoice?.invoice_due_date || '-'}</TableCell>
								<TableCell>{invoice?.status}</TableCell>
								<TableCell>-</TableCell>
								<TableCell>-</TableCell>
								<TableCell>{invoice?.totalRaw}</TableCell>
								<TableCell className="font-normal last:text-center">
									<span className="text-[#219653]">$</span> {invoice?.conversion_rate}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

export default InvoicesTable
