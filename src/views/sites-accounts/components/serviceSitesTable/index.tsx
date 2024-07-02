import Image from 'next/image';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import Link from 'next/link';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { useRouter } from 'next/navigation';
import ServiceSitesTableHead from './serviceSitesTableHead';

function ServiceSitesTable({ data }: any) {
  const isNoData = data?.length === 0;
  const router = useRouter();
  
  return (
    <div className="overflow-auto" style={{ height: `calc(100vh - 260px` }}>
      <Table>
        <ServiceSitesTableHead />
        {isNoData && <TableCaption>No service sites available.</TableCaption>}

        <TableBody>
          {data?.map((row: any) => (
            <TableRow key={row.veroxosId}>
              <TableCell className="py-[19px] text-left font-normal">
                <Link href={`/sites/${row.veroxosId}`} className="cursor-pointer font-normal text-[#1175BE]">
                  {row?.veroxosId}
                </Link>
              </TableCell>
              <TableCell className="text-left">{row?.name || '-'}</TableCell>
              <TableCell className="text-left">{row?.siteCode || '-'}</TableCell>
              <TableCell className="text-left">{row?.address || '-'}</TableCell>
              <TableCell className="text-left">{row?.postCode || '-'}</TableCell>
              <TableCell className="text-left">{row?.country?.name || '-'}</TableCell>

              <TableCell>
                <div className="flex items-center justify-center">
                  <Button variant="null" size="sm" onClick={() => router.push(`/sites/${row.veroxosId}`)}>
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

export default ServiceSitesTable;
