import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import { Inventory } from '@/types/inventory/types';
import { getServiceType } from '@/utils/utils';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import InventoryTableHead from './inventoryTableHead';
import Link from 'next/link';

function InventoryTable({ data }: { data: Inventory[] }) {
  const STATUS_NAME: Record<number, string> = {
    0: 'Terminated',
    1: 'Live',
  };
  const router = useRouter();
  const isNoData = data?.length === 0;
  const handleServiceClick = (id: number) => {
    router.push(`/inventory/${id}`);
  };

  const pathname = usePathname();

  return (
    <div className="overflow-auto lg:max-h-[225px] xl:max-h-full">
      <Table>
        <InventoryTableHead />
        {isNoData && <TableCaption>No inventories available.</TableCaption>}
        <TableBody>
          {data?.map((inventory: Inventory) => (
            <TableRow key={inventory.id}>
              <TableCell className="py-[19px] font-medium">
                <Link className="text-custom-dryBlue" href={`${pathname}/${inventory.id}`}>
                  {inventory?.id}
                </Link>
              </TableCell>
              <TableCell className="text-left">{inventory?.serviceNumber || '-'}</TableCell>
              <TableCell className="text-left">{inventory?.companyNetwork?.network?.name}</TableCell>
              <TableCell className="text-left">{getServiceType(inventory?.serviceType) || '-'}</TableCell>
              <TableCell className="text-left">{STATUS_NAME[inventory?.live]}</TableCell>
              <TableCell className="text-left">-</TableCell>
              <TableCell className="text-left">{inventory?.costCentre || '-'}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button variant="null" size="sm" onClick={() => handleServiceClick(inventory.id)}>
                    <Image src="/svg/eye.svg" alt="Eye icon" width={18} height={18} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default InventoryTable;
