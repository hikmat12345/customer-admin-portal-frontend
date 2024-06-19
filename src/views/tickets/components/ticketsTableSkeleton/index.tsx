import React from 'react';
import TableBodySkeleton from '@veroxos/design-system/dist/ui/TableBodySkeleton/tableBodySkeleton';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TicketsTableHead from '../ticketsTable/ticketsTableHead';

type DownloadTableSkeletonProps = {
  limit: number;
};
const TicketsTableSkeleton: React.FC<DownloadTableSkeletonProps> = ({ limit }) => (
  <div className="overflow-auto lg:max-h-[210px] xl:max-h-full">
    <Table>
      <TicketsTableHead />
      <TableBodySkeleton rowCount={limit} columnCount={9} />
    </Table>
  </div>
);

export default TicketsTableSkeleton;
