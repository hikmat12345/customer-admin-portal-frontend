import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import Link from 'next/link';
import InvoicesTableHead from './invoicesTableHead';

function InvoicesTable({ data }: any) {
  const isNoData = data?.invoices?.length === 0;

  return (
    <div className="overflow-auto lg:max-h-[225px] xl:max-h-full">
      <Table>
        <InvoicesTableHead />
        {isNoData ? (
          <TableCaption>No data found.</TableCaption>
        ) : (
          <TableBody>
            {data?.invoices?.map((invoice: any) => (
              <TableRow key={invoice.id}>
                <TableCell className="py-[19px] font-normal">
                  <Link
                    href={`/accounts/invoices/${invoice.id}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="cursor-pointer"
                  >
                    {invoice?.id}
                  </Link>
                </TableCell>
                <TableCell>{invoice?.invoice_number}</TableCell>
                <TableCell>{invoice?.companyNetwork?.network?.name}</TableCell>
                <TableCell>{invoice?.companyNetwork?.account_number}</TableCell>
                <TableCell>{invoice?.invoice_date}</TableCell>
                <TableCell>{invoice?.invoice_due_date || '-'}</TableCell>
                <TableCell>{invoice?.status}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{invoice?.totalRaw}</TableCell>
                <TableCell className="font-normal last:text-center">
                  <span className="text-[#219653]">$</span> {invoice?.conversion_rate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default InvoicesTable;
