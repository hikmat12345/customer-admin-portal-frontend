import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function AssetsTableHead() {
  return (
    <TableHeader className="bg-custom-white">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="w-[200px] text-nowrap text-left">Asset Type</TableHead>
        <TableHead className="w-[200px] text-nowrap text-left">Serial Number</TableHead>
        <TableHead className="w-[200px] text-nowrap text-left">Manufacturer</TableHead>
        <TableHead className="text-nowrap text-left">Model</TableHead>
        <TableHead className="text-nowrap text-left">Status</TableHead>
        <TableHead className="text-nowrap text-center last:text-center">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default AssetsTableHead;
