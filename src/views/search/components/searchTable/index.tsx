import Table from '@veroxos/design-system/dist/ui/Table/table'
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell'
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody'
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow'
import SearchTableHead from './searchTableHead'
import { ISearch } from '@/types/search/types'
import Link from 'next/link'

const SearchTable = ({ data }: any) => {
	return (
		<div className="overflow-auto max-h-[66.6%]">
			<Table className="">
				<SearchTableHead />
				<TableBody className="h-100">
					{data?.map((row: ISearch) => {
						return (
							<TableRow key={row.id}>
								<TableCell className="font-normal py-[19px] text-[#1175BE] text-left">
									<Link href={`/${String(row?.type) === "Invoice" ? "accounts/invoices/" + String(row?.type)?.toLowerCase() :
										String(row?.type)?.toLowerCase() === "accounts" ? "vendors/" :
										String(row?.type)?.toLowerCase() === "services" ? "inventory/" :
										String(row?.type)?.toLowerCase() === "site" ? "sites/" : ""}${row?.id}`}
										target='_blank' rel='noreferrer noopener' className='cursor-pointer'>
										{row?.id}: {String(row?.type)?.toLowerCase()}s/{row?.id}
									</Link>
								</TableCell>
								<TableCell className="text-left">{row?.client}</TableCell>
								<TableCell className="text-left">{row?.result}</TableCell>
								<TableCell className="text-left">{row?.type}</TableCell>
								<TableCell className="last:text-left">{row?.account}</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}
export default SearchTable
