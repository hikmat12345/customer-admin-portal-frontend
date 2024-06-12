import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import Link from 'next/link';
import InvoicesTableHead from './invoicesTableHead';
import formatDate, { moneyFormatter } from '@/utils/utils';

function InvoicesTable({ data }: any) {
  const isNoData = data?.invoices?.length === 0;

  return (
    <div className="overflow-auto lg:max-h-[225px] xl:max-h-full">
      <Table>
        <InvoicesTableHead />
        {isNoData && <TableCaption>No invoices available.</TableCaption>}

        <TableBody>
          {data?.invoices?.map((invoice: any) => (
            <TableRow key={invoice.id}>
              <TableCell className="text-left py-[19px] font-normal">
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
              <TableCell className="text-left">{formatDate(invoice?.invoiceDate, 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-left">{formatDate(invoice?.invoiceDate, 'MMM dd, yyyy') || '-'}</TableCell>
              <TableCell className="text-left">{invoice?.status}</TableCell>
              <TableCell className="text-left">-</TableCell>
              <TableCell className="text-left">-</TableCell> 
              <TableCell className="text-left">{moneyFormatter(invoice?.totalRaw, "USD")}</TableCell>
              <TableCell className="text-left font-normal last:text-center">
                {invoice?.conversionRate?(<><span className="text-[#219653]">$</span> {invoice?.conversionRate}</>) : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default InvoicesTable;
