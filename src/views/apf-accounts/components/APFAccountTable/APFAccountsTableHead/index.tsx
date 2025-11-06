import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function APFAccountTableHead() {
  return (
    <TableHeader className="bg-custom-white">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="text-nowrap text-left">Period</TableHead>
        <TableHead className="text-nowrap text-left">Total Value</TableHead>
        <TableHead className="text-nowrap text-left">Total Invoices</TableHead>
        <TableHead className="text-nowrap text-left">Total Allocations</TableHead>
        <TableHead className="text-nowrap text-left">Sent By</TableHead>
        <TableHead className="text-nowrap text-left">Sent At</TableHead>
        <TableHead className="text-nowrap text-center last:text-center">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default APFAccountTableHead;
