import Image from 'next/image';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import Link from 'next/link';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { useRouter } from 'next/navigation';
import APFAccountTableHead from './APFAccountsTableHead';
import { makeDoubleDigit } from '@/utils/utils';
import { format } from 'date-fns';
import { FULL_DATE_AND_TIME_FORMAT } from '@/utils/constants/dateFormat.constants';

function APFAccountTable({ data }: any) {
  const isNoData = data?.length === 0;
  const router = useRouter();

  return (
    <div className="overflow-auto" style={{ height: `calc(100vh - 260px` }}>
      <Table>
        <APFAccountTableHead />
        {isNoData && <TableCaption>No Account Payable Feed available.</TableCaption>}

        <TableBody>
          {data?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell className="py-[19px] text-left font-normal">
                <Link
                  href={`/accounts/account-payable-feed/${row.id}`}
                  className="cursor-pointer font-normal text-[#1175BE]"
                >
                  {row?.id}
                </Link>
              </TableCell>
              {/* period  */}
              <TableCell className="text-left">
                {row?.fiscalMonth && row?.fiscalYear
                  ? `${makeDoubleDigit(row?.fiscalMonth)} - ${row?.fiscalYear}`
                  : 'All'}
              </TableCell>
              {/* total value */}
              <TableCell className="text-left">{Number(row?.totalValue).toFixed(2) || '-'}</TableCell>
              <TableCell className="text-left">
                {row?.totalInvoices ? makeDoubleDigit(row?.totalInvoices) : '-'}
              </TableCell>
              <TableCell className="text-left">
                {row?.totalAllocation ? makeDoubleDigit(row?.totalAllocation) : '-'}
              </TableCell>
              <TableCell className="text-left">
                {row?.administrator?.firstName || '-'} {row?.administrator?.lastName || '-'}
              </TableCell>
              <TableCell className="text-left">
                {(row?.created && format(row?.created, FULL_DATE_AND_TIME_FORMAT)) || '-'}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button variant="null" size="sm" onClick={() => router.push(`/account-payable-feed/${row.id}`)}>
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

export default APFAccountTable;
