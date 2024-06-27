import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function VendorAccountsTableHead() {
  return (
    <TableHeader className="bg-custom-white">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="text-nowrap text-left">Country</TableHead>
        <TableHead className="w-[200px] text-nowrap text-left">Vendor</TableHead>
        <TableHead className="text-nowrap text-left">Account #</TableHead>
        <TableHead className="w-[380px] text-nowrap text-left">Display Name</TableHead>
        <TableHead className="text-nowrap text-left">Status</TableHead>
        <TableHead className="text-nowrap text-center last:text-center">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default VendorAccountsTableHead;
