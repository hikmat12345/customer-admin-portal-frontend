import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import SavingTrackerTableHead from './savingTrackerTableHead';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Image from 'next/image';
import { SavingTrackerData } from '@/types/saving-tracker/types';
import { getSavingTrackerByName, getSavingTrackerColorByStatus } from '@/utils/enums/savingTrackerStatus.enum';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import { format } from 'date-fns';
import { DATE_FORMAT_TO_MMM_DD_YYYY } from '@/utils/constants/dateFormat.constants';

function SavingTrackerTable({
  data,
  setOpenDialog,
  setSelectedRowData,
}: {
  data: SavingTrackerData[];
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRowData: React.Dispatch<React.SetStateAction<SavingTrackerData | null>>;
}) {
  const isNoData = data?.length === 0;

  return (
    <div className={`overflow-auto lg:h-[200px] 2lg:h-[230px] xl:h-[300px] 2xl:h-[410px]`}>
      <Table>
        <SavingTrackerTableHead />
        {isNoData && <TableCaption>No data available.</TableCaption>}

        <TableBody>
          {Array.isArray(data) &&
            data?.map((row: SavingTrackerData) => (
              <TableRow key={row.id}>
                <TableCell className="py-[1.1875rem] text-left font-normal">
                  <Button
                    variant="null"
                    className="cursor-pointer p-0 font-normal text-custom-dryBlue"
                    onClick={() => {
                      setOpenDialog(true);
                      setSelectedRowData(row);
                    }}
                  >
                    S{row?.id}
                  </Button>
                </TableCell>
                <TableCell className="text-left">{row?.companyNetwork?.network?.name || '-'}</TableCell>
                <TableCell className="justify text-left">{row?.comment || '-'}</TableCell>
                <TableCell className="text-left">
                  {row?.savingRaw
                    ? `$${(+row.savingRaw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : '-'}
                </TableCell>
                <TableCell className="text-left">
                  {row?.created ? format(new Date(row.created), DATE_FORMAT_TO_MMM_DD_YYYY) : '-'}
                </TableCell>
                <TableCell className="text-left">
                  <Badge
                    shape="block"
                    className={`${getSavingTrackerColorByStatus(row?.status)} whitespace-nowrap p-[5px] font-normal`}
                  >
                    {getSavingTrackerByName(row?.status) || '-'}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="null"
                    size="sm"
                    onClick={() => {
                      setOpenDialog(true);
                      setSelectedRowData(row);
                    }}
                  >
                    <Image src="/svg/eye.svg" alt="Eye icon" width={18} height={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SavingTrackerTable;
