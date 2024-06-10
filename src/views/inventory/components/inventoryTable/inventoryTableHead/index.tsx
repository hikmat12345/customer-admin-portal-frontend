import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function InventoryTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="text-nowrap">Number / Name</TableHead>
        <TableHead className="text-nowrap">Vendor</TableHead>
        <TableHead className="text-nowrap">Service Type</TableHead>
        <TableHead className="text-nowrap">Status</TableHead>
        <TableHead className="text-nowrap">Employee / Site</TableHead>
        <TableHead className="text-nowrap">Cost Center</TableHead>
        <TableHead className="w-[120px] last:text-center">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default InventoryTableHead;
