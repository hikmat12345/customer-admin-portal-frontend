import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function InventoryTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="text-nowrap text-left">Number / Name</TableHead>
        <TableHead className="text-nowrap text-left">Vendor</TableHead>
        <TableHead className="text-nowrap text-left">Service Type</TableHead>
        <TableHead className="text-nowrap text-left">Status</TableHead>
        <TableHead className="text-nowrap text-left">Employee / Site</TableHead>
        <TableHead className="text-nowrap text-left">Cost Center</TableHead>
        <TableHead className="w-[120px] last:text-center">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default InventoryTableHead;
