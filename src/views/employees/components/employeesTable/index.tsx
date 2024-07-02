import Image from 'next/image';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import Link from 'next/link';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import VendorAccountsTableHead from './employeesTableHead';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { useRouter } from 'next/navigation';

function EmployeesTable({ data }: any) {
  const router = useRouter();

  const renderStatus = (status: number) => {
    return status === 1 ? 'Live' : 'Terminated';
  };

  const renderVip = (vip: number) => {
    return vip === 1 ? 'Yes' : 'No';
  };

  const noDataFound = data?.length === 0;

  return (
    <div className="overflow-auto" style={{ height: `calc(100vh - 260px)` }}>
      <Table>
        <VendorAccountsTableHead />
        {noDataFound && <TableCaption>No employees available.</TableCaption>}

        <TableBody>
          {data?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell className="py-[19px] text-left font-normal">
                <Link href={`/employees/${row.id}`} className="cursor-pointer font-normal text-[#1175BE]">
                  {row?.id}
                </Link>
              </TableCell>
              <TableCell className="text-left">{row?.firstName || '-'}</TableCell>
              <TableCell className="text-left">{row?.lastName || '-'}</TableCell>
              <TableCell className="text-left">{row?.email || '-'}</TableCell>
              <TableCell className="text-left">{row?.externalId || '-'}</TableCell>
              <TableCell className="text-left">{row?.costCentreForNewService || '-'}</TableCell>
              <TableCell className="text-left">{renderStatus(row?.status) || '-'}</TableCell>
              <TableCell className="text-left">{renderVip(row?.vip) || '-'}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button variant="null" size="sm" onClick={() => router.push(`/employees/${row.id}`)}>
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

export default EmployeesTable;
