import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function ServiceSitesTableHead() {
  return (
    <TableHeader className="bg-custom-white">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="text-nowrap text-left">Site Name</TableHead>
        <TableHead className="text-nowrap text-left">Site Code</TableHead>
        <TableHead className="w-[300px] text-nowrap text-left">Address</TableHead>
        <TableHead className="text-nowrap text-left">ZIP / Post</TableHead>
        <TableHead className="text-nowrap text-left">Country</TableHead>
        <TableHead className="text-nowrap text-center last:text-center">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default ServiceSitesTableHead;
