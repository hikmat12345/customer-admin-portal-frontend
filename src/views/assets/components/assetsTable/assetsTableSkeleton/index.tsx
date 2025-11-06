import React from 'react';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableBodySkeleton from '@veroxos/design-system/dist/ui/TableBodySkeleton/tableBodySkeleton';
import AssetsTableHead from '../assetsTableHead';

type DownloadTableSkeletonProps = {
  limit: number;
};
const AssetsTableSkeleton: React.FC<DownloadTableSkeletonProps> = ({ limit }) => (
  <div className="flex-grow overflow-auto">
    <Table>
      <AssetsTableHead />
      <TableBodySkeleton rowCount={limit} columnCount={7} />
    </Table>
  </div>
);

export default AssetsTableSkeleton;
