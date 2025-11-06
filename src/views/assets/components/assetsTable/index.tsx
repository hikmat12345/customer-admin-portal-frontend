import Image from 'next/image';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import Link from 'next/link';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import AssetsTableHead from './assetsTableHead';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { useRouter } from 'next/navigation';
import { statusColor } from '@/utils/enums/assetStatus.enum';

function AssetsTable({ data }: any) {
  const isNoData = data?.length === 0;
  const router = useRouter();

  const renderStatus = (status: string) => {
    return (
      <Badge className={`rounded-lg py-1 text-white ${statusColor(status)}`} variant="success" shape="block">
        {status}
      </Badge>
    );
  };

  return (
    <div className="overflow-auto" style={{ height: `calc(100vh - 250px)` }}>
      <Table>
        <AssetsTableHead />
        {isNoData && <TableCaption>No data found.</TableCaption>}

        <TableBody>
          {data?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell className="py-[19px] text-left font-normal">
                <Link href={`/asset/${row.id}`} className="cursor-pointer font-normal text-[#1175BE]">
                  {row?.id}
                </Link>
              </TableCell>
              <TableCell className="text-left">{row?.assetType?.name || '-'}</TableCell>
              <TableCell className="text-left">{row?.serialNumber || '-'}</TableCell>
              <TableCell className="text-left">{row?.manufacturerDevice?.manufacturer?.name || '-'}</TableCell>
              <TableCell className="text-left">{row?.manufacturerDevice?.name || '-'}</TableCell>
              <TableCell className="text-left">{renderStatus(row?.status?.name) || '-'}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button variant="null" size="sm" onClick={() => router.push(`/asset/${row.id}`)}>
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

export default AssetsTable;
