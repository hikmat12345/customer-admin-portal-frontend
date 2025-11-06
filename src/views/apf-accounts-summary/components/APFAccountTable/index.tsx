import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import Link from 'next/link';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import { digitFormatter, makeDoubleDigit } from '@/utils/utils';
import { format } from 'date-fns';
import { DATE_FORMAT_TO_MMM_DD_YYYY, MONTH_AND_YEAR } from '@/utils/constants/dateFormat.constants';
import APFAccountInvoiceTableHead from './APFAccountsTableHead';
import { encrypt } from '@/utils/encryptParam';

function APFAccountTable({ data }: any) {
  const isNoData = data?.length === 0;

  return (
    <div className="overflow-auto" style={{ height: `calc(70vh - 260px` }}>
      <Table>
        <APFAccountInvoiceTableHead />
        {isNoData && <TableCaption>No Account Payable Feed Invoices available.</TableCaption>}

        <TableBody>
          {data?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell className="py-[19px] text-left font-normal">
                <Link
                  href={`/accounts/invoices/${row.id}/${encrypt(row?.name)}`}
                  className="cursor-pointer font-normal text-[#1175BE]"
                >
                  {row?.invoiceNumber}
                </Link>
              </TableCell>
              <TableCell className="text-left">{row?.type || '-'}</TableCell>
              <TableCell className="text-left">{row?.account ? makeDoubleDigit(row?.account) : '-'}</TableCell>
              <TableCell className="text-left">
                {row?.fiscalPeriod ? format(row?.fiscalPeriod, MONTH_AND_YEAR) : 'All'}
              </TableCell>
              <TableCell className="text-left">
                {(row?.invoiceDate && format(row?.invoiceDate, DATE_FORMAT_TO_MMM_DD_YYYY)) || '-'}
              </TableCell>
              <TableCell className="text-left">{digitFormatter(row?.totalRaw) || '-'}</TableCell>
              <TableCell className="text-left">{row?.amountToPay ? makeDoubleDigit(row?.amountToPay) : '-'}</TableCell>
              <TableCell className="pl-12 text-left last:text-left">
                {parseFloat(row?.totalRaw) - parseFloat(row?.amountToPay) !== undefined &&
                parseFloat(row?.totalRaw) - parseFloat(row?.amountToPay) !== null
                  ? (parseFloat(row?.totalRaw) - parseFloat(row?.amountToPay)).toFixed(2)
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default APFAccountTable;
