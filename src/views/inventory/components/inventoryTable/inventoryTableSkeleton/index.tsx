import React from 'react';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableBodySkeleton from '@veroxos/design-system/dist/ui/TableBodySkeleton/tableBodySkeleton';
import InventoryTableHead from '../inventoryTableHead';

type DownloadTableSkeletonProps = {
  limit: number;
};
const InventoryTableSkeleton: React.FC<DownloadTableSkeletonProps> = ({ limit }) => (
  <div className="overflow-auto lg:max-h-[210px] xl:max-h-full">
    <Table>
      <InventoryTableHead />
      <TableBodySkeleton rowCount={limit} columnCount={8} />
    </Table>
  </div>
);

export default InventoryTableSkeleton;
