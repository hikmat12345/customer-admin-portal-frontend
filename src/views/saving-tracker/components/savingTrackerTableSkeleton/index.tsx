import React from 'react';
import TableBodySkeleton from '@veroxos/design-system/dist/ui/TableBodySkeleton/tableBodySkeleton';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import SavingTrackerTableHead from '../savingTrackerTable/savingTrackerTableHead';

type DownloadTableSkeletonProps = {
  limit: number;
};
const SavingTrackerTableSkeleton: React.FC<DownloadTableSkeletonProps> = ({ limit }) => (
  <div className="overflow-auto lg:max-h-[210px] xl:max-h-full">
    <Table>
      <SavingTrackerTableHead />
      <TableBodySkeleton rowCount={limit} columnCount={7} />
    </Table>
  </div>
);

export default SavingTrackerTableSkeleton;
