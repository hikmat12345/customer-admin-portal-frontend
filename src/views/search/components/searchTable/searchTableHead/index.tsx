import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function SearchTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-nowrap text-left">ID</TableHead>
        <TableHead className="text-nowrap text-left">Result</TableHead>
        <TableHead className="text-nowrap text-left">Type</TableHead>
        <TableHead className="w-[250px] text-nowrap text-left last:text-left">Account</TableHead>
      </TableRow>
    </TableHeader>
  );
}
export default SearchTableHead;
