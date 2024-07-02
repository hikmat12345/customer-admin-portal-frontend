import Image from 'next/image';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import Link from 'next/link';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import VendorAccountsTableHead from './vendorAccountsTableHead';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { useRouter } from 'next/navigation';

function VendorAccountsTable({ data }: any) {
  const isNoData = data?.length === 0;
  const router = useRouter();

  const renderStatus = (status: string) => {
    return (
      <Badge
        className={`rounded-lg py-1 text-white ${status === 'Active' ? 'bg-[#219653]' : 'bg-[#A40000]'}`}
        variant="success"
        shape="block"
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="overflow-auto" style={{ height: `calc(100vh - 260px)` }}>
      <Table>
        <VendorAccountsTableHead />
        {isNoData && <TableCaption>No vendor accounts available.</TableCaption>}

        <TableBody>
          {data?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell className="py-[19px] text-left font-normal">
                <Link href={`/vendors/${row.id}`} className="cursor-pointer font-normal text-[#1175BE]">
                  {row?.id}
                </Link>
              </TableCell>
              <TableCell className="text-left">{row?.network?.country?.name || '-'}</TableCell>
              <TableCell className="text-left">{row?.network?.name || '-'}</TableCell>
              <TableCell className="text-left">{row?.accountNumber || '-'}</TableCell>
              <TableCell className="text-left">{row?.displayName || '-'}</TableCell>
              <TableCell className="text-left">{renderStatus(row?.companyNetworkStatus?.name) || '-'}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button variant="null" size="sm" onClick={() => router.push(`/vendors/${row.id}`)}>
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

export default VendorAccountsTable;
