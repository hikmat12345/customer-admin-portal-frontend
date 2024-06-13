import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function InvoicesTableHead() {
  return (
    <TableHeader className="bg-custom-white">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="text-nowrap text-left">Invoice #</TableHead>
        <TableHead className="text-nowrap text-left">Vendor</TableHead>
        <TableHead className="text-nowrap text-left">Account #</TableHead>
        <TableHead className="text-nowrap text-left">Invoice Date</TableHead>
        <TableHead className="text-nowrap text-left">Due Date</TableHead>
        <TableHead className="text-nowrap text-left">Status</TableHead>
        <TableHead className="text-nowrap text-left">APF #</TableHead>
        <TableHead className="text-nowrap text-left">APF Date</TableHead>
        <TableHead className="text-nowrap text-left">Total</TableHead>
        <TableHead className="last:text-left">Currency</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default InvoicesTableHead;
