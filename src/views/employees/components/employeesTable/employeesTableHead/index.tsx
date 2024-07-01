import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function VendorAccountsTableHead() {
  return (
    <TableHeader className="bg-custom-white">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="text-nowrap text-left">First Name</TableHead>
        <TableHead className="text-nowrap text-left">Last Name</TableHead>
        <TableHead className="text-nowrap text-left">Email</TableHead>
        <TableHead className="text-nowrap text-left">External ID</TableHead>
        <TableHead className="text-nowrap text-left">Cost Center</TableHead>
        <TableHead className="text-nowrap text-left">Status</TableHead>
        <TableHead className="text-nowrap text-left">VIP/Exec</TableHead>
        <TableHead className="text-nowrap last:text-center">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default VendorAccountsTableHead;
