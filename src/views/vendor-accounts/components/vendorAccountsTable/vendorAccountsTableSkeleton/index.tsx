import React from 'react';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableBodySkeleton from '@veroxos/design-system/dist/ui/TableBodySkeleton/tableBodySkeleton';
import VendorAccountsTableHead from '../vendorAccountsTableHead';

type DownloadTableSkeletonProps = {
  limit: number;
};
const VendorAccountsTableSkeleton: React.FC<DownloadTableSkeletonProps> = ({ limit }) => (
  <div className="flex-grow overflow-auto">
    <Table>
      <VendorAccountsTableHead />
      <TableBodySkeleton rowCount={limit} columnCount={7} />
    </Table>
  </div>
);

export default VendorAccountsTableSkeleton;
