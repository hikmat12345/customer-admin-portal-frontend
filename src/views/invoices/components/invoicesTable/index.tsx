import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import Link from 'next/link';
import InvoicesTableHead from './invoicesTableHead';
import formatDate, { moneyFormatter } from '@/utils/utils';
import { DATE_FORMAT, TABLE_HEIGHT } from '@/utils/constants/constants';
import Table from '@veroxos/design-system/dist/ui/Table/table';

function InvoicesTable({ data }: any) {
  const isNoData = data?.invoices?.length === 0;

  return (
    <div className="overflow-auto" style={{ height: `calc(100vh - ${TABLE_HEIGHT})` }}>
      <Table>
        <InvoicesTableHead />
        {isNoData && <TableCaption>No invoices available.</TableCaption>}

        <TableBody>
          {data?.invoices?.map((invoice: any) => (
            <TableRow key={invoice.id}>
              <TableCell className="py-[19px] text-left font-normal">
                <Link
                  href={`/accounts/invoices/${invoice.id}`}
                  rel="noreferrer noopener"
                  className="cursor-pointer font-normal text-[#1175BE]"
                >
                  {invoice?.id}
                </Link>
              </TableCell>
              <TableCell className="text-left">{invoice?.invoiceNumber}</TableCell>
              <TableCell className="text-left">{invoice?.companyNetwork?.network?.name}</TableCell>
              <TableCell className="text-left">{invoice?.companyNetwork?.accountNumber}</TableCell>
              <TableCell className="text-left">{formatDate(invoice?.invoiceDate, DATE_FORMAT)}</TableCell>
              <TableCell className="text-left">{formatDate(invoice?.invoiceDate, DATE_FORMAT) || '-'}</TableCell>
              <TableCell className="text-left">{invoice?.status ? invoice?.status : '-'}</TableCell>
              <TableCell className="text-left">-</TableCell>
              <TableCell className="text-left">
                {formatDate(invoice?.dateTimeForSentInAccountPayableRequest, DATE_FORMAT) || '-'}
              </TableCell>
              <TableCell className="text-left">{moneyFormatter(invoice?.totalRaw, 'USD')}</TableCell>
              <TableCell className="text-left font-normal last:text-center">
                {invoice?.companyNetwork?.network?.country ? invoice.companyNetwork.network.country.currencyCode : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default InvoicesTable;
