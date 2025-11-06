import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function SavingTrackerTableHead() {
  return (
    <TableHeader className="bg-custom-white">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="w-[11rem] text-nowrap text-left">Vendor</TableHead>
        <TableHead className="w-[32rem] text-nowrap text-left">Description</TableHead>
        <TableHead className="text-nowrap text-left">Saving</TableHead>
        <TableHead className="text-nowrap text-left">Spotted</TableHead>
        <TableHead className="w-[1%] text-nowrap rounded-[8px] text-left">Status</TableHead>
        <TableHead className="last:text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default SavingTrackerTableHead;
