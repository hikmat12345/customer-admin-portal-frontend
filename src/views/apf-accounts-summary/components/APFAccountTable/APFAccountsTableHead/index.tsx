import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function APFAccountInvoiceTableHead() {
  return (
    <TableHeader className="bg-custom-white">
      <TableRow>
        <TableHead>Invoice #</TableHead>
        <TableHead className="text-nowrap text-left">Type</TableHead>
        <TableHead className="text-nowrap text-left">Account</TableHead>
        <TableHead className="text-nowrap text-left">Fiscal Period</TableHead>
        <TableHead className="text-nowrap text-left">Invoice Date</TableHead>
        <TableHead className="text-nowrap text-left">Invoice Total</TableHead>
        <TableHead className="text-nowrap text-left">Amount To Pay</TableHead>
        <TableHead className="text-nowrap text-center last:text-center">Difference</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default APFAccountInvoiceTableHead;
