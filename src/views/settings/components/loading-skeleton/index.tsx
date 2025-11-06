import React from 'react';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableBodySkeleton from '@veroxos/design-system/dist/ui/TableBodySkeleton/tableBodySkeleton';

type LoadingSkeleton = {
  rows?: number;
  columns?: number;
};
const LoadingSkeleton: React.FC<LoadingSkeleton> = ({ rows, columns }) => (
  <div className="flex-grow overflow-auto">
    <Table>
      <TableBodySkeleton rowCount={rows ?? 6} columnCount={columns ?? 2} />
    </Table>
  </div>
);

export default LoadingSkeleton;
