import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead'
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader'
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow'
const SearchTableHead = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead className="text-nowrap text-left">ID</TableHead>
				<TableHead className="text-nowrap text-left">Client</TableHead>
				<TableHead className="text-nowrap text-left">Result</TableHead>
				<TableHead className="text-nowrap text-left">Type</TableHead>
				<TableHead className="text-nowrap text-left w-[120px] last:text-left">Account</TableHead>
			</TableRow>
		</TableHeader>
	)
}
export default SearchTableHead
