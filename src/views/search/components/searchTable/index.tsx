import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import { ISearch } from '@/types/search/types';
import Link from 'next/link';
import SearchTableHead from './searchTableHead';
import { encrypt } from '@/utils/encryptParam';

const getEntityLink = (entity: any) => {
  const entityType = String(entity?.type)?.toLowerCase();
  switch (entityType) {
    case 'number':
      return `inventory/${entity?.id}/${encrypt(entity?.account)}`;

    case 'invoice':
      return `accounts/invoices/${entity?.id}`;

    case 'ticket':
      return `support/tickets/ticket-summary/${entity?.id}/${encrypt(entity?.result)}`;

    case 'account':
      return `vendors/${entity?.id}`;

    default:
      return `${entityType}s/${entity?.id}` || '#';
  }
};

function SearchTable({ data }: any) {
  return (
    <div className="max-h-[66.6%] overflow-auto">
      <Table className="">
        <SearchTableHead />
        <TableBody className="h-100">
          {data?.map((row: ISearch) => (
            <TableRow key={row.id}>
              <TableCell className="py-[19px] text-left font-normal text-[#1175BE]">
                <Link href={getEntityLink(row)} className="cursor-pointer">
                  {row?.id}
                </Link>
              </TableCell>
              <TableCell className="text-left">{row?.result}</TableCell>
              <TableCell className="text-left">{row?.type}</TableCell>
              <TableCell className="last:text-left">{row?.account}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default SearchTable;
