import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function InvoicesTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="text-left text-nowrap">Invoice #</TableHead>
        <TableHead className="text-left text-nowrap">Vendor</TableHead>
        <TableHead className="text-left text-nowrap">Account #</TableHead>
        <TableHead className="text-left text-nowrap">Invoice Date</TableHead>
        <TableHead className="text-left text-nowrap">Due Date</TableHead>
        <TableHead className="text-left text-nowrap">Status</TableHead>
        <TableHead className="text-nowrap text-left">APF #</TableHead>
        <TableHead className="text-nowrap text-left">APF Date</TableHead>
        <TableHead className="text-nowrap text-left">Total</TableHead>
        <TableHead className="last:text-left">Currency</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default InvoicesTableHead;
