import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function InvoicesTableHead() {
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
        <TableHead className="text-nowrap text-right">APF #</TableHead>
        <TableHead className="text-nowrap text-right">APF Date</TableHead>
        <TableHead className="text-nowrap text-center">Total</TableHead>
        <TableHead className="last:text-center">Currency</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default InvoicesTableHead;
